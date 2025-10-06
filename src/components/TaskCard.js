import { useState } from 'react';
import { Calendar, MoreVertical, Trash2, Edit, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { taskAPI } from '@/lib/api';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function TaskCard({ task, onRefresh }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statusConfig = {
    todo: { label: 'To Do', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'In Progress', color: 'bg-orange-100 text-orange-700' },
    done: { label: 'Done', color: 'bg-green-100 text-green-700' },
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await taskAPI.deleteTask(task.id);
      onRefresh();
    } catch (error) {
      alert('Failed to delete task');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await taskAPI.updateTask(task.id, { status: newStatus });
      onRefresh();
    } catch (error) {
      alert('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                <CheckCircle size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                {task.due_date && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <Calendar size={14} />
                    {format(new Date(task.due_date), 'dd MMM yyyy')}
                  </div>
                )}
              </div>
            </div>

            {task.description && (
              <p className="text-gray-600 mt-2 ml-13">{task.description}</p>
            )}

            <div className="flex items-center gap-2 mt-4 ml-13">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[task.status]?.color}`}>
                {statusConfig[task.status]?.label}
              </span>

              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={loading}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-20">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowEditModal(true);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteModal(true);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onRefresh();
          }}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          title="Delete Task"
          message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      )}
    </>
  );
}