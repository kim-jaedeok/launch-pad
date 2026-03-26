import type { Launch } from '../../types/launch';
import LaunchCard from './LaunchCard';
import styles from './LaunchList.module.css';

interface LaunchListProps {
  launches: Launch[];
  onSelect?: (launch: Launch) => void;
}

export default function LaunchList({ launches, onSelect }: LaunchListProps) {
  return (
    <div className={styles.list}>
      {launches.map((launch) => (
        <LaunchCard
          key={launch.id}
          launch={launch}
          onClick={() => onSelect?.(launch)}
        />
      ))}
    </div>
  );
}
