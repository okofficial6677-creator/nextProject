"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import styles from '../register/register.module.css';
import { user_login } from '@/lib/api/user_login';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await user_login(formData); // Call the backend API
       // Store user in context
      login({
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        token: result.token
      });

      // Redirect to homepage
      router.push('/');
    } catch (err) {
      console.error("Login failed:", err);
      const msg = err?.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
    }
  };

  return (
    <div className={styles.container}>
      <CommonHeader isAuthPage={true} />
      <main className={styles.mainCard}>
        <div className={styles.card}>
          <div className={styles.imageSection}>
            <Image src="/images/travel photo.svg" alt="Travel" width={350} height={400} className={styles.travelImg} />
          </div>
          <div className={styles.formSection}>
            <h2 className={styles.title}>Login</h2>
            <div style={{ marginBottom: 12, color: '#444', fontWeight: 500 }}>
              Login to access your Vernost24 account
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="omkark@Gmail.Com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="************"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.checkboxRow}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <button type="submit" className={styles.registerBtn}>Login</button>
              <div style={{ textAlign: 'center', margin: '12px 0', color: '#888', fontWeight: 500 }}>Or</div>
              <div className={styles.loginLink}>
                Don&apos;t have an account in Vernost24 yet? <a href="/register">Register !</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
