import { useCountdown } from '../../hooks/useCountdown';
import { pad } from '../../utils/date';
import styles from './CountdownTimer.module.css';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds, total } = useCountdown(targetDate);

  if (total <= 0) {
    return <span className={styles.launched}>LAUNCHED</span>;
  }

  return (
    <div className={styles.countdown}>
      <span className={styles.prefix}>T-</span>
      {days > 0 && (
        <>
          <span className={styles.value}>{days}</span>
          <span className={styles.unit}>d</span>
        </>
      )}
      <span className={styles.value}>{pad(hours)}</span>
      <span className={styles.sep}>:</span>
      <span className={styles.value}>{pad(minutes)}</span>
      <span className={styles.sep}>:</span>
      <span className={styles.value}>{pad(seconds)}</span>
    </div>
  );
}
