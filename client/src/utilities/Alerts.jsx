import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertContext from "../context/alertContext/AlertContext";


export default function Alerts() {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <>
      {alerts !== null && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={alerts !== null ? true : false}
          autoHideDuration={6000}
          onClose={() => alertContext.removeAlert()}
        >
          <Alert
            variant="filled"
            onClose={() => alertContext.removeAlert()}
            severity={`${alerts.type}`}
          >
            {alerts.msg}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}