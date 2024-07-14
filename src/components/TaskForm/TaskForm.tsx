import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/tasksSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import "./taskForm.scss";

interface TASK {
  title: string;
  description?: string;
  date?: string;
}

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string(),
      date: Yup.date().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      const task: TASK = {
        title: values.title,
        description: values.description || undefined,
        date: values.date ? new Date(values.date).toISOString() : undefined,
      };

      dispatch(addTask(task)); // Dispatch addTask action

      resetForm(); // Reset the form after submission
    },
  });

  return (
    <Box
      sx={{
        width: 350,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
      role="presentation"
    >
      <Typography variant="h4" color={"#2c387e"}>
        New Task
      </Typography>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth={true}
          multiline={true}
          placeholder={"Task title"}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}

        <FilledInput
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth={true}
          multiline={true}
          placeholder={"Short description of the task"}
          color="primary"
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Task Deadline"
            value={formik.values.date}
            onChange={(newValue) => formik.setFieldValue("date", newValue)}
            onBlur={formik.handleBlur}
          />
        </LocalizationProvider>
        {formik.touched.date && formik.errors.date ? (
          <div>{formik.errors.date}</div>
        ) : null}

        <Button type="submit" variant="contained">
          Create!
        </Button>
      </form>
    </Box>
  );
};

export default TaskForm;
