import { useEffect, useState } from "react";
import Styles from "./transfers.module.scss";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import Listtransfer from "./transfer/Listtransfer";
import { getDownloadedPayout, getPayoutService } from "../../services/payout";
import { PayoutRes } from "../../types/Payout";
import { useLocation } from "react-router-dom";
import { stripSearch } from "../../utils";

const Payout = () => {

    const [isData, setIsData] = useState<boolean>(false);
    const [payout, setPayout] = useState<PayoutRes | null>(null);
    const { search } = useLocation()

    useEffect(() => {
        (async () => {
            const res = await getPayoutService({ search: stripSearch(search) })
            setPayout(res);
            setIsData(!!res?.payouts?.length)
        })()
    }, [search])
    return (

        <div className={Styles.container}>
            {!isData ? <EmptyTransfers /> : <Listtransfer payout={payout!} />}
        </div>

    );
};

export default Payout;
