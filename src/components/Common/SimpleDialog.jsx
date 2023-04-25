import * as React from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleDialog({
  isDialogOpen,
  closeDialog,
  dialogTitle,
  dialogText,
  confirmFunction,
}) {

  const {addressName}=useSelector(state=>state.bing)
  return (
    <div>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{`${dialogTitle}`}</DialogTitle>
        <DialogContent>
          <Typography variant="div" id="alert-dialog-slide-description">
            {dialogText}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          {addressName&&<Button
            onClick={() => {
              confirmFunction();
              
              // closeDialog();
            }}
          >
            Confirm
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
