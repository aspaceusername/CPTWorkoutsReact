function About(){
return (
<>
    <div className="about" id="about">
        <div>
            <h2 className="title">
                O teu personal
            </h2>
            <div className="about-main">
                <div>

                </div>
            </div>
            <div className="about-text">
                <h3>I'm Cristiano <br/></h3>
                <p>Olá, como podes ver na minha página, somos um grupo de fitness online!</p><p> Já há 10 anos a ajudar cada vez mais pessoas!</p>
                <p>O nosso objetivo é ajudar a população que tem dificuldades em atingir objetivos fitness ou mesmo até a começar a treinar. </p>
                <p>Guiamos e treinamos juntos de uma forma simples.</p>
                <p> Tens algum objetivo fitness? Algum problema que achas que possamos ajudar a resolver?</p>
                <div style={{marginTop:"40px"}}>  
                    <div className="w3-margin-top" style={{justifyContent:"space-between"}}>
                        <a id="facebook"  href="#"><i className="fa fa-facebook-official w3-hover-opacity icons"></i></a>
                        <a id="instagram" href="#"><i className="fa fa-instagram w3-hover-opacity icons"></i></a>
                        <a id="linkedin" href="#"><i className="fa fa-linkedin w3-hover-opacity icons"></i></a>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</>
);
}
export default About;