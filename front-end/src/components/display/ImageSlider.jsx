import { useState } from "react";
import { Card, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CircleIcon from "@mui/icons-material/Circle";

import "./style.scss";

const ImageSlider = ({ images }) => {
  console.log(images, "images");
  const [imageIndex, setImageIndex] = useState(0);
  const IMAGES = images;

  const showNextImage = () => {
    setImageIndex((imageIndex + 1) % IMAGES.length);
  };
  const showPreviousImage = () => {
    setImageIndex((imageIndex - 1 + IMAGES.length) % IMAGES.length);
  };
  return (
    <div style={{ width: "100%", height: "100%" }} className="img-slider">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {IMAGES.map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              alt=""
              className="img-slider-img"
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          );
        })}
      </div>
      {/* <img src={images[imageIndex]} alt="" className="img-slider-img" /> */}
      <button
        onClick={() => showPreviousImage()}
        className="img-slider-btn"
        style={{ left: 0 }}
      >
        <ArrowBackIcon />
      </button>
      <button
        onClick={() => showNextImage()}
        className="img-slider-btn"
        style={{ right: 0 }}
      >
        <ArrowForwardIcon />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {IMAGES.map((_, index) => {
          return (
            <button
              onClick={() => setImageIndex(index)}
              key={index}
              className="img-slider-dot-btn"
            >
              {index === imageIndex ? (
                <RadioButtonCheckedIcon />
              ) : (
                <CircleIcon />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
