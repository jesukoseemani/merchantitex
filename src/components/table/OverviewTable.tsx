import React from "react";
import Styles from "./overview.module.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

interface propTypes {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function OverviewTable({
  title,
  children,
  subTitle,
  style
}: propTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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

      <div className={Styles.header}>
        <div className={Styles.overview__header}>
          <h2>{title}</h2>
          <span>{subTitle}</span>
        </div>
      </div>
      <div className={Styles.tableContent}>{children}</div>
    </div>
  );
}
