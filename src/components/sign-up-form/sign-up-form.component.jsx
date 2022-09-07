import { useState } from 'react'
import './sign-up-form.styles.scss'
import { createUserAuthWithEmaiAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        try {
            const { user } = await createUserAuthWithEmaiAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()

        }
        catch (e) {
            console.error(e)
        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
  
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    onChange={handleChange}
                    type='text'
                    name='displayName'
                    value={displayName}
                    required>
                </FormInput>
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
                <FormInput
                    label='Enter confirmPassword'
                    onChange={handleChange}
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    required>
                </FormInput>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )

}


export default SignUpForm;