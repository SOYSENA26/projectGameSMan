"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import styles from '../gameBackground.module.css';

const RegisterPage = () => {
const { register } = useAuth();
const [form, setForm] = useState({ 
    username: '',
    email: '',
    password: '',
    profileImage: null,
});
const [error, setError] = useState(null);
const [preview, setPreview] = useState(null);
const router = useRouter();

const handleChange = (e) => {
setForm({
    ...form,
    [e.target.name]: e.target.value,
});
};

const handleFileChange = (e) => {
const file = e.target.files[0];

if (file) {
    setForm({ ...form, profileImage: file });
    setPreview(URL.createObjectURL(file));
} else {
    setPreview(null);
}
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profile_image', profileImage); 

    try {
        const data = await register(formData);
    } catch (error) {
    }
};

return (
<div className={styles.background}>
    <div className={styles.stars}></div>
    <div className={styles.registerContainer}>
    <h2 className={styles.subtitle}>Registro</h2>
    {error && <p className={styles.errorMessage}>{error}</p>}
    <form onSubmit={handleSubmit} className={styles.registerform}>

        <div className={styles.profileImageContainer}>
        <label htmlFor="profileImage" className={styles.iconWrapper}>
            {preview ? (
            <img src={preview} alt="Vista previa de la foto de perfil" className={styles.previewImage} />
            ) : (
            <FaUserCircle className={styles.userIcon} />
            )}
            <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
            />
        </label>
        </div>

        <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>Nombre de Usuario:</label>
        <input
            type="text"
            id="username"
            name="username"
            required value={form.username}
            onChange={handleChange}
            className={styles.inputField}
        />
        </div>
        <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input 
            type="email"
            id="email"
            name="email"
            required value={form.email}
            onChange={handleChange}
            className={styles.inputField}
        />
        </div>
        <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Contraseña:</label>
        <input 
            type="password"
            id="password"
            name="password"
            required value={form.password}
            onChange={handleChange}
            className={styles.inputField}
        />
        </div>

        <button type="submit" className={styles.submitButton}>Registrarse</button>
    </form>
    <p className={styles.registerLink}>
        ¿Ya tienes una cuenta? 
        <button
        onClick={() => router.push('/auth/login')}
        className={styles.registerButton}
        >
        Inicia sesión aquí
        </button>
    </p>
    </div>
</div>
);
};

export default RegisterPage;


