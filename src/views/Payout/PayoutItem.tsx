import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../../components/navbar/Navigation'
import { ArrowLeft } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import styles from "./payoutItem.module.scss"
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomStatus from '../../components/customs/CustomStatus';
import { ReactComponent as FileIcon } from "../../assets/images/file.svg";
import CopyToClipboard from 'react-copy-to-clipboard';
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";


const PayoutItem = () => {
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
                            <h2>NGN {FormatToCurrency(45000.52)}</h2>
                            <CustomStatus text='Successful' type={"Approved"} />
                        </div>
                        <div>
                            <button> <FileIcon /> Download receipt</button>
                        </div>
                    </div>

                    <div className={styles.sectionOne__body}>
                        <div>
                            <span>Beneficiary</span>
                            <p>James Holiday Jr</p>
                        </div>
                        <div>
                            <span>Balance debited</span>
                            <p>NGN Balance</p>
                        </div>
                        <div>
                            <span>Date / Time</span>
                            <p>Aug 13 2020 2:21 PM</p>
                        </div>
                        <div>
                            <span>Transfer type</span>
                            <p>Bank transfer</p>
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
                            <p>Thank You</p>
                        </div>
                        <div>
                            <span>Payment reference</span>
                            <p style={{ position: "relative" }}>
                                ITEX-ab95cf961f454669a4
                                <CopyToClipboard text={"ITEX-ab95cf961f454669a4"}>
                                    <IconButton sx={{ position: "absolute", top: 0, marginTop: "-8px" }}>
                                        <CopyIcon />
                                    </IconButton>
                                </CopyToClipboard>
                            </p>
                        </div>
                        <div>
                            <span>Transaction Fee</span>
                            <p>NGN 7,748.12</p>
                        </div>
                        <div>
                            <span>Bank name</span>
                            <p>Access Bank</p>
                        </div>
                        <div>
                            <span>Initiated by</span>
                            <p>James Seun</p>
                        </div>
                    </div>
                </div>
            </div>
        </Navigation >
    )
}

export default PayoutItem