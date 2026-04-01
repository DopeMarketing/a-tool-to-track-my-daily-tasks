import Link from 'next/link'

export default async function ClientsPage() {
  // TODO: Fetch all clients with their project counts
  // TODO: Fetch client statistics (total tasks, active projects)
  // TODO: Handle client deletion and updates
  
  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your clients and their projects</p>
        </div>
        <Link 
          href="/clients/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Client
        </Link>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Clients</h3>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-900">28</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
      </div>

      {/* Client List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Client List</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {/* TODO: Map through clients */}
          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    <Link href="/clients/1" className="hover:text-blue-600">
                      Acme Corporation
                    </Link>
                  </h4>
                  <div className="flex gap-2">
                    <Link href="/clients/1" className="text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </Link>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">john@acmecorp.com</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span>3 Projects</span>
                  <span>•</span>
                  <span>12 Active Tasks</span>
                  <span>•</span>
                  <span>Last activity: 2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    <Link href="/clients/2" className="hover:text-blue-600">
                      TechStart Inc.
                    </Link>
                  </h4>
                  <div className="flex gap-2">
                    <Link href="/clients/2" className="text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </Link>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">contact@techstart.com</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span>2 Projects</span>
                  <span>•</span>
                  <span>8 Active Tasks</span>
                  <span>•</span>
                  <span>Last activity: 1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <Link href="/projects" className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          Manage Projects
        </Link>
        <Link href="/tasks" className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
          View All Tasks
        </Link>
      </div>
    </div>
  )
}