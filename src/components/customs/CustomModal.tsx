import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import styles from "./modal.module.scss"
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: "20px !important",
    maxHeight: "97vh",
    zIndex: "999",



};

interface Props {
    children: React.ReactNode,
    isOpen: boolean;
    close: () => void;
    handleClose: () => void,
    title: string

}
export default function CustomModal({ children, isOpen, handleClose, close, title }: Props) {
    // const [open, setOpen] = React.useState(false);


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        // height="56px"
                        py={"20px"}
                        position="fixed"
                        px="50px"
                        display="flex"
                        flexDirection="row"
                        width={"100%"}
                        zIndex="9999 !important"
                        alignItems="center"
                        justifyContent="space-between"
                        bgcolor="#fff"
                        borderRadius={"20px 20px 0 0px"}
                        borderBottom={"1px solid #E0E0E0"}

                    >
                        <h2 className={styles.titleText}>{title}</h2>
                        <IconButton onClick={handleClose}>
                            <CloseOutlined />
                        </IconButton>
                    </Box>
                    <Box
                        p="22px 50px"
                        className={styles.modal__btn}
                        mt={"3rem"}
                        sx={{ overFlow: "auto" }}
                    >{children}</Box>
                </Box>
            </Modal>
        </div>
    );
}