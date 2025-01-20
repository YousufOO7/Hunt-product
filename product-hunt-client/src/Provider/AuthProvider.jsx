import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase_config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

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
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            console.log('the user check', currentUser?.email)


            if (currentUser) {
                try {
                    // Save user info to the db
                    if (currentUser?.email) {
                        await axios.post(`https://product-hunt-server-theta.vercel.app/users/${currentUser.email}`, {
                            name: currentUser.displayName,
                            image: currentUser.photoURL,
                            email: currentUser.email,
                        });
                    }
                    
                    if(currentUser){
                        const userInfo = {email: currentUser?.email}
                        axiosPublic.post('/jwt', userInfo)
                        .then(res => {
                            if(res.data.token){
                                localStorage.setItem('access-token', res.data.token)
                                setLoading(false);
                            }
                        })
                    }
                   

                } catch (error) {
                    console.error('Error saving user info:', error.message);
                }
            }

            else{
                localStorage.removeItem('access-token')
                setLoading(false);
            }

            console.log(currentUser);
            // setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

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