import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import styles from './Balance.module.scss';
import { InputLabel, TextField } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactComponent as Copy } from '../../assets/images/newcopyicon.svg';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CopyText from '../../helpers/CopyId';
interface BalanceBoxProps {
	currency: string;
	availablebalance: string;
	ledgerbalance: string;
}

const BalanceBox = ({
	currency,
	availablebalance,
	ledgerbalance,
}: BalanceBoxProps) => {
	const dispatch = useDispatch();
	const validate = Yup.object({
		limit: Yup.string().required('Role is required'),
	});
	const setLimitHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '550px',
					height: '347px',
					width: '100%',
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>Set low limits ({currency})</h1>
						</div>

						<div className={styles.buttonModalwrap}>
							<p className={styles.removeModal_p}>
								Allow us inform you to top-up your balance anytime it exceeds
								the specified level by setting a minimum limit for this wallet.
							</p>
							<div style={{ marginTop: '30px' }}>
								<Formik
									initialValues={{
										limit: '',
									}}
									validationSchema={validate}
									onSubmit={(values) => console.log(values)}>
									{(props) => (
										<div>
											<InputLabel>
												<span className={styles.formTitle}>
													Enter a low limit
												</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name='email'>
														{(msg) => (
															<span style={{ color: 'red' }}>{msg}</span>
														)}
													</ErrorMessage>
												}
												name='limit'
												variant='outlined'
												margin='normal'
												type='text'
												size='small'
												fullWidth
											/>

											<div className={styles.buttonModal}>
												<button
													style={{ background: '#E0E0E0', color: '#333333' }}
													className={styles.removeModal}>
													Cancel
												</button>
												<button className={styles.removeModal}>
													Set low limit
												</button>
											</div>
										</div>
									)}
								</Formik>
							</div>
						</div>
					</div>
				),
			})
		);
	};
	const copyId = (Id: string | number): any => {
		CopyText(Id);
		dispatch(
			openToastAndSetContent({
				toastContent: (
					<div className={styles.toastContainer}>
						<Copy />
						<span className={styles.productId}> {Id} </span> <span>Copied</span>
					</div>
				),
				toastStyles: {
					backgroundColor: 'green',
				},
			})
		);
	};

	const fundHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '550px',
					height: '624px',
					width: '100%',
				},
				modalContent: (
					<div className={styles.modalDiv}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>Fund balance({currency})</h1>
						</div>

						<div className={styles.buttonModalwrap}>
							<p className={styles.removeModal_p}>
								You can fund your balance by transferring to any of the accounts
								below
							</p>
							<div style={{ marginTop: '30px' }}>
								<div className={styles.bankcomp}>
									<h3 className={styles.bankcomp_h3}>Account 1</h3>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Account number </p>
										<p className={styles.bankcomp_dark}>
											8327217507{' '}
											<span
												onClick={() => copyId('8327217507')}
												className={styles.bankcomp_span}>
												<Copy />
											</span>
										</p>
									</div>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Account name</p>
										<p className={styles.bankcomp_dark}>ITEX/Adamu Bello</p>
									</div>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Bank Name</p>
										<p className={styles.bankcomp_dark}>Wema Bank</p>
									</div>
								</div>

								<div style={{ marginTop: '30px' }} className={styles.bankcomp}>
									<h3 className={styles.bankcomp_h3}>Account 2</h3>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Account number</p>
										<p className={styles.bankcomp_dark}>
											8327217507{' '}
											<span
												onClick={() => copyId('8327217507')}
												className={styles.bankcomp_span}>
												<Copy />
											</span>
										</p>
									</div>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Account name</p>
										<p className={styles.bankcomp_dark}>ITEX/Adamu Bello</p>
									</div>
									<div className={styles.bankcomp_flex}>
										<p className={styles.bankcomp_light}>Bank Name</p>
										<p className={styles.bankcomp_dark}>Wema Bank</p>
									</div>
								</div>
							</div>
							<button
								style={{
									backgroundColor: '#27AE60',
									padding: '0.7rem',
									width: '100%',
									color: '#fff',
									border: 'none',
									borderRadius: '4px',
									cursor: 'pointer',
									marginTop: '80px',
								}}
								type='submit'
								color='primary'>
								Okay
							</button>
						</div>
					</div>
				),
			})
		);
	};
	return (
		<div className={styles.bottomBoxContainer}>
			<div>
				<div>
					<h3>{currency} Balance</h3>
				</div>
				<div>
					<button onClick={setLimitHandler} className={styles.limitbutton}>
						Set low limits
					</button>
					<button onClick={fundHandler} className={styles.fundbutton}>
						Fund balance
					</button>
				</div>
			</div>
			<hr />
			<div>
				<p>Collection balance</p>
				<p>
					{currency} {availablebalance}
				</p>
			</div>
			<div>
				<p>Payout balance</p>
				<p>
					{currency} {ledgerbalance}
				</p>
			</div>
		</div>
	);
};

export default BalanceBox;
