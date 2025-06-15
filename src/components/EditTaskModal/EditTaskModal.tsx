import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import "../../styles/modal.scss";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (data: { title: string; description: string }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
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
        <h2>ویرایش تسک</h2>
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

export default EditTaskModal;
