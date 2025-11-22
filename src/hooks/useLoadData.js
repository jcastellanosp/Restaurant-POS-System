import { useDispatch } from "react-redux";
import { getUserData } from "../https";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUserData();
                console.log("✅ Usuario autenticado:", data);
                const { _id, name, email, phone, role } = data.data;
                dispatch(setUser({ _id, name, email, phone, role }));
            } catch (error) {
                console.log("❌ No autenticado o sesión expirada");
                dispatch(removeUser());
                // NO navegar aquí, dejar que ProtectedRoutes lo maneje
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUser();
        
    }, []); // ← IMPORTANTE: Array vacío para que solo se ejecute UNA VEZ

    return isLoading;
};

export default useLoadData;