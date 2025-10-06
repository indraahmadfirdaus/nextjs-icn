import { X, Trash2 } from 'lucide-react';

export default function ConfirmDeleteModal({ title = 'Delete Task', message, onConfirm, onCancel, loading = false }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {message && (
          <p className="text-gray-700 mb-6">{message}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}