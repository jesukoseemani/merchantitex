import React from 'react'
import styles from "./businessinfo.module.scss"
import CustomStatus from '../../../../components/customs/CustomStatus';
import { CircleFlag } from 'react-circle-flags';
import { openModalAndSetContent } from '../../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import EditBusiness from './EditBusiness';
import { Avatar } from '@mui/material';

const BusinessInfo = ({ me }: any) => {
    console.log({ me, }, me?.business?.country);
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "772px",
                    minHeight: "720px !important",
                    borderRadius: '20px',
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                },
                modalTitle: "Edit Business Information",
                modalContent: (
                    <div className='modalDiv'>

                        <EditBusiness me={me} />
                    </div>
                ),
            })
        );
    }
    return (
        <div className={styles.wrapper__container}>
            <div className={styles.business__header}>
                <div className={styles.left}>
                    <div className="logo">
                        <Avatar sx={{ width: 50, height: 50, backgroundColor: "#27AE60", fontFamily: "Avenir bold" }}>
                            {me?.business?.tradingname?.substring(0, 1)}
                        </Avatar>
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="business logo" width={"50px"} /> */}
                    </div>
                    <div className={styles.textBox}>
                        <p>{me?.business?.tradingname}</p>
                        <span>Merchant ID: {me?.user?.merchantaccountid}</span>
                    </div>
                    <CustomStatus text={me?.business?.islive ? "Live" : "Test"} type={me?.business?.islive ? "approved" : "Abandoned"} />

                </div>
                <div className={styles.right}>
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                </div>

            </div>

            <div className={styles.business_body1}>
                <div>
                    <span>Business Name</span>
                    <p>{me?.business?.tradingname}</p>
                </div>
                <div>
                    <span>Business Email</span>
                    <p>{me?.business?.businessemail || "N/a"}</p>
                </div>
                <div>
                    <span>Phone Number</span>
                    <p>{me?.business?.businessphone || "N/a"}</p>
                </div>
                <div>
                    <span>Address </span>
                    <p>{me?.business?.businessaddress || "N/a"}</p>
                </div>

            </div>
            <div className={styles.business_body2}>
                <div>
                    <span>Country</span>
                    <p><CircleFlag countryCode={me?.business?.country?.toLocaleLowerCase()} height="15" /> Nigeria</p>
                </div>
                <div>
                    <span>Support Email</span>
                    <p>{me?.business?.supportemail || "N/a"}</p>
                </div>
                <div>
                    <span>Support Phone Number</span>
                    <p>{me?.business?.supportphonenumber || "N/a"}</p>

                </div>
                <div>
                    <span>Chargeback Email </span>
                    <p>{me?.business?.chargebackemail || "N/a"}</p>

                </div>

            </div>
        </div>
    )
}

export default BusinessInfo