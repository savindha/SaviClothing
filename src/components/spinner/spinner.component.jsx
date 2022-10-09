import './spinner.styles.scss';


const Spinner = ({ size }) => {
    return (
        <div className={`${size == 'small' ? "" : "SpinnerOverlay"}`}>
            <div className={`SpinnerContainer ${size == 'small' ? "small" : ""}`}>
            </div>
        </div>
    )
}
export default Spinner;