import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.headerLogo}>
          <Image src="/images/vernost.svg" alt="Vernost Logo" width={120} height={40} />
        </Link>
        <div className={styles.headerAuth}>
          <span className={styles.authItem}>
            <Link href="/login" className={styles.headerAuthLink}>Login</Link>
          </span>
          <span className={styles.authSpan}></span>
          <span className={styles.authItem}>
            <Link href="/register" className={styles.headerAuthLink}>Register</Link>
          </span>
        </div>
      </div>
    </header>
  );
}