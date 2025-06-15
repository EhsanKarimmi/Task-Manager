import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import "../../styles/modal.scss";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (data: { title: string; description: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <TaskForm
          initialTitle={title}
          initialDescription={description}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default AddTaskModal;
