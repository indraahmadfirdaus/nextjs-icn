import TaskCard from './TaskCard';

export default function TaskList({ tasks, onRefresh }) {
  if (tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">📋</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onRefresh={onRefresh} />
      ))}
    </div>
  );
}