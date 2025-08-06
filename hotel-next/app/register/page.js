"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import { user_reg } from '@/lib/api/user_reg';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms and Privacy Policies');
      return;
    }

    try {
      const response = await user_reg({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response);

      login({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });

      router.push('/login');
    } catch (err) {
      console.error("Registration failed:", err);
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
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
            <h2 className={styles.title}>Register</h2>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Vernost24"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Vernost24"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Vernost24@Gmail.Com"
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
              <div className={styles.inputGroup}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="terms">I agree to all the Terms and Privacy Policies</label>
              </div>
              <button type="submit" className={styles.registerBtn}>Register Now</button>
              <div className={styles.loginLink}>
                Already have an account? <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
