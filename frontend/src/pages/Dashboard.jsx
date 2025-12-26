import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [filter, setFilter] = useState("all"); // all | pending | completed
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ADD TASK
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setAdding(true);
    setError("");

    try {
      const res = await api.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setAdding(false);
    }
  };

  // COMPLETE TASK
  const handleComplete = async (id) => {
    setUpdatingId(id);
    setError("");

    try {
      const res = await api.patch(`/tasks/${id}`);
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setUpdatingId(null);
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    setDeletingId(id);
    setError("");

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    } finally {
      setDeletingId(null);
    }
  };

  // EDIT TASK
  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const handleUpdate = async (id) => {
    if (!editTitle.trim()) return;

    setUpdatingId(id);
    setError("");

    try {
      const res = await api.patch(`/tasks/${id}`, {
        title: editTitle,
      });

      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setUpdatingId(null);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // FILTER TASKS
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* CREATE TASK */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={adding}
            className={`px-4 rounded text-white ${
              adding ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </form>

        {/* FILTERS */}
        <div className="flex gap-3 mb-6">
          {["all", "pending", "completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 italic">
            No tasks found for this filter.
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map(task => (
              <li
                key={task._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                {editingId === task._id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border px-2 py-1 rounded flex-1 mr-4"
                  />
                ) : (
                  <span
                    className={
                      task.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {task.title}
                  </span>
                )}

                <div className="flex gap-3">
                  {editingId === task._id ? (
                    <button
                      onClick={() => handleUpdate(task._id)}
                      disabled={updatingId === task._id}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {updatingId === task._id ? "Saving..." : "Save"}
                    </button>
                  ) : (
                    <>
                      {!task.completed && (
                        <button
                          onClick={() => handleComplete(task._id)}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(task._id)}
                        disabled={deletingId === task._id}
                        className="text-red-600 hover:underline text-sm"
                      >
                        {deletingId === task._id ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
