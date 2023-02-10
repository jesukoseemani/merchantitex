import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, Stack, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Styles from "./beneficiaryFilter.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #D5DAE1",
  boxShadow: "0px 10px 10px rgba(6, 44, 82, 0.92)",
  p: 3,
  borderRadius: 3,
};

interface openFilterModal {
  filterOpen: Boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}
export default function BeneficiaryFilterModal({
  filterOpen,
  setFilterOpen,
}: openFilterModal) {
  const useStyles = makeStyles({
    button: {
      "&:active": {
        boxShadow: "none",
        background: "green",
        color: "#fff",
      },
    },
  });

  const { button } = useStyles();

  const handleClose = () => setFilterOpen(false);

  const [activeDate, setActiveDate] = React.useState<number>(0);

  //   dropdown

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <Modal
        keepMounted
        open={filterOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div className={Styles.filterHeader}>
            <h3>Filters</h3>
            <div
              className="closeFilter"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            >
              <CloseOutlinedIcon />
            </div>
          </div>

          <div className={Styles.filter__body}>
            <div className="date">
              <h3>Date range</h3>
              <div className="buttonGroup">
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  className={Styles.filter__data_range}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setActiveDate(0)}
                    className={activeDate === 0 ? button : ""}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveDate(1)}
                    className={activeDate === 1 ? button : ""}
                  >
                    Last 7 days
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveDate(2)}
                    className={activeDate === 2 ? button : ""}
                  >
                    30 Days
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveDate(3)}
                    className={activeDate === 3 ? button : ""}
                  >
                    1 year
                  </Button>
                </Stack>
              </div>
              <div className={Styles.customRange}>
                <h3>Custom date range</h3>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <input type="text" placeholder="Start Date" />
                  <ArrowRightAltOutlinedIcon />
                  <input type="text" placeholder="Start Date" />
                </Stack>
              </div>

              <div className={Styles.type}>
                <h3>Type</h3>
                {/* <br/> */}
                <FormControl fullWidth size="small">
                  <Select
                    //   id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    fullWidth
                    label="Age"
                  >
                    <MenuItem value="" style={{ width: "100%" }}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10} style={{ width: "100%" }}>
                      Twenty
                    </MenuItem>
                    <MenuItem value={21} style={{ width: "100%" }}>
                      Twenty one
                    </MenuItem>
                    <MenuItem value={22} style={{ width: "100%" }}>
                      Twenty one and a half
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={Styles.type}>
                <h3>Bank Name</h3>
                {/* <br/> */}
                <FormControl fullWidth size="small">
                  <Select
                    //   id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    fullWidth
                    label="Age"
                  >
                    <MenuItem value="" style={{ width: "100%" }}>
                      <em>Select Bank</em>
                    </MenuItem>
                    <MenuItem value={10} style={{ width: "100%" }}>
                      Access
                    </MenuItem>
                    <MenuItem value={21} style={{ width: "100%" }}>
                      First Bank
                    </MenuItem>
                    <MenuItem value={22} style={{ width: "100%" }}>
                      Union Bank
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className={Styles.filter__footer}>
            <div className={Styles.footer__btn}>
              <Button variant="contained" color="primary">
                Clear Filter
              </Button>
              <Button variant="contained" color="primary">
                Apply Filter
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
