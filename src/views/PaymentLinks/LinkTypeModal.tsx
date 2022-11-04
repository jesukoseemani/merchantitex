import { Backdrop, Button, FormControlLabel, FormControlLabelProps, Modal, useRadioGroup, RadioGroup, Radio, Box } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

interface LinkTypeModalProps {
  isOpen: boolean;
  handleClose: () => void;
  openSingleLinkModal: () => void;
  openRecurringLinkModal: () => void;
  openDonationLinkModal: () => void;
}

const CustomFormControlLabel = (props: FormControlLabelProps) => {
  let checked = false;

  const radioGroup = useRadioGroup();

  if(radioGroup) {
    checked = radioGroup.value === props.value;
  }

  const useLabelStyles = makeStyles({
    root: {
      border: checked ? '1px solid #27ae60' : '1px solid #e0e0e0',
      padding: '1.5rem 2rem',
      borderRadius: '.25rem',
      '& .MuiFormControlLabel-root': {
        alignItems: 'flex-start',
        gap: '2rem',
        width: '100%',

        '& > span:first-of-type': {
          padding: '0rem'
        }
      }
    }
  })  

  const classes = useLabelStyles();

  return (
    <div className={classes.root}>
      <FormControlLabel {...props} />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    border: '1px solid #D5DAE1',
    boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
    borderRadius: '3px',
    backgroundColor: 'white',
    maxWidth: '400px',
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: `'Roboto', sans-serif`,
    padding: '3rem 2rem',
    '& > h3': {
      fontSize: '1.5rem',
      color: '#4F4F4F',
      fontWeight: '300',
      marginBottom: '1.5rem',
    },
    '& p:first-of-type': {
      color: '#414141',
      fontSize: '1rem',
      fontWeight: '500'
    },
    '& p:last-of-type': {
      color: '#8B8B8B',
      fontSize: '.875rem',
      fontWeight: '400',
      marginTop: '.2rem'
    },
    '& .MuiRadio-root.Mui-checked': {
      '& span': {
        color: '#27ae60 !important'
      }
    },
    '& .MuiButton-root': {
      borderRadius: '4px',
      backgroundColor: '#27ae60',
      color: 'white',
      fontWeight: '700',
      fontSize: '1rem',
      marginTop: '2rem',
      textTransform: 'none',
      padding: '.75rem 1.5rem'
    }
  }
})

const LinkTypeModal = ({ isOpen, handleClose, openDonationLinkModal, openRecurringLinkModal, openSingleLinkModal }: LinkTypeModalProps) => {
  const [radioValue, setRadioValue] = useState<string>('single');

  const classes = useStyles();

  const selectLinkType = (val: string) => {
    if(val === 'single') {
      openSingleLinkModal()
    } else if(val === 'recurring') {
      openRecurringLinkModal()
    } else if(val === 'donation') {
      openDonationLinkModal()
    } else {
      return;
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
      <div className={classes.root}>
        <h3>Payment link type</h3>
        <RadioGroup name="payment-link-types" value={radioValue} onChange={e => setRadioValue(e.target.value)}>
          <Box sx={{ display: 'grid', gridTemplateRows: '3 1fr', gridGap: '1rem'}}>
            <CustomFormControlLabel 
              value="single" control={<Radio />}
              label={(
                <>
                  <p>Single Charge</p>
                  <p>Enter your details to create an account</p>
                </>
              )}
            />
            <CustomFormControlLabel 
              value="recurring" control={<Radio />}
              label={(
                <>
                  <p>Recurring Charge</p>
                  <p>Enter your details to create an account</p>
                </>
              )}
            />
            <CustomFormControlLabel 
              value="donation" control={<Radio />}
              label={(
                <>
                  <p>Donation Link</p>
                  <p>Enter your details to create an account</p>
                </>
              )}
            />
          </Box>
          <Button onClick={() => selectLinkType(radioValue)} disabled={!radioValue}>
            Continue
          </Button>
        </RadioGroup>
      </div>
    </Modal>
  )
}

export default LinkTypeModal