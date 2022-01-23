import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch,useSelector} from 'react-redux'
import { loadNormalUser } from 'action/user';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

function Routes() {
    const { pathname } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();
    const loginsuccess = useSelector(state => state.login?.msg)
    const logindata = useSelector(state => state.normal?.user)
    const success = useSelector(state => state.succes)
    const dispatch = useDispatch()
    
    const[ckuser,setckuser] = useState(true)
    // useEffect(()=>{
    //     const usertoken = localStorage.getItem('usertoken')
        
    //     dispatch(loadNormalUser())

    // },[loginsuccess?.length,success])
    const auth = getAuth()
    const user = auth.currentUser
    console.log('userr', user)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('lll', user)
            if(user?.emailVerified){
                setckuser(true)
                dispatch(loadNormalUser(user?.uid))
            }else{
                setckuser(false)
            }

        })

    }, [])
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         dispatch(loadNormalUser())
    //     }, 5000);
    //     return () => clearInterval(interval);
    //   }, [loginsuccess?.length]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // useEffect(()=>{
    //     if(logindata && logindata?.approve){
    //         setckuser(true)
    //     }
    //     else{
    //         setckuser(false)
    //     }

    // },[logindata])

    const isUserLoggedIn = ckuser;
    return isUserLoggedIn ? <PrivateSection loguser={logindata} /> : <PublicRoutes />;
}

export default Routes;
