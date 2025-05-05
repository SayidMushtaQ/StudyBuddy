import { useState, useEffect } from 'react';
import { Trash2, Plus, Search, Book, ArrowUpDown } from 'lucide-react';

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [
      { 
        id: 1, 
        title: 'Welcome to Notes App', 
        content: 'This is a simple notes taking application. Create, edit, and delete notes as needed.', 
        date: new Date().toISOString(),
        color: 'bg-blue-100' 
      }
    ];
  });
  
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  
  const colorOptions = [
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-100',
    'bg-purple-100',
    'bg-pink-100',
  ];

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Get active note
  const activeNote = activeNoteId ? notes.find(note => note.id === activeNoteId) : null;

  // Add new note
  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      date: new Date().toISOString(),
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  // Update note
  const updateNote = (field, value) => {
    const updatedNotes = notes.map(note => {
      if (note.id === activeNoteId) {
        return { ...note, [field]: value, date: field !== 'color' ? new Date().toISOString() : note.date };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };

  // Filter notes by search term
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Book className="mr-2" size={24} />
            Notes
          </h1>
          <div className="mt-4 relative">
            <input
              className="w-full pl-8 pr-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          </div>
          <button 
            className="mt-3 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            onClick={addNewNote}
          >
            <Plus size={18} className="mr-1" />
            New Note
          </button>
        </div>

        <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
          <button
            className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            onClick={() => {
              setSortBy('title');
              toggleSortOrder();
            }}
          >
            Sort by {sortBy === 'title' ? 'Title' : 'Date'}
            <ArrowUpDown size={16} className="ml-1" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {sortedNotes.length > 0 ? (
            sortedNotes.map(note => (
              <div 
                key={note.id}
                className={`p-3 border-b border-gray-200 cursor-pointer ${note.color} ${activeNoteId === note.id ? 'border-l-4 border-l-blue-500' : ''}`}
                onClick={() => setActiveNoteId(note.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
                  <button 
                    className="text-gray-400 hover:text-red-500 p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">{note.content}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(note.date)}</p>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500 text-center">No notes found.</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col p-0 overflow-hidden">
        {activeNote ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <input
                className="w-full text-xl font-semibold mb-2 px-2 py-1 border border-transparent rounded focus:outline-none focus:border-gray-300"
                value={activeNote.title}
                onChange={(e) => updateNote('title', e.target.value)}
                placeholder="Note title"
              />
              <div className="flex items-center text-sm text-gray-500">
                <span>Last edited: {formatDate(activeNote.date)}</span>
                <div className="ml-4 flex items-center">
                  <span className="mr-2">Color:</span>
                  <div className="flex space-x-1">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        className={`w-5 h-5 rounded-full ${color} border ${activeNote.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                        onClick={() => updateNote('color', color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <textarea
              className="flex-grow w-full p-4 text-gray-800 bg-white resize-none focus:outline-none"
              value={activeNote.content}
              onChange={(e) => updateNote('content', e.target.value)}
              placeholder="Start typing your note here..."
            />
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
            <Book size={64} className="mb-4 text-gray-300" />
            <p className="text-xl">Select a note or create a new one</p>
            <button 
              className="mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              onClick={addNewNote}
            >
              <Plus size={18} className="mr-1" />
              New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}