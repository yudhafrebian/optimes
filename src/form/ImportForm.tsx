"use client";

import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";

interface ImportFormValues {
  file: File | null;
}

interface ImportFormProps {
  onSubmit: (file: File) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  helperText?: string;
}

const excelMimeTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const ImportForm = ({
  onSubmit,
  onCancel,
  submitLabel = "Import",
  helperText = "Drag & drop, paste, or click to choose an Excel file.",
}: ImportFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    file: Yup.mixed<File>()
      .required("File is required")
      .test("file-type", "Only .xls or .xlsx files are allowed", (value) => {
        if (!value) return false;
        const isExcelMime = excelMimeTypes.includes(value.type);
        const lowerName = value.name.toLowerCase();
        const isExcelExt =
          lowerName.endsWith(".xls") || lowerName.endsWith(".xlsx");
        return isExcelMime || isExcelExt;
      }),
  });

  const handleFile = (
    file: File | null,
    setFieldValue: FormikProps<ImportFormValues>["setFieldValue"],
    setFieldTouched: FormikProps<ImportFormValues>["setFieldTouched"],
  ) => {
    setFieldValue("file", file, true);
    setFieldTouched("file", true, true);
  };

  return (
    <Formik<ImportFormValues>
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (!values.file) return;
        try {
          setLoading(true);
          await onSubmit(values.file);
        } finally {
          setLoading(false);
        }
      }}
    >
      {(props: FormikProps<ImportFormValues>) => {
        const { values, errors, touched, setFieldValue, setFieldTouched } =
          props;

        return (
          <Form>
            <Grid container spacing={2} mt={1}>
              <Grid size={12}>
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    const droppedFile = event.dataTransfer.files?.[0] ?? null;
                    handleFile(droppedFile, setFieldValue, setFieldTouched);
                  }}
                  onPaste={(event) => {
                    const pastedFile = event.clipboardData.files?.[0] ?? null;
                    handleFile(pastedFile, setFieldValue, setFieldTouched);
                  }}
                  sx={{
                    border: "2px dashed",
                    borderColor: isDragging ? "primary.main" : "divider",
                    borderRadius: 2,
                    px: 2,
                    py: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: isDragging ? "action.hover" : "background.paper",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {helperText}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Accepted: .xls, .xlsx
                  </Typography>

                  {values.file && (
                    <Typography variant="body2" mt={1}>
                      Selected: {values.file.name} (
                      {Math.ceil(values.file.size / 1024)} KB)
                    </Typography>
                  )}
                </Box>

                <input
                  ref={inputRef}
                  type="file"
                  accept=".xls,.xlsx"
                  hidden
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0] ?? null;
                    handleFile(selectedFile, setFieldValue, setFieldTouched);
                  }}
                />

                {touched.file && errors.file && (
                  <Typography variant="body2" color="error" mt={1}>
                    {errors.file as string}
                  </Typography>
                )}
              </Grid>

              <Grid container size={12} spacing={2}>
                {onCancel && (
                  <Grid size={6}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={onCancel}
                      fullWidth
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Grid>
                )}
                <Grid size={onCancel ? 6 : 12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                  >
                    {loading ? "Importing..." : submitLabel}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ImportForm;
