import {useCallback, useEffect, useState} from "react";
import {fetchUserData} from "../api/userApi";

const useAuthUser = ()=> {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const getCurrentUser = useCallback(async (token) => {
        setLoading(true);
        try {
          if (user) return;
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else if (token) {
                const userData = await fetchUserData(token);
                if (userData) {
                    localStorage.setItem("user", JSON.stringify(userData));
                } else {
                    localStorage.removeItem("user");
                }
            }
        } finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        getCurrentUser(token)
    }, [token, getCurrentUser]);


    return {user, loading}
}

export default useAuthUser;