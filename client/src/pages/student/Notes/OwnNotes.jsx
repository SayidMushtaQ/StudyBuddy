import { useState} from "react";

import Sidebar from "../../../components/dashboard/student/ownNotes/sidebar";
import Writer from '../../../components/dashboard/student/ownNotes/writer'
const colorOptions = [
  "bg-blue-100",
  "bg-blue-200",
  "bg-purple-100",
  "bg-purple-200",
  "bg-indigo-100",
  "bg-indigo-200",
];

export default function NotesApp() {
  const [notes, setNotes] = useState([]);

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'title'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  console.log(notes)
  // Save notes to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  // Get active note
  const activeNote = activeNoteId
    ? notes.find((note) => note.id === activeNoteId)
    : null;

  // Add new note
  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      date: new Date().toISOString(),
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  // Update note
  const updateNote = (field, value) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === activeNoteId) {
        return {
          ...note,
          [field]: value,
          date: field !== "color" ? new Date().toISOString() : note.date,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };
  // Save note
  const handleSaveNotes = (id)=>{
    console.log(id)
  }
  // Filter notes by search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh]">
      {/* Sidebar */}
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        addNewNote={addNewNote}
        setSortBy={setSortBy}
        toggleSortOrder={toggleSortOrder}
        sortBy={sortBy}
        sortedNotes={sortedNotes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        deleteNote={deleteNote}
        formatDate={formatDate}
      />

      {/* Main content */}
      <div className="flex-grow flex flex-col p-0 overflow-hidden">
        <Writer
          activeNote={activeNote}
          updateNote={updateNote}
          formatDate={formatDate}
          colorOptions={colorOptions}
          addNewNote={addNewNote}
          handleSaveNotes={handleSaveNotes}
          activeNoteId={activeNoteId}
        />
      </div>
    </div>
  );
}
