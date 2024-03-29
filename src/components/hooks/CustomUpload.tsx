import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

const useCustomUpload = () => {

    const [img, setImg] = useState<any>()
    const [imgUrl, setImgUrl] = useState<any>()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



    const handleUpload = async (e: any) => {
        setLoading(true)
        dispatch(openLoader())
        try {


            const formData = new FormData()

            formData.append("file", e.target.files[0])
            const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)
            // console.log(data, e.target.file[0])


            if (data) {

                setImgUrl(data?.fileUrl)
                setLoading(false)
                setImg("")
                console.log(imgUrl)
            }





            dispatch(closeLoader());

        } catch (error: any) {
            dispatch(closeLoader());
            setLoading(false)
            setImg("")

            const { message } = error?.response.data;
            dispatch(
                openToastAndSetContent({
                    toastContent: message,
                    msgType: "error"
                })
            );
        } finally {
            dispatch(closeLoader());
        }
    }






    return { loading, imgUrl, handleUpload, setImgUrl } as const
}

export default useCustomUpload