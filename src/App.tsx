import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./app/slices/taskSlice";
import Loader from "./components/Loader/Loader";
import TaskCard from "./components/TaskCard/TaskCard";
import EditTaskModal from "./components/EditTaskModal/EditTaskModal";
import DeleteConfirmModal from "./components/DeleteTaskModal/DeleteTaskModal";
import Toast from "./components/Toast/Toast";
import "./styles/home.scss";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";

const PAGE_SIZE = 30;

function App() {
  // dispatch
  const dispatch = useAppDispatch();
  // task selector
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  //
  const [page, setPage] = useState(1);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  //
  const displayedTasks = useMemo(() => {
    return tasks.slice(0, page * PAGE_SIZE);
  }, [tasks, page]);
  //
  const currentEditTask = useMemo(() => {
    return tasks.find((t) => t.id === editTaskId) || null;
  }, [tasks, editTaskId]);
  //
  function handleEditSave(data: { title: string; description: string }) {
    if (!editTaskId) return;
    dispatch(updateTask({ id: editTaskId, ...data }));
    setEditTaskId(null);
    setToastMessage("The task was successfully edited. !");
  }
  //
  function handleDeleteConfirm() {
    if (!deleteTaskId) return;
    dispatch(deleteTask(deleteTaskId));
    setDeleteTaskId(null);
    setToastMessage("The task was successfully deleted !");
  }
  //
  function handleCreateTask(data: { title: string; description: string }) {
    dispatch(createTask(data));
    setShowAddModal(false);
    setToastMessage("The new task was created successfully !");
  }
  // useEffect
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Add New Task
        </button>
      </div>

      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
      <div className="tasks-list" role="list">
        {displayedTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            image={task.image}
            onEdit={() => setEditTaskId(task.id)}
            onDelete={() => setDeleteTaskId(task.id)}
          />
        ))}
      </div>

      {displayedTasks.length < tasks.length && (
        <button
          className="load-more-btn"
          onClick={() => setPage(page + 1)}
          aria-label="Load more tasks"
        >
          Load more
        </button>
      )}

      {/* edit task modal */}
      {currentEditTask && (
        <EditTaskModal
          isOpen={Boolean(editTaskId)}
          onClose={() => setEditTaskId(null)}
          title={currentEditTask.title}
          description={currentEditTask.description}
          onSave={handleEditSave}
        />
      )}

      {/* delete task modal */}
      {deleteTaskId && (
        <DeleteConfirmModal
          isOpen={Boolean(deleteTaskId)}
          onClose={() => setDeleteTaskId(null)}
          onConfirm={handleDeleteConfirm}
          taskTitle={tasks.find((t) => t.id === deleteTaskId)?.title || ""}
        />
      )}

      {/* add task modal */}
      {showAddModal && (
        <AddTaskModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title=""
          description=""
          onSave={handleCreateTask}
        />
      )}

      {/* toast for notifications */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default App;
