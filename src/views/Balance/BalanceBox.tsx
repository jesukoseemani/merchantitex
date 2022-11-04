import styles from './Balance.module.scss';

interface BalanceBoxProps {
  currency: string;
  availablebalance: string;
  ledgerbalance: string;
  bankName: string;
  acct: string;
}

const BalanceBox = ({ currency, availablebalance, ledgerbalance, acct, bankName }: BalanceBoxProps) => {
  return (
    <div className={styles.bottomBoxContainer}>
      <div>
        <div>
          <h3>{currency} Balance</h3>
        </div>
        <div>
          <p>{acct} {bankName ? `(${bankName})` : ''}</p>
        </div>
      </div>
      <hr />
      <div>
        <p>Available balance</p>
        <p>{currency} {availablebalance}</p>
      </div>
      <div>
        <p>Ledger balance</p>
        <p>{currency} {ledgerbalance}</p>
      </div>
    </div>
  )
}

export default BalanceBox