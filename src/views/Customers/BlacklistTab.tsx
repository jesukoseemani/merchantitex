import { TabStateType, useTableStyles } from "./Customers";
import TabPanel from "./TabPanel";
import styles from "./Customers.module.scss";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { blacklistTableData, blacklistTableTitles } from "./blacklistData";

interface BlacklistTabProps {
  value: TabStateType;
  index: TabStateType;
  listView: boolean;
  setListView: Dispatch<SetStateAction<boolean>>;
}

const BlacklistTab = ({ value, index, listView, setListView }: BlacklistTabProps) => {
  const theme = useTheme();

  const useBtnStyles = makeStyles({
    root: {
      fontFamily: `'Roboto', sans-serif`,
      display: 'flex',
      gap: '1rem',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      },
      '& .MuiButtonBase-root': {
        borderRadius: '.25rem',
        padding: '.5rem 1rem',
        textTransform: 'none',
        fontSize: '.875rem',
        fontWeight: '400',
        alignItem: 'center',
        display: 'flex'
      },
      '& .MuiButtonBase-root:nth-child(1)': {
        backgroundColor: '#E0E0E0',
        color: '#333'
      },
      '& .MuiButtonBase-root:nth-child(2)': {
        backgroundColor: '#27AE60',
        color: '#FFF',
        gap: '.5rem',
      },
      '& svg': {
        fontSize: '1rem'
      }
    },
  });

  const btnClasses = useBtnStyles(); 
  const tableClasses = useTableStyles();

  return (
    <TabPanel value={value} index={index}>
      {
        !listView ? (
          <div className={styles.blacklistFlex}>
            <div>
              <div>
                <CloudUploadOutlinedIcon />
              </div>
              <p>Email List</p>
              <p>0 items</p>
              <p>Not updated</p>
              <p onClick={() => setListView(true)}>Open list</p>
            </div>
            <div></div>
            <div>
              <div>
                <CloudUploadOutlinedIcon />
              </div>
              <p>Card PAN List</p>
              <p>6 items</p>
              <p>Updated 12 months ago</p>
              <p onClick={() => setListView(true)}>Open list</p>
            </div>
            <div></div>
            <div>
              <div>
                <CloudUploadOutlinedIcon />
              </div>
              <p>IP Address List</p>
              <p>234 items</p>
              <p>Not updated</p>
              <p onClick={() => setListView(true)}>Open list</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.historyTopContainer}>
              <div>
                <p>10 Customers</p>
              </div>
              <div className={btnClasses.root}>
                <Button>
                  Download <ArrowDropDownIcon />
                </Button>
                <Button>
                  Add customer <CloudUploadOutlinedIcon />
                </Button>
              </div>
            </div>
            <div className={tableClasses.root}>
              <TableContainer component={Box}>
                <Table sx={{ minWidth: 500 }} aria-label="customer table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(blacklistTableData[0]).map((tableKey) => (
                        <TableCell key={tableKey}>
                          {blacklistTableTitles[tableKey]}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {blacklistTableData
                      .map((tableRow) => (
                        <TableRow key={Math.random()} hover>
                          {Object.keys(tableRow).map((rowKey) => (
                            <TableCell
                              key={rowKey}
                            >
                              {tableRow[rowKey as keyof typeof tableRow]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        )
      }
    </TabPanel>
  )
}

export default BlacklistTab