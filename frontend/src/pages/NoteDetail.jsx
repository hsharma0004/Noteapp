import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Corrected import for Link, useNavigate, useParams
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true); // Added for initial fetch loading
  const [error, setError] = useState(null);     // Added for initial fetch error
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true); // Start loading when fetch begins
      setError(null);   // Clear any previous errors
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) { // Renamed error to err to avoid shadowing outside scope
        console.error("Error in fetching note:", err); // Use console.error
        setError(err); // Store the error
        // Check if it's a 404 (Not Found) specifically
        if (err.response && err.response.status === 404) {
          toast.error("Note not found!");
          navigate('/'); // Redirect to home if note not found
        } else {
          toast.error("Failed to fetch the note.");
        }
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    if (id) { // Only fetch if ID exists (prevents fetching on initial mount if id is undefined for some reason)
      fetchNote();
    }
  }, [id, navigate]); // Add navigate to dependency array for useEffect safety (ESLint suggestion)

  const handleDelete = async () => {
    // Add disabled state check if you want to prevent multiple rapid clicks
    if (saving) return; // Prevent deletion while saving is in progress (optional)

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    // Optional: Add a separate deleting state if you want to disable the delete button
    // const [deleting, setDeleting] = useState(false);
    // setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!"); // Added exclamation for consistency
      navigate("/");
    } catch (err) {
      console.error("Error deleting the note:", err); // Use console.error
      const errorMessage = err.response?.data?.message || "Failed to delete note.";
      toast.error(errorMessage);
    } // finally { setDeleting(false); }
  };

  const handleSave = async () => {
    // Check if note is null or its properties are undefined before trying to trim
    if (!note || !note.title?.trim() || !note.content?.trim()) {
      toast.error("Title and content are required."); // More specific message
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!"); // Added exclamation
      navigate("/");
    } catch (err) {
      console.error("Error saving the note:", err); // Use console.error
      const errorMessage = err.response?.data?.message || "Failed to update note.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };


  // Conditional Rendering based on loading/error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="h-10 w-10 animate-spin text-gray-500" /> {/* Example loading spinner */}
        <p className="ml-2">Loading note...</p>
      </div>
    );
  }

  if (error && error.response?.status !== 404) { // Only show generic error if not a 404 (handled above)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500 text-lg mb-2">Error loading note: {error.message || 'Something went wrong.'}</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    );
  }

  // If note is null after loading (e.g., 404 not redirected immediately)
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-lg mb-2">Note not found.</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? (
                    <>
                      <LoaderIcon className="h-5 w-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;