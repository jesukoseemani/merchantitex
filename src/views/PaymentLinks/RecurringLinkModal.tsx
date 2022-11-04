import { Backdrop, Button, Modal, IconButton, OutlinedInput, Select, SelectChangeEvent, Box, Chip, MenuItem } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { ArrowDropUp } from "@material-ui/icons";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface RecurringLinkModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const currencies = ['NGN', 'USD', 'EUR'];

function getStyles(currency: string, selectedCurrency: readonly string[]) {
  return {
    fontWeight: selectedCurrency.indexOf(currency) === -1 ? '600' : '400'
  };
}

const useStyles = makeStyles({
  root: {
    border: '1px solid #D5DAE1',
    boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
    borderRadius: '3px',
    backgroundColor: 'white',
    maxWidth: '400px',
    maxHeight: '500px',
    overflowY: 'scroll',
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: `'Roboto', sans-serif`,
    padding: '1rem 0 2rem',
    '& > div:nth-child(1)': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0rem 2rem',
      '& .MuiIconButton-root': {
        padding: '6px',
        marginBottom: '3px'
      },
      '& p': {
        color: '#828282',
        fontSize: '1.125rem',
        fontWeight: '400'
      }
    },
    '& hr': {
      background: '#E0E0E0'
    },
    '& > div:nth-child(3)': {
      display: 'grid',
      gridGap: '1rem',
      padding: '1rem 2rem',
    },
    '& > div:nth-child(4)': {
      padding: '0rem 2rem',
      marginTop: '1.5rem'
    }
  },
  formBox: {
    display: 'grid',
    '& label': {
      color: '#333',
      fontWeight: '400',
      fontSize: '.875rem'
    },
    '& input, & textarea, & .MuiSelect-select': {
      background: 'white',
      borderRadius: '4px',
      marginTop: '.2rem',
      padding: '.75rem',
      fontSize: '.875rem',
      resize: 'none',
      '&::placeholder': {
        color: '#B9B9B9'
      }
    },
    '& textarea': {
      padding: '0rem'
    },
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: '0',
    }
  },
  formBtn: {
    color: 'white',
    fontWeight: 700,
    fontSize: '1rem',
    backgroundColor: '#27AE60',
    padding: '.5rem',
    borderRadius: '.25rem',
    textTransform: 'none',
    '&:hover': {
      opacity: '.75',
      backgroundColor: '#27AE60'
    },
    '&:disabled': {
      opacity: '.75'
    }
  },
  suffix: {
    display: 'grid',
    placeItems: 'center',
    height: '92%',
    marginTop: '3px',
    fontSize: '.875rem',
    borderRight: '1px solid #ddd',
    '& p': {
      marginTop: '-1px',
      marginRight: '12px',
      whiteSpace: 'nowrap'
    }
  },
  addBtn: {
    color: '#27ae60',
    cursor: 'pointer',
    '&:hover': {
      opacity: '.75'
    }
  },
  removeBtn: {
    color: '#4f4f4f',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      opacity: '.75'
    }
  },
  addView: {
    display: 'grid',
    gridGap: '1rem'
  }
})

