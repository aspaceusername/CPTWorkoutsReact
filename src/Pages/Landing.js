import React, { useState, useContext } from "react";
import { FormControl } from 'react-bootstrap';
import emailjs from 'emailjs-com'; 
import './Landing.css';
import About from './About';
import AuthContext from '../contexts/AuthContext'; // Adjust the import path as necessary

function Landing() {    
    const [navDemoVisible, setNavDemoVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        email: '',
        message: ''
    });

    const { user } = useContext(AuthContext);

    emailjs.init({
        publicKey: 'Y_Ij37aIjOQxbcix3', // chave publica
        blockHeadless: true,
        blockList: {
            list: ['foo@emailjs.com', 'bar@emailjs.com'],
            watchVariable: 'userEmail',
        },
        limitRate: {
            id: 'app',
            throttle: 10000, // permite 1 request a cada 10 segundos
        },
    });

    const handleNavDemoClick = () => {
      setNavDemoVisible(!navDemoVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            name: formData.name,
            country: formData.country,
            email: formData.email,
            goals: formData.goals
        };
        emailjs.send(
            'service_8xq0vo7',
            'template_zummwpp',
            templateParams,
            'Y_Ij37aIjOQxbcix3'
        ).then(
            (response) => {
                console.log('Sucesso', response.status, response.text);
                alert('Mensagem Enviada!');
            },
            (error) => {
                console.log('Erro', error);
                alert('Ocorreu um erro.');
            }
        );
    };

    const handleCreateCompra = async () => {
        if (!user) {
            // utilizador não está logged in
            console.log('Utilizador não está logged in');
            return;
        }

        //simular realizar uma compra
        const compraData = {
            DataCompra: new Date().toISOString(),
            ValorCompraAux: "50.00",
            ServicoFK: 1,
            ClienteFK: user.userId
        };

        try {
            const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData)
            });

            if (response.ok) {
                console.log('Compra criada com sucesso');
            } else {
                console.error('Erro ao criar compra');
            }
        } catch (error) {
            console.error('Erro catched ao criar compra', error);
        }
    };

    return (
        <>
            <section id="home">
                <div className="hero">
                    <div className="hero-text">
                        <h1>És tu<br/>
                        Somos nós</h1>
                        <a href="#service">
                            <button className="subscribe-button" style={{width:"100%"}}>Vem fazer parte da equipa</button>
                        </a>
                    </div>
                </div>
            </section>
            <main>
                <About />
                <div className="service" id="service">
                    <h2 className="title-servico">__ Serviços</h2>
                    <div className="service-box">
                        <p>Temos duas formas de te ajudar, uma é com coaching online onde te passamos os planos de treino, planos alimentares!</p>
                        <p>O acompanhamento é diário, sempre que precisares via WhatsApp, para que possas focar-te mais no que importa e teres bons resultados.</p>
                    </div>
                    <div className="card">
                        <div className="card-list">
                            <div className="card-image">
                                <img src="https://i.ibb.co/gMpS8zy/al5ehqe9.png" alt="Photo by Anastase Maragos | Unsplash" />
                            </div>
                            <div className="card-text">
                                <h4>Treinos em Equipa</h4>
                                <button 
                                    className="w3-btn w3-red w3-margin-top w3-round" 
                                    style={{ width: "100%" }} 
                                    onClick={handleCreateCompra}
                                >
                                    Subscreve
                                </button>
                            </div>
                        </div>
                        <div className="card-list">
                            <div className="card-image">
                                <img src="https://i.ibb.co/mRrQdfY/n1pf2u6f.png" alt="Photo by Sergio Pedemonte | Unsplash" />
                            </div>
                            <div className="card-text">
                                <h4>Acompanhamento</h4>
                                <button 
                                    className="w3-btn w3-red w3-margin-top w3-round" 
                                    style={{ width: "100%" }} 
                                    onClick={handleCreateCompra}
                                >
                                    Subscreve
                                </button>
                            </div>
                        </div>
                        <div className="card-list">
                            <div className="card-image">
                                <img src="https://i.ibb.co/bPrNgLQ/1e9pxhuz.png" alt="Photo by Spencer Davis | Unsplash" />
                            </div>
                            <div className="card-text">
                                <h4>Treinos Individuais</h4>
                                <button 
                                    className="w3-btn w3-red w3-margin-top w3-round" 
                                    style={{ width: "100%" }} 
                                    onClick={handleCreateCompra}
                                >
                                    Subscreve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="testimony" id="testimony">
                    <h2 className="title">__ Testemunhos</h2>
                    <div className="testimony-main">
                        <div className="testimony-image">
                            <img src="https://i.ibb.co/hdvwHVP/279247150-310768634562939-6152071831569810154-n.jpg" alt="Photo by Karsten Winegeart | Unsplash" />
                        </div>
                        <div className="testimony-text">
                            <a id="social-link" target="_blank" href="https://www.instagram.com/jcarolas/"><h3>@jcarolas</h3></a>  
                            <p style={{fontStyle: "italic"}}>
                            "Ficamos logo com outra cabeça depois do treino! É bom, faz bem ao corpo e à mente" 
                            </p>
                        </div>
                    </div>
                    <div className="testimony-main">
                        <div className="testimony-image">
                            <img src="https://i.ibb.co/2jcMJwW/img2.jpg" alt="Photo by Hayley Kim Design | Unsplash" />
                        </div>
                        <div className="testimony-text">
                            <a id="social-link" target="_blank" href="https://www.instagram.com/macario.alves.7/"><h3>@macario.alves.7</h3></a> 
                            <p style={{fontStyle: "italic"}}>
                            "Grande máquina e excelente acompanhamento!"
                            </p>
                        </div>
                    </div>
                    <div className="testimony-main">
                        <div className="testimony-image">
                            <img src="https://i.ibb.co/6YXffVN/image.png" alt="Photo by Scott Webb | Unsplash" />
                        </div>
                        <div className="testimony-text">
                            <a id="social-link" target="_blank" href="https://www.instagram.com/nunesfilipa/"><h3>@nunesfilipa</h3></a> 
                            <p style={{fontStyle: "italic"}}>
                            "Foi difícil foi , mas valeu e vale a pena , e com a tua ajuda tudo se torna mais fácil.. pois as vezes o mental não "acompanha" e tu estás lá sempre a dar uma grande ajuda , obrigada por tudo ... Juntos 💪"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="contact" id="join">
                    <h2 className="title"> __ Junta te a nós</h2>
                    <div className="contact-main">
                        <div className="contact-form">
                            <form onSubmit={handleSubmit}>
                                <div className="name">
                                    <input className="input name-list" type="text" placeholder="Nome" name="name" value={formData.name} onChange={handleChange} required />
                                    <input className="input name-list" type="text" placeholder="País" name="country" value={formData.country} onChange={handleChange} required />
                                </div>
                                <FormControl id="email" className="input" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                                <textarea className="input" placeholder="Quais são os seus objetivos?" name="goals" value={formData.goals} onChange={handleChange} required></textarea>
                                <button className="w3-btn w3-red w3-round" type="submit">Quero receber um E-Book Oferta</button>
                            </form>
                        </div>
                        <div className="contact-image">
                            <img src="https://spaces.w3schools.com/images/ZXq7xoo98b0.jpg" alt="Photo by Bruce Mars | Unsplash"/>
                        </div>
                    </div>
                </div>
                <div className="contact-address" id="contact">
                    <h2 className="title"></h2>
                    <div className="contact-address-list">
                        <div className="contact-list">
                            <h4>local de treino</h4>
                            <p>No exterior, em outdoors</p>
                            <p>ou</p>
                            <p>No conforto da sua casa</p>
                        </div>
                        <div className="contact-list">
                            <h4>Horário</h4>
                            <p>Pré-definido para treinos em equipa</p>
                            <p>Com marcação prévia para treinos individuais</p>
                        </div>
                        <div className="contact-list">
                            <h4>Contactos</h4>
                            <p><i className="fa fa-phone " style={{marginRight:" 8px",fontSize:"20px"}}></i>915532403 </p>
                            <p><i className="fa fa-envelope " style={{marginRight:"5px",fontSize:"20px"}}></i>crs122ace@gmail.com</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Landing;
