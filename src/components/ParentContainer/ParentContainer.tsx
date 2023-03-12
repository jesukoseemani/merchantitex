import React, { ReactNode, useState } from "react";
import Header from "../navbar/Header";
import NavBar from "../navbar/NavBar";
import styles from "./Parentcontainer.module.scss";



interface headerProps {
  children: ReactNode,

}
interface toggleBtn {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean

}


export default function ParentContainer({ children }: headerProps) {
  const [toggle, setToggle] = useState(false)
  console.log(toggle)
  return (
    <div className={styles.parent}>
      <div className={toggle ? styles.showToggge : styles.sidebars}>
        <NavBar />

      </div>


      <div className={styles.main__container}>
        <div className={styles.header}>
          {/* <Header toggle={toggle} setToggle={setToggle} /> */}
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}
