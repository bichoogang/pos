import { Nloguser, userNormalSign } from 'action/user'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, provider } from '../../src/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

function Login() {
    const [login, setlogin] = useState(true)
    const [userdata, setuserdata] = useState({
        name: "", email: "", password: "", cpassword: "", mobile: ""
    })
    const [forgetpass, setforgetpass] = useState(false)
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const loginsuccess = useSelector(state => state.login?.msg)
    console.log('logsucc', loginsuccess)

    const submitlogin = (e) => {
        e.preventDefault()
        dispatch(Nloguser(userdata))

    }
    useEffect(() => {
        if (error?.length > 0) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }, [error])
    useEffect(() => {
        if (success?.length > 0) {
            toast(success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setuserdata({
                name: "", email: "", password: "", cpassword: "", mobile: ""
            })
            setlogin(true)

        }

    }, [success])
    useEffect(() => {
        if (loginsuccess?.length > 0) {
            toast(loginsuccess, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setuserdata({
                name: "", email: "", password: "", cpassword: "", mobile: ""
            })


        }

    }, [loginsuccess])
    const auth = getAuth()
    const user = auth.currentUser
    console.log('userr', user)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('lll', user)

        })

    }, [])
    const logout = (() => {
        signOut(auth)
    })
    const submit = (e) => {
        e.preventDefault()
        if (userdata.name && userdata.email && userdata.password && userdata.cpassword) {
            if (userdata.password === userdata.cpassword) {
                createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        sendEmailVerification(user)
                        dispatch(userNormalSign({...userdata,uid:userCredential?.user?.uid}))
                        // ...
                        console.log(userCredential)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        console.log(error)
                        toast.error('Email already in use')
                    });

            }
            else {
                toast.error('Enter same password both feild')
            }

        } else {
            toast.error('Enter all the field')
        }

        

    }
    const google = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('user', result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const submitloginauth = (e) => {
        e.preventDefault()
        if(userdata?.email && userdata?.password){
            signInWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // sendEmailVerification(user)
                // ...
                console.log(userCredential)
                if(userCredential?.user?.emailVerified){
                    toast.success('Login sucessful')
                    window.location.reload()

                }else{
                    toast.error("Email is not verified")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error)
                toast.error("Check details")
            });

        }else{
            toast.error('Enter all the field')
        }
        
    }

    const forget = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, userdata.email)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                console.log(userCredential)
                toast.success('Reset password link has been send to email')
                setforgetpass(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error('email is not register')
                // ..
                console.log(error)
            });
    }

    return (
        <div className="loginpage">
            <div className="container">
                <div className="row mt-5">
                    {
                        !forgetpass?
                        <div className="col-md-4 offset-md-4 offset-0 col-12">
                        {
                            login ? <div className="card p-3 shadow">
                                <h4 className="text-center my-3">Login</h4>
                                <form onSubmit={submitloginauth} autoComplete="OFF">

                                    <input type="email" style={{border:'1px solid #95A5A6'}} value={userdata.email} placeholder="Email" onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} />
                                    <input type="password" style={{border:'1px solid #95A5A6'}} value={userdata.password} placeholder="Password" onChange={(e) => setuserdata({ ...userdata, password: e.target.value })} />
                                    <button type="submit" className="btn btn-primary" >Login</button><p style={{fontSize:'15px',fontWeight:'lighter'}}>Don't have an account?<span className="text-bold" onClick={() => setlogin(false)}>Signup</span></p>
                                    <span style={{fontSize:'15px',fontWeight:'bold'}} className="text-bold" onClick={() =>setforgetpass(true)}     >Forget Password</span>

                                </form>
                            </div> : <div className="card p-3 shadow">
                                <h4 className="text-center my-3">Signup</h4>
                                <form onSubmit={submit}>
                                    <input type="text" style={{border:'1px solid #95A5A6'}} value={userdata.name} placeholder="Name" onChange={(e) => setuserdata({ ...userdata, name: e.target.value })} />
                                    <input type="email" style={{border:'1px solid #95A5A6'}} value={userdata.email} placeholder="Email" onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} />
                                    {/* <input type="number" value={userdata.mobile} placeholder="Mobile" onChange={(e) => setuserdata({ ...userdata, mobile: e.target.value })} /> */}
                                    <input type="password" style={{border:'1px solid #95A5A6'}} value={userdata.password} placeholder="Password" onChange={(e) => setuserdata({ ...userdata, password: e.target.value })} />
                                    <input type="password" style={{border:'1px solid #95A5A6'}} value={userdata.cpassword} placeholder="Repeat Password" onChange={(e) => setuserdata({ ...userdata, cpassword: e.target.value })} />
                                    <button type="submit" className="btn btn-primary">Signup</button><p style={{fontSize:'15px',fontWeight:'lighter'}}>Have an account?<span className="text-bold" onClick={() => setlogin(true)}     >Login</span></p>

                                </form>
                            </div>
                        }
                        {/* <button onClick={() => google()}>Sign in With Google</button>
                        <form onSubmit={submitloginauth}>

                            <input type="email" value={userdata.email} placeholder="Email" onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} />
                            <input type="password" value={userdata.password} placeholder="Password" onChange={(e) => setuserdata({ ...userdata, password: e.target.value })} />
                            <button>Login</button><p>Don't have an account?<span className="text-bold" onClick={() => setlogin(false)}>Signup</span></p>

                        </form> */}
                       
                    </div>:
                      <div className="col-md-4 offset-md-4 offset-0 col-12 card p-3">
                      
                      <form onSubmit={forget}>
                          <p style={{fontSize:'20px',fontWeight:'bold'}}>Forgot Your Password?</p>
                          <p style={{fontSize:'15px',fontWeight:'lighter'}}>Please enter the email you use to sign in.</p>
                          

                          <input type="email" style={{border:'1px solid #95A5A6'}} value={userdata.email} placeholder="Email" onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} />
                      
                          <button type="submit" className="btn btn-primary">Request Password Reset</button>

                      </form>
                  </div>

                    }
                  
                </div>
            </div>
            <ToastContainer />


        </div>
    )
}

export default Login
