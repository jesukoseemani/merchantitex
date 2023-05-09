// const ItexModalPayout = () => {
//     const [form, setForm] = useState(DATA)
//     const handleChange = (value: string, key: string) => {
//         setForm({
//             ...form,
//             [key]: value
//         })
//     }
//     return (

//         <div className={Styles.modalContainer}>

//             <Form.Field className={Styles.inputWrapper}>
//                 <label>Balance to be debited</label>
//                 <Select
//                     placeholder="NGN balance - 123,456.78"
//                     options={formattedBalance}
//                     onChange={(e: any, value: any) => handleChange(value.value, 'balance')}
//                     className={Styles.select}

//                 />
//             </Form.Field>
//             <Form.Field className={Styles.inputWrapper}>
//                 <label>Payout amount</label>

//                 <input placeholder="NGN 0.0" onChange={e => handleChange(e.target.value, 'amount')} className={Styles.select} />
//             </Form.Field>
//             <Form.Field className={Styles.inputWrapper}>
//                 <label>Select beneficiary account</label>
//                 <Select
//                     placeholder="Select beneficiary account"
//                     options={formattedAccount}
//                     onChange={(e: any, value: any) => handleChange((value.value), 'account')}
//                     className={Styles.select}

//                 />        </Form.Field>
//             <Form.Field className={Styles.inputWrapper}>
//                 <label>Payout desciption (optional)</label>
//                 <input placeholder="e.g Thank you" onChange={e => handleChange(e.target.value, 'description')} />
//             </Form.Field>
//             <p className={Styles.warning}>
//                 <WarningIcon />
//                 You will be charged <span> NGN45</span> fee for this transaction
//             </p>
//             <div className={Styles.modalFooter}>
//                 <Button onClick={() => handleSubmit(form)} disabled={!form.balance || !form.amount || !form.account}>Submit</Button>


import React from 'react'

const Addpayout = () => {
    return (
        <div>Addpayout</div>
    )
}

export default Addpayout