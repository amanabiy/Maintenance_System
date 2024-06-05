import * as yup from "yup";

export const reportSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
});

export const transitionStateSchema = yup.object().shape({
  priority: yup.number().when("allowChangePriority", {
    is: true,
    then: yup.number().required("Priority is required"),
    otherwise: () => yup.number().notRequired(),
  }),
  confirmationStatus: yup.string().when("allowChangeconfirmationStatus", {
    is: true,
    then: yup.string().required("Confirmation Status is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  verificationStatus: yup.string().when("allowChangeverificationStatus", {
    is: true,
    then: yup.string().required("Verification Status is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  blockNumber: yup.number().when("allowsChangeLocation", {
    is: true,
    then: yup.number().required("Block Number is required"),
    otherwise: () => yup.number().notRequired(),
  }),
  floorNumber: yup.number().when("allowsChangeLocation", {
    is: true,
    then: yup.number().required("Floor Number is required"),
    otherwise: () => yup.number().notRequired(),
  }),
  roomNumber: yup.number().when("allowsChangeLocation", {
    is: true,
    then: yup.number().required("Room Number is required"),
    otherwise: () => yup.number().notRequired(),
  }),
  subject: yup.string().when("allowsChangeTitleAndDescription", {
    is: true,
    then: yup.string().required("Subject is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  description: yup.string().when("allowsChangeTitleAndDescription", {
    is: true,
    then: yup.string().required("Description is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  handlingDepartment: yup.string().when("allowsForwardToDepartment", {
    is: true,
    then: yup.string().required("Handling Department is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  signature: yup.string().when("needsSignatures", {
    is: true,
    then: yup.string().required("Signature is required"),
    otherwise: () => yup.string().notRequired(),
  }),
});
