import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBarContainer = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  autoFocus,
  onFocus,
  maxLength,
  clearable,
  debounceTime,
  searchIcon,
  submitIcon,
  ariaLabel,
  ariaDescribedBy,
  size,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) {
      onChange("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onSubmit) {
      onSubmit(inputValue);
    }
  };

  const searchBarStyle = {
    backgroundColor: "#E6e9ec",
    height: "40px",
    borderRadius: "10px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div>
      <TextField
        fullWidth
        size={size}
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        onFocus={onFocus}
        inputProps={{ maxLength: maxLength }}
        InputProps={{
          style: searchBarStyle,
          endAdornment:
            clearable && inputValue ? (
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            ) : submitIcon ? (
              <IconButton onClick={() => onSubmit(inputValue)}>
                {submitIcon}
              </IconButton>
            ) : (
              <></>
            ),
          startAdornment: searchIcon ? (
            <IconButton>{searchIcon}</IconButton>
          ) : (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
          "aria-label": ariaLabel,
          "aria-describedby": ariaDescribedBy,
        }}
      />
    </div>
  );
};

export default SearchBarContainer;
