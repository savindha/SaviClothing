import './sign-in.styles.scss'
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.util';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>SIGN IN WITH GOOGLE POPUP</button>
            <SignUpForm/>
        </div>

    )
}

export default SignIn;