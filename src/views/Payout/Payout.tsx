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
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import { useDispatch } from "react-redux";

const Payout = () => {

    const [isData, setIsData] = useState<boolean>(false);
    const [isfilter, setIsFilter] = useState<boolean>(false);
    const [payout, setPayout] = useState<PayoutRes | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const { search } = useLocation()
    const dispatch = useDispatch()


    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const call = async (form = REFUND_FILTER_DATA) => {
        dispatch(openLoader());
        const res = await getPayoutService(stripEmpty({ page: pageNumber, perpage: 5, search: stripSearch(search), ...form }))
        setPayout(res);
        dispatch(closeLoader());
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
                {!isData && !isfilter ? <EmptyTransfers /> : <Listtransfer setIsFilter={setIsFilter} payout={payout!} setOpen={() => setIsFilterModalOpen(true)} changePage={changePage} />}
            </div>

        </Navigation>

    );
};

export default Payout;
