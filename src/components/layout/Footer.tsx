import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        Launch Pad &copy; {new Date().getFullYear()}
      </span>
      <span className={styles.divider}>&middot;</span>
      <span className={styles.text}>
        Data: The Space Devs (Launch Library 2)
      </span>
    </footer>
  );
}
