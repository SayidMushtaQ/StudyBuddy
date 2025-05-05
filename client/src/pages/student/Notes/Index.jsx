import { useState } from "react";

import { dummyNotes } from "../../../data/notesDummy";
import Header from "../../../components/dashboard/student/Notes/Header";
import Topnav from "../../../components/dashboard/student/Notes/Topnav";
import NotesCards from "../../../components/dashboard/student/Notes/NotesCards";

export default function NotesDashboard() {
  const [notes] = useState(dummyNotes);

  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");

  // Get recently accessed notes (combined from both types)
  const getRecentlyAccessedNotes = () => {
    const allNotes = [
      ...notes.personal.map((note) => ({ ...note, type: "personal" })),
      ...notes.class.map((note) => ({ ...note, type: "class" })),
    ];

    return allNotes
      .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
      .slice(0, 6); // Get top 6 recently accessed notes
  };

  // Get sorted notes based on sort criteria
  const getSortedNotes = () => {
    const notes = getRecentlyAccessedNotes();

    switch (sortBy) {
      case "recent":
        return notes.sort(
          (a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)
        );
      case "oldest":
        return notes.sort(
          (a, b) => new Date(a.lastAccessed) - new Date(b.lastAccessed)
        );
      case "alphabetical":
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
        <Header
          totalNoteCount={totalNoteCount}
          classNoteCount={classNoteCount}
          personalNoteCount={personalNoteCount}
          handleCreateNote={handleCreateNote}
        />

        {/* Quick Actions and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Topnav
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Notes Grid/List View */}
          <NotesCards
            viewMode={viewMode}
            getSortedNotes={getSortedNotes}
            handleViewNote={handleViewNote}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
}
