import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./beneficiaries.module.scss";

interface MenuProps {
  openBeneficiary: boolean;
  handleCloseMenu: () => void;
  beneficiary: HTMLElement | null;
  datas: {
    id: number;
    name: string;
    func: () => void;
  }[];
}
export default function BeneficiaryDownload({
  openBeneficiary,
  handleCloseMenu,
  datas,
  beneficiary,
}: MenuProps) {
  const trigerFunction = (trigger: () => void) => {
    handleCloseMenu();

    trigger();
  };
  
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={beneficiary}
        open={openBeneficiary}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={Styles.menu__container}>
          {datas.map(({ id, name, func }) => (
            <div key={id} onClick={() => trigerFunction(func)}>
              {name}
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}
