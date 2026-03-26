import type { Launch } from '../../types/launch';
import Badge from '../common/Badge';
import CountdownTimer from '../common/CountdownTimer';
import { formatLaunchDate } from '../../utils/date';
import styles from './LaunchCard.module.css';

interface LaunchCardProps {
  launch: Launch;
  onClick?: () => void;
}

export default function LaunchCard({ launch, onClick }: LaunchCardProps) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imageWrap}>
        {launch.image ? (
          <img src={launch.image} alt={launch.name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{launch.name}</h3>
          <Badge status={launch.status.name} />
        </div>
        <p className={styles.provider}>
          {launch.launch_service_provider.name}
        </p>
        <p className={styles.location}>
          {launch.pad.location.name}
        </p>
        {launch.mission && (
          <p className={styles.mission}>{launch.mission.description}</p>
        )}
        <div className={styles.bottomRow}>
          <span className={styles.date}>
            {formatLaunchDate(launch.net)}
            {launch.vidURLs.length > 0 && (
              <span className={styles.videoTag}> &#x25B6; Video</span>
            )}
            {launch.webcast_live && (
              <span className={styles.liveTag}>&#x1F534; LIVE</span>
            )}
          </span>
          <CountdownTimer targetDate={launch.net} />
        </div>
      </div>
    </article>
  );
}
