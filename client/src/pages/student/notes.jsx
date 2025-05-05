import { useState} from 'react';
import { 
  Notebook, BookOpen, Plus, Filter, Clock, 
  BookMarked, Tag, CalendarDays, SortDesc, 
  Grid, List, ChevronRight, PlusCircle 
} from 'lucide-react';

export default function NotesDashboard() {
  const [notes] = useState({
    personal: [
      { id: 1, title: 'Project Ideas', content: 'List of potential project ideas for the semester', date: '2025-05-01', category: 'Work', lastAccessed: '2025-05-04T14:30:00' },
      { id: 2, title: 'Shopping List', content: 'Items to buy this weekend', date: '2025-05-03', category: 'Personal', lastAccessed: '2025-05-05T09:15:00' },
      { id: 3, title: 'Workout Plan', content: 'Weekly exercise routine', date: '2025-04-28', category: 'Health', lastAccessed: '2025-05-03T18:45:00' },
    ],
    class: [
      { id: 1, title: 'Data Structures', content: 'Notes on binary trees and graph algorithms', date: '2025-04-28', category: 'Computer Science', lastAccessed: '2025-05-05T10:20:00' },
      { id: 2, title: 'Marketing Strategies', content: 'Digital marketing campaign planning', date: '2025-05-02', category: 'Business', lastAccessed: '2025-05-04T16:35:00' },
      { id: 3, title: 'Calculus II', content: 'Integration techniques and applications', date: '2025-04-30', category: 'Mathematics', lastAccessed: '2025-05-02T11:50:00' },
      { id: 4, title: 'Organic Chemistry', content: 'Reaction mechanisms and compounds', date: '2025-05-01', category: 'Science', lastAccessed: '2025-05-01T09:25:00' },
    ]
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  
  // All available tags/categories across both note types
  const allTags = [
    ...new Set([
      ...notes.personal.map(note => note.category),
      ...notes.class.map(note => note.category)
    ])
  ];

  // Get recently accessed notes (combined from both types)
  const getRecentlyAccessedNotes = () => {
    const allNotes = [
      ...notes.personal.map(note => ({...note, type: 'personal'})),
      ...notes.class.map(note => ({...note, type: 'class'}))
    ];
    
    return allNotes
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
      .slice(0, 6); // Get top 6 recently accessed notes
  };

  // Filter notes based on active filter
  const getFilteredNotes = () => {
    if (activeFilter === 'all') return getRecentlyAccessedNotes();
    
    return getRecentlyAccessedNotes().filter(note => note.category === activeFilter);
  };

  // Get sorted notes based on sort criteria
  const getSortedNotes = () => {
    const filtered = getFilteredNotes();
    
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.lastAccessed) - new Date(b.lastAccessed));
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  };

  // Calculate note counts
  const personalNoteCount = notes.personal.length;
  const classNoteCount = notes.class.length;
  const totalNoteCount = personalNoteCount + classNoteCount;

  // Format date as "Month Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Navigate to create note page (placeholder function)
  const handleCreateNote = () => {
    console.log("Navigating to create note page");
    // In a real application, this would navigate to the create note page
    // e.g., router.push('/dashboard/notes/create');
  };

  // Navigate to note detail page (placeholder function)
  const handleViewNote = (note) => {
    console.log("Viewing note:", note);
    // In a real application, this would navigate to the note detail page
    // e.g., router.push(`/dashboard/notes/${note.type}/${note.id}`);
  };


  return (
    <div className="h-[85vh]">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-indigo-700 text-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notes Dashboard</h1>
              <p className="text-indigo-100">
                You have {totalNoteCount} notes ({classNoteCount} class notes and {personalNoteCount} personal notes)
              </p>
            </div>
            <button 
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-50 transition-colors"
              onClick={handleCreateNote}
            >
              <PlusCircle size={20} className="mr-2" />
              Create New Note
            </button>
          </div>
        </div>

        {/* Quick Actions and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recently Accessed Notes</h2>
            
            <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
              {/* Tag Filter */}
              <div className="relative">
                <select 
                  className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <Tag size={16} className="absolute left-2 top-2.5 text-gray-500" />
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select 
                  className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">A-Z</option>
                </select>
                <SortDesc size={16} className="absolute left-2 top-2.5 text-gray-500" />
              </div>

              {/* View Mode Toggles */}
              <div className="flex border border-gray-200 rounded-md">
                <button 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`p-2 ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Grid/List View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSortedNotes().map(note => (
                <div 
                  key={`${note.type}-${note.id}`} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewNote(note)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${note.type === 'personal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {note.type === 'personal' ? 'Personal' : 'Class'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(note.lastAccessed).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-indigo-600 mb-1">{note.title}</h3>
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {note.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {getSortedNotes().map(note => (
                <div 
                  key={`${note.type}-${note.id}`} 
                  className="py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewNote(note)}
                >
                  <div className="flex items-center">
                    {note.type === 'personal' ? 
                      <Notebook size={18} className="text-purple-600 mr-3" /> : 
                      <BookOpen size={18} className="text-blue-600 mr-3" />
                    }
                    <div>
                      <h3 className="font-medium text-gray-800">{note.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="mr-2">{note.category}</span>
                        <span>•</span>
                        <CalendarDays size={12} className="mx-2" />
                        <span>{formatDate(note.date)}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}