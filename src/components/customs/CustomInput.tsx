import React from 'react'
import Styles from "./style.module.scss";

interface Props {

    className?: string;
    id?: string | undefined;
    label?: string | number;
    name?: string | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    style?: React.CSSProperties;
    type?: React.HTMLInputTypeAttribute | undefined;
    value?: string | number | readonly string[] | undefined;
    labelStyle?: React.CSSProperties | undefined
    inputStyle?: React.CSSProperties | undefined

}

const CustomInput = ({ label, placeholder, value, type, name, id, onBlur, onChange, labelStyle, inputStyle, ...props }: Props) => {
    return (
        <div className={Styles.customInput}><label htmlFor={id} style={labelStyle}>{label}</label>
            <input type={type} value={value} name={name} id={id} onChange={onChange} placeholder={placeholder} onBlur={onBlur} style={inputStyle} {...props} />
        </div>
    )
}

export default CustomInput