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
    'bg-blue-200',
    'bg-purple-100',
    'bg-purple-200',
    'bg-indigo-100',
    'bg-indigo-200',
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
    <div className="flex flex-col md:flex-row h-[80vh] bg-gradient-to-br from-blue-100 to-purple-200">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-white/90 border-r border-purple-100 flex flex-col">
        <div className="p-6 border-b border-purple-100">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center">
            <Book className="mr-3" size={28} />
            Notes
          </h1>
          <div className="mt-6 relative">
            <input
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-blue-400" size={20} />
          </div>
          <button 
            className="mt-5 w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition shadow-md"
            onClick={addNewNote}
          >
            <Plus size={20} className="mr-2" />
            New Note
          </button>
        </div>

        <div className="flex items-center px-6 py-3 bg-blue-50 border-b border-purple-100">
          <button
            className="flex items-center text-sm text-blue-700 hover:text-blue-800"
            onClick={() => {
              setSortBy('title');
              toggleSortOrder();
            }}
          >
            Sort by {sortBy === 'title' ? 'Title' : 'Date'}
            <ArrowUpDown size={16} className="ml-2" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {sortedNotes.length > 0 ? (
            sortedNotes.map(note => (
              <div 
                key={note.id}
                className={`p-4 m-3 border-b border-purple-100 cursor-pointer ${note.color} rounded-lg shadow-sm transition hover:shadow-md ${activeNoteId === note.id ? 'border-l-4 border-l-blue-600' : ''}`}
                onClick={() => setActiveNoteId(note.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-blue-800 truncate">{note.title}</h3>
                  <button 
                    className="text-purple-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-blue-700 mt-2 truncate">{note.content}</p>
                <p className="text-xs text-purple-500 mt-2">{formatDate(note.date)}</p>
              </div>
            ))
          ) : (
            <p className="p-6 text-blue-700 text-center">No notes found.</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col p-0 overflow-hidden">
        {activeNote ? (
          <>
            <div className="p-6 border-b border-purple-100 bg-white/90 shadow-sm">
              <input
                className="w-full text-2xl font-bold mb-4 px-4 py-2 border border-transparent rounded-xl focus:outline-none focus:border-purple-200 text-blue-800"
                value={activeNote.title}
                onChange={(e) => updateNote('title', e.target.value)}
                placeholder="Note title"
              />
              <div className="flex flex-wrap items-center text-sm text-blue-700">
                <span>Last edited: {formatDate(activeNote.date)}</span>
                <div className="ml-6 flex items-center">
                  <span className="mr-3">Color:</span>
                  <div className="flex space-x-2">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full ${color} border shadow-sm ${activeNote.color === color ? 'border-blue-800 ring-2 ring-blue-400' : 'border-purple-200'}`}
                        onClick={() => updateNote('color', color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <textarea
              className="flex-grow w-full p-6 text-blue-800 bg-white/80 resize-none focus:outline-none shadow-inner"
              value={activeNote.content}
              onChange={(e) => updateNote('content', e.target.value)}
              placeholder="Start typing your note here..."
            />
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-blue-700">
            <Book size={80} className="mb-6 text-purple-300" />
            <p className="text-2xl font-bold text-blue-800 mb-2">Select a note or create a new one</p>
            <p className="text-blue-700 mb-6">Your thoughts deserve a beautiful home</p>
            <button 
              className="mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
              onClick={addNewNote}
            >
              <Plus size={20} className="mr-2" />
              New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}