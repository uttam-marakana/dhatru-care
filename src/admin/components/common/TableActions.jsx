import { RiEdit2Line } from 'react-icons/ri';
import { FaTrashCanArrowUp } from 'react-icons/fa6';

export default function TableActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={onEdit}
        className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
        title="Edit"
      >
        <RiEdit2Line size={18} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="text-[var(--color-error)] hover:opacity-80 transition-opacity"
        title="Delete"
      >
        <FaTrashCanArrowUp size={18} />
      </button>
    </div>
  );
}
