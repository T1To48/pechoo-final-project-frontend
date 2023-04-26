import React from "react";
import { Grid,TextField } from "@mui/material";
const InputField = ({name,type,label,value,onChange}) => {

  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        type={type}
        label={label}
        fullWidth
        value={value}
        onChange={onChange}
        required
      />
    </Grid>
  );
};

export default InputField;
