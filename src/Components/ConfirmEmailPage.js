// ConfirmationPage.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmationPage = () => {
    const { userId, code } = useParams();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/account/confirm-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, code }),
                });

                if (response.ok) {
                    console.log('Email confirmed successfully');
                } else {
                    throw new Error('Error confirming email');
                }
            } catch (error) {
                console.error('Error confirming email:', error);
            }
        };

        if (userId && code) {
            confirmEmail();
        }
    }, [userId, code]);

    return (
        <div>
            <h1>Email Confirmation</h1>
            <p>Confirming your email...</p>
        </div>
    );
};

export default ConfirmationPage;
