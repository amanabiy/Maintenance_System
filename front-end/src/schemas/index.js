import * as yup from "yup";

export const reportSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
});
