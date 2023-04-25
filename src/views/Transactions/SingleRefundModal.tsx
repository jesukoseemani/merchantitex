import { Backdrop, Box, Fade, IconButton, Modal, OutlinedInput, MenuItem, Select } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { initiateRefund } from '../../services/refund';
import Button from '../../components/forms/Button';
interface SingleRefundModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setRefundLogged: Dispatch<SetStateAction<boolean>>;
}

const SingleRefundModal = ({ isOpen, handleClose, setRefundLogged }: SingleRefundModalProps) => {
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
      paddingBottom: "20px",
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
        display: 'grid',
        gridGap: '1rem',
        padding: '0rem 50px',
      },
      '& > div:nth-child(4)': {
        padding: '0rem 50px',
        marginTop: '1.5rem'
      }
    },
    form: {

      marginTop: "20px",
    },
    formBox: {
      display: 'grid',
      '& label': {
        color: '#333',
        fontWeight: '400',
        fontSize: '.875rem',
        fontFamily: 'Avenir',
        fontStyle: "normal",
        lineHeight: "19px",
      },
      '& input, & textarea': {
        background: 'white',
        // border: '1px solid #ddd',
        borderRadius: '4px',
        fontFamily: 'Avenir',

        marginTop: '.2rem',
        // padding: '.75rem',
        height: "11px",
        fontSize: '.875rem',
        resize: 'none',
        '&::placeholder': {
          color: '#B9B9B9'
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
    select: {}
  });

  const classes = useModalStyles();
  const dispatch = useDispatch();

  const [amt, setAmt] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [ref, setRef] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // const postRefund = async () => {
  //   dispatch(openLoader());
  //   setLoading(true);
  //   try {
  //     const res = await axios({
  //       method: 'POST',
  //       url: '/transaction/refund',
  //       data: {
  //         transaction: {
  //           merchantreference: ref
  //           // merchantreference: "tx-YvD4Yr2mebQdn2pvsClRJGFiJ"
  //         },
  //         order: {
  //           amount: `${amt}`,
  //           description: desc,
  //           currency: "NGN"
  //         }
  //       }
  //     })
  //     dispatch(
  //       openToastAndSetContent({
  //         toastContent: "Refund logged",
  //         toastStyles: {
  //           backgroundColor: "green",
  //         },
  //       })
  //     );
  //     handleClose();
  //     dispatch(closeLoader());
  //     setRefundLogged(prev => !prev)
  //     setLoading(false);
  //     setAmt(undefined);
  //     setRef('');
  //     setDesc('');
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(closeLoader());
  //     setLoading(false);
  //     dispatch(
  //       openToastAndSetContent({
  //         toastContent: "Failed to log refund",
  //         toastStyles: {
  //           backgroundColor: "red"
  //         },
  //       })
  //     );
  //   }
  // }

  const postRefund = async () => {
    setLoading(true);

    try {
      await initiateRefund('TEST_IBK_025493581680005613942', {
        amount: Number(amt || 0),
        refundtype: type,
        reason: desc,
        otp: '1234'
      })

    } catch (error: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message || "Failed to log a refund",
          toastStyles: {
            backgroundColor: "red"
          },
        })
      );
    } finally {
      setLoading(false);
    }
  }

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
            <IconButton aria-label='close single refund modal' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
          <div className={classes.form}>
            <div className={classes.formBox}>
              <label htmlFor='amount'>Amount</label>
              <OutlinedInput
                placeholder='100.00' value={amt} type='number'
                onChange={(e) => setAmt(e.target.value)}
              />
            </div>
            <div className={classes.formBox}>
              <label htmlFor='id'>Payment Id</label>
              <OutlinedInput
                placeholder='TEST_IBK_025493323680005613942' value={id}
                name="id"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className={classes.formBox}>
              <label htmlFor='id'>Refund Type</label>
              <Select
                fullWidth
                className={classes.select}
                value={type}
                name='refunType'
                id='refunType'
                onChange={e => setType(e.target.value)}>
                <MenuItem value='' disabled selected hidden>
                  Choose status
                </MenuItem>
                <MenuItem value='partial'>PARTIAL</MenuItem>
                <MenuItem value='full'>FULL</MenuItem>
              </Select>
            </div>
            <div className={classes.formBox}>
              <label htmlFor='reason'>Reason for refund</label>
              <OutlinedInput placeholder='reason' multiline rows={10} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <div>
            <Button
              fullWidth className={classes.formBtn}
              disabled={!amt || !desc || !id || !type || loading}
              onClick={postRefund}
              loading={loading}
              text="Continue"
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default SingleRefundModal