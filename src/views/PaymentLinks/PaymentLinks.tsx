import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import DonationLinkModal from "./DonationLinkModal";
import EmptyView from "./EmptyView";
import LinksView from "./LinksView";
import LinkTypeModal from "./LinkTypeModal";
import styles from "./PaymentLinks.module.scss";
import RecurringLinkModal from "./RecurringLinkModal";
import SingleLinkModal from "./SingleLinkModal";

const PaymentLinks = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isSingleLinkModalOpen, setIsSingleLinkModalOpen] = useState<boolean>(false);
  const [isRecurringLinkModalOpen, setIsRecurringLinkModalOpen] = useState<boolean>(false);
  const [isDonationLinkModalOpen, setIsDonationLinkModalOpen] = useState<boolean>(false);

  const openSingleLinkModal = () => {
    setIsSingleLinkModalOpen(true);
    setIsLinkModalOpen(false);
  }

  const openRecurringLinkModal = () => {
    setIsRecurringLinkModalOpen(true);
    setIsLinkModalOpen(false);
  }

  const openDonationLinkModal = () => {
    setIsDonationLinkModalOpen(true);
    setIsLinkModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <LinkTypeModal 
        isOpen={isLinkModalOpen} handleClose={() => setIsLinkModalOpen(false)}
        openDonationLinkModal={openDonationLinkModal}
        openRecurringLinkModal={openRecurringLinkModal}
        openSingleLinkModal={openSingleLinkModal}
      />
      <SingleLinkModal isOpen={isSingleLinkModalOpen} handleClose={() => setIsSingleLinkModalOpen(false)} />
      <RecurringLinkModal isOpen={isRecurringLinkModalOpen} handleClose={() => setIsRecurringLinkModalOpen(false)} />
      <DonationLinkModal isOpen={isDonationLinkModalOpen} handleClose={() => setIsDonationLinkModalOpen(false)} />
      <NavBar name="Payment Links"/>
      <div className={styles.pageWrapper}>
        {
          isEmpty ? (
            <EmptyView openLinkModal={() => setIsLinkModalOpen(true)} />
          ) : (
            <LinksView openLinkModal={() => setIsLinkModalOpen(true)} />
          )
        }
      </div>
    </div>
  );
};

export default PaymentLinks;