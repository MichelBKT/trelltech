import PropTypes from 'prop-types';
import { assignMemberToCard, removeMemberFromCard } from '../../api/trelloApi';
import { UserIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

CardMemberMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    card: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default function CardMemberMenu({ isOpen, onClose, members, card, onUpdate }) {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getAvatarUrl = (member) => {
        if (!member.avatarHash) return null;
        return `https://trello-members.s3.amazonaws.com/${member.id}/${member.avatarHash}/170.png`;
    };

    const handleMemberClick = async (memberId) => {
        try {
            if (card.idMembers?.includes(memberId)) {
                await removeMemberFromCard(card.id, memberId);
            } else {
                await assignMemberToCard(card.id, memberId);
            }
            onUpdate();
        } catch (error) {
            console.error('Erreur lors de la modification des membres:', error);
        }
    };

    return (
        <div ref={menuRef} className="absolute z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-64">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Membres</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    ×
                </button>
            </div>
            <div className="space-y-2">
                {members.map((member) => {
                    const isAssigned = card.idMembers?.includes(member.id);
                    return (
                        <button
                            key={member.id}
                            onClick={() => handleMemberClick(member.id)}
                            className={`w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                isAssigned ? 'bg-blue-50 dark:bg-blue-900' : ''
                            }`}
                        >
                            {getAvatarUrl(member) ? (
                                <img
                                    src={getAvatarUrl(member)}
                                    alt={member.fullName}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        console.error('Erreur de chargement de l\'avatar');
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span class="text-xs text-gray-600 dark:text-gray-300">
                                                    ${member.initials}
                                                </span>
                                            </div>
                                        `;
                                    }}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                        {member.initials}
                                    </span>
                                </div>
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {member.fullName}
                            </span>
                            {isAssigned && (
                                <span className="ml-auto text-blue-500">✓</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
} 