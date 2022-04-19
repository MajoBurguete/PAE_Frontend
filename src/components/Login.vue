<template>
    <body>
        <div class="flexContainer">
            <div class="section-login" id="section-login">
                <div class="container-signup" id="container-signup">
                    <h1> ¡Bienvenidx! </h1>
                    <button class="signup" id="signup" type="button" @click="toSignup"> Regístrate </button>
                    <h3> ¿Aun no te has registrado? </h3>
                </div>
                <div class="form-container" id="form-container">
                    <div class="account-selection" id="account-selection"> 
                        <img src="src/assets/img/PAE-Logo-con-nombre.png" alt="PAELogoNotFound">
                        <div class="election" id="election">
                            <h1 id="account-type-h1"> Elige tu tipo de cuenta </h1>
                            <div class="row">
                                <div class="col-sm-5">
                                    <div class="card" id="card-student" @mouseover="changeStudentCardBackground" @mouseleave="changeNormalStudentBackground" @click="toSignupStudentForm">
                                        <img src="src/assets/img/student-card.png" class="card-img-top" id="student-img" alt="...">
                                        <div class="card-body" id="card-student-body">
                                            <h5 class="card-title" id="student-title">Estudiante</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="card" id="card-tutor" @mouseover="changeTutorCardBackground" @mouseleave="changeNormalTutorBackground" @click="toSignupTutorForm">
                                        <img src="src/assets/img/tutor-card.png" class="card-img-top" id="tutor-img" alt="...">
                                        <div class="card-body" id="card-tutor-body">
                                            <h5 class="card-title" id="tutor-title">Asesor</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tutor-register-form">
                            <SignupTutor  v-on:back-button="returnFromSignupTutor"/>
                        </div>
                        <div id="student-register-form">
                            <SignupStudent  v-on:back-button="returnFromSignupStudent"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-signup" id="section-signup">
                <div class="container-login" id="container-login">
                    <h1 class="login-message"> ¡Hola de <br/> nuevo! </h1>
                    <button class="login-button" id="login-button" type="button" @click="toLogin"> Ingresa </button>
                    <h3> ¿Ya tienes cuenta? </h3>
                </div>
                <div class="login-form" id="login-form">
                    <img src="src/assets/img/PAE_Logo_con_nombre.png" alt="PAELogoNotFound">
                    <div class="form">
                        <h3 class="login-h3">Correo</h3>
                        <input type="text">
                        <h3 class="login-h3">Contraseña</h3>
                        <input type="password">
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

input {
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        padding: 0.25vh 1.5vw 0 200vw;
        margin: 0;
        border-color: black;
        border-width: 0.25vh;
        border-radius: 0.65vh;
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

/* Sección para crear una cuenta */
.row {
    gap: 5vw;
    margin: 0 2.5vw;
    z-index: 10;
}

#account-type-h1 {
    margin: 5vh 0;
    font-weight: bolder;
    font-size: 5vh;
    color: black;
}

.form-container {
    height: 95%;
    opacity: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    visibility: hidden;
    overflow-y: hidden;
}
.account-selection{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#tutor-register-form,
#student-register-form{
    visibility: hidden;
    position: absolute;
    margin-top: 20%;
}

.election {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7vh;
}

.card {
    padding: 0;
    border: 0;
    border-radius: 1rem;
}

.card-img-top{
    width: 50%;
    height: 40%;
}

#student-img{
    margin: 6.3vh 5vw;
}

#tutor-img{
    margin: 6vh 5vw;
}

#card-student {
    background-color: #A6CFD5;
}

#card-student-body,
#card-tutor-body{
    height: 45%;
    background-color: white;
    box-shadow: 0 1vh 1vh rgba(0, 0, 0, 0.25);
    border-radius: 0 0 1rem 1rem;
    padding: 4vh 3vw;
}

#card-tutor{
    background-color: #A4B7E3;
}

