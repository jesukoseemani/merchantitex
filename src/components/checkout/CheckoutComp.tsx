import React, { useEffect, useState } from 'react'
import { ReactComponent as Logo } from "../../assets/template/logo.svg";
import Test from "../../assets/images/coverImage.svg";
import { ReactComponent as Preview } from "../../assets/template/preview.svg";
// import { ReactComponent as Logo } from "../../assets/template/logo.svg";
import Styles from "./CheckoutComp.module.scss"
import CheckoutSvg from './CheckoutSvg'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CheckoutTypes, Color, Custom } from '../../types/CheckoutTypes';
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import useCustomUpload from '../hooks/CustomUpload';


interface Props {
    sidebar_color: string | undefined;
    button_color: string | undefined
}

const CheckoutComp = () => {
    const dispatch = useDispatch()
    const { tradingname } = useSelector((state) => state?.meReducer?.me?.business);
    const [checkoutOption, setCheckoutOption] = useState<Custom>()

    const [image, setImage] = useState("")

    const [colorOption, setColorOption] = useState<Props>({
        sidebar_color: "",
        button_color: ""
    })

    const handleChange = (e: any) => {
        setColorOption({
            ...colorOption,
            [e.target.name]: e.target.value
        })
    }



    const [imgUpload, setImgUpload] = useState(false)
    const [imgurl, setImgurl] = useState(null)
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement | any>) => {
        dispatch(openLoader())
        try {


            const formData = new FormData()
            formData.append("file", e.target.files[0])
            const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)
            // console.log(data, e.target.file[0])


            if (data) {
                setImgurl(data?.fileUrl)
                setImgUpload(true)
            }




            dispatch(closeLoader());

        } catch (error: any) {
            dispatch(closeLoader());


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

    const handleCheckout = async () => {
        try {
            dispatch(openLoader())
            const { data } = await axios.get<any>("v1/setting/checkout/custom")
            if (data.code === "success") {
                setCheckoutOption(data?.custom)
                setImage(data?.custom?.merchantlogo)
                setImgUpload(false)
                setImgurl(null)
                setColorOption({
                    sidebar_color: data?.custom?.colors[0]?.value,
                    button_color: data?.custom?.colors[1]?.value
                })
                dispatch(closeLoader())

            }

        } catch (error: any) {
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: error?.response?.data?.message,
                    msgType: "error",
                })
            );
        }
    }

    // console.log(image, "colors");


    useEffect(() => {
        handleCheckout()


    }, [])

    let imageUpload = imgurl ? imgurl : image
    // console.log(image.split(), "logoo")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if (imgUrl !== "") {
        //     setImage(imgUrl)
        // }

        try {
            const { data } = await axios.post<CheckoutTypes>("/v1/setting/checkout/custom/update", {
                merchantlogo: imageUpload,
                sidebar_color: colorOption?.sidebar_color,
                button_color: colorOption?.button_color
            })
            if (data.code === "success") {
                dispatch(
                    openToastAndSetContent({
                        toastContent: data?.message,
                        msgType: "success",
                    })
                );
                setImgurl(null)
                handleCheckout()

            }
        } catch (error: any) {
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: error?.response?.data?.message,
                    msgType: "error",
                })
            );
        }
    }

    console.log("123")
    const splitImgUrl = (imgurl: string) => {
        const breakstring = imgurl.split('.')

        const filename = breakstring[0].substring(6, 14)
        console.log(`${filename}.${breakstring[1]}`, "break");
        return `${filename}.${breakstring[1]}`
    }


    return (
        <div>
            <div className={Styles.container}>
                <form onSubmit={handleSubmit} method="post" encType='multipart/form-data'>

                    <div className={Styles.webhook_header}>
                        <div>
                            <h2>Checkout Customization</h2>
                            <p>Customize your checkout to match your brand</p>
                        </div>
                        <div>
                            <button type='submit'>Save Changes</button>
                        </div>
                    </div>


                    <div className={Styles.hook_body}>
                        <div className={Styles.hook_wrapper}>
                            <div className={Styles.hook_left}>
                                <div className={Styles.hook_left_wrapper}>
                                    <div className={Styles.hook_left_logo}>
                                        {/* <img src={String(Logo)} /> */}

                                        {image === "" ? <Logo /> :
                                            <img src={image} alt="logo" />
                                        }
                                    </div>

                                    <div className={Styles.hook_left_content}>
                                        <h3 className={Styles.hook_left_contenth3}>Change business logo</h3>
                                        <p className={Styles.hook_left_contentp}>We recommend using a square shaped image that is atleast 120px by 120px for optimum results. File must be JPG or PNG.</p>
                                        <label htmlFor='logo' className={Styles.hook_left_contentbutton}>Edit logo</label>
                                        <input type="file" onChange={handleUpload} accept="image/png image/jpeg image/jpg" name="merchantlogo" id="logo" hidden />
                                        {imgUpload && <span className={Styles.imgUrl}>{imgUpload && splitImgUrl(String(imgurl))} uploaded successfully</span>}
                                    </div>
                                </div>

                                <div className={Styles.hook_left_down}>
                                    <h3 className={Styles.hook_left_downh3}>Checkout Colors</h3>
                                    <div className={Styles.hook_left_down_color}>
                                        <div className={Styles.hook_left_down_colorright}>
                                            {/* {checkoutOption?.colors?.map((x:Color))} */}
                                            <div className={Styles.hook_left_down_colorleft}>Sidebar Color:</div>
                                            <div>

                                                <input onChange={handleChange} value={colorOption.sidebar_color} className={Styles.hook_left_down_inputtext} type="text" name="sidebar_color" />
                                                <input onChange={handleChange} className={Styles.hook_left_down_inputcolor} value={colorOption.sidebar_color} type="color" name="sidebar_color" id="" />
                                            </div>
                                        </div>


                                        <div className={Styles.hook_left_down_colorright}>
                                            <div className={Styles.hook_left_down_colorleft}>Button Color:</div>
                                            <div>

                                                <input onChange={handleChange} value={colorOption.button_color} className={Styles.hook_left_down_inputtext} type="text" name="button_color" />
                                                <input onChange={handleChange} className={Styles.hook_left_down_inputcolor} value={colorOption.button_color} type="color" name="button_color" id="" />
                                            </div>
                                        </div>
                                        {/* <div className={Styles.hook_left_down_colorright}>
                                        <div className={Styles.hook_left_down_colorleft}>Focus Color:</div>
                                        <div>

                                            <input onChange={handleChange} value={colorOption.button_color} className={Styles.hook_left_down_inputtext} type="text" name="button_color" />
                                            <input onChange={handleChange} className={Styles.hook_left_down_inputcolor} value={colorOption.button_color} type="color" name="button_color" id="" />
                                        </div>
                                    </div> */}
                                    </div>

                                </div>

                            </div>
                            <div className={Styles.hook_right}>
                                {/* <div className={Styles.hook_right_heading}> */}
                                <p className={Styles.hook_right_heading}><Preview /> Preview</p>
                                {/* </div> */}
                                <div>
                                    <CheckoutSvg sidebarColor={String(colorOption.sidebar_color)} focus={String(colorOption.button_color)} image={String(image)} businessName={tradingname} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CheckoutComp
