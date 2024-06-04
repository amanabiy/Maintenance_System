// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// // import Image from 'next/image'; // If you're using Next.js, otherwise use an img tag or another method to display the image

// const ImageUpload = ({ base64Image, handleFileChange, errors, touched }) => {
//   return (
//     <Box sx={{ width: "100%", mt: 2 }}>
//       <Typography variant="body2" color="textSecondary" align="left">
//         Images <span style={{ color: "red" }}>*</span>
//       </Typography>
//       {!base64Image ? (
//         <Box
//           sx={{
//             py: 4,
//             my: 3,
//             width: "100%",
//             border: "1px dashed",
//             borderColor: "grey.400",
//             borderRadius: 1,
//             height: "128px", // equivalent to h-32
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img src="/images/upload.png" width={80} height={30} alt="logo" />
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               mt: 1,
//             }}
//           >
//             <span>
//               Drop your image here, or
//               <label
//                 htmlFor="fileInput"
//                 style={{
//                   color: "blue",
//                   cursor: "pointer",
//                   marginLeft: "0.5rem",
//                 }}
//               >
//                 browse
//               </label>
//             </span>
//             <input
//               type="file"
//               name="startupLogo"
//               id="fileInput"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//               accept="image/*"
//             />
//           </Typography>
//           <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
//             Supports: PNG, JPG, JPEG, WEBP
//           </Typography>
//         </Box>
//       ) : (
//         <Box
//           sx={{
//             position: "relative",
//             width: "100%",
//             height: "128px", // equivalent to h-32
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 1,
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={base64Image}
//             width={80}
//             height={30}
//             alt="logo"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <label
//             htmlFor="fileInput"
//             style={{
//               position: "absolute",
//               top: "8px",
//               right: "8px",
//               padding: "2px 8px",
//               backgroundColor: "#3f51b5",
//               color: "#fff",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Edit
//           </label>
//           <input
//             type="file"
//             name="startupLogo"
//             id="fileInput"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//         </Box>
//       )}
//       {errors.ImageLogo && touched.ImageLogo && (
//         <Typography variant="body2" color="error">
//           {errors.ImageLogo}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default ImageUpload;

import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUpload = ({
  images,
  handleFileChange,
  handleRemoveImage,
  errors,
  touched,
}) => {
  // const [images, setImages] = useState(base64Images || []);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    const readerPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });

    Promise.all(readerPromises)
      .then((newImages) => {
        setImages([...images, ...newImages]);
        handleFileChange([...images, ...newImages]); // Notify parent component of the change
      })
      .catch((error) => console.error("Error reading files:", error));
  };

  // const handleRemoveImage = (index) => {
  //   const updatedImages = images.filter((_, i) => i !== index);
  //   setImages(updatedImages);
  //   handleFileChange(updatedImages); // Notify parent component of the change
  // };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="body2" color="textSecondary" align="left">
        Images <span style={{ color: "red" }}>*</span>
      </Typography>
      <Box
        sx={{
          py: 4,
          my: 3,
          width: "100%",
          border: "1px dashed",
          borderColor: "grey.400",
          borderRadius: 1,
          height: "128px", // equivalent to h-32
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/images/upload.png" width={80} height={30} alt="logo" />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
          }}
        >
          <span>
            Drop your images here, or
            <label
              htmlFor="fileInput"
              style={{
                color: "blue",
                cursor: "pointer",
                marginLeft: "0.5rem",
              }}
            >
              browse
            </label>
          </span>
          <input
            type="file"
            name="startupLogo"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
          Supports: PNG, JPG, JPEG, WEBP
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: "128px",
              height: "128px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 1,
              overflow: "hidden",
              border: "1px solid grey.400",
            }}
          >
            <img
              src={image}
              alt={`upload-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              onClick={() => handleRemoveImage(index)}
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#ff1744",
                color: "#fff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                padding: "4px",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
      {errors.ImageLogo && touched.ImageLogo && (
        <Typography variant="body2" color="error">
          {errors.ImageLogo}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
