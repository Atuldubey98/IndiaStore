import { Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import React from "react";
const SnackBarHandler = ({ open, handleClose, message }) => {
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <SnackbarContent style={{ backgroundColor: "red" }} message={message} />
    </Snackbar>
  );
};
export default SnackBarHandler;
