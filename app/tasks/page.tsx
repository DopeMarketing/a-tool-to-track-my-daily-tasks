import Link from 'next/link'

export default async function TasksPage() {
  // TODO: Fetch all tasks with filtering options
  // TODO: Fetch clients and projects for filters
  // TODO: Handle search and sorting
  
  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
          <p className="text-gray-600">Manage and organize your tasks</p>
        </div>
        <Link 
          href="/tasks/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Task
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Search tasks..."
            className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>All Clients</option>
            {/* TODO: Map through clients */}
          </select>
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mb-4 flex gap-2">
        <button className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
          Mark Complete
        </button>
        <button className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
          Delete Selected
        </button>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client/Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* TODO: Map through tasks */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Sample Task
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Client A / Project Alpha
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Medium
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2024-01-15
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  In Progress
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex gap-2">
                  <Link href="/tasks/1/edit" className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}