import { Button } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@mui/material/styles";

interface EmptyViewProps {
  openLinkModal: () => void
}

const EmptyView = ({ openLinkModal }: EmptyViewProps) => {
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      fontFamily: `'Roboto', sans-serif`,
      padding: '3rem 6rem',
      [theme.breakpoints.down('md')]: {
        padding: '2rem'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '2rem 1rem'
      },
      '& > p:nth-child(1)': {
        fontSize: '1.875rem',
        fontWeight: '300',
        color: '#333'
      },
      '& > p:nth-child(2)': {
        fontSize: '1rem',
        fontWeight: '400',
        color: '#828282',
        marginTop: '1rem'
      },
      '& .MuiButton-root': {
        borderRadius: '6px',
        backgroundColor: '#27ae60',
        color: 'white',
        fontWeight: '500',
        fontSize: '1rem',
        marginTop: '1.5rem',
        textTransform: 'none',
        padding: '.75rem 1.5rem'
      }
    }
  })

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>You have not created any payment links</p>
      <p>
        Payment links is an easy way to collect payments from your customers either as a freelancer or a content creator.
      </p>
      <Button onClick={openLinkModal}>
        Create a payment link
      </Button>
    </div>
  )
}

export default EmptyView