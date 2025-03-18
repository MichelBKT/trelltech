import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PropTypes from "prop-types";

WorkspaceContextMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
}
export default function WorkspaceContextMenu({ isOpen, onDelete, onEdit }) {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="py-1">
                <button
                    onClick={onEdit}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                    <PencilIcon className="h-5 w-5" />
                    <span>Modifier</span>
                </button>
                <button
                    onClick={onDelete}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                    <TrashIcon className="h-5 w-5" />
                    <span>Supprimer</span>
                </button>
            </div>
        </div>
    );
} 