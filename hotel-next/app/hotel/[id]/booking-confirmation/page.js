import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default async function ConfirmationPage({ params, searchParams }) {
  // Sample booking data coming from params or fetched via params.id
  const { id } = params;
  // assume searchParams carries baseFare, taxes
  const baseFare = searchParams.baseFare || '8000';
  const taxes = searchParams.taxes || '750';
  const total = +baseFare + +taxes;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Confirmed</h1>
      <div className={styles.summary}>
        <div className={styles.row}>
          <span>Base Fare</span>
          <span>₹{baseFare}</span>
        </div>
        <div className={styles.row}>
          <span>Taxes &amp; fees</span>
          <span>₹{taxes}</span>
        </div>
        <div className={styles.row}>
          <span>Local Taxes (if applicable)</span>
          <span>₹0</span>
        </div>
        <div className={styles.total}>
          <span>Total amount</span>
          <span>₹{total}</span>
        </div>
      </div>
      <p className={styles.notice}>
        Rates are quoted in ₹. This property will collect any additional mandatory tax at check‑in or check‑out.
      </p>
      <button className={styles.home}>Back to Home</button>
    </div>
  );
}
