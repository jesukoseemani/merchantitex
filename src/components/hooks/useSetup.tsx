import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

interface Props {
    isBusinessApproved: boolean;
    isSettlementAccountSet: boolean;
    businessType: string;
    code: string;
    hasPendingReviews: boolean;
    isSetupComplete: boolean
    message: string;
    rejectedDocs: []

}
const useSetup = () => {
    const [setupStatus, setSetupStatus] = useState<Props>()
    const dispatch = useDispatch()
    const checkBusinessStatus = async () => {
        try {

            const { data } = await axios.get<Props>("/v1/setup/business/status")

            console.log(data, "status")
            if (data?.code === "success") {
                setSetupStatus(data)
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

        checkBusinessStatus()
    }, [])

    return { setupStatus } as const
}

export default useSetup