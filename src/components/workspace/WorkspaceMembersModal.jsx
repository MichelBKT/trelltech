import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getBoardMembers, removeMember } from '../../api/trelloApi';
import LoadingOverlay from '../LoadingOverlay.jsx';

WorkspaceMembersModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    workspaceId: PropTypes.string.isRequired,
    workspaceName: PropTypes.string.isRequired,
}

export default function WorkspaceMembersModal({ isOpen, onClose, workspaceId, workspaceName }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchMembers();
        }
    }, [isOpen, workspaceId]);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const data = await getBoardMembers(workspaceId);
            setMembers(data);
        } catch (error) {
            setError(error.message);
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            setIsLoading(true);
            const success = await removeMember(workspaceId, memberId);
            if (success) {
                setMembers(members.filter(member => member.id !== memberId));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getAvatarUrl = (member) => {
        if (!member.avatarHash) return null;
        return `https://trello-members.s3.amazonaws.com/${member.id}/${member.avatarHash}/170.png`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingOverlay isVisible={isLoading} />
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl mx-4">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Membres de {workspaceName}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-4">
                    {loading ? (
                        <div className="text-center py-4">Chargement...</div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-4">{error}</div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">Aucun membre</div>
                    ) : (
                        <div className="space-y-4">
                            {members.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        {member.avatarHash ? (
                                            <img
                                                src={getAvatarUrl(member)}
                                                alt={member.fullName}
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) => {
                                                    console.error('Erreur de chargement de l\'avatar');
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `
                                                        <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                                            <span class="text-sm text-gray-600 dark:text-white">
                                                                ${member.fullName.charAt(0)}
                                                            </span>
                                                        </div>
                                                    `;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                                <span className="text-sm text-gray-600 dark:text-white">
                                                    {member.fullName.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {member.fullName}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {member.username}
                                            </p>
                                        </div>
                                    </div>
                                    {member.memberType !== 'admin' && (
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 