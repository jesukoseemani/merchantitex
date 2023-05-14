import Styles from "./transfers.module.scss";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import { useDispatch } from "react-redux";
import Addpayout from '../../views/Payout/transfer/Addpayout';


export default function EmptyTransfers() {
  const dispatch = useDispatch();



  const MakePayout = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: "419px",
          minHeight: "617px",
          borderRadius: '20px',
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
        },
        modalTitle: "Make a payout",
        modalContent: (
          <div className='modalDiv'>

            <Addpayout />
          </div>
        ),
      })
    );
  }





  return (
    <>
      <div className={Styles.container}>
        <h2>You have not made any payouts</h2>
        <p>
          But, you can change that. You can start by initiating your first to a bank account.
        </p>
        <button onClick={MakePayout}>
          Make a payout

        </button>

      </div>
    </>
  );
}
