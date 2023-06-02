import React, { useEffect, useState } from 'react'
import styles from "./businessinfo.module.scss"
import CustomStatus from '../../../../components/customs/CustomStatus';
import { CircleFlag } from 'react-circle-flags';
import { openModalAndSetContent } from '../../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import EditBusiness from './EditBusiness';
import { Avatar } from '@mui/material';
import { closeLoader, openLoader } from '../../../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../../../redux/actions/toast/toastActions';
import { Address, BusinessProfile, Meta } from '../../../../types/businessProfileTypes';
import { getCountryCode } from '../../../../helpers/getCountryCode';

const BusinessInfo = ({ me }: any) => {
    console.log({ me, }, me?.business?.country);
    const dispatch = useDispatch()
    const [business, setBusiness] = useState<Address>()
    const [meta, setMeta] = useState<Meta[]>()

    const GetBusinessProfile = async () => {

        try {
            dispatch(openLoader());
            const { data } = await axios.get<BusinessProfile>(`/v1/setting/business/profile`)
            if (data?.code === "success") {
                setBusiness(data?.address)
                setMeta(data?.meta)
                dispatch(closeLoader());

            }

        } catch (error: any) {
            const { message } = error.response.data;

            dispatch(
                openToastAndSetContent({
                    toastContent: message,
                    msgType: "error"
                })
            );
            dispatch(closeLoader());

        }
        finally {
            dispatch(closeLoader());

        }

    };
    console.log("business", business);


    useEffect(() => {
        GetBusinessProfile();
    }, []);

    console.log(getCountryCode(business?.country), "contrrr");


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

                        <EditBusiness me={business} GetBusinessProfile={GetBusinessProfile} business={business} meta={meta} />
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
                            {/* {business?.?.substring(0, 1)} */}
                        </Avatar>
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="business logo" width={"50px"} /> */}
                    </div>
                    <div className={styles.textBox}>
                        <p>{me?.business?.tradingname}</p>
                        <span>Merchant ID: {business?.merchantaccountid}</span>
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
                    <p>{business?.addressline1 || "N/a"}</p>
                </div>

            </div>
            <div className={styles.business_body2}>
                <div>
                    <span>Country</span>
                    <p><CircleFlag countryCode={String(business?.country)?.toLocaleLowerCase()} height="15" /> {getCountryCode(String(business?.country))}</p>
                </div>
                {meta?.map((x: Meta) => (
                    <div key={x?.id}>
                        <span>{x?.name}</span>
                        <p>{x?.value || "N/a"}</p>
                    </div>

                ))
                }


            </div>
        </div>
    )
}

export default BusinessInfo