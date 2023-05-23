import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';



interface Props {
    currencyList: string | number;
    loadingCurrency: boolean;
    currencyId: number;
}


const useCurrency = () => {

    const [currencyList, setCurrencyList] = useState<any>()
    const [currencyId, setCurrencyId] = useState<any>()

    const [loadingCurrency, setLoadingCurrency] = useState(false)
    const dispatch = useDispatch()



    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                setLoadingCurrency(true)
                const { data } = await axios.get<any>(`/resource/currencies`)
                console.log(data, "currency")
                setCurrencyList(data?.currencies)
                setLoadingCurrency(false)

                if (data?.currency) {
                    currencyList?.map((x: any) => {
                        setCurrencyId(x?.id)
                    })
                }
            } catch (err: any) {
                setLoadingCurrency(false)
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: err?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }
        }

        fetchCurrency()
    }, [])







    return { currencyList, loadingCurrency, currencyId } as const
}

export default useCurrency