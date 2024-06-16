import { createContext, useState, useEffect } from "react";

export const UserType = createContext();

export const UserContext = ({ children }) => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        console.log("UserId updated in context:", userId);
    }, [userId]);

    return (
        <UserType.Provider value={{ userId, setUserId }}>
            {children}
        </UserType.Provider>
    );
};