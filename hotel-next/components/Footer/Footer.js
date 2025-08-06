import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerText}>
        &copy;2025 Vernost. All rights reserved. Privacy Policy | Terms & Conditions
      </span>
    </footer>
  );
}
