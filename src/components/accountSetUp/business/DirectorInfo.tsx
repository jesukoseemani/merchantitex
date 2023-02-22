import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box } from '@mui/material'
import Buttons from '../Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


interface Props {
    handleNext: () => void;
    handleBack: () => void;

}

const DirectorInfo = ({ handleBack, handleNext }: Props) => {
    const handleOnChange = () => { }
    return (
        <Box sx={{ color: "#222" }}>


            <Grid container columnGap={0} justifyContent={"flex-start"} alignItems="center">
                <Grid item xs={2.8}><Box>First Director’s Information</Box></Grid>
                <Grid item xs={8.2}><Box sx={{
                    width: "100%",
                    borderBottom: "1px dashed  #E0E0E0"
                }}></Box></Grid>
                <Grid item xs={1}><ExpandCircleDownOutlinedIcon /></Grid>
            </Grid>
            <Grid container columnSpacing={6} justifyContent="space-between">

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Director's full name</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Director 's fullname" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Director's eail address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Director's eail address" />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Director's BVN</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Director's BVN" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Director's phone number</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Director's phone number" />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Director's Address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Director's ddress" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Upload an ID </InputLabel>

                    <Button variant="outlined" fullWidth component="label"
                        style={{
                            background: "#F6F9FD",
                            fontSize: "14px", color: "#4F4F4F",
                            height: 49,
                            border: "1px dashed #7A9CC4",
                            borderRadius: 4,
                            fontWeight: 300,
                            fontFamily: "Avenir",
                            textTransform: "inherit"
                        }}>
                        <CloudUploadOutlinedIcon />   choose file to upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <FormHelperText id="component-helper-text" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", color: "#8B8B8B", fontFamily: "Avenir", fontSize: "12px", }}>
                        <ErrorOutlineIcon /> <span style={{ marginLeft: "-22px" }}>Only PDF, JPG and PNG are the accepted file formats</span>
                    </FormHelperText>
                </Grid>


                <Grid item xs={12} sm={6} md={6}></Grid>
                <br />
                <Stack direction="row" spacing={3} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
                    <Buttons backgroundColor='transparent' color='#333' border='1px solid green' onClick={handleBack}>Previous</Buttons>
                    <Buttons onClick={handleNext}>continue</Buttons>
                </Stack>

            </Grid>

        </Box>
    )
}

export default DirectorInfo