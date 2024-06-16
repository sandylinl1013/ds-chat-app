import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState, useContext } from "react";
import { auth, db } from "../firebaseConfig"
import { UserType } from './UserContext';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)
    const { setUserId } = useContext(UserType);
    /*
    useEffect(() => {
        //on AuthStateChange
        //setTimeout(()=>{
        setIsAuthenticated(false)
        //},3000);
    })*/
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            //console.log('got user: ', user);
            if (user) {
                console.log("User authenticated: ", user.uid);
                setIsAuthenticated(true);
                setUser(user);
                setUserId(user.uid)
                await updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                setUserId("");
            }
        });
        return unsub;
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser((user) => ({...user, username: data.username, profileURL: data.profileURL, userId: data.uid}));
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email';
            if (msg.includes('(auth/invalid-credential)')) msg = 'This email is not registed.';

            return { success: false, msg };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    }

    const register = async (email, password, username, profileURL) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            //console.log('response.user : ', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileURL,
                uid: response?.user?.uid
            });
            return { success: true, data: response?.user };

        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'This email is already in use.'

            return { success: false, msg };
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}