import { useState } from "react";

export default function NotesApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNote = () => {
    if (!title || !description) return;

    const newNote = { title, description };

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setDescription(notes[index].description);
    setEditIndex(index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <input
        type="text"
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        placeholder="Enter description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleAddNote}
      >
        {editIndex !== null ? "Update Note" : "Add Note"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 rounded relative border"
          >
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p className="mt-2">{note.description}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-sm px-2 py-1 bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
