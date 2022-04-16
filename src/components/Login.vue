<template>
    <body>
        <div class="flexContainer">
            <div class="section-login" id="section-login">
                <div class="container-signup" id="container-signup">
                    <h1> ¡Bienvenidx! </h1>
                    <button class="signup" id="signup" type="button" @click="toSignup"> Regístrate </button>
                    <h3> ¿Aun no te has registrado? </h3>
                </div>
            </div>

            <div class="section-signup" id="section-signup">
                <div class="container-login" id="container-login">
                    <h1 class="login-message"> ¡Hola de <br/> nuevo! </h1>
                    <button class="login-button" id="login-button" type="button"> Ingresa </button>
                    <h3> ¿Ya tienes cuenta? </h3>
                </div>
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
.container-signup,
.container-login{
    margin: 32vh 0 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 5vh;
    align-items: center;
}

.container-signup {
    z-index: 9;
}
.container-login {
    opacity: 0;
    position: absolute;
    width: 90%;
    visibility: hidden;
}

.login-form {
    margin: 15vh 0 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 10;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5vh 0 0 0;
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

/*Botón para ir al signup*/
.signup{
    margin: 11.5vh 0 0 0;
}
/*Botón para ir al login */
.login-button {
    margin: 5vh 0 0 0;
}


</style> 


<script lang="ts">
    import { defineComponent } from "vue";
    import { RouterLink, RouterView } from "vue-router";
    export default defineComponent({
        methods:{
            toSignup() {
                const loginSection = document.getElementById('section-login') as HTMLInputElement;
                const signupSection =document.getElementById('section-signup') as HTMLInputElement;
                const signupContainer = document.getElementById('container-signup') as HTMLInputElement;
                const logingContainer = document.getElementById('container-login') as HTMLInputElement; 
                const loginForm = document.getElementById('login-form') as HTMLInputElement;


                //el div de la izquierda se hace más grande y va cambiando su color
                //de fondo de transparente hacia blanco para hacer el efecto de que se traslada 
                //hacia la derecha
                loginSection.style.transitionProperty = "background-color, width";
                loginSection.style.transitionDuration = "550ms";
                loginSection.style.transitionTimingFunction = "ease-in-out";
                loginSection.style.backgroundColor = "white";
                loginSection.style.width = (60) + "vw";

                //el div de la derecha se hace más pequeño y va cambiando su color
                //de fondo de blanco hacia transparente para hacer el efecto de que es el mismo 
                //rectangulo que se traslado desde la derecha
                signupSection.style.transitionProperty = "background-color, width";
                signupSection.style.transitionDuration = "550ms";
                signupSection.style.transitionTimingFunction = "ease-in-out";
                signupSection.style.backgroundColor = "transparent";
                signupSection.style.width = (40) + "vw";


                //Se hace una transición para desaparecer el container
                //del div lateral izquierdo
                signupContainer.style.transitionProperty = "opacity";
                signupContainer.style.transitionDuration = "350ms";
                signupContainer.style.transitionTimingFunction = "ease-in-out";
                signupContainer.style.opacity = "0";
                signupContainer.style.visibility = "hidden";


                //Se hace una transición para aparecer el container
                //del div lateral derecho

                logingContainer.style.transitionProperty = "opacity";
                logingContainer.style.transitionDuration = "350ms";
                logingContainer.style.transitionTimingFunction = "ease-in-out";
                logingContainer.style.opacity = "1";
                logingContainer.style.visibility = "visible";

                loginForm.style.transitionProperty = "opacity";
                loginForm.style.transitionDuration = "350ms";
                loginForm.style.transitionTimingFunction = "ease-in-out";
                loginForm.style.opacity = "0";
                loginForm.style.visibility = "hidden";
            }
        }
    })
</script> 