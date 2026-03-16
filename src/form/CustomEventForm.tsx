"use client";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useAtom } from "jotai";
import { useSnackbar } from "@/hooks/useSnackbar";
import { assetsApi } from "@/lib/api";
import { loadedDataAtom } from "@/atoms/loader.atom";

interface IFormValue {
  code: string;
  label: string;
}

interface CustomEventLookupFormProps {
  onSuccess: () => void;
}

const CustomEventForm: React.FC<CustomEventLookupFormProps> = ({
  onSuccess,
}) => {
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IFormValue) => {
    try {
      const labelTrimer = values.label.trim().replace(/\s+/g, "");
      const pathbuilder = `${loaderData.work_center.code}.Job Activity`;
      const codeBuilder = `${values.code}/${labelTrimer}`;

      const res = await assetsApi.setAssetValuesByPath(pathbuilder, {
        value: codeBuilder,
      });

      onSuccess();

      showSnackbar("Custom Event created successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(
        error.response?.data?.message || "Create event failed",
        "error",
      );
    }
  };

  return (
    <Formik
      initialValues={{
        code: "",
        label: "",
      }}
      validationSchema={null}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IFormValue>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid size={4}>
                <FormControl fullWidth>
                  <InputLabel id="code" htmlFor="code">
                    Event Type
                  </InputLabel>
                  <Select
                    labelId="code"
                    id="code"
                    name="code"
                    label="Event Type"
                    value={props.values.code}
                    onChange={handleChange}
                  >
                    <MenuItem value="Setup">Setup</MenuItem>
                    <MenuItem value="Production">Production</MenuItem>
                    <MenuItem value="Idle">Idle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={8}>
                <TextField
                  fullWidth
                  id="label"
                  name="label"
                  label="Label"
                  value={props.values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.label && Boolean(errors.label)}
                  helperText={touched.label && errors.label}
                />
              </Grid>
              <Grid size={12}>
                <Button fullWidth variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomEventForm;
