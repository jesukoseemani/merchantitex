import React from 'react'
import FormatToCurrency from '../../helpers/NumberToCurrency'
import styles from "./toast.module.scss"


interface Props {
    currency: string;
    amount: number;
}
const CustomCurrencyFormat = ({ currency, amount }: Props) => {
    return (
        <div className={styles.currencyFormat}>
            <span className={styles.currency}>{currency} </span>
            <h2 className={styles.amount}>  {FormatToCurrency(amount)}</h2>
        </div>
    )
}

export default CustomCurrencyFormat