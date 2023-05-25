import { useEffect, useState } from "react";
import Styles from "./transfers.module.scss";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import Listtransfer from "./transfer/Listtransfer";
import { getDownloadedPayout, getPayoutService } from "../../services/payout";
import { PayoutRes } from "../../types/Payout";
import { useLocation } from "react-router-dom";
import { stripEmpty, stripSearch } from "../../utils";
import FilterModal from "../../components/filterModals/PayoutFilterModal";
import { REFUND_FILTER_DATA } from "../../constant";
import Navigation from "../../components/navbar/Navigation";

const Payout = () => {

    const [isData, setIsData] = useState<boolean>(false);
    const [payout, setPayout] = useState<PayoutRes | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const { search } = useLocation()


    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const call = async (form = REFUND_FILTER_DATA) => {
        const res = await getPayoutService(stripEmpty({ page: pageNumber, perpage: 5, search: stripSearch(search), ...form }))
        setPayout(res);
        setIsData(!!res?.payouts?.length)
    }

    useEffect(() => {
        call()
    }, [search, pageNumber])

    const action = (form: typeof REFUND_FILTER_DATA) => {
        call(form)
    }


    return (

        <Navigation title="Payout">
            <div className={Styles.container}>
                <FilterModal
                    isOpen={isFilterModalOpen}
                    handleClose={() => setIsFilterModalOpen(false)}
                    action={action}
                />
                {!isData ? <EmptyTransfers /> : <Listtransfer payout={payout!} setOpen={() => setIsFilterModalOpen(true)} changePage={changePage} />}
            </div>

        </Navigation>

    );
};

export default Payout;
