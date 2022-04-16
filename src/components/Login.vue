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
/* Estilos generales */
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
/*Flexbox para contener ambos divs (section-login y section-signup*/
.flexContainer {
    display: flex;
    background-image: url("src/assets/img/patternF7.png");
    width: 100vw;
    height: 100vh;
    background-size: cover;
}
</style> 