import type { Launch } from '../../types/launch';
import Badge from '../common/Badge';
import CountdownTimer from '../common/CountdownTimer';
import { formatLaunchDate } from '../../utils/date';
import styles from './LaunchDetail.module.css';

interface LaunchDetailProps {
  launch: Launch;
  onClose: () => void;
}

function getYoutubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function LaunchDetail({ launch, onClose }: LaunchDetailProps) {
  const youtubeVideos = launch.vidURLs.filter((v) => v.url.includes('youtube.com') || v.url.includes('youtu.be'));
  const otherLinks = launch.vidURLs.filter((v) => !v.url.includes('youtube.com') && !v.url.includes('youtu.be'));
  const firstEmbedId = youtubeVideos.length > 0 ? getYoutubeEmbedId(youtubeVideos[0].url) : null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        {/* Embedded YouTube video or image */}
        {firstEmbedId ? (
          <div className={styles.videoWrap}>
            <iframe
              src={`https://www.youtube.com/embed/${firstEmbedId}`}
              title={launch.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          </div>
        ) : launch.image ? (
          <img src={launch.image} alt={launch.name} className={styles.image} />
        ) : null}

        <div className={styles.body}>
          <div className={styles.header}>
            <h2 className={styles.title}>{launch.name}</h2>
            <Badge status={launch.status.name} />
          </div>

          {launch.webcast_live && (
            <div className={styles.liveTag}>
              <span className={styles.liveDot} />
              LIVE NOW
            </div>
          )}

          <CountdownTimer targetDate={launch.net} />

          <div className={styles.grid}>
            <div className={styles.field}>
              <span className={styles.label}>Launch Date</span>
              <span className={styles.value}>{formatLaunchDate(launch.net)}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Provider</span>
              <span className={styles.value}>{launch.launch_service_provider.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Rocket</span>
              <span className={styles.value}>{launch.rocket.configuration.full_name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Launch Site</span>
              <span className={styles.value}>{launch.pad.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Location</span>
              <span className={styles.value}>{launch.pad.location.name}</span>
            </div>
            {launch.mission?.orbit && (
              <div className={styles.field}>
                <span className={styles.label}>Orbit</span>
                <span className={styles.value}>{launch.mission.orbit.name}</span>
              </div>
            )}
          </div>

          {launch.mission && (
            <div className={styles.missionSection}>
              <span className={styles.label}>Mission</span>
              <p className={styles.description}>{launch.mission.description}</p>
            </div>
          )}

          {/* Video links */}
          {launch.vidURLs.length > 0 && (
            <div className={styles.videosSection}>
              <span className={styles.label}>Watch</span>
              <div className={styles.videoLinks}>
                {youtubeVideos.map((v, i) => (
                  <a
                    key={i}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    <span className={styles.videoIcon}>&#x25B6;</span>
                    <span>{v.title || 'YouTube Stream'}</span>
                  </a>
                ))}
                {otherLinks.map((v, i) => (
                  <a
                    key={`o${i}`}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    <span className={styles.videoIcon}>&#x1F517;</span>
                    <span>{v.title || 'Stream'}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
