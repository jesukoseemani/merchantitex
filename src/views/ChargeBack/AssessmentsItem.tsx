import React from 'react';
import styles from './AssessmentsItem.module.scss';
import NavBar from "../../components/navbar/NavBar";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const AssessmentsItem = () => {
  return (
    <div className={styles.container}>
      <NavBar name="Assessments"/>
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to='/chargeBack/assessments'>
              <div>
                <ArrowLeftIcon />
                <p>Back to assessments</p>
              </div>
            </Link>
          </div>
          <div>
            <p>NGN 33,983.92</p>
            <p>Successful</p>
          </div>
        </div>
        <hr />
        <div className={styles.sectionTwo}>
          <div>
            <p>Date / Time</p>
            <p>test</p>
          </div>
          <div>
            <p>Wallet Debited</p>
            <p>test</p>
          </div>
          <div>
            <p>Reference ID</p>
            <p>test</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <p>Assessment information</p>
          <div>
            <div>
              <p>Reason for assessment</p>
              <p>You exceeded your chargeback ratio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentsItem