import { useState } from 'react';
import { 
  Notebook, BookOpen, Clock, 
  SortDesc, Grid, List, ChevronRight, PlusCircle 
} from 'lucide-react';
import { dummyNotes } from '../../data/notesDummy';

export default function NotesDashboard() {
  const [notes] = useState(dummyNotes);

  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

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

  // Get sorted notes based on sort criteria
  const getSortedNotes = () => {
    const notes = getRecentlyAccessedNotes();
    
    switch (sortBy) {
      case 'recent':
        return notes.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
      case 'oldest':
        return notes.sort((a, b) => new Date(a.lastAccessed) - new Date(b.lastAccessed));
      case 'alphabetical':
        return notes.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return notes;
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
                        <Clock size={12} className="mx-2" />
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