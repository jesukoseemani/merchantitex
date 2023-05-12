import styles from './RefundItem.module.scss';
import NavBar from "../../components/navbar/NavBar";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { GetTransactionsRes, TransactionItem } from "../../types/CustomerTypes";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import CustomStatus from '../../components/customs/CustomStatus';
import { ReactComponent as Mark } from "../../assets/images/checkDefault.svg"
import { ReactComponent as Visa } from "../../assets/images/visa.svg"
import { ReactComponent as Mastercard } from "../../assets/images/mastercard.svg"
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { ReactComponent as Filecon } from "../../assets/images/file.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton, Avatar, Box, Stepper, Step, StepLabel } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { ReactComponent as CheckColorIcon } from "../../assets/images/circle-check-color.svg";
import TransBreakDown from './TransBreakDown';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import { ReactComponent as LinkIcon } from "../../assets/images/ext-link.svg";
import Addtoblacklist from '../Customers/Addtoblacklist';
import Navigation from '../../components/navbar/Navigation';


const RefundItem = () => {
  const [refund, setRefund] = useState<TransactionItem | null>(null);

  const { id } = useParams<{ id: string }>();
  const history = useHistory()

  const dispatch = useDispatch();

  const getTransaction = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>(`/v1/refund/${id}`);
      console.log(res?.data);
      const { transactions } = res?.data;
      if (transactions.length) {
        setRefund(transactions[0]);

      }
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get transaction",
          msgType: "error"
        })
      );
    }
  }



  useEffect(() => {
    getTransaction();
  }, [id])

  const handleBreakDown = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: "448px",
          minHeight: "638px",
          borderRadius: '20px',
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
        },
        modalTitle: "Transaction Event",
        modalContent: (
          <div className='modalDiv'>

            <TransBreakDown />
          </div>
        ),
      })
    );

  }

  const handleBLacklist = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: "653px",
          height: "500px !important",
          borderRadius: '20px',
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"

        },
        modalTitle: "Blacklist customer",
        modalContent: (
          <div className='modalDiv'>
            <Addtoblacklist id={id} />
          </div>
        ),
      })
    );
  }
  return (

    <Navigation title='Refund'>

      <div className={styles.container}>
        {/* <NavBar name="Customers"/> */}
        <div className={styles.header}>
          <span onClick={() => history.push('/transactions/refund')} style={{
            display: "flex",
            alignItems: "center"
          }}>
            <ArrowLeftIcon />
            Back to refund
          </span>
        </div>

        <div className={styles.sectionOne}>
          <div className={styles.section_header}>
            <div>
              <div className="amount"><h2>NGN 45,000.52</h2></div>
              <CustomStatus text='Successful' type={"successful"} />
              <p>Refunded <Mark /></p>
            </div>
            <div>
              <button>Resend Receipt</button>
            </div>
          </div>

          <div className={styles.refundDetails}>
            <div>
              <div>
                <span>Date / Time</span>
                <h2>Aug 13 2020 2:21 PM</h2>
              </div>
            </div>
            <div>
              <div>
                <span>Customer email</span>
                <h2>thejames@email.com</h2>
              </div>
            </div>
            <div>
              <div>
                <span>Card type</span>
                <h2><Visa /></h2>
              </div>
            </div>
            <div>
              <div>
                <span>Card number</span>
                <h2>**** **** **** 12384</h2>
              </div>
            </div>

          </div>




        </div>
        <div className={styles.payment_info}>
          <div className={styles.payment_header}>
            <h2>Payment information</h2>
          </div>

          <div className={styles.payment_details}>
            <div>
              <span>Payment reference</span>
              <div className={styles.copy__details}>
                <h2>ITEX-ab95cf961f454669a4</h2>
                <CopyToClipboard text={"ab95cf961f454669a4"}>
                  <IconButton>
                    <CopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </div>
            </div>
            <div>
              <span>Amount Due</span>
              <h2>NGN 7,748.12</h2>
            </div>
            <div>
              <span>Transaction Fee</span>
              <h2>NGN 7,748.12</h2>
            </div>
            <div>
              <span>Country/Region</span>
              <h2>Lagos, Nigeria</h2>
            </div>
            <div>
              <span>Bank name</span>
              <h2>Access Bank</h2>
            </div>
            <div>
              <span>ITEX Reference</span>
              <h2>ITEX-ab95cf961f454669a4</h2>
            </div>
          </div>
        </div>

        <div className={styles.refund_info}>
          <div className={styles.refund_header}>
            <h2>Refund information</h2>
            <button><Filecon /> Download proof of refund </button>
          </div>

          <div className={styles.refund_info_Details}>
            <div>
              <span>Date / Time</span>
              <h2>Aug 13 2020 2:21 PM</h2>
            </div>
            <div>
              <span>Refund Amount</span>
              <h2>NGN 7,748.12</h2>
            </div>
            <div>
              <span>Customer</span>
              <h2>thejames@email.com</h2>
            </div>
            <div>
              <span>Destination</span>
              <h2>MPGS</h2>
            </div>
            <div>
              <span>Status</span>
              <h2><CustomStatus text='Completed' type={"success"} /></h2>
            </div>
            <div>
              <span>Balance After Refund</span>
              <h2>NGN 7,748.12</h2>
            </div>
          </div>

          <div className={styles.refund_reason}>
            <h2>Reason for refund</h2>
            <p>The Transaction was not recorded in our system, as our system was unable to reach Flutterwave as at the time of the transaction, please do charge the customer on any fees amount to this refunds</p>
          </div>
        </div>

        <div className={styles.payment_wrapper}>

          <Box className={styles.paymentStage}>
            <div className={styles.last__section__header}>
              <h2>Transaction Event</h2>

            </div>
            <div className={styles.stepWrapper}>
              <Stepper activeStep={2} orientation="vertical" sx={{
                ".css-iprrf9-MuiStepConnector-line": {
                  height: "55px",
                  marginTop: "-28px",
                  border: "0.6px solid #27ae60 !important",
                  width: "2px",




                  marginLeft: "-3px"
                },


                // '.css-iprrf9-MuiStepConnector-line': { background: "blue" }
              }}>
                <Step >
                  <StepLabel className={styles.steplabel} icon={<CheckColorIcon />} optional={<p>
                    Aug 13 2020 <span>2:21 PM</span>
                  </p>}>
                    <h3>Payment started</h3>
                  </StepLabel>
                </Step>
                <Step sx={{ marginTop: "-30px" }}>
                  <StepLabel className={styles.steplabel} icon={<CheckColorIcon />} optional={<p>
                    Aug 13 2020 <span>2:21 PM</span>
                  </p>}>
                    <h3>Payment Completed</h3>
                  </StepLabel>
                </Step>
              </Stepper>
              <div>
                <div className={styles.timeBox}>
                  <p className={styles.success}>1 min 05secs <span>Time spent making payment</span></p>

                </div>
                <div className={styles.errorBox}>
                  <p className={styles.danger}>1 Error<span>While making payment</span></p>

                </div>
              </div>
            </div>



            <div className={styles.link}>

              <div onClick={handleBreakDown}><p>Show breakdown</p></div>
            </div>
          </Box>

          <div>
            <div className={styles.last__section__header}>
              <h2>Customer Information</h2>

            </div>

            <div className={styles.customerInfo}>
              <div className={styles.customerInfo_left}>
                <Avatar sx={{ bgcolor: "#2684ED", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  DA
                </Avatar>
                <div>
                  <p>Daniel Arikawe</p>
                  <span>iam4emmax@gmail.com</span>
                </div>
              </div>
              <div className={styles.blacklist} onClick={handleBLacklist}>
                <p>Blacklist customer  <DoDisturbIcon /></p>
              </div>
              <br />
              <div className={styles.profile}>
                <p>See customer profile </p>
                <IconButton>
                  <LinkIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Navigation>






  )
}

export default RefundItem