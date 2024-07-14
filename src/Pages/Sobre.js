import React from 'react';

const AboutPage = () => {
    return (
        <section id="home" style={styles.section}>
            <div className="hero" style={styles.hero}>
                <div className="hero-text" style={styles.heroText}>
                    <h4 style={styles.h4}>
                        Engenharia Informática, Desenvolvimento Web 2023/2024
                    </h4>
                    <h4 style={styles.h4}>
                        24705 Rúben Filipe Alcobia Dias
                    </h4>
                    <h4 style={styles.h4}>
                        Frameworks: Bootstrap, EntityFramework
                    </h4>
                    <h4 style={styles.h4}>
                        CSS: w3schools
                    </h4>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;

const styles = {
    section: {
        backgroundColor: 'black',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
    },
    hero: {
        backgroundImage: 'url("https://i.ibb.co/G92KCJQ/6k7wxryg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '700px',
    },
    heroText: {
        backgroundColor: '#b40219',
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
    },
    h4: {
        fontStyle: 'italic',
        fontSize: '24px',
        marginBottom: '10px',
    },
};
