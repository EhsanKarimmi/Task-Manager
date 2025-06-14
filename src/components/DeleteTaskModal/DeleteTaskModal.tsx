import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="modal-content">
        <h2 id="delete-dialog-title">حذف تسک</h2>
        <p>آیا از حذف تسک "{taskTitle}" مطمئن هستید؟</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <button onClick={onClose} style={{ marginRight: 8 }}>
            لغو
          </button>
          <button
            onClick={onConfirm}
            style={{ backgroundColor: "#e57373", color: "white" }}
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
