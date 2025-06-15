import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/taskForm.scss";

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (values: { title: string; description: string }) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialTitle,
      description: initialDescription,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="task-form" noValidate>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        aria-invalid={formik.touched.title && Boolean(formik.errors.title)}
        aria-describedby="title-error"
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="error" id="title-error">
          {formik.errors.title}
        </div>
      ) : null}
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        aria-invalid={
          formik.touched.description && Boolean(formik.errors.description)
        }
        aria-describedby="description-error"
      />
      {formik.touched.description && formik.errors.description ? (
        <div className="error" id="description-error">
          {formik.errors.description}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginRight: 10, background: "#eee", color: "#333" }}
          >
            Cancel
          </button>
        )}
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default TaskForm;
