import React, { useState, useEffect } from 'react';
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
import { chargebackResponse } from '../../types/Chargeback';
import { getChargebackById } from '../../services/chargeback';


const ChargeBacksItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const [chargeback, setChargeback] = useState<chargebackResponse | null>(null);



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



  if (!location.state.rowData) {
    history.replace('/chargebacks');
  }

  const getChargeBack = async () => {
    try {

      const res = await getChargebackById(location.pathname.split('/')[2]);
      setChargeback(res || null)


    } catch (error) {

    }
  };

  useEffect(() => {
    getChargeBack();
  }, [location.pathname.split('/')[2]]);

  const statusFormatObj: { [key: string]: string } = {
    "approved": 'approved',
    "declined": 'declined',
    "pending": 'pending',
  }


  if (!chargeback) return null;



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
        <Box className={styles.section__one__wrapper}>

          <div className={styles._wrapper_top_bar}>
            <div>
              <h2>NGN 2000</h2>
              <p className={styles[statusFormatObj["success"] || 'pendingText']}>success</p>
            </div>
            <div className={styles.refundBtn}>
              <button>Refund customer</button>
            </div>
          </div>

          <div className={styles.sectionTwo}>
            <div>
              <p>Date / Time</p>
              {/* <p>{moment(added).format("MMM D YYYY h:mm A")}</p> */}
            </div>
            <div>
              <p>Customer</p>
              {/* <p>{email}</p> */}
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
              {/* <p>{amt}</p> */}
            </div>
            <div>
              <p>Chargeback date</p>
              {/* <p>{moment(added).format("MMM D YYYY h:mm A")}</p> */}
            </div>
            <div>
              <p>Chargeback trail</p>
              <Link to={"#"}>View chargeback trail</Link>
            </div>
            <div>
              <p>Chargeback Reason</p>
              <p>fraud</p>
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
                  <h2>Reason: <p>I provided value for this transaction and I have a screenshot of the service delivery to this customer.</p></h2>
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
            <Box className={styles.chargeProgress_body} mt={"21px"}>
              <div className={styles.chargeProgress_body_header}>
                <div className={styles.Chargeback_text}>

                  <h2>Admin Responded to Your Dispute    |</h2>
                  <p>Aug 13 2020 <span> 2:49 PM </span></p>
                  <div className={styles.chargeback__btn}>
                    <button>Accept</button>
                    <button onClick={handleOpenResponseChargebackModal}>Response</button>
                  </div>
                </div>

                <div className={styles.chargebackReason}>
                  <h2>Reason: <p>I provided value for this transaction and I have a screenshot of the service delivery to this customer.</p></h2>
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
            </Box>
          </Box>
        </div>
        <div className={styles.sectionFour}>
          <div className={styles.sectionFour_header}>
            <h2>Payment information</h2>
          </div>
          <div className={styles.sectionFour_body}>
            <div>
              <p>Payment reference</p>
              {/* <p>{txnRef}</p> */}
            </div>
            <div>
              <p>Transaction fee</p>
              {/* <p>{txnFee}</p> */}
            </div>
            <div>
              <p>Country/Region</p>
              {/* <p>{country}</p> */}
            </div>
            <div>
              <p>Bank name</p>
              {/* <p>{bank}</p> */}
            </div>
            <div>
              <p>ITEX Reference</p>
              {/* <p>{txnRef}</p> */}
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
          <DisputeChargeback />
        </CustomModal >

      </Box>
      <Box>
        <CustomModal
          title="Accept chargeback"
          isOpen={openAcceptChargebackModal}
          handleClose={handleCloseAcceptChargebackModal}
          close={() => setOpenAcceptChargebackModal(false)}>
          <AcceptChargeback />
        </CustomModal >

      </Box>

      <Box>
        <CustomModal
          title="Respond to chargeback"
          isOpen={openResponseChargebackModal}
          handleClose={handleCloseResponseChargebackModal}
          close={() => setOpenResponseChargebackModal(false)}>
          <ResponseChargeback />
        </CustomModal >

      </Box>
    </div >
  )
}

export default ChargeBacksItem