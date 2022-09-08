import { useState, useContext } from 'react'
import './sign-in-form.styles.scss'
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthWithEmaiAndPassword } from '../../utils/firebase/firebase.util'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthWithEmaiAndPassword(email, password)
            resetFormFields()

        }
        catch (e) {
            switch (e.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password!')
                    break
                case 'auth/user-not-found':
                    alert('Email not found!')
                    break
                default:
                    console.error(e)
            }

        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp()

    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    onChange={handleChange}
                    type='email'
                    name='email'
                    value={email}
                    required>
                </FormInput>
                <FormInput
                    label='Enter Password'
                    onChange={handleChange}
                    type='password'
                    name='password'
                    value={password}
                    required>
                </FormInput>
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )

}


export default SignInForm;