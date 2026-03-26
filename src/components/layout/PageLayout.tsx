import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  missionLabel?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  missionLabel,
  fullWidth = false,
  children,
}: PageLayoutProps) {
  return (
    <main className={`${styles.page} ${fullWidth ? styles.pageFullWidth : ''}`}>
      <div className={styles.titleBar}>
        <div>
          {missionLabel && (
            <div className={styles.missionLabel}>{missionLabel}</div>
          )}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </main>
  );
}
