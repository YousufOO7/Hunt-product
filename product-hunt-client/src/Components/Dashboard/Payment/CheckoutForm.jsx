import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransectionId] = useState('')
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const { user } = useAuth();
    const totalPrice = location?.state?.price || 0
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return

        const card = elements.getElement(CardElement)
        if (card === null) return

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment Method', paymentMethod)
            setError('')
        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransectionId(paymentIntent.id);

                // send to database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    status: 'Verified',
                    transactionId: paymentIntent.id
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Payment successfully done!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/my-profile')
                }
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className="btn bg-green-300 my-3 px-8" type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600 mt-5">{error}</p>
            {transactionId && <p className="text-green-600">Your transition id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;