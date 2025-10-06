import { Plus, Sparkles, LogOut, User } from 'lucide-react';

export default function DashboardHeader({ user, onLogout, onCreateTask, onAISuggestions }) {
  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Hello, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Have a nice day ✨</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAISuggestions}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            <Sparkles size={18} />
            AI Suggestions
          </button>
          
          <button
            onClick={onCreateTask}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            New Task
          </button>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
              <User size={20} />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}