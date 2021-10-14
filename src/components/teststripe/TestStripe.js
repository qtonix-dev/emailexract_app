import React, { Component } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

export class TestStripe extends Component {
    render() {
        return (
            <Elements stripe={stripePromise}>
            <CheckoutForm />
            </Elements>
        )
    }
}

export default TestStripe
