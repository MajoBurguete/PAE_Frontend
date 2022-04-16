<template>
    <body>
        <div class="flexContainer">
            <div class="section-login" id="section-login">
                <div class="container-signup" id="container-signup">
                    <h1> ¡Bienvenidx! </h1>
                    <button class="signup" id="signup" type="button"> Regístrate </button>
                    <h3> ¿Aun no te has registrado? </h3>
                </div>
            </div>

            <div class="section-signup" id="section-signup">
                <div class="login-form" id="login-form">
                    <img src="src/assets/img/PAE_Logo_con_nombre.png" alt="PAELogoNotFound">
                    <div class="form">
                        <h3 class="login-h3">Correo</h3>
                        <input type="text">
                        <h3 class="login-h3">Contraseña</h3>
                        <input type="text">
                        <h3 class="login-question-h3">¿Olvidaste tu contraseña?</h3>
                    </div>
                    <button id="signin-button">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

/* General styles */
h1 {
    color: white;
    font-size: 9vh;
    font-family: "Montserrat";
    font-weight: bold;
    margin: 0 0 5vh 0;
}
h3 {
    font-family: "Montserrat";
    font-weight: normal;
    font-size: 2vh;
    color: white;
    margin: 1.5vh 0 0 0;
}
button {
    font-family: "Ubuntu";
    font-weight: normal;
    background-color: white;
    color: #0F084B;
    border-radius: 12px;
    border: transparent;
    font-size: 5vh;
    padding: 2vh 2vw;
}

img{
    width: 35%;
    height: 35%;
}

/*Flexbox which contains two divs (section-login y section-signup*/
.flexContainer {
    display: flex;
    background-image: url("src/assets/img/patternF7.png");
    width: 100vw;
    height: 100vh;
    background-size: cover;
}

.section-login {
    box-sizing: border-box;
    flex: 1;
    width: 40vw;
    height: 100%;
    background-color: transparent;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 0 0 1.5vw;
}
/*Seccion que aparece en el lateral derecho durante el signup*/
.section-signup {
    padding: 5vh;
    box-sizing: border-box;
    background-color: white;
    width:60vw;
    height: 100%;
    position: relative;
}
.login-message {
    text-align:end;
    margin: 0 -8vw 0 0;
}
/*Contenedor del lateral derecho (container-signup) y contenedor del 
lado izquierdo (container-login) */
.container-signup{
    margin: 32vh 0 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 5vh;
    align-items: center;
}
.login-form {
    margin: 15vh 0 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 10;
}
#signin-button {
    font-size: 2.3vh;
    background-color: #26408B;
    color: white;
    padding: 1vh 4vw;
    margin: 3vh 0 0 0;
}
.login-h3 {
    font-family: "Catamaran";
    font-weight: bold;
    color:#26408B;
    font-size: 2.5vh;
    margin: 3.5vh 0 0 0;
}
.login-question-h3 {
    font-family: "Catamaran";
    font-weight: normal;
    color:#26408B;
    margin: 2vh 0 0 0;
    text-decoration: underline;
}
.login-question-h3:hover{
    cursor: pointer;
    font-weight: bold;
}
input {
    width: 23vw;
    height: 6vh;
    border: 2px solid;
    border-radius: 1vh;
    margin: 0;
    padding: 0;
}


</style> 