.card-title{
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 4vh;
    text-align: center;
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
    import SignupTutor from "@/components/SignupTutorForm.vue"
    import SignupStudent from "@/components/SignupStudentForm.vue"

    export default defineComponent({
        components: {
            SignupTutor,
            SignupStudent
        },
        methods:{
            toSignup() {
                const loginSection = document.getElementById('section-login') as HTMLInputElement;
                const signupSection =document.getElementById('section-signup') as HTMLInputElement;
                const signupContainer = document.getElementById('container-signup') as HTMLInputElement;
                const logingContainer = document.getElementById('container-login') as HTMLInputElement; 
                const loginForm = document.getElementById('login-form') as HTMLInputElement;
                const accountSelection = document.getElementById('account-selection') as HTMLInputElement;
                const formContainer = document.getElementById('form-container') as HTMLInputElement;


                //el div de la izquierda se hace más grande y va cambiando su color
                //de fondo de transparente hacia blanco para hacer el efecto de que se traslada 
                //hacia la derecha
                loginSection.style.transitionProperty = "background-color, width";
                loginSection.style.transitionDuration = "250ms";
                loginSection.style.transitionTimingFunction = "ease-in-out";
                loginSection.style.backgroundColor = "white";
                loginSection.style.width = (60) + "vw";

                //el div de la derecha se hace más pequeño y va cambiando su color
                //de fondo de blanco hacia transparente para hacer el efecto de que es el mismo 
                //rectangulo que se traslado desde la derecha
                signupSection.style.transitionProperty = "background-color, width";
                signupSection.style.transitionDuration = "250ms";
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

                accountSelection.style.transitionProperty = "opacity";
                accountSelection.style.transitionDuration = "350ms";
                accountSelection.style.transitionTimingFunction = "ease-in-out";
                accountSelection.style.opacity = "1";
                accountSelection.style.visibility = "visible";
                formContainer.style.transitionProperty = "opacity";
                formContainer.style.transitionDuration = "350ms";
                formContainer.style.transitionTimingFunction = "ease-in-out";
                formContainer.style.opacity = "1";
                formContainer.style.visibility = "visible";

            },
            toLogin() {
                const loginSection = document.getElementById('section-login') as HTMLInputElement;
                const signupSection = document.getElementById('section-signup') as HTMLInputElement;
                const signupContainer = document.getElementById('container-signup') as HTMLInputElement;
                const logingContainer = document.getElementById('container-login') as HTMLInputElement; 
                const loginForm = document.getElementById('login-form') as HTMLInputElement;
                const accountSelection = document.getElementById('account-selection') as HTMLInputElement;
                const formContainer = document.getElementById('form-container') as HTMLInputElement;

                //el div de la derecha se hace más grande y va cambiando su color
                //de fondo de transparente hacia blanco para hacer el efecto de que se traslada 
                //hacia la derecha
                loginSection.style.transitionProperty = "background-color, width";
                loginSection.style.transitionDuration = "250ms";
                loginSection.style.transitionTimingFunction = "ease-in-out";
                loginSection.style.backgroundColor = "transparent";
                loginSection.style.width = (40) + "vw";

                //el div de la izquierda se hace más pequeño y va cambiando su color
                //de fondo de blanco hacia transparente para hacer el efecto de que es el mismo 
                //rectangulo que se traslado desde la derecha
                signupSection.style.transitionProperty = "background-color, width";
                signupSection.style.transitionDuration = "250ms";
                signupSection.style.transitionTimingFunction = "ease-in-out";
                signupSection.style.backgroundColor = "white";
                signupSection.style.width = (60) + "vw";

                signupContainer.style.transitionProperty = "opacity";
                signupContainer.style.transitionDuration = "350ms";
                signupContainer.style.transitionTimingFunction = "ease-in-out";
                signupContainer.style.opacity = "1";
                signupContainer.style.visibility = "visible"

                logingContainer.style.transitionProperty = "opacity";
                logingContainer.style.transitionDuration = "350ms";
                logingContainer.style.transitionTimingFunction = "ease-in-out";
                logingContainer.style.opacity = "0";
                logingContainer.style.visibility = "hidden";

                loginForm.style.transitionProperty = "opacity";
                loginForm.style.transitionDuration = "350ms";
                loginForm.style.transitionTimingFunction = "ease-in-out";
                loginForm.style.opacity = "1";
                loginForm.style.visibility = "visible";

                accountSelection.style.transitionProperty = "opacity";
                accountSelection.style.transitionDuration = "350ms";
                accountSelection.style.transitionTimingFunction = "ease-in-out";
                accountSelection.style.opacity = "0";
                accountSelection.style.visibility = "hidden";

                formContainer.style.transitionProperty = "opacity";
                formContainer.style.transitionDuration = "350ms";
                formContainer.style.transitionTimingFunction = "ease-in-out";
                formContainer.style.opacity = "0";
                formContainer.style.visibility = "hidden";

                this.returnFromSignupTutor();
                this.returnFromSignupStudent();
            },
            changeStudentCardBackground(){
                const studentCard = document.getElementById('card-student-body') as HTMLInputElement;
                const studentTitle = document.getElementById('student-title') as HTMLInputElement;

                document.body.style.cursor = 'pointer';

                studentCard.style.backgroundColor = "#9CC8C5";
                studentTitle.style.color = "white";
            },
            changeNormalStudentBackground(){
                const studentCard = document.getElementById('card-student-body') as HTMLInputElement;
                const studentTitle = document.getElementById('student-title') as HTMLInputElement;

                document.body.style.cursor = 'auto';

                studentCard.style.backgroundColor = "white";
                studentTitle.style.color = "black";
            },
            changeTutorCardBackground(){
                const tutorCard = document.getElementById('card-tutor-body') as HTMLInputElement;
                const tutorTitle = document.getElementById('tutor-title') as HTMLInputElement;

                document.body.style.cursor = 'pointer';

                tutorCard.style.backgroundColor = "#8795B6";
                tutorTitle.style.color = "white";
            },
            changeNormalTutorBackground(){
                const tutorCard = document.getElementById('card-tutor-body') as HTMLInputElement;
                const tutorTitle = document.getElementById('tutor-title') as HTMLInputElement;

                document.body.style.cursor = 'auto';

                tutorCard.style.backgroundColor = "white";
                tutorTitle.style.color = "black";
            },
            toSignupTutorForm() {
                const formContainer = document.getElementById('form-container') as HTMLInputElement;
                const electionSection = document.getElementById('election') as HTMLInputElement;
                const tutorForm = document.getElementById('tutor-register-form') as HTMLInputElement;

                electionSection.style.transitionProperty = "opacity";
                electionSection.style.transitionDuration = "350ms";
                electionSection.style.transitionTimingFunction = "ease-in-out";
                electionSection.style.opacity = "0";
                electionSection.style.visibility = "hidden";

                tutorForm.style.transitionProperty = "opacity";
                tutorForm.style.transitionDuration = "150ms";
                tutorForm.style.transitionTimingFunction = "ease-in-out";
                tutorForm.style.opacity = "1";
                tutorForm.style.visibility = "visible";

                formContainer.style.overflowY = "scroll";
                
            },
            returnFromSignupTutor(){
                const formContainer = document.getElementById('form-container') as HTMLInputElement;
                const electionSection = document.getElementById('election') as HTMLInputElement;
                const tutorForm = document.getElementById('tutor-register-form') as HTMLInputElement;

                electionSection.style.transitionProperty = "opacity";
                electionSection.style.transitionDuration = "350ms";
                electionSection.style.transitionTimingFunction = "ease-in-out";
                electionSection.style.opacity = "1";
                electionSection.style.visibility = "visible";

                tutorForm.style.transitionProperty = "opacity";
                tutorForm.style.transitionDuration = "150ms";
                tutorForm.style.transitionTimingFunction = "ease-in-out";
                tutorForm.style.opacity = "0";
                tutorForm.style.visibility = "hidden";

                formContainer.style.overflowY = "hidden";
                formContainer.scrollTo(0,0);
            },
            toSignupStudentForm() {
                const electionSection = document.getElementById('election') as HTMLInputElement;
                const studentForm = document.getElementById('student-register-form') as HTMLInputElement;

                electionSection.style.transitionProperty = "opacity";
                electionSection.style.transitionDuration = "350ms";
                electionSection.style.transitionTimingFunction = "ease-in-out";
                electionSection.style.opacity = "0";
                electionSection.style.visibility = "hidden";

                studentForm.style.transitionProperty = "opacity";
                studentForm.style.transitionDuration = "150ms";
                studentForm.style.transitionTimingFunction = "ease-in-out";
                studentForm.style.opacity = "1";
                studentForm.style.visibility = "visible";

            },
            returnFromSignupStudent(){
                const electionSection = document.getElementById('election') as HTMLInputElement;
                const studentForm = document.getElementById('student-register-form') as HTMLInputElement;

                electionSection.style.transitionProperty = "opacity";
                electionSection.style.transitionDuration = "350ms";
                electionSection.style.transitionTimingFunction = "ease-in-out";
                electionSection.style.opacity = "1";
                electionSection.style.visibility = "visible";

                studentForm.style.transitionProperty = "opacity";
                studentForm.style.transitionDuration = "150ms";
                studentForm.style.transitionTimingFunction = "ease-in-out";
                studentForm.style.opacity = "0";
                studentForm.style.visibility = "hidden";

            }
        }
    })
</script> 


