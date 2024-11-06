"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Perfil del Jugador</h2>
      {user ? (
        <>
          <p>Nombre de usuario: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <p>Redirigiendo...</p>
      )}
    </div>
  );
};

export default ProfilePage;