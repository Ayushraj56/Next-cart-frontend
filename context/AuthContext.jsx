'use client';

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:3200/api/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                setUser(res.data.user);

            } catch {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        getUser();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);