import { Modal, Box, Typography, Button, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import TransitionModalFields from "../form/TransitionModalFields";
import { useUploadMediaMutation } from "../../redux/features/media";
import { useUpdateStatusByIdMutation } from "../../redux/features/requestStatus";

const TransitionModal = ({
  open,
  onClose,
  transitionState,
  currentRequestStatus,
  currentRequestStatusType,
  currentRequest,
}) => {
  // const { requestId } = useParams();

  console.log(currentRequest, "currentRequest in TransitionModal");
  // const [filesState, setFilesState] = useState([]);
  // const [base64FilesState, setBase64FilesStates] = useState([]);
  const [
    uploadMedia,
    { data: mediaData, error: mediaError, isLoading: mediaIsLoading },
  ] = useUploadMediaMutation();
  const [
    updateStatus,
    { data: updateData, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateStatusByIdMutation();

  const initialValues = {
    priority:
      currentRequest && currentRequest.priority && currentRequest.priority > 0
        ? currentRequest.priority
        : 5,
    confirmationStatus: currentRequest.confirmationStatus || "",
    verificationStatus: currentRequest.verificationStatus || "",
    mediaFiles: currentRequest.mediaFiles || [],
    mediaFiles: [],
    blockNumber: currentRequest.location?.blockNumber || "",
    floorNumber: currentRequest.location?.floor || "",
    roomNumber: currentRequest.location?.roomNumber || "",
    isToilet:
      currentRequest.location?.isToilet &&
      currentRequest.location.isToilet === true
        ? currentRequest.location.isToilet
        : false,
    maintenanceRequestTypes: currentRequest.maintenanceRequestTypes || [],
    subject: currentRequest.subject || "",
    description: currentRequest.description || "",
    handlingDepartment: currentRequest.handlingDepartment || "",
    assignedPersons: currentRequest.assignedPersons || [],
    scheduleMaintenanceStartDateTime:
      currentRequestStatus?.scheduleMaintenanceStartDateTime || dayjs(),
    scheduleMaintenanceEndDateTime:
      currentRequestStatus?.scheduleMaintenanceEndDateTime || dayjs(),
    internalNote: currentRequestStatus.internalNote || "",
    externalNote: currentRequestStatus.externalNote || "",
    requiredFiles: [],
    requiredFilesIds: [],
    signature: currentRequestStatus.signatureByName || "",
    // condtional values
    allowChangePriority: transitionState.allowChangePriority || false,
    allowChangeconfirmationStatus:
      transitionState.allowChangeconfirmationStatus || false,
    allowChangeverificationStatus:
      transitionState.allowChangeverificationStatus || false,
    allowsAddMoreMedia: transitionState.allowsAddMoreMedia || false,
    allowsChangeLocation: transitionState.allowsChangeLocation || false,
    allowsChangeMedia: transitionState.allowsChangeMedia || false,
    allowsChangeRequestTypes: transitionState.allowsChangeRequestTypes || false,
    allowsChangeTitleAndDescription:
      transitionState.allowsChangeTitleAndDescription || false,
    allowsForwardToDepartment:
      transitionState.allowsForwardToDepartment || false,
    allowsForwardToPerson: transitionState.allowsForwardToPerson || false,
    needsFile: transitionState.needsFile || false,
    needsSignatures: transitionState.needsSignatures || false,
    hasSchedule: transitionState.hasSchedule || false,
    isInternal: transitionState.isInternal || false,
  };
  const transitionStateSchema = yup.object().shape({
    priority: yup.number().when("allowChangePriority", {
      is: true,
      then: () =>
        yup
          .number()
          .required("Priority is required")
          .min(1, "Priority must be at least 1")
          .max(5, "Priority must be at most 5"),
      otherwise: () => yup.number().notRequired(),
    }),
    confirmationStatus: yup.string().when("allowChangeconfirmationStatus", {
      is: true,
      then: () => yup.string().required("Confirmation Status is required"),
      otherwise: () => yup.string().notRequired(),
    }),
    verificationStatus: yup.string().when("allowChangeverificationStatus", {
      is: true,
      then: () => yup.string().required("Verification Status is required"),
      otherwise: () => yup.string().notRequired(),
    }),
    blockNumber: yup.number().when("allowsChangeLocation", {
      is: true,
      then: () =>
        yup
          .number()
          .required("Block Number is required")
          .min(1, "Block Number must be at least 1")
          .max(100, "Block Number must be at most 100"),
      otherwise: () => yup.number().notRequired(),
    }),
    floorNumber: yup.number().when("allowsChangeLocation", {
      is: true,
      then: () =>
        yup
          .number()
          .required("Floor Number is required")
          .min(1, "Floor Number must be at least 1")
          .max(15, "Floor Number must be at most 15"),
      otherwise: () => yup.number().notRequired(),
    }),
    roomNumber: yup.string().when("allowsChangeLocation", {
      is: true,
      then: () =>
        yup
          .number()
          .required("Room Number is required")
          .min(1, "Room Number must be at least 1"),
      otherwise: () => yup.number().notRequired(),
    }),
    subject: yup.string().when("allowsChangeTitleAndDescription", {
      is: true,
      then: () => yup.string().required("Subject is required"),
      otherwise: () => yup.string().notRequired(),
    }),
    description: yup.string().when("allowsChangeTitleAndDescription", {
      is: true,
      then: () => yup.string().required("Description is required"),
      otherwise: () => yup.string().notRequired(),
    }),
    handlingDepartment: yup.string().when("allowsForwardToDepartment", {
      is: true,
      then: () => yup.string().required("Handling Department is required"),
      otherwise: () => yup.string().notRequired(),
    }),
    assignedPersons: yup.array().when("allowsForwardToPerson", {
      is: true,
      then: () =>
        yup
          .array()
          .of(
            yup.object().shape({
              id: yup.number().required("Assigned Person is required"),
            })
          )
          .required("Assigned Person is required"),
      otherwise: () => yup.array().notRequired(),
    }),
    maintenanceRequestTypes: yup.array().when("allowsChangeRequestTypes", {
      is: true,
      then: () =>
        yup
          .array()
          .of(
            yup.object().shape({
              id: yup.number().required("Request Type is required"),
            })
          )
          .required("Request Type is required"),
      otherwise: () => yup.array().notRequired(),
    }),
    // scheduleMaintenanceStartDateTime: yup.date().when("hasSchedule", {
    //   is: true,
    //   then: () => yup.date().required("Start Date is required"),
    //   otherwise: () => yup.date().notRequired(),
    // }),
    // scheduleMaintenanceEndDateTime: yup.date().when("hasSchedule", {
    //   is: true,
    //   then: () => yup.date().required("End Date is required"),
    //   otherwise: () => yup.date().notRequired(),
    // }),
    signature: yup.string().when("needsSignatures", {
      is: true,
      then: () => yup.string().required("Signature is required"),
      otherwise: () => yup.string().notRequired(),
    }),
  });

  const handleRemoveFile = (index) => {
    const updatedFiles = filesState.filter((_, i) => i !== index);
    const updatedBase64Files = base64FilesState.filter((_, i) => i !== index);
    setFileS(updatedFiles);
    setBase64Images(updatedBase64Files);
  };

  const handleUploadFile = async (formData, values) => {
    // console.log("the data", formData);
    try {
      const res = await uploadMedia(formData);
      // console.log(res);
      values.requiredFilesIds.push(res.data.id);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values, "values in handleSubmit");

    // await handleFileChange(values.requiredFiles);

    // console.log(filesState, "filesState in handleSubmit");
    // console.log(base64FilesState, "base64FilesState in handleSubmit");

    try {
      Array.from(values.requiredFiles).map((file) => {
        console.log(file, "file in handleSubmit");
        const formData = new FormData();
        formData.append("file", file);

        handleUploadFile(formData, values);
      });

      const formData = {
        updateMaintenance: {
          ...(transitionState.allowChangePriority && {
            priority: values.priority,
          }),
          ...(transitionState.allowChangeconfirmationStatus && {
            confirmationStatus: values.confirmationStatus,
          }),
          ...(transitionState.allowChangeverificationStatus && {
            verificationStatus: values.verificationStatus,
          }),
          ...(transitionState.allowsChangeTitleAndDescription && {
            subject: values.subject,
            description: values.description,
          }),
          ...(transitionState.allowsChangeLocation && {
            locationCreate: {
              blockNumber: parseInt(values.blockNumber, 10),
              floor: parseInt(values.floorNumber, 10),
              roomNumber: values.roomNumber,
              isToilet: values.isToilet,
              longitude: 0,
              latitude: 0,
            },
          }),
          ...(transitionState.allowsChangeMedia && {
            mediaIds: values?.mediaFiles?.map((file) => file.id) || [],
          }),
          ...(transitionState.allowsChangeRequestTypes && {
            maintenanceRequestTypeIds: values?.maintenanceRequestTypes?.map(
              (type) => type.id
            ),
          }),
          ...(transitionState.allowsForwardToPerson && {
            assignedPersonIds: values.assignedPersons.map(
              (person) => person.id
            ),
          }),
          ...(transitionState.allowsForwardToDepartment && {
            handlingDepartmentId: values.handlingDepartment,
          }),
        },
        updateRequestStatus: {
          ...(transitionState.hasSchedule && {
            scheduleMaintenanceStartDateTime:
              values?.scheduleMaintenanceStartDateTime.toDate() || "",
            scheduleMaintenanceEndDateTime:
              values?.scheduleMaintenanceEndDateTime.toDate() || "",
          }),
          // ...(transitionState.needsFile && {
          //   requiredFiles: values.requiredFilesIds,
          // }),
          ...(transitionState.isInternal && {
            internalNote: values.internalNote,
          }),
          externalNote: values.externalNote,
          ...(transitionState.needsFile && {
            mediaFiles: values.requiredFilesIds,
          }),
          ...(transitionState.needsSignatures && {
            signatureByName: values.signature,
          }),
        },
      };

      console.log(formData, "formData in handleSubmit");
      console.log(values, "values in handleSubmit after submit");
      const response = await updateStatus({
        requestId: currentRequest.id,
        nextRequestTypeId: transitionState.id,
        body: formData,
      });
      // // console.log(len);
      console.log(response, "response in handleSubmit");
      // setSnackbarMessage("Request Updated Successfully");
      // setSnackbarSeverity("success");
      // setSnackbarOpen(true);
      // onClose();
      //   console.log(formData, "formData in handleSubmit");
    } catch (error) {
      console.log(error);
      // setSnackbarMessage("Request Update Failed");
      // setSnackbarSeverity("error");
      // setSnackbarOpen(true);
    }

    // console.log("clicked", values);
    // console.log("formData", formData);
  };

  // console.log(currentRequestStatus, "currentRequestStatus in TransitionModal");
  // console.log(dayjs(new Date()).toDate());
  console.log(transitionState, "transitionState in TransitionModal");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          // position: "absolute",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          bgcolor: "background.paper",
          p: 4,
          m: "auto",
          mt: 5,
        }}
      >
        {mediaIsLoading && updateIsLoading && (
          <Alert severity="info">Processing...</Alert>
        )}
        {mediaError && <Alert severity="error">{mediaError.message}</Alert>}
        {updateError && <Alert severity="error">{updateError.message}</Alert>}
        <Typography variant="h6">
          Transition To {transitionState.name} State
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={transitionStateSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, values, setFieldValue }) => (
            <Form>
              {TransitionModalFields(
                values,
                setFieldValue,
                transitionState,
                currentRequestStatusType,
                currentRequest,
                errors
              )}
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "16px" }}
                // onClick={() => handleSubmit(values)}
              >
                Transition
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default TransitionModal;
