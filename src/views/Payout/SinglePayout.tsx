import Styles from "./transfers.module.scss";

const SinglePayout = () => {

    return (

        <div className={Styles.container}>

            <div className={Styles.panel}>
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
            </div>
        </div>

    );
};

export default SinglePayout;
