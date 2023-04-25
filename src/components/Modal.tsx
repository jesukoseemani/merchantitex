import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/actions/modal/modalActions';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box } from '@mui/material';

const styles = {
	main: {
		backgroundColor: 'rgba(137, 146, 163, 0.5)',
		zIndex: 1300,
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	} as React.CSSProperties,
	messageBox: {
		backgroundColor: 'white',
		width: 'auto',
		minWidth: '300px',
		maxHeight: "95vh",
		overflow: 'auto',
		position: 'relative',
		// background: "red"
		borderRadius: "20px !important"
	} as React.CSSProperties,
};

export default function Modal() {
	const modalProps = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const { modalOpened, modalContent, modalStyles, modalTitle } = modalProps;
	const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		dispatch(closeModal());
	};
	return (
		<>
			{modalOpened ? (
				<div style={{ ...styles.main, left: 0 }} onClick={(e) => Close(e)}>
					<div style={{ ...styles.messageBox, ...modalStyles }}>



						{modalTitle && <Box sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							borderBottom: "1px solid #E0E0E0",
							padding: "20px 40px",
							// height: "100px"
							position: "sticky",
							top: 0,
							marginBottom: "27px",
							zIndex: "9999 !important",
							background: "#fff",

						}}>
							<Box>
								<h2 style={{
									fontFamily: 'Avenir',
									fontStyle: "normal",
									fontWeight: "500",
									fontSize: "18px",
									lineHeight: "25px",
									color: " #000000",
								}}>

									{modalTitle && modalTitle}</h2>
							</Box>
							<Box>
								<ClearOutlinedIcon
									style={{
										zIndex: 99999,
										cursor: 'pointer',
										// position: 'absolute',
										// top: '20px',
										// right: '40px',
									}}
									onClick={(e: any) => Close(e)}
									sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
								/>
							</Box>

						</Box>}

						<Box sx={{
							borderRadius: "0px !important",
							'.css-1xvpoxq': {
								borderRadius: "0px"
							}
						}}
							onClick={(e) => {
								e.stopPropagation();
							}}>
							{modalContent && modalContent}
						</Box>
					</div>
				</div>
			) : null}
		</>
	);
}
