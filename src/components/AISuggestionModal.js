import { useState } from 'react';
import { X, Sparkles, Plus } from 'lucide-react';
import { aiAPI, taskAPI } from '@/lib/api';

export default function AISuggestionsModal({ onClose, onSuccess }) {
  const [context, setContext] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    setLoading(true);
    setSuggestions([]);

    try {
      const response = await aiAPI.getSuggestions(context);
      setSuggestions(response.data.suggestions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (suggestion) => {
    try {
      await taskAPI.createTask({
        title: suggestion.title,
        description: suggestion.description,
        status: 'todo',
      });
      onSuccess();
    } catch (err) {
      alert('Failed to add task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI Task Suggestions</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Context (Optional)
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., software development tasks, marketing campaign"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide context to get more relevant suggestions
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 mb-6"
        >
          {loading ? 'Generating...' : 'Generate Suggestions'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Suggested Tasks:</h3>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {suggestion.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddTask(suggestion)}
                    className="ml-3 w-8 h-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Add this task"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && suggestions.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <Sparkles size={48} className="mx-auto mb-3 text-gray-300" />
            <p>Click "Generate Suggestions" to get AI-powered task ideas</p>
          </div>
        )}
      </div>
    </div>
  );
}