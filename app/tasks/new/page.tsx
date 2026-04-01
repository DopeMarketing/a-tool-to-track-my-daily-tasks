import Link from 'next/link'

export default async function NewTaskPage() {
  // TODO: Fetch clients for client selector
  // TODO: Fetch projects for project selector
  // TODO: Handle form submission to create new task
  
  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Task</h1>
        <p className="text-gray-600">Create a new task with detailed information</p>
      </div>

      {/* Task Form */}
      <div className="bg-white rounded-lg shadow">
        <form className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <input 
              type="text" 
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea 
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task description (optional)"
            />
          </div>

          {/* Client and Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <select className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                <option value="">Select a client</option>
                {/* TODO: Map through clients */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project
              </label>
              <select className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                <option value="">Select a project</option>
                {/* TODO: Map through projects filtered by selected client */}
              </select>
            </div>
          </div>

          {/* Priority and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input 
                type="date" 
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Hours
              </label>
              <input 
                type="number" 
                step="0.5"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Hours"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Create Task
            </button>
            <Link 
              href="/tasks"
              className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}