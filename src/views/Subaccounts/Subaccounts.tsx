import { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import AcctView from "./AcctView";
import AddAcctModal from "./AddAcctModal";
import EmptyView from "./EmptyView";
import styles from "./Subaccounts.module.scss";

const Subaccounts = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const changeView = () => {
    setIsModalOpen(false);
    setIsEmpty(false);
  }

  return (

    <div className={styles.container}>
      <AddAcctModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      {/* <NavBar name="Subaccounts"/> */}
      <div className={styles.pageWrapper}>
        {
          isEmpty ? (
            <EmptyView openModal={() => setIsModalOpen(true)} />
          ) : (
            <AcctView setIsModalOpen={setIsModalOpen} />
          )
        }
      </div>
    </div>
  );
};

export default Subaccounts;