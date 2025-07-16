import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res);
        setNotes(res.data);
      } catch (error) {
        toast.error("Failed to load notes");
      }
    };
    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {notes.length === 0 && <NotesNotFound />}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Notecard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
