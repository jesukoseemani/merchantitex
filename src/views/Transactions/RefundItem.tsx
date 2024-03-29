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
import Navigation from '../../components/navbar/Navigation';
import Addtoblacklist from '../Customers/Addtoblacklist';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import { RefundSingle } from '../../types/refunditem';
import { ReactComponent as MasterCard } from "../../assets/template/MasterCard_Logo 1.svg"
import useDownload from '../../hooks/useDownload';
import { BASE_URL } from '../../config';
import { saveMenuTitle, saveNav, saveNested } from "../../redux/actions/selectedMenu/menuAction";
import CustomerIcon from "../../assets/images/customerIcon.svg";
import BlacklistIcon from "../../assets/images/blacklistIcon.svg";


const RefundItem = () => {
  const [refund, setRefund] = useState<RefundSingle>();
  const { id } = useParams<{ id: string }>();
  const { calDownload } = useDownload({ url: `${BASE_URL}/refund/download?reference=${refund?.transaction?.reference}`, filename: 'refund' })

  const history = useHistory()

  const dispatch = useDispatch();

  const getTransaction = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<RefundSingle>(`/v1/refund/${id}`);
      console.log(data);
      // const { transactions } = res?.data;
      if (data) {
        setRefund(data)

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
            <Addtoblacklist id={refund?.transaction?.customer?.customerid} />
          </div>
        ),
      })
    );
  }

  const sendToRoute = () => {

    dispatch(saveNested(true))

    dispatch(saveMenuTitle("Customer"))

    dispatch(saveNav([
      {
        id: 12,
        title: "Customer",
        icon: CustomerIcon,
        link: "/customers",
      },
      {
        id: 13,
        title: "Blacklist",
        icon: BlacklistIcon,
        link: "/blacklist",
      },
    ]))
    history?.push(`/customers/${refund?.transaction?.customer?.customerid}`)
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
              <div className="amount">
                <h2>{refund?.refund?.currency}{FormatToCurrency(Number(refund?.refund?.amount))}</h2>
              </div>
              <h2><CustomStatus text={refund?.refund?.status} type={refund?.refund?.status} /></h2>

              <p>{refund?.refund?.responsemessage} <Mark /></p>
            </div>
            {/* <div>
              <button>Resend Receipt</button>
            </div> */}
          </div>

          <div className={styles.refundDetails}>
            <div>
              <div>
                <span>Date / Time</span>
                <h2> <CustomDateFormat date={String(refund?.refund?.createdat)} time={refund?.refund?.createdat} /></h2>
              </div>
            </div>
            <div>
              <div>
                <span>Customer email</span>
                <h2>{refund?.transaction?.customer?.email}</h2>
              </div>
            </div>
            <div>
              <div>
                <span>Card type</span>
                <h2>{refund?.transaction?.cardtype === "MC" ? <MasterCard /> : <Visa />}</h2>
              </div>
            </div>
            <div>
              <div>
                <span>Card number</span>
                <h2>{refund?.transaction?.mask}</h2>
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
                {/* <h2>{refund?.transaction?.paymentlinkreference.substring(0, 20)}</h2> */}
                <h2>{refund?.transaction?.paymentlinkreference?.substring(0, 15)}</h2>
                <CopyToClipboard text={String(refund?.transaction?.paymentlinkreference)}>
                  <IconButton>
                    <CopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </div>
            </div>
            <div>
              <span>Amount Due</span>
              <h2>{refund?.refund?.currency}{FormatToCurrency(Number(refund?.refund?.amount))}</h2>
            </div>
            <div>
              <span>Transaction Fee</span>
              <h2>{refund?.transaction?.currency}{FormatToCurrency(Number(refund?.transaction?.chargeamount))}</h2>

            </div>
            <div>
              <span>Country/Region</span>
              <h2>Lagos, Nigeria</h2>
            </div>
            <div>
              <span>Bank name</span>
              <h2>{refund?.refund?.route}</h2>
            </div>
            <div>
              <span>ITEX Reference</span>
              <h2>{refund?.transaction?.reference}</h2>
            </div>
          </div>
        </div>

        <div className={styles.refund_info}>
          <div className={styles.refund_header}>
            <h2>Refund information</h2>
            <button onClick={calDownload}><Filecon /> Download proof of refund </button>
          </div>

          <div className={styles.refund_info_Details}>
            <div>
              <span>Date / Time</span>
              <h2>   <CustomDateFormat date={String(refund?.refund?.createdat)} time={refund?.refund?.createdat} /></h2>
            </div>
            <div>
              <span>Refund Amount</span>
              <h2>{refund?.refund?.currency}{FormatToCurrency(Number(refund?.refund?.amount))}</h2>

            </div>
            <div>
              <span>Customer</span>
              <h2>{refund?.transaction?.customer?.email}</h2>

            </div>
            <div>
              <span>Destination</span>
              <h2>{refund?.refund?.route}</h2>

            </div>
            <div>
              <span>Status</span>

              <h2><CustomStatus text={refund?.refund?.status} type={refund?.refund?.status} /></h2>
            </div>
            <div>
              <span>Balance After Refund</span>
              <h2>{refund?.refund?.currency}{FormatToCurrency(Number(refund?.refund?.amount))}</h2>

            </div>
          </div>

          <div className={styles.refund_reason}>
            <h2>Reason for refund</h2>
            <p>{refund?.refund?.reason}</p>
          </div>
        </div>

        <div className={styles.payment_wrapper}>






          <div>
            <div className={styles.last__section__header}>
              <h2>Customer Information</h2>

            </div>

            <div className={styles.customerInfo}>
              <div className={styles.customerInfo_left}>
                <Avatar sx={{ bgcolor: "#FF7CFA", fontWeight: "900", width: "46px", height: "46px", fontSize: "19px", display: "flex", fontFamily: "Avenir bold", justifyContent: "center", alignItems: "center" }}>
                  {refund?.transaction?.customer?.firstname || refund?.transaction?.customer?.lastname
                    ?
                    `${refund?.transaction?.customer?.firstname?.substring(0, 1)?.toUpperCase()}
                     ${refund?.transaction?.customer?.lastname?.substring(0, 1)?.toUpperCase()}`

                    : refund?.transaction?.customer?.email?.substring(0, 2)?.toUpperCase()}
                </Avatar>
                <div>
                  <p>{refund?.transaction?.customer?.firstname || refund?.transaction?.customer?.lastname
                    ?
                    `${refund?.transaction?.customer?.firstname}
                     ${refund?.transaction?.customer?.lastname}`

                    : "N/a"}
                  </p>
                  <span>{refund?.transaction?.customer?.email}</span>
                </div>
              </div>
              <div className={styles.blacklist} onClick={handleBLacklist}>
                <p>Blacklist customer  <DoDisturbIcon fontSize='small' /></p>
              </div>
            </div>
            <div className={styles.profile}>
              <p>See customer profile </p>
              <IconButton onClick={sendToRoute}>
                <LinkIcon />
              </IconButton>
            </div>
          </div>
        </div>

      </div >
    </Navigation >






  )
}

export default RefundItem