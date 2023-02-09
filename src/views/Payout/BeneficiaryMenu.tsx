import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./beneficiaries.module.scss";
import { createStyles, makeStyles } from "@material-ui/styles";

interface MenuProps {
  openBeneficiary: boolean;
  handleCloseMenu: () => void;
  beneficiary: HTMLElement | null;
  style?: React.CSSProperties;
  data: {
    id: number;
    name: string;
    func: () => void;
  }[];
}
export default function BeneficiaryMenu({
  openBeneficiary,
  handleCloseMenu,
  data,
  beneficiary,
  style,
}: MenuProps) {
  const trigerFunction = (trigger: () => void) => {
    handleCloseMenu();

    trigger();
  };
  const useStyles = makeStyles(() =>
    createStyles({
      list: {
        padding: "0",
      },
    })
  );
  const { list } = useStyles();

  return (
    // <div>
    <Menu
      id="basic-menu"
      anchorEl={beneficiary}
      open={openBeneficiary}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      classes={{ list }}
    >
      <div className={Styles.menu__container} style={style}>
        {data.map(({ id, name, func }) => (
          <div key={id} onClick={() => trigerFunction(func)}>
            {name}
          </div>
        ))}
      </div>
    </Menu>
    // </div>
  );
}
