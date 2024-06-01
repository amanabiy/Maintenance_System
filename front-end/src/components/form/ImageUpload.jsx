import React from "react";
import { Box, Typography, Button } from "@mui/material";
// import Image from 'next/image'; // If you're using Next.js, otherwise use an img tag or another method to display the image

const ImageUpload = ({ base64Image, handleFileChange, errors, touched }) => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="body2" color="textSecondary" align="left">
        Startup Logo <span style={{ color: "red" }}>*</span>
      </Typography>
      {!base64Image ? (
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
              Drop your image here, or
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
            />
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
            Supports: PNG, JPG, JPEG, WEBP
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "128px", // equivalent to h-32
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <img
            src={base64Image}
            width={80}
            height={30}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <label
            htmlFor="fileInput"
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              padding: "2px 8px",
              backgroundColor: "#3f51b5",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </label>
          <input
            type="file"
            name="startupLogo"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </Box>
      )}
      {errors.ImageLogo && touched.ImageLogo && (
        <Typography variant="body2" color="error">
          {errors.ImageLogo}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
