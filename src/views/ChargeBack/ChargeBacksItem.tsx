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
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';



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





  const statusFormatObj: { [key: string]: string } = {
    "approved": 'approved',
    "declined": 'lost',
    "pending": 'pending',
  }



  const [chargebackItem, setChargebackItem] = useState<any>()

  const getChargebackDetails = async () => {
    try {

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
            toastStyles: {
              backgroundColor: "red",
            },
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
              <h2>{`${chargebackItem?.chargeback?.currency} ${chargebackItem?.chargeback?.amount}`}</h2>
              <p className={styles[statusFormatObj[chargebackItem?.chargeback?.status] || 'pendingText']}>{chargebackItem?.chargeback?.status}</p>
            </div>
            <div className={styles.refundBtn}>
              <button>Refund customer</button>
            </div>
          </div>

          <div className={styles.sectionTwo}>
            <div>
              <p>Date / Time</p>
              <p>{moment(chargebackItem?.chargeback?.createdat).format("MMM D YYYY h:mm A")}</p>
            </div>
            <div>
              <p>Customer</p>
              <p>{chargebackItem?.chargeback?.customeremail}</p>
            </div>
            <div>
              <p>Card type</p>
              {/* <p>{cardType === "VISA" && <VisaIcon />}</p> */}
            </div>
            <div>
              <p>Card number</p>
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
              <button onClick={handleOpenDisputModal}>Dispute chargeback</button>
            </Box>

          </Box>
          <div className={styles._section_three_body}>
            <div>
              <p>Chargeback amount</p>
              <p>{`${chargebackItem?.chargeback?.currency} ${chargebackItem?.chargeback?.amount}`}</p>
            </div>
            <div>
              <p>Chargeback date</p>
              <p>{moment(chargebackItem?.chargeback?.duedate).format("MMM D YYYY h:mm A")}</p>
            </div>
            <div>
              <p>Chargeback trail</p>
              <Link to={"#"}>View chargeback trail</Link>
            </div>
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
            <Box className={styles.chargeProgress_header}><h2> Chargeback progress</h2></Box>
            <Box className={styles.chargeProgress_body}>
              <Box className={styles.chargeProgress_body_header}>
                <div className={styles.Chargeback_text}>

                  <h2>You disputed this chargeback     |</h2>
                  <p>Aug 13 2020 <span> 2:49 PM </span></p>
                </div>

                <div className={styles.chargebackReason}>
                  <h2>Reason: <p>{chargebackItem?.chargeback?.chargebackreason}</p></h2>
                </div>
                <div className={styles.chargebackFile}>
                  <div className="icon">
                    <PdfIcon />
                  </div>
                  <div> <span>Service_delivery.pdf</span></div>
                  <div>
                    <button> Download <CloudDownloadOutlined /></button>
                  </div>
                </div>
              </Box>
            </Box>
            {chargebackItem?.chargebackResponses &&
              <Box className={styles.chargeProgress_body} mt={"21px"}>

                {chargebackItem?.chargebackResponses?.map((res: any, i: number) => (
                  <div key={i} className={styles.chargeProgress_body_header}>
                    <div className={styles.Chargeback_text}>

                      <h2>Admin Responded to Your Dispute    |</h2>
                      <p>{res?.createdat} </p>
                      <div className={styles.chargeback__btn}>
                        <button>Accept</button>
                        <button onClick={handleOpenResponseChargebackModal}>Response</button>
                      </div>
                    </div>

                    <div className={styles.chargebackReason}>
                      <h2>Reason: <p>{res?.response}</p></h2>
                    </div>
                    <div className={styles.chargebackFile}>
                      <div className="icon">
                        <PdfIcon />
                      </div>
                      <div> <span>Service_delivery.pdf</span></div>
                      <div>
                        <button> Download <CloudDownloadOutlined /></button>
                      </div>
                    </div>
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
              {/* <p>{}</p> */}
            </div>
            <div>
              <p>Bank name</p>
              {/* <p>{bank}</p> */}
            </div>
            <div>
              <p>ITEX Reference</p>
              <p>{chargebackItem?.chargeback?.linkingreference}</p>

            </div>
          </div>
        </div>
        <div className={styles.sectionFive}>
          <div className={styles.sectionFive_header}>
            <div>
              <h3>Transaction timeline</h3>

            </div>
            <div>
              <p className={styles.time}>1min 05secs</p>
            </div>
            <div>
              <p>Time spent making payment</p>
            </div>
            <div>
              <p className={styles.error}>1 Error</p>
            </div>
            <div>
              <p>While making payment</p>

            </div>
          </div>
          <div className={styles.timeline}>
            <div className={styles.timeline_first_child}>
              <div><SuccessBadge style={{ width: "20px" }} />
              </div>
              <div style={{ marginTop: "8px", }}>
                <p>Payment started</p>
                <span>Aug 13 2020 2:21 PM</span>
              </div>
            </div>
            <br />
            <div>
              <SuccessBadge style={{ width: "20px" }} />
              <div>
                <p style={{ marginTop: "8px" }}>Payment started</p>
                <span>Aug 13 2020 2:21 PM</span>
              </div>
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

          <p>{chargebackItem?.chargeback?.linkingreference}</p>
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