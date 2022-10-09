import './button.styles.scss';
import Spinner from '../spinner/spinner.component'

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, isLoading, spinner, ...otherProps }) => {
    return (
        <button {...otherProps} disabled={isLoading}
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]} ${spinner ? "spinning" : ""}`}>
            {isLoading ? <Spinner size='small' /> : children}
        </button>

    )

}

export default Button; 