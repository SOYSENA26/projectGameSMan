"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import styles from '../gameBackground.module.css';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.email, form.password);
      router.push('/users/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.background}>
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Game Score Manager</h1>
      <h2 className={styles.subtitle}>Iniciar Sesión</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Iniciar Sesión</button>
      </form>
      <p className={styles.registerLink}>
        ¿No tienes una cuenta?
        <button
          onClick={() => router.push('/auth/register')}
          className={styles.registerButton}
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  </div>
  );
};

export default LoginPage;
