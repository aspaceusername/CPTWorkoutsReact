import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmationPage = () => {
    const { userId, code } = useParams();
    const [confirmationMessage, setConfirmationMessage] = useState('Confirming email...');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/account/confirmemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, code }),
                });

                if (response.ok) {
                    setConfirmationMessage('Email confirmed successfully! Redirecting to login...');
                } else {
                    setConfirmationMessage('Email confirmation failed. Please try again.');
                }
            } catch (error) {
                setConfirmationMessage('An error occurred. Please try again.');
            }
        };

        confirmEmail();
    }, [userId, code]);

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            window.location.href = '/login'; // Redirect to login after confirmation
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div>
            <h2>Email Confirmation</h2>
            <p>{confirmationMessage}</p>
        </div>
    );
};

export default ConfirmationPage;
