// CustomTextField.js

import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment"; 
import SearchIcon from "@mui/icons-material/Search"; 

const CustomTextField = (props) => {
  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomTextField;
