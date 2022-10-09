import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './payment-form.styles.scss';
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector'

const PaymentForm = () => {

    const elements = useElements();
    const stripe = useStripe();
    const currectUser = useSelector(selectCurrentUser);
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currectUser ? currectUser.displayName : 'Guest',
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
            }
        }
    }
    return (
        <div className="payment-form-container">
            <h2>Credit Card Payment</h2>
            <form onSubmit={paymentHandler} className="stripe-form">
                <CardElement />
                <Button spinner='true' isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </form>

        </div>
    )
}

export default PaymentForm;