import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/joy/CircularProgress';
import "./ConfirmationDialog.css"

 function ConfirmationDialog(props) {

  


  return (
    <div className="confirmation-container">
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          {props.loading ? <CircularProgress variant="solid" thickness={2} size="sm" /> : <Button onClick={props.yesHandler} autoFocus>
            Yes
          </Button> }
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ConfirmationDialog;