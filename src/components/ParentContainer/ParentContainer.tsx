import React, { ReactNode } from "react";
import Header from "../navbar/Header";
import NavBar from "../navbar/NavBar";
import styles from "./Parentcontainer.module.scss";



interface headerProps {
  children: ReactNode,

}


export default function ParentContainer({ children }: headerProps) {
  return (
    <div className={styles.parent}>
      <div className={styles.sidebars}>
        <NavBar />
      </div>

      <div className={styles.main__container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}
