"use client";
import styles from './CommonHeader.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function CommonHeader({ isAuthPage = false }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} ${isAuthPage ? styles.authHeader : ''}`}>
        <Link href="/" className={styles.headerLogo}>
          <Image src="/images/vernost.svg" alt="Vernost Logo" width={180} height={48} />
        </Link>
        {!isAuthPage && (
          <div className={styles.headerAuth}>
            {user ? (
              <div className={styles.userSection}>
                <span className={styles.username}>Welcome, {user.firstName || user.email}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
              </div>
            ) : (
              <>
                <span className={styles.authItem}>
                  <Link href="/login" className={styles.headerAuthLink}>Login</Link>
                </span>
                <span className={styles.authSpan}></span>
                <span className={styles.authItem}>
                  <Link href="/register" className={styles.headerAuthLink}>Register</Link>
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
} 