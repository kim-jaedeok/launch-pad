import styles from './Badge.module.css';

type BadgeVariant = 'go' | 'tbd' | 'hold' | 'success' | 'live';

const variantMap: Record<string, BadgeVariant> = {
  Go: 'go',
  'Go for Launch': 'go',
  TBD: 'tbd',
  TBC: 'tbd',
  Hold: 'hold',
  Success: 'success',
  'Launch Successful': 'success',
};

export default function Badge({ status }: { status: string }) {
  const variant = variantMap[status] ?? 'tbd';
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}
