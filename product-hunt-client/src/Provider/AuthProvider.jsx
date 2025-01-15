import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase_config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged,  signInWithEmailAndPassword,  signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();

    // create new account
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signin with account
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google login
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // logOut a user
    const Logout = () => {
        setLoading(true)
        return signOut(auth)
    }

     // update user profile
     const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }

    // observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        createNewUser,
        signIn,
        signInWithGoogle,
        Logout,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;