import styles from './RefundItem.module.scss';
import NavBar from "../../components/navbar/NavBar";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { GetTransactionsRes, TransactionItem } from "../../types/CustomerTypes";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

const RefundItem = () => {
  const [refund, setRefund] = useState<TransactionItem | null>(null);

  const { slug } = useParams<{ slug: string }>();

  const dispatch = useDispatch();

  const getTransaction = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>(`/merchant/transactions?linkingreference=${slug}`);
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
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  }

  const formatStatus = (val: string | undefined) => {
    if (val === '00') {
      return <p className={styles.successText}>Successful</p>
    } else if (val === '09') {
      return <p className={styles.failText}>Failed</p>
    } else {
      return <p className={styles.pendingText}>Pending</p>
    }
  }

  useEffect(() => {
    getTransaction();
  }, [slug])

  return (

      <div className={styles.container}>
        {/* <NavBar name="Customers"/> */}
        <hr />
        <div className={styles.pageWrapper}>
          <div className={styles.sectionOne}>
            <div>
              <Link to='/transactions/refund'>
                <div>
                  <ArrowLeftIcon />
                  <p>Back to refunds</p>
                </div>
              </Link>
            </div>
            <div>
              <p>{refund?.order.currency} {Number(refund?.order.amount).toFixed(2)}</p>
              <p>Successful</p>
            </div>
          </div>
          <hr />
          <div className={styles.sectionTwo}>
            <div>
              <p>Refunds</p>
              <p>Balance after refund: <span>NGN 907,984.00</span></p>
            </div>
            <div>
              <div>
                <p>Amount</p>
                <p>{refund?.order.currency} {Number(refund?.order.amount).toFixed(2)}</p>
              </div>
              <div>
                <p>Status</p>
                {formatStatus(refund?.code)}
              </div>
              <div>
                <p>Date</p>
                <p>{moment(refund?.transaction.added).format('MMM D YYYY h:mm A')}</p>
              </div>
              <div>
                <p>Reason for refund</p>
                <p>{refund?.order.description}</p>
              </div>
            </div>
            <div>
              <div>
                <p>Date/Time</p>
                <p>{moment(refund?.transaction.added).format('MMM D YYYY h:mm A')}</p>
              </div>
              <div></div>
              <div>
                <p>Customer</p>
                <p>{refund?.source.customer.email}</p>
              </div>
              <div></div>
              <div>
                <p>{refund?.transaction.paymentmethod === 'card' ? 'Card type' : 'Payment method'}</p>
                <p>
                  {
                    refund?.transaction.paymentmethod === 'card' ?
                      refund?.source.customer.card.type :
                      refund?.transaction.paymentmethod
                  }
                </p>
              </div>
              <div></div>
              <div>
                <p>{refund?.transaction.paymentmethod === 'card' ? 'Card number' : 'Customer number'}</p>
                <p>
                  {
                    refund?.transaction.paymentmethod === 'card' ?
                      refund?.source.customer.card.number :
                      refund?.source.customer.msisdn
                  }
                </p>
              </div>
            </div>
          </div>
          <div className={styles.sectionThree}>
            <div>
              <h3>Performance</h3>
            </div>
            <div>
              <div>
                <p>Payment reference</p>
                <p>{refund?.transaction.reference}</p>
              </div>
              <div>
                <p>Transaction Fee</p>
                <p>test</p>
              </div>
              <div>
                <p>Country/Region</p>
                <p>{refund?.order.country}</p>
              </div>
              <div>
                <p>Bank name</p>
                <p>test</p>
              </div>
              <div>
                <p>ITEX Reference</p>
                <p>{refund?.transaction.linkingreference}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RefundItem