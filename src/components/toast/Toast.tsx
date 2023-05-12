import React from "react";
import { Snackbar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeToast } from '../../redux/actions/toast/toastActions';
import Slide from '@material-ui/core/Slide';
import { CustomToast } from '../customs/CustomToast';

export default function Toast() {
  const Toast = useSelector(state => state.toast);
  const { toastOpened, toastContent, msgType } = Toast;
  const dispatch = useDispatch();


  return (
    <>
      {toastOpened ? (

        <CustomToast toastContent={toastContent} msgType={msgType && msgType} />

      ) : null}
    </>
  );
}
