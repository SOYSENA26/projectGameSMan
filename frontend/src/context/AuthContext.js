"use client";

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            axiosInstance.get('/user/profile')
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const register = async (formData) => {
        try {
          const response = await axiosInstance.post('/auth/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',  
            }
          });
          return response.data;
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      };

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(response.data.user);
            router.push('/profile');
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.Authorization;
        setUser(null);
        router.push('/login');
    };

   
    const value = useMemo(() => ({
        user,
        loading,
        register,
        login,
        logout,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
