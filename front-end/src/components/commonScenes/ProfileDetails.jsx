// import React, { useState } from "react";
// import {
//   Avatar,
//   Tooltip,
//   Typography,
//   Button,
//   TextField,
//   IconButton,
//   Box,
//   Grid,
//   Container,
// } from "@mui/material";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import LockIcon from "@mui/icons-material/Lock";
// import { styled } from "@mui/material/styles";

// const AvatarWrapper = styled("div")({
//   position: "relative",
//   marginBottom: "16px",
// });

// const ChangeProfilePicBtn = styled(IconButton)({
//   position: "absolute",
//   bottom: 0,
//   right: 0,
//   backgroundColor: "rgba(255, 255, 255, 0.7)",
// });

// const ProfileDetails = ({ user }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     fullName: `${user.fullName}`,
//     email: `${user.email}`,
//     phoneNumber: `${user.phoneNumber}`,
//     role: `${user.role.roleName}`,
//     department: `${user.department?.name}` || "",
//   });

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // Save user data logic here
//     setIsEditing(false);
//     console.log("User data saved:", userData);
//   };

//   return (
//     <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
//       <Box display="flex" flexDirection="column" alignItems="center">
//         <AvatarWrapper>
//           <Avatar
//             className="avatar"
//             src={userData.profilePicture}
//             alt={`${userData.firstName} ${userData.lastName}`}
//             sx={{ width: 100, height: 100 }}
//           />
//           <Tooltip title="Change Profile Picture">
//             <ChangeProfilePicBtn color="primary">
//               <PhotoCameraIcon />
//             </ChangeProfilePicBtn>
//           </Tooltip>
//         </AvatarWrapper>
//         <Typography variant="h6">
//           FullName :{!isEditing && userData.fullName}
//           {isEditing && (
//             <TextField
//               name="fullName"
//               label="Full Name"
//               fullWidth
//               margin="normal"
//               value={userData.fullName}
//               onChange={handleChange}
//             />
//           )}
//         </Typography>
//         <Typography variant="h6">
//           Email: {!isEditing && userData.email}
//           {isEditing && (
//             <TextField
//               name="email"
//               label="Email"
//               fullWidth
//               margin="normal"
//               value={userData.email}
//               onChange={handleChange}
//             />
//           )}
//         </Typography>
//         <Typography variant="h6">
//           Phone Number: {!isEditing && userData.phoneNumber}
//           {isEditing && (
//             <TextField
//               name="phoneNumber"
//               label="Phone Number"
//               fullWidth
//               margin="normal"
//               value={userData.phoneNumber}
//               onChange={handleChange}
//             />
//           )}
//         </Typography>
//         <Typography variant="body2">Role: {userData.role}</Typography>
//         {userData.department && (
//           <Typography variant="body2">
//             Department: {userData.department}
//           </Typography>
//         )}

//         <IconButton color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
//           {isEditing ? <SaveIcon /> : <EditIcon />}
//         </IconButton>

//         {isEditing && (
//           <Box sx={{ width: "100%", mt: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               startIcon={<SaveIcon />}
//               sx={{ mt: 2 }}
//             >
//               Save Changes
//             </Button>
//           </Box>
//         )}
//         <Button
//           variant="outlined"
//           color="secondary"
//           startIcon={<LockIcon />}
//           sx={{ mt: 2 }}
//         >
//           Change Password
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default ProfileDetails;

import React, { useState } from "react";
import {
  Avatar,
  Tooltip,
  Typography,
  Button,
  TextField,
  IconButton,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import { useUpdateMeMutation } from "../../redux/features/auth";
import { useNavigate } from "react-router-dom";
import { useRequestOtpMutation } from "../../redux/features/auth";

const AvatarWrapper = styled("div")({
  position: "relative",
  marginBottom: "16px",
});

const ChangeProfilePicBtn = styled(IconButton)({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
});

const ProfileDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  const id = user.id;
  const [updateMe] = useUpdateMeMutation();
  const [role, setRole] = useState(user.role.roleName || "");
  const [department, setDepartment] = useState(user.department?.name || "");
  const [requestOtp] = useRequestOtpMutation();

  console.log(user);
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber || "",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    // Change password logic here
    console.log("Change password");
    sessionStorage.setItem("email", userData.email);
    const res = await requestOtp(userData.email).unwrap();
    console.log("the password change", res);
    navigate("/verify-otp");
  };

  const handleSave = async () => {
    // Save user data logic here
    setIsEditing(false);
    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("phoneNumber", userData.phoneNumber);
    try {
      const res = await updateMe(userData).unwrap();
      console.log("the update", res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            color="primary"
            onClick={handleEditToggle}
            sx={{ marginRight: 2 }}
          >
            {/* {isEditing ? <SaveIcon /> : <EditIcon />} */}
            {!isEditing && <EditIcon />}
          </IconButton>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<LockIcon />}
            sx={{ mt: 1 }}
            onClick={() => handleChangePassword()}
          >
            Change Password
          </Button>
        </Box>
        <AvatarWrapper>
          <Avatar
            className="avatar"
            src={userData.profilePicture}
            alt={`${userData.fullName}`}
            sx={{ width: 100, height: 100 }}
          />
          <Tooltip title="Change Profile Picture">
            <ChangeProfilePicBtn color="primary">
              <PhotoCameraIcon />
            </ChangeProfilePicBtn>
          </Tooltip>
        </AvatarWrapper>
        <Box alignItems="right">
          {!isEditing && (
            <Typography variant="h5" sx={{ mt: 2 }}>
              Full Name: {userData.fullName}
            </Typography>
          )}
          {isEditing && (
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={userData.fullName}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          )}

          {!isEditing && (
            <Typography variant="h5" sx={{ mt: 2 }}>
              Email: {userData.email}
            </Typography>
          )}
          {isEditing && (
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={userData.email}
              onChange={handleChange}
            />
          )}
          {!isEditing && (
            <Typography variant="h5" sx={{ mt: 2 }}>
              Phone Number: {userData.phoneNumber || "---"}
            </Typography>
          )}
          {isEditing && (
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          )}

          <Typography variant="h5" sx={{ mt: 2 }}>
            Role: {role}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            Department: {department || "---"}
          </Typography>
        </Box>
        {isEditing && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<SaveIcon />}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfileDetails;
