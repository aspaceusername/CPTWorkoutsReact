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
                    setConfirmationMessage('Email confirmado com sucesso!');
                } else {
                    setConfirmationMessage('Confirmacao de email falhou.');
                }
            } catch (error) {
                setConfirmationMessage('Um erro ocorreu.');
            }
        };

        confirmEmail();
    }, [userId, code]);

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            window.location.href = '/login';
        }, 3000);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div>
            <h2>Confirmacao de Email</h2>
            <p>{confirmationMessage}</p>
        </div>
    );
};

export default ConfirmationPage;
