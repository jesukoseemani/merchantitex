import React from 'react'
import "./status.scss"


interface Props {
    text: string | undefined;
    type: unknown;
    // type: "Success" | "Successful" | "Pending" | "pending" | "Error" | "Declined" | "Lost" | "Abandoned" | "Approved" | "approved" | "expired" | "active" | "decline" | undefined;
}
const CustomStatus = ({ type, text }: Props) => {
    return (
        <div className={`${type}`} style={{ textTransform: "lowercase" }}>
            <span>{text && text}</span>
        </div>
    )
}

export default CustomStatus