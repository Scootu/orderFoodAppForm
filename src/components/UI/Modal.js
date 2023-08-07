import classes from "./Modal.module.css";
import React from "react";
import { Fragment } from "react";
import { createPortal } from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
 
const portaleElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose}/>, portaleElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portaleElement
      )}
    </Fragment>
  );
};

export default Modal;
