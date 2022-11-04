import React from "react";
import Styles from "./overview.module.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, Button } from "semantic-ui-react";

interface propTypes {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export default function OverviewTable({
  title,
  children,
  subTitle,
}: propTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const useStyles = makeStyles({
    root: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "20.13px",
      display: "inline",
      color: "#fff",
    },
    container: {
      width: "303px",
      height: "auto",
      minHeight: "338px",
      background: "#ffffff",
      border: "1px solid #d5dae1",
      boxShadow: " 0px 10px 10px rgba(6, 44, 82, 0.92)",
      borderRadius: "3px",
    },
    drawerPaper: {
      width: "511px",
      background:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11)), #121212 !important",
    },
  });
  const classes = useStyles();

  const dateOptions = [
    {
      key: 1,
      text: "Past 7 days",
      value: "past_7_days",
    },
    {
      key: 1,
      text: "Past month",
      value: "past_month",
    },
    {
      key: 1,
      text: "yesterday",
      value: "yesterday",
    },
    {
      key: 1,
      text: "today",
      value: "today",
    },
  ];

  return (
    <div className={Styles.container}>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.container }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={Styles.menuContainer}>
          <div className={Styles.menuHeader}>
            <h2>Filters</h2>
          </div>
          <div className={Styles.menuContent}>
            <div>
              <span>Date</span>
              <Dropdown
                id="dateOptions"
                placeholder="Past 7 days"
                search
                selection
                options={dateOptions}
              />
            </div>
            <div>
              <span>Type</span>
              <Dropdown
                placeholder="Volume"
                id="typeOptions"
                search
                selection
                options={dateOptions}
              />
            </div>
          </div>
          <div className={Styles.menuFooter}>
            <Button>Clear filter</Button>
            <Button>Apply filter</Button>
          </div>
        </div>
      </Menu>
      <div className={Styles.header}>
        <div>
          <h2>{title}</h2>
          <span>{subTitle}</span>
        </div>
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </div>
      <div className={Styles.tableContent}>{children}</div>
    </div>
  );
}
