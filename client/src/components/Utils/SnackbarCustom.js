import React, {useEffect, useState} from 'react'
import { Alert, Snackbar } from "@mui/material";





const SnackbarCustom = (props) => {

    const [timeToClose, setTimeToClose] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');


    // const openToast = () => {
    //     setOpen(true);
    //   };
    
      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setTimeToClose(true);
      };

    //   useEffect(() => {
    //     setTimeout(() => {
    //         handleClose()
    //         console.log("Should Have been Closed")
    //     }, 3000)
    //   }, [])


  return (
    <Snackbar onClick={props.onClick} open={props.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.type} sx={{fontSize: '1.1rem', fontWeight: 'bold' , width: "100%" }}>
          {props.errorMessage}
        </Alert>
      </Snackbar>
  )
}

export default SnackbarCustom