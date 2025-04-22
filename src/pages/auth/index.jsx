//Importing the auth and provider objects from the firebase-config file
import { auth, provider } from "../../config/firebase-config";
//importing some firebase functions (e.g. signInWithPopup) to use them in the authentication flow
import { signInWithPopup } from "firebase/auth";
//we create an Auth page to test the authentication flow
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import './style.css';



export const Auth = () => {
    //We create a function to help us navigate to the expense-tracker page after the user is authenticated
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();


    const signInWithGoogle = async () => {
        //This function will be called when the user clicks on the Sign In button
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userId: results.user.uid,
            name: results.user.displayName,
            profilePic: results.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        //after authentication we navigate to the expense-tracker page
        //We use the navigate function to change the route to /expense-tracker
        navigate("/expense-tracker");

    };

    //If the user is already authenticated we navigate to the expense-tracker page
    if (isAuth) {
        return <Navigate to="/expense-tracker" />;
    };


    return <div className="login-page">
        <p>Sign In With Google To Proceed</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign In
        </button>
    </div>;
};