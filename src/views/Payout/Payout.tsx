import { useEffect, useState } from "react";
import Styles from "./transfers.module.scss";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import Listtransfer from "./transfer/Listtransfer";
import { getPayoutService } from "../../services/payout";

const Payout = () => {

    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    useEffect(() => {
        getPayoutService()
    }, [])
    return (

        <div className={Styles.container}>

            {/* <div className={Styles.panel}>
                <div>
                    <div>
                        <span>Payout balance:</span>
                        <h2>NGN 2,345,678.00</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Total transfer value:</span>
                        <h2>NGN 2,345,678.00</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Successful transfers:</span>
                        <h2>22</h2>
                    </div>
                </div>
            </div> */}
            {isEmpty ? <EmptyTransfers /> : <Listtransfer />}
        </div>

    );
};

export default Payout;
