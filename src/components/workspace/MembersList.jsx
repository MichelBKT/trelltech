import Members from '../icons/Members.jsx';
import InviteMemberModal from './InviteMemberModal.jsx';
import { useState } from 'react';

export default function MembersList({ isMenuOpen, selectedBoard, boardMembers, onInviteMember }) {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const handleInvite = async (email) => {
        await onInviteMember(email);
        setIsInviteModalOpen(false);
    };

    return (
        <div className="p-4 pl-6 text-gray-900 font-bold flex flex-col focus:outline-none transition-colors duration-1000 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <Members/>
                    <span className="pl-2">
                        {`${isMenuOpen ? "Membres" : ""}`}
                    </span>
                </div>
                {isMenuOpen && selectedBoard && (
                    <button
                        onClick={() => setIsInviteModalOpen(true)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
            {isMenuOpen && boardMembers.length > 0 && (
                <div className="mt-2 pl-6">
                    {boardMembers.map((member) => (
                        <div key={member.id} className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2">
                            {member.avatarUrl ? (
                                <img 
                                    src={member.avatarUrl} 
                                    alt={member.fullName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {member.fullName.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="ml-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {member.fullName}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                    {member.username}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onInvite={handleInvite}
            />
        </div>
    );
} 