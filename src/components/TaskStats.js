import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

export default function TaskStats({ tasks }) {
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="card p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <ListTodo size={20} />
          </div>
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">
            Todo
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{todoCount}</h3>
        <p className="text-blue-100 text-sm">Tasks to start</p>
      </div>

      <div className="card p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Clock size={20} />
          </div>
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">
            In Progress
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{inProgressCount}</h3>
        <p className="text-orange-100 text-sm">Tasks in progress</p>
      </div>

      <div className="card p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-start justify-between mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">
            {completionRate}%
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{doneCount}</h3>
        <p className="text-green-100 text-sm">Tasks completed</p>
      </div>
    </div>
  );
}