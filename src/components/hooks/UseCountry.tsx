import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';





const useCountry = () => {

    const [countryList, setCountryList] = useState<any>()
    const [countryId, setCountryId] = useState<any>()
    const [countryCode, setCountryCode] = useState<any>()
    const [defaultCountryDialCode, setDefaultCountryDialCode] = useState<any>()
    const [defaultCountry, setDefaultCountry] = useState<any>()

    const [loadingCountry, setLoadingCountry] = useState(false)
    const dispatch = useDispatch()



    useEffect(() => {
        const fetchcountry = async () => {
            try {
                setLoadingCountry(true)
                const { data } = await axios.get<any>(`/resource/countries`)
                console.log(data, "country")
                setCountryList(data?.countries)
                setLoadingCountry(false)

                if (data?.defaultCountry) {
                    setDefaultCountry(data?.defaultCountry)
                    setDefaultCountryDialCode(defaultCountry?.dialCode)

                }

                if (data?.countries) {
                    countryList?.map((x: any) => {
                        setCountryId(x?.id)
                        setCountryCode({ ...x?.countryIso })
                    })
                }
            } catch (err: any) {
                setLoadingCountry(false)
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: err?.response?.data?.message,
                        toastStyles: {
                            backgroundColor: 'red',
                        },
                    })
                );
            }
        }

        fetchcountry()
    }, [])



    console.log(defaultCountryDialCode, "code");




    return [countryList, defaultCountry, defaultCountryDialCode, countryCode, loadingCountry, countryId] as const
}

export default useCountry