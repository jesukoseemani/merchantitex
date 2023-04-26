import { useEffect, useState } from "react";
import Styles from "./transfers.module.scss";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import Listtransfer from "./transfer/Listtransfer";
import { getDownloadedPayout, getPayoutService } from "../../services/payout";

const Payout = () => {

    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    useEffect(() => {
        getPayoutService()
        getDownloadedPayout()
    }, [])
    return (

        <div className={Styles.container}>
            {isEmpty ? <EmptyTransfers /> : <Listtransfer />}
        </div>

    );
};

export default Payout;
