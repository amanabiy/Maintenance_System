import React from "react";
import TextField from "@material-ui/core/TextField";

const ReusableTextInput = ({
  value,
  onChange,
  label,
  placeholder,
  multiline,
  disabled,
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      margin="normal"
      multiline={multiline}
      disabled={disabled}
    />
  );
};

export default ReusableTextInput;
