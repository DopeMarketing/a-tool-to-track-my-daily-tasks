import Link from 'next/link'

export default async function Dashboard() {
  // TODO: Fetch today's tasks grouped by client/project
  // TODO: Fetch clients for filtering
  // TODO: Sort tasks by priority and due date
  
  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Today's Tasks</h1>
        <p className="text-gray-600">Manage your daily workflow</p>
      </div>

      {/* Quick Add Task */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Quick Add Task</h2>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="What needs to be done?"
            className="flex-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add Task
          </button>
        </div>
      </div>

      {/* Client Filter */}
      <div className="mb-6">
        <select className="border rounded-md px-3 py-2 bg-white">
          <option>All Clients</option>
          {/* TODO: Map through clients */}
        </select>
      </div>

      {/* Task Lists by Client/Project */}
      <div className="space-y-6">
        {/* High Priority Tasks */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-red-600">High Priority</h3>
          </div>
          <div className="p-6">
            {/* TODO: Map through high priority tasks */}
            <p className="text-gray-500">No high priority tasks today</p>
          </div>
        </div>

        {/* Regular Tasks by Project */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">Project Alpha</h3>
          </div>
          <div className="p-6">
            {/* TODO: Map through tasks for this project */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span>Sample task item</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">Medium</span>
                  <span className="text-sm text-gray-500">Due: Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="mt-6 flex gap-4">
        <Link href="/tasks/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          New Task
        </Link>
        <Link href="/tasks" className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          View All Tasks
        </Link>
      </div>
    </div>
  )
}