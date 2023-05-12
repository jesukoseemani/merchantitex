import { Backdrop, Fade, IconButton, Modal, Box, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useDispatch } from "react-redux";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import axios from "axios";

const useModalStyles = makeStyles({
  root: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
    borderRadius: '20px',
    paddingBottom: '30px',
    '& > div:nth-child(1)': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 50px',
      fontSize: '18px',
      fontFamily: 'Avenir',
      fontStyle: "normal",
      fontWeight: '900',
      lineHeight: "25px",
      color: "#000",
      '& .MuiIconButton-root': {
        padding: '6px'
      },
    },
    '& hr': {
      background: '#E0E0E0'
    },
    '& > div:nth-child(3)': {
      padding: '1.5rem 50px',
    },
    '& > div:nth-child(5)': {
      borderBottom: '1px solid #E0E0E0',
      margin: '1.5rem 50px'
    },
    '& > div:nth-child(6)': {
      padding: '10px 50px',
      // margin: '1.5rem 50px'
    }
  },
  fileBox: {
    border: '1px solid #DDD',
    borderRadius: '10px',
    width: '100%',
    height: '250px',
    padding: "0px 50px",
    marginTop: "29px",
    marginBottom: "3px",
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      height: '100%',
      '& p:first-of-type': {
        color: '#4F4F4F',
        fontSize: '.875rem',
        fontWeight: '400',
        cursor: 'pointer',
        padding: '.5rem 1rem',
        background: '#F9FBFF',
        border: '0.916667px dashed #BDBDBD',
        // border: "1px solid red",
        borderRadius: '3.66667px',
        fontFamily: 'Avenir',
        fontStyle: "normal",
        lineHeight: "18px",
        marginBottom: "6.36px"
      },
      '& p:last-of-type': {
        color: '#828282',
        fontWeight: '400',
        fontFamily: 'Avenir',
        fontStyle: "normal",
        lineHeight: "14px",
        fontSize: '10px',
      },

      '& svg': {
        height: "25px",
        width: "28px",
        marginBottom: "14.3px",

        "& path": {
          stroke: "#4F4F4F"
        }
      }
    }
  },
  formBtn: {
    color: 'white',
    fontWeight: 900,
    lineHeight: "22px",
    fontSize: '1rem',
    backgroundColor: '#27AE60',
    height: '44px',
    borderRadius: '20px',
    width: "100%",
    textTransform: 'none',
    cursor: "pointer",
    fontFamily: 'Avenir',
    fontStyle: "normal",
    marginTop: "19px",
    '&:hover': {
      opacity: '.75',
      backgroundColor: '#27AE60'
    },
    '&:disabled': {
      opacity: '.75'
    }
  },
  fileFlex: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: "center",
    cursor: 'pointer',
    '& p': {
      color: '#4F4F4F',
      fontWeight: '400',
      fontFamily: 'Avenir',
      fontStyle: "normal",
      lineHeight: "16px",
      fontSize: '12px',
    },
    '& svg': {
      fontSize: '1.25rem',
      color: '#27ae60'
    }
  },
  errText: {
    color: 'red',
    marginTop: '.25rem',
    fontSize: '.75rem',
    textAlign: 'center'
  },
  fileText: {
    fontSize: '.875rem !important'
  }
});

interface BulkRefundModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setRefundLogged: Dispatch<SetStateAction<boolean>>;
}


const BulkRefundModal = ({ isOpen, handleClose, setRefundLogged }: BulkRefundModalProps) => {
  const classes = useModalStyles();
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | undefined>();
  const [fileErr, setFileErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) {
      console.log(acceptedFiles[0]);

      setFile(acceptedFiles[0]);
      setFileErr('');
    } else {
      setFileErr(fileRejections[0].errors[0].message);
      console.log(fileRejections);
    }
  }, []);

  const postRefund = async () => {
    dispatch(openLoader());
    setLoading(true);
    const formData = new FormData();
    formData.append("selectedFile", file as Blob);
    try {
      const res = await axios({
        method: 'POST',
        url: '/transaction/refund/upload',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      console.log(res.data);
      dispatch(
        openToastAndSetContent({
          toastContent: "Refund logged",
          msgType: "success"
        })
      );
      handleClose();
      dispatch(closeLoader());
      setRefundLogged(prev => !prev)
      setLoading(false);
      setFile(undefined);
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      setLoading(false);
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to log refund",
          msgType: "error"
        })
      );
    }
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'text/csv'
  })

  return (
    <Modal
      open={isOpen} onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={classes.root}>
          <div>
            <p>Log a refund</p>
            <IconButton aria-label='close bulk refund modal' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
          <div>
            <div {...getRootProps()} className={classes.fileBox}>
              <input {...getInputProps()} />
              <div>
                {
                  file ? (
                    <p className={classes.fileText}>{file.name}</p>
                  ) : (
                    <>
                      <CloudUploadOutlinedIcon />
                      <p>Choose file to upload</p>
                      <p>Upload the refund CSV file to begin</p>
                    </>
                  )
                }
              </div>
              {
                fileErr ? <p className={classes.errText}>{fileErr}</p> : null
              }
            </div>
          </div>
          <div className={classes.fileFlex}>
            <CloudUploadOutlinedIcon />
            <p>Download sample CSV file for bulk refund</p>
          </div>
          <div>
          </div>
          <div>
            <Button
              fullWidth className={classes.formBtn}
              disabled={!file || loading}
              onClick={postRefund}
            >
              Continue
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default BulkRefundModal