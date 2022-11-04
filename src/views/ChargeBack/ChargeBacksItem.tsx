import React from 'react';
import styles from './ChargeBacksItem.module.scss';
import NavBar from "../../components/navbar/NavBar";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useDispatch } from 'react-redux';
import { ChargebackItem } from '../../types/ChargebackTypes';
import moment from 'moment';
import {ReactComponent as PendingBadge} from '../../assets/images/pending-badge.svg';
import {ReactComponent as SuccessBadge} from '../../assets/images/success-badge.svg';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

const ChargeBacksItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();

  if(!location.state.rowData) {
    history.replace('/chargebacks');
  }

  const { rowData } = location.state; 

  const formattedRowData: ChargebackItem = JSON.parse(rowData);

  const { amt,status,txnRef, email, due, added, id, cardNum, cardType, txnFee, country, bank } = formattedRowData;

  const statusFormatObj: {[key: string]: string} = {
    'won': 'wonText',
    'lost': 'lostText',
    'pending': 'pendingText'
  }

  return (
    <div className={styles.container}>
      <NavBar name="ChargeBacks"/>
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div onClick={history.goBack}>
            <ArrowLeftIcon />
            <p>Back to chargebacks</p>
          </div>
          <div>
            <div>
              <p>NGN {amt}</p>
              <p className={styles[statusFormatObj[status] || 'pendingText']}>{status}</p>
            </div>
            <div>
              <p>Refund customer</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div>
            <div>
              <p>Date / Time</p>
              <p>{moment(added).format("MMM D YYYY h:mm A")}</p>
            </div>
            <div>
              <p>Customer</p>
              <p>{email}</p>
            </div>
            <div>
              <p>Card type</p>
              <p>{cardType}</p>
            </div>
            <div>
              <p>Card number</p>
              <p>{cardNum}</p>
            </div>
          </div>
          <div>
            <p>Blacklist customer</p>
            <DoDisturbIcon />
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div>
            <p>Chargebacks</p>
            <p className={styles[statusFormatObj[status] || 'pendingText']}>{status}</p>
          </div>
          <div>
            <div>
              <p>Chargeback amount</p>
              <p>{amt}</p>
            </div>
            <div>
              <p>Chargeback date</p>
              <p>{moment(added).format("MMM D YYYY h:mm A")}</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionFour}>
          <div>
            <p>Payment information</p>
          </div>
          <div>
            <div>
              <p>Payment reference</p>
              <p>{txnRef}</p>
            </div>
            <div>
              <p>Transaction fee</p>
              <p>{txnFee}</p>
            </div>
            <div>
              <p>Country/Region</p>
              <p>{country}</p>
            </div>
            <div>
              <p>Bank name</p>
              <p>{bank}</p>
            </div>
            <div>
              <p>ITEX Reference</p>
              <p>{txnRef}</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionFive}>
          <div>
            <h3>Transaction timeline</h3>
            <div>
              <p>1min 05secs</p>
              <p>Time spent making payment</p>
            </div>
            <div>
              <p>1 Error</p>
              <p>While making payment</p>
            </div>
          </div>
          <div>
            <div>
              <PendingBadge />
              <p>Payment started</p>
            </div>
            <div>
              <PendingBadge />
              <p>Payment completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChargeBacksItem