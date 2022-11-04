import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import style from './BusinessModal.module.scss';
import { useHistory } from 'react-router';
import './test.css';

function AccountType() {
	const [active, setActive] = useState(false);
	const [stageValue, setStageValue] = useState('individual');
	const history = useHistory();
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		if (checked) {
			setActive(true);
			setStageValue(value);
		} else {
			setActive(false);
		}
	};

	const modalHandler = () => {
		if (stageValue === 'individual') {
			history.push('/individual_signup');
		} else if (stageValue === 'business') {
			history.push('/business/signup');
		} else if (stageValue === 'business') {
			history.push('/ngo/signup');
		} else {
			return;
		}
	};

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#EFF3F8',
				width: '100%',
			}}>
			<div className={style.wrapper_radio_steps}>
				<div className='form__group'>
					<h5 style={{ fontSize: '1rem', paddingLeft: '5rem' }}>
						Select Account type
					</h5>
					<div className='form__radio-group'>
						<input
							type='radio'
							className='form__radio-input'
							id='individual'
							name='size'
							value='individual'
							defaultChecked
							onChange={changeHandler}
						/>
						<label htmlFor='individual' className='form__radio-label'>
							<span className='form__radio-button'></span>
							<div className='content'>
								<h3 className='content_h1'>Individual</h3>
								<p className='content_p'>
									Enter your details to create an account.
								</p>
							</div>
						</label>
					</div>

					<div className='form__radio-group'>
						<input
							type='radio'
							className='form__radio-input'
							id='business'
							name='size'
							value='business'
							onChange={changeHandler}
						/>
						<label htmlFor='business' className='form__radio-label'>
							<span className='form__radio-button'></span>
							<div className='content'>
								<h3 className='content_h1'>Business</h3>
								<p className='content_p'>
									Start accepting payment using our infrastructure from
									customers anywhere in the world.
								</p>
							</div>
						</label>
					</div>

					<div className='form__radio-group'>
						<input
							type='radio'
							className='form__radio-input'
							id='ngo'
							name='size'
							value='ngo'
							onChange={changeHandler}
						/>
						<label htmlFor='ngo' className='form__radio-label'>
							<span className='form__radio-button'></span>
							<div className='content'>
								<h3 className='content_h1'>NGO</h3>
								<p className='content_p'>
									Accept credit / debit cards, USSD, Bank transfer and more.
								</p>
							</div>
						</label>
					</div>
				</div>
				<div>
					<div
						style={{
							width: '100%',
							maxWidth: '465px',
							paddingBottom: '3rem',
							margin: '0 auto',
						}}>
						<Button
							variant='contained'
							style={{
								background: 'rgba(39, 174, 96, 1)',
								color: 'white',
								// marginTop: "0.8rem",
								padding: '1rem',
								// margin : '0 auto'
								margin: '0 1.4rem',
								display: 'flex',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
							fullWidth
							type='submit'
							onClick={modalHandler}>
							Continue
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountType;
