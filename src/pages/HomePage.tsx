import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useUpcomingLaunches } from '../hooks/useUpcomingLaunches';
import { useCountdown } from '../hooks/useCountdown';
import Badge from '../components/common/Badge';
import LaunchDetail from '../components/launches/LaunchDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorFallback from '../components/common/ErrorFallback';
import { formatLaunchDate, pad } from '../utils/date';
import type { Launch } from '../types/launch';
import styles from './HomePage.module.css';

function HeroCountdown({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds, total } = useCountdown(targetDate);

  if (total <= 0) {
    return <div className={styles.heroCountdown}><span className={styles.launched}>LAUNCHED</span></div>;
  }

  return (
    <div className={styles.heroCountdown}>
      <span className={styles.prefix}>T-</span>
      {days > 0 && (
        <div className={styles.unit}>
          <span className={styles.num}>{days}</span>
          <span className={styles.unitLabel}>DAYS</span>
        </div>
      )}
      <div className={styles.unit}>
        <span className={styles.num}>{pad(hours)}</span>
        <span className={styles.unitLabel}>HRS</span>
      </div>
      <span className={styles.sep}>:</span>
      <div className={styles.unit}>
        <span className={styles.num}>{pad(minutes)}</span>
        <span className={styles.unitLabel}>MIN</span>
      </div>
      <span className={styles.sep}>:</span>
      <div className={styles.unit}>
        <span className={styles.num}>{pad(seconds)}</span>
        <span className={styles.unitLabel}>SEC</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { launches: allLaunches, isLoading, error, refetch } = useUpcomingLaunches();
  const launches = allLaunches.slice(0, 5);
  const [selected, setSelected] = useState<Launch | null>(null);
  const next = launches[0];

  return (
    <main className={styles.page}>
      {isLoading && <LoadingSpinner message="Fetching launch data..." />}
      {error && <ErrorFallback message={error} onRetry={refetch} />}

      {next && (
        <>
          {/* Hero: Next Launch */}
          <section className={styles.hero} onClick={() => setSelected(next)}>
            {next.image && (
              <img src={next.image} alt="" className={styles.heroBg} />
            )}
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <span className={styles.heroLabel}>NEXT LAUNCH</span>
              <h1 className={styles.heroTitle}>{next.name}</h1>
              <div className={styles.heroMeta}>
                <Badge status={next.status.name} />
                <span className={styles.heroProvider}>{next.launch_service_provider.name}</span>
                <span className={styles.heroDate}>{formatLaunchDate(next.net)}</span>
              </div>
              <HeroCountdown targetDate={next.net} />
              <p className={styles.heroLocation}>{next.pad.location.name}</p>
              {next.vidURLs.length > 0 && (
                <span className={styles.heroVideo}>&#x25B6; Watch Launch</span>
              )}
            </div>
          </section>

          {/* Upcoming list */}
          {launches.length > 1 && (
            <section className={styles.upcoming}>
              <h2 className={styles.sectionTitle}>Coming Up</h2>
              <div className={styles.upcomingList}>
                {launches.slice(1).map((l) => (
                  <div
                    key={l.id}
                    className={styles.upcomingCard}
                    onClick={() => setSelected(l)}
                  >
                    <div className={styles.upcomingImage}>
                      {l.image ? (
                        <img src={l.image} alt="" />
                      ) : (
                        <div className={styles.upcomingPlaceholder}>&#x1F680;</div>
                      )}
                    </div>
                    <div className={styles.upcomingInfo}>
                      <span className={styles.upcomingName}>{l.name}</span>
                      <span className={styles.upcomingMeta}>
                        {l.launch_service_provider.name} &middot; {formatLaunchDate(l.net)}
                      </span>
                    </div>
                    <div className={styles.upcomingRight}>
                      <Badge status={l.status.name} />
                      {l.vidURLs.length > 0 && (
                        <span className={styles.upcomingVideoTag}>&#x25B6;</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.launches} className={styles.viewAll}>
                View All Launches &rarr;
              </Link>
            </section>
          )}
        </>
      )}

      {selected && (
        <LaunchDetail launch={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
