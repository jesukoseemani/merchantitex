import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import { ArrowLeft } from '@mui/icons-material';
import { Box, capitalize, IconButton } from '@mui/material';
import styles from "./payoutItem.module.scss"
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomStatus from '../../components/customs/CustomStatus';
import { ReactComponent as FileIcon } from "../../assets/images/file.svg";
import CopyToClipboard from 'react-copy-to-clipboard';
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PayoutItemRes, Payout } from '../../types/PayoutItemTypes';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import { getBankName } from '../../utils';
import { BASE_URL } from '../../config';
import useDownload from '../../helpers/Download';


const PayoutItem = () => {
    const [payoutItem, setPayoutItem] = useState<Payout>()
    const { id } = useParams<{ id: string }>();
    const { user } = useSelector(state => state?.meReducer?.me)
    const { calDownload } = useDownload({ url: `${BASE_URL}/payout/download?reference=${payoutItem?.reference}`, filename: 'payout' + Date.now() })


    const dispatch = useDispatch()
    const getPayoutDetails = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<PayoutItemRes>(`/v1/payout/${id}`);
            console.log(data);

            if (data?.code === "success") {
                setPayoutItem(data?.payout);
            }
            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get links',
                    msgType: "error"
                })
            );
        }
    };

    useEffect(() => {
        getPayoutDetails();

        // return () => setLinkItem("")
    }, [id]);

    console.log(payoutItem, id, "payoutitems");






    return (
        <Navigation title='Payouts'>
            <div>
                <div>
                    <Link to="/payout" className={styles.goBackLink}>
                        <div className={styles.goBack}>
                            <ArrowLeft />
                            <p>Back to payout</p>
                        </div >
                    </Link>
                </div>

                <div className={styles.sectionOne}>
                    <div className={styles.sectionOne__header}>
                        <div>
                            <h2>{payoutItem?.currency} {FormatToCurrency(Number(payoutItem?.amount))}</h2>
                            <CustomStatus text={payoutItem?.responsemessage} type={payoutItem?.responsemessage} />
                        </div>
                        <div>
                            <button onClick={calDownload}> <FileIcon /> Download receipt</button>
                        </div>
                    </div>

                    <div className={styles.sectionOne__body}>
                        <div>
                            <span>Beneficiary</span>
                            <p>{payoutItem?.recipientname || "N/a"}</p>
                        </div>
                        <div>
                            <span>Balance debited</span>
                            <p>{payoutItem?.currency ? payoutItem?.currency + " Balance" : "N/a"}</p>
                        </div>
                        <div>
                            <span>Date / Time</span>
                            <p>{payoutItem?.timein ? <CustomDateFormat date={String(payoutItem?.timein)} time={payoutItem?.timein} /> : "N/a"}</p>
                        </div>
                        <div>
                            <span>Transfer type</span>
                            <p>{payoutItem?.transfertype || "N/a"}</p>
                        </div>
                    </div>


                </div>

                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwo__header}>
                        <h2>Payment information</h2>
                    </div>
                    <div className={styles.sectionTwo__body}>
                        <div>
                            <span>Transfer Description</span>
                            <p>{payoutItem?.narration || "N/a"}</p>
                        </div>
                        <div>
                            <span>Payment reference</span>
                            <p style={{ position: "relative" }}>
                                {payoutItem?.linkingreference || "N/a"}
                                <CopyToClipboard text={String(payoutItem?.linkingreference)}>
                                    <IconButton sx={{ position: "absolute", top: 0, marginTop: "-8px" }}>
                                        <CopyIcon />
                                    </IconButton>
                                </CopyToClipboard>
                            </p>
                        </div>
                        <div>
                            <span>Transaction Fee</span>
                            <p>{`${payoutItem?.currency}${payoutItem?.fee}`}</p>
                        </div>
                        <div>
                            <span>Bank name</span>
                            <p>{getBankName(String(payoutItem?.recipientbankcode)) || "N/a"}</p>
                        </div>
                        <div>
                            <span>Initiated by</span>
                            <p>{payoutItem?.userid ? `${capitalize(user?.firstname)} ${capitalize(user?.lastname)}` : "N/a"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Navigation >
    )
}

export default PayoutItem