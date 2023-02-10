import React from "react";
import Styles from "./blacklist.module.scss";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BlacklistDatatable from "./BlacklistDatatable";
const BlacklistTab = () => {
  return (
    <div>
      <div className={Styles.header__title}>
        <div>
          {" "}
          <h3> 5 Blacklisted customer</h3>
        </div>
        <div>
          <button>
            Download <FileDownloadOutlinedIcon />
          </button>
        </div>
      </div>

      <BlacklistDatatable />
    </div>
  );
};

export default BlacklistTab;
