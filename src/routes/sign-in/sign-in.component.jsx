import './sign-in.styles.scss'
import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';


const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp()
        const userDocRef = await createUserDocumentFromAuth(user)

    }

    return (
        <div>
            <h1>SIGN IN PAGE</h1>
            <button onClick={logGoogleUser}>SIGN IN WITH GOOGLE</button>
        </div>

    )
}

export default SignIn;