const RecurringLinkModal = ({ isOpen, handleClose }: RecurringLinkModalProps) => {
  const classes = useStyles();

  const [linkName, setLinkName] = useState<string>('');
  const [amt, setAmt] = useState<number | undefined>(undefined);
  const [desc, setDesc] = useState<string>('');
  const [userInterval, setUserInterval] = useState<string>('');
  const [numCharge, setNumCharge] = useState<number | undefined>(undefined);
  const [customLink, setCustomLink] = useState<string>('');
  const [redirect, setRedirect] = useState<string>('');
  const [fieldName, setFieldName] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const handleCurrencyChange = (event: SelectChangeEvent<typeof selectedCurrency>) => {
    const { target: { value } } = event;
    setSelectedCurrency(typeof value === 'string' ? value.split(',') : value);
  };

  const closeModal = () => {
    setLinkName('');
    setAmt(undefined);
    setNumCharge(undefined);
    setDesc('');
    setUserInterval('');
    setCustomLink('');
    setRedirect('');
    setIsAddOpen(false);
    setSelectedCurrency([]);
    handleClose();
  }

  return (
    <Modal
      open={isOpen} onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.root}>
        <div>
          <p>Create a subscription link</p>
          <IconButton aria-label='close payment link modal' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <hr />
        <div>
          <div className={classes.formBox}>
            <label htmlFor='linkName'>Link name</label>
            <OutlinedInput placeholder='Food Bank' value={linkName} onChange={(e) => setLinkName(e.target.value)} />
          </div>
          <div className={classes.formBox}>
            <label htmlFor='amount'>Amount</label>
            <OutlinedInput 
              placeholder='0.00' value={amt} type='number'
              onChange={(e) => setAmt(Number(e.target.value))}
              startAdornment={
                <div className={classes.suffix}>
                  <p>NGN</p>
                </div>
              }
            />
          </div>
          <div className={classes.formBox}>
            <label htmlFor='amount'>Description</label>
            <OutlinedInput 
              placeholder='email@email.com' rows={3} multiline
              value={desc} onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={classes.formBox}>
            <label htmlFor='userInterval'>Interval</label>
            <Select
              labelId="user-interval-label"
              id="userInterval"
              value={userInterval}
              onChange={e => setUserInterval(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            >
              <MenuItem value={'10'}>Ten</MenuItem>
              <MenuItem value={'20'}>Twenty</MenuItem>
              <MenuItem value={'30'}>Thirty</MenuItem>
            </Select>
            {/* <OutlinedInput placeholder='Select Interval' value={userInterval} onChange={(e) => setUserInterval(e.target.value)} /> */}
          </div>
          <div className={classes.formBox}>
            <label htmlFor='numCharge'>Number of times to charge a subscriber</label>
            <OutlinedInput placeholder='10' value={numCharge} onChange={(e) => setNumCharge(Number(e.target.value))} />
          </div>
          <div>
            {
              isAddOpen ? (
                <div className={classes.removeBtn} onClick={() => setIsAddOpen(false)}>
                  Additional details <ArrowDropUp />
                </div>
              ) : (
                <div className={classes.addBtn} onClick={() => setIsAddOpen(true)}>
                  + Add additional details
                </div>
              )
            }
          </div>
          {
            isAddOpen ? (
              <div className={classes.addView}>
                <div className={classes.formBox}>
                  <label htmlFor='customLink'>Custom Link</label>
                  <OutlinedInput 
                    placeholder='Your link' value={customLink} 
                    onChange={(e) => setCustomLink(e.target.value)}
                    startAdornment={
                      <div className={classes.suffix}>
                        <p>itexpay.com/</p>
                      </div>
                    }
                  />
                </div>
                <div className={classes.formBox}>
                  <label htmlFor='currency'>Only accept these currencies</label>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {currencies.map((currency) => (
                      <MenuItem
                        key={currency}
                        value={currency}
                        style={getStyles(currency, selectedCurrency)}
                      >
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.formBox}>
                  <label htmlFor='redirect'>Redirect after payment</label>
                  <OutlinedInput 
                    placeholder='https://itexpay.com' value={redirect} 
                    onChange={(e) => setRedirect(e.target.value)}
                  />
                </div>
                <div className={classes.formBox}>
                  <label htmlFor='fieldName'>Collect extra information</label>
                  <OutlinedInput 
                    placeholder='Enter field name' value={fieldName} 
                    onChange={(e) => setFieldName(e.target.value)}
                    startAdornment={
                      <div className={classes.suffix}>
                        <p>Field name</p>
                      </div>
                    }
                  />
                </div>
              </div>
            ) : null
          }
        </div>
        <div>
          <Button 
            fullWidth className={classes.formBtn}
          >
            Create link
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default RecurringLinkModal