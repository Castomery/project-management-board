import { ChevronDown, ChevronRight, LayoutDashboard, Users } from 'lucide-react';
import  { useState } from 'react'

const Sidebar = () => {
  const [openProject, setOpenProject] = useState<number|null>(null);

  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' }
  ];

  const toggleProject = (projectId : number) => {
    setOpenProject(openProject === projectId ? null : projectId);
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 h-screen">
      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">Workspaces</h2>
      
      <div className="space-y-1">
        {projects.map((project) => (
          <div key={project.id}>
            <button
              onClick={() => toggleProject(project.id)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-700">{project.name}</span>
              {openProject === project.id ? (
                <ChevronDown size={18} className="text-gray-500" />
              ) : (
                <ChevronRight size={18} className="text-gray-500" />
              )}
            </button>

            {/* Dropdown Menu */}
            {openProject === project.id && (
              <div className="mt-1 bg-white border border-gray-200 rounded shadow-sm">
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                  <LayoutDashboard size={16} className="text-gray-600" />
                  <span className="text-gray-700 text-sm">Boards</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                  <Users size={16} className="text-gray-600" />
                  <span className="text-gray-700 text-sm">Members</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar