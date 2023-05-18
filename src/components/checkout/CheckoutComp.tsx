import React, { useState } from 'react'
import Logo from "../../assets/template/logo.svg";
import Test from "../../assets/images/coverImage.svg";
import { ReactComponent as Preview } from "../../assets/template/preview.svg";
import Styles from "./CheckoutComp.module.scss"
import CheckoutSvg from './CheckoutSvg'
import { useSelector } from 'react-redux';


interface Props {
    sidebar_color: string,
    button_color: string
}

const CheckoutComp = () => {
    const { tradingname } = useSelector((state) => state?.meReducer?.me?.business);

    const [image, setImage] = useState("https://i.ibb.co/fH4x0Xk/360-F-346936114-Rax-E6-OQogebg-AWTal-E1myse-Y1-Hbb5q-PM.jpg")
    const [colorOption, setColorOption] = useState<Props>(
        {
            sidebar_color: "#041926",
            button_color: "#7FFFD4"
        })

    const handleChange = (e: any) => {
        setColorOption({
            ...colorOption,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className={Styles.container}>

                <div className={Styles.webhook_header}>
                    <div>
                        <h2>Checkout Customization</h2>
                        <p>Customize your checkout to match your brand</p>
                    </div>
                    <div>
                        <button>Save Changes</button>
                    </div>
                </div>


                <div className={Styles.hook_body}>
                    <div className={Styles.hook_wrapper}>
                        <div className={Styles.hook_left}>
                            <div className={Styles.hook_left_wrapper}>
                                <div className={Styles.hook_left_logo}>
                                    <img src={image} alt="" />
                                </div>

                                <div className={Styles.hook_left_content}>
                                    <h3 className={Styles.hook_left_contenth3}>Change business logo</h3>
                                    <p className={Styles.hook_left_contentp}>We recommend using a square shaped image that is atleast 120px by 120px for optimum results. File must be JPG or PNG.</p>
                                    <label htmlFor='logo' className={Styles.hook_left_contentbutton}>Edit logo</label>
                                    <input type="file" name="logo" id="logo" hidden />
                                </div>
                            </div>

                            <div className={Styles.hook_left_down}>
                                <h3 className={Styles.hook_left_downh3}>Checkout Colors</h3>
                                <div className={Styles.hook_left_down_color}>
                                    <div className={Styles.hook_left_down_colorright}>
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
                                <CheckoutSvg sidebarColor={colorOption.sidebar_color} focus={colorOption.button_color} image={image} businessName={tradingname} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutComp
