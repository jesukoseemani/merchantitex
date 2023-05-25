import React, { useEffect, useState } from 'react';
import styles from './ChargeBacksItem.module.scss';
import NavBar from "../../components/navbar/NavBar";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useDispatch } from 'react-redux';
import { ChargebackItem } from '../../types/ChargebackTypes';
import moment from 'moment';
import { ReactComponent as SuccessBadge } from '../../assets/images/circle-check-color.svg';
import { ReactComponent as VisaIcon } from '../../assets/images/visa.svg';
import { ReactComponent as PdfIcon } from '../../assets/images/pdf.svg';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import { Box } from '@mui/material';
import CloudDownloadOutlined from '@mui/icons-material/CloudDownloadOutlined';
import CustomModal from '../../components/customs/CustomModal';
import DisputeChargeback from './DisputeChargeback';
import AcceptChargeback from './AcceptChargeback';
import ResponseChargeback from './RespondChargeback';
import axios from 'axios';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomStatus from '../../components/customs/CustomStatus';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import Refundcustomer from '../Transactions/Refundcustomer';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';



const ChargeBacksItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();



  const [openDisputModal, setOpenDisputeModal] = useState(false)
  const handleOpenDisputModal = () => setOpenDisputeModal(true);
  const handleCloseDisputModal = () => setOpenDisputeModal(false);

  // accept chargeback
  const [openAcceptChargebackModal, setOpenAcceptChargebackModal] = useState(false)
  const handleOpenAcceptChargebackModal = () => setOpenAcceptChargebackModal(true);
  const handleCloseAcceptChargebackModal = () => setOpenAcceptChargebackModal(false);

  // response chargeback
  const [openResponseChargebackModal, setOpenResponseChargebackModal] = useState(false)
  const handleOpenResponseChargebackModal = () => setOpenResponseChargebackModal(true);
  const handleCloseResponseChargebackModal = () => setOpenResponseChargebackModal(false);








  const [chargebackItem, setChargebackItem] = useState<any>()

  const getChargebackDetails = async () => {
    try {

      dispatch(openLoader())
      const { data } = await axios.get<any>(`/v1/chargeback/${id}`)

      if (data?.code === "success") {

        setChargebackItem(data)
        console.log(data, "get")
      }


      dispatch(closeLoader());

    } catch (error: any) {
      dispatch(closeLoader());
      const { message } = error.response.data;
      dispatch(
        dispatch(
          openToastAndSetContent({
            toastContent: message,
            msgType: "error"
          })
        )
      );
    } finally {
      dispatch(closeLoader());
    }
  }

  useEffect(() => {
    getChargebackDetails()
    // return () => setChargebackItem("")
  }, [id])


  const handleRefund = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: "653px",
          height: "500px !important",
          borderRadius: '20px',
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"

        },
        modalTitle: "Refund customer",
        modalContent: (
          <div className='modalDiv'>
            <Refundcustomer id={chargebackItem?.chargeback?.paymentid} />
          </div>
        ),
      })
    );
  }

  return (

    <div className={styles.container}>
      {/* <NavBar title="ChargeBacks"/> */}
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div onClick={history.goBack}>
            <ArrowLeftIcon />
            <p>Back to chargebacks</p>
          </div>
        </div>
        <Box className={styles.section_one_wrapper}>

          <div className={styles._wrapper_top_bar}>
            <div>
              <h2>{`${chargebackItem?.chargeback?.currency} ${FormatToCurrency(chargebackItem?.chargeback?.amount)}`}</h2>
              <CustomStatus text={chargebackItem?.chargeback?.status} type={chargebackItem?.chargeback?.status} />
            </div>
            <div className={styles.refundBtn}>
              <button onClick={handleRefund}>Refund customer</button>
            </div>
          </div>

          <div className={styles.sectionTwo}>
            <div>
              <span>Date / Time</span>
              <p>{moment(chargebackItem?.chargeback?.createdat).format("MMM D YYYY h:mm A")}</p>
            </div>
            <div>
              <span>Customer</span>
              <p>{chargebackItem?.chargeback?.customeremail}</p>
            </div>
            <div>
              <span>Card type</span>
              <p>n/a</p>
              {/* <p>{cardType === "VISA" && <VisaIcon />}</p> */}
            </div>
            <div>
              <span>Card number</span>
              <p>n/a</p>
              {/* <p>{cardNum}</p> */}
            </div>

          </div>
        </Box>


        <div className={styles.sectionThree}>
          <Box className={styles._section_three_header}>
            <div>
              <h2>Chargebacks</h2>
              {/* <p style={{ borderRadius: "20px" }} className={styles[statusFormatObj[status] || 'pendingText']}>{status}</p> */}
            </div>
            <Box>
              <button onClick={handleOpenAcceptChargebackModal}>Accept Chargeback</button>
              {/* <button onClick={handleOpenDisputModal}>Dispute chargeback</button> */}
            </Box>

          </Box>
          <div className={styles._section_three_body}>
            <div>
              <p>Chargeback amount</p>
              <p>{`${chargebackItem?.chargeback?.currency} ${FormatToCurrency(chargebackItem?.chargeback?.amount)}`}</p>
            </div>
            <div>
              <p>Chargeback date</p>
              <p>{moment(chargebackItem?.chargeback?.duedate).format("MMM D YYYY h:mm A")}</p>
            </div>
            {/* <div>
              <p>Chargeback trail</p>
              <Link to={"#"}>View chargeback trail</Link>
            </div> */}
            <div>
              <p>Chargeback Reason</p>
              <p>{chargebackItem?.chargeback?.chargebackreason}</p>
            </div>
            <div>
              <p>Chargeback paymentid</p>
              <p>{chargebackItem?.chargeback?.paymentid}</p>
            </div>
          </div>
          <Box className={styles.chargeProgress}>
            <Box className={styles.chargeProgress_header}><h2> Chargeback progress</h2>
              <button onClick={handleOpenResponseChargebackModal}>Response</button>
              {/* <div className={styles.chargeback__btn}>
                <button onClick={handleOpenAcceptChargebackModal}>Accept</button>
              </div> */}
            </Box>

            {chargebackItem?.chargebackResponses &&
              <Box className={styles.chargeProgress_body} mt={"21px"}>

                {chargebackItem?.chargebackResponses?.map((res: any, i: number) => (
                  <div key={i} className={styles.chargeProgress_body_header}>
                    <div className={styles.Chargeback_text}>

                      <h2>{res?.responsefrom}  Responded to Your Dispute    |</h2>
                      <p>{res?.createdat} </p>

                    </div>

                    <div className={styles.chargebackReason}>
                      <h2>Reason: <p>{res?.response}</p></h2>
                    </div>

                    {res?.proof1 || res?.proof2 &&
                      <>
                        <div className={styles.chargebackFile}>
                          <div className="icon">
                            <PdfIcon />
                          </div>
                          <div> <span>{res?.proof1}</span></div>
                          <div>
                            <button> Download <CloudDownloadOutlined /></button>
                          </div>
                        </div>
                        {res?.proof2 && <div className={styles.chargebackFile}>
                          <div className="icon">
                            <PdfIcon />
                          </div>
                          <div> <span>{res?.proof2}</span></div>
                          <div>
                            <button> Download <CloudDownloadOutlined /></button>
                          </div>
                        </div>}
                      </>


                    }
                  </div>

                ))}
              </Box>

            }
          </Box>
        </div>
        <div className={styles.sectionFour}>
          <div className={styles.sectionFour_header}>
            <h2>Payment information</h2>
          </div>
          <div className={styles.sectionFour_body}>
            <div>
              <p>Payment reference</p>
              <p>{chargebackItem?.chargeback?.paymentid}</p>
            </div>
            <div>
              <p>Transaction fee</p>
              <p>{`${chargebackItem?.chargeback?.currency} ${chargebackItem?.chargeback?.amount}`}</p>
            </div>
            <div>
              <p>Country/Region</p>
              <p>N/a</p>
            </div>
            <div>
              <p>Bank name</p>
              <p>N/a</p>
            </div>
            <div>
              <p>ITEX Reference</p>
              <p>{chargebackItem?.chargeback?.linkingreference}</p>

            </div>
          </div>
        </div>

      </div>


      <Box>
        <CustomModal
          title="Dispute this chargeback"
          isOpen={openDisputModal}
          handleClose={handleCloseDisputModal}
          close={() => setOpenDisputeModal(false)}>

          <DisputeChargeback chargebackid={id} setOpenResponseChargebackModal={setOpenResponseChargebackModal} />
        </CustomModal >

      </Box>
      <Box>
        <CustomModal
          title="Accept chargeback"
          isOpen={openAcceptChargebackModal}
          handleClose={handleCloseAcceptChargebackModal}
          close={() => setOpenAcceptChargebackModal(false)}>

          {/* <p>{chargebackItem?.chargeback?.linkingreference}</p> */}
          <AcceptChargeback
            chargebackid={id}
            chargeAmt={chargebackItem?.chargeback?.amount}
            currency={chargebackItem?.chargeback?.currency}
            setOpenAcceptChargebackModal={setOpenAcceptChargebackModal}
          />
        </CustomModal >

      </Box>

      <Box>
        <CustomModal
          title="Respond to chargeback"
          isOpen={openResponseChargebackModal}
          handleClose={handleCloseResponseChargebackModal}
          close={() => setOpenResponseChargebackModal(false)}>

          <ResponseChargeback chargebackid={id} setOpenResponseChargebackModal={setOpenResponseChargebackModal} />
        </CustomModal >

      </Box>
    </div >
  )
}

export default ChargeBacksItem