<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { RouterLink, RouterView } from "vue-router";
    import axios from 'axios'
    import $ from "jquery";
    import router from "../router";
    /* const user = ref({
        username: '',
        password: ''
    }) */

    const api = 'http://localhost:8000/api/'
    declare var bootstrap: any;

    export default defineComponent({
        data() {
            return {
                username: '',
                password: '',
                token: localStorage.getItem('user-token') || null,
                modalMessage: "Tu cuenta ha sido creada con éxito"
            }
        },
        mounted(){
            let messToast = localStorage.getItem("displayToast");
            var myModal = new bootstrap.Modal(document.getElementById('feedback-modal'))
            
            if(messToast == "signupStudent"){
                myModal.show()
            }
        },
        computed: {
            updateModalMess: {
                get(){
                    return this.modalMessage;
                },
                set(val){
                    this.modalMessage = val;
                }
            }
        },
        methods:{
            async detectUserType(){
                await axios
                .get(api + "current_user_data/?schoolID=" + this.username)
                .then( result => {
                    console.log(result.data[0])
                    localStorage.setItem("userID", result.data[0].id);
                    localStorage.setItem("userType", result.data[0].user_type);

                    if(localStorage.getItem("userType") == "2"){
                        console.log(localStorage.getItem("userType"));
                        router.push('http://localhost:3000/admin-home');
                    }
                    else{
                        router.push('http://localhost:3000/home')
                    }
                })
                .catch( error => {
                    console.log(error);
                })
            },
            showPassword(){
                const password = document.getElementById("user_password_login") as HTMLInputElement;
                const eye = document.getElementById("visibility_password_image_login") as HTMLImageElement;
                if (password.type == "password") {
                    password.type = "text";
                    eye.src = "src/assets/img/no-visibility.png";
                    console.log(password.type);
                    console.log(eye.src);
                } else {
                    password.type = "password";
                    console.log(password.type);
                    eye.src = "src/assets/img/visibility.png";
                    console.log(eye.src);

                }
            },
            cleanInputs(){
                const userEmail = document.getElementById('user_email_login') as HTMLInputElement;
                const userPassword = document.getElementById('user_password_login') as HTMLInputElement;

                userEmail.value = "";
                userPassword.value = "";

            },
            toSignup() {
                const loginSection = document.getElementById('section-login') as HTMLInputElement;
                const signupSection =document.getElementById('section-signup') as HTMLInputElement;
                const signupContainer = document.getElementById('container-signup') as HTMLInputElement;
                const loginContainer = document.getElementById('container-login') as HTMLInputElement; 
                const loginForm = document.getElementById('login-form') as HTMLInputElement;
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

                loginContainer.style.transitionProperty = "opacity";
                loginContainer.style.transitionDuration = "350ms";
                loginContainer.style.transitionTimingFunction = "ease-in-out";
                loginContainer.style.opacity = "1";
                loginContainer.style.visibility = "visible";

                loginForm.style.transitionProperty = "opacity";
                loginForm.style.transitionDuration = "350ms";
                loginForm.style.transitionTimingFunction = "ease-in-out";
                loginForm.style.opacity = "0";
                loginForm.style.visibility = "hidden";

                formContainer.style.transitionProperty = "opacity";
                formContainer.style.transitionDuration = "350ms";
                formContainer.style.transitionTimingFunction = "ease-in-out";
                formContainer.style.opacity = "1";
                formContainer.style.visibility = "visible";

                this.cleanInputs();

            },
            login() {
                const errorMess = document.getElementById('login-error') as HTMLInputElement;
                
                axios
                .post('http://localhost:8000/auth/', {
                    username: this.username,
                    password: this.password
                })
                .then(result => {
                    errorMess.style.display = "none";
                    this.token = result.data.token
                    console.log(this.token)
                    localStorage.setItem('user-token', result.data.token)

                    this.detectUserType();
                })
                .catch(error => {
                    console.log(error)
                    localStorage.removeItem('user-token')

                    errorMess.style.display = "flex"

                })
            },
            toLogin() {
                const loginSection = document.getElementById('section-login') as HTMLInputElement;
                const signupSection = document.getElementById('section-signup') as HTMLInputElement;
                const signupContainer = document.getElementById('container-signup') as HTMLInputElement;
                const loginContainer = document.getElementById('container-login') as HTMLInputElement; 
                const loginForm = document.getElementById('login-form') as HTMLInputElement;
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

                loginContainer.style.transitionProperty = "opacity";
                loginContainer.style.transitionDuration = "350ms";
                loginContainer.style.transitionTimingFunction = "ease-in-out";
                loginContainer.style.opacity = "0";
                loginContainer.style.visibility = "hidden";

                loginForm.style.transitionProperty = "opacity";
                loginForm.style.transitionDuration = "350ms";
                loginForm.style.transitionTimingFunction = "ease-in-out";
                loginForm.style.opacity = "1";
                loginForm.style.visibility = "visible";

                formContainer.style.transitionProperty = "opacity";
                formContainer.style.transitionDuration = "350ms";
                formContainer.style.transitionTimingFunction = "ease-in-out";
                formContainer.style.opacity = "0";
                formContainer.style.visibility = "hidden";

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
                router.push('http://localhost:3000/tutor-signup')
            },
            toSignupStudentForm() {
                router.push('http://localhost:3000/student-signup')
            },
            checkForm(){
                /* 'use strict'
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                const forms = document.querySelectorAll('.needs-validation')

                // Loop over them and prevent submission
                Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                    form.addEventListener('submit', function (event: Event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                }) */
            }
        }
    })
</script> 


<template>
    <body>
        <div class="flexContainer">
            <div class="section-login" id="section-login">
                <div class="container-signup" id="container-signup">
                    <h1> ¡Bienvenidx! </h1>
                    <button class="signup" id="signup" type="button" @click="toSignup"> Regístrate </button>
                    <h3> ¿Aún no te has registrado? </h3>
                </div>
                <div class="form-container" id="form-container">
                    <div class="account-selection" id="account-selection"> 
                        <img src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
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
                    </div>
                </div>
            </div>

            <div class="section-signup" id="section-signup">
                <div class="container-login" id="container-login">
                    <h1 class="login-message"> ¡Hola de <br/> nuevo! </h1>
                    <button class="login-button" id="login-button" type="button" @click="toLogin"> Ingresa </button>
                    <h3> ¿Ya tienes cuenta? </h3>
                </div>
                <form class="needs-validation" novalidate  @submit.prevent="checkForm">
                    <div class="login-form" id="login-form">
                        <img src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
                        <div class="form">
                            <div class="mb-3">
                                <label class="form-label">Matrícula</label>
                                <input type="text" class="form-control" id="user_email_login" v-model="username" placeholder="A0XXXXXXX"  @input="checkForm" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="user_password_login"  v-model="password" placeholder="Contraseña"  @input="checkForm" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showPassword">
                                            <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_password_image_login">
                                        </span>
                                    </div>
                                </div>
                                <h3 class="error-message" id="login-error"> Tu usuario o tu contraseña es incorrecto </h3>
                            </div>
                            <h3 class="login-question-h3">¿Olvidaste tu contraseña?</h3>
                        </div>
                        <button id="signin-button" type="submit" @click="login">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal fade" id="feedback-modal" tabindex="-1" aria-labelledby="feedbackModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1 class="h1-modal"> {{modalMessage}} </h1>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" id="close-fmodal-btn"> Regresar </button>
                    </div>
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
        width: 25vw;
        height: 6vh;
        border: 2px solid;
        border-radius: 1vh;
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        padding: 0vh 0.4vw 0vh 0.4vw;
        margin: 0;
        border-color: black;
        border-width: 0.25vh;
        border-radius: 0.65vh;
    }

    span{
        height: 6.2vh;
        width: 3.5vw;
        justify-content: center;
    }

    .input-group-text{
        height: 6.2vh;
        width: 3.5vw;
        padding: 0.5vh;
    }
    .input-group {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        margin: 1.3vh 0 0 0;
        width: 25vw;
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

    .login-h3,
    label {
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

    .error-message{
        color: rgb(221, 31, 31);
        display: none;
        font-family: "Catamaran";
        font-weight: lighter;
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
        overflow-x: hidden;
    }
    .account-selection{
        display: flex;
        flex-direction: column;
        align-items: center;
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

    #visibility_password_image_login{
        width: 2.5vw;
        height: auto;
    }

    /* Modal */
    
    .modal-content{
        background-color: #E1F0EA;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3vh 2vw;
        border-radius: 10px;
    }
    .modal-lg{
        width: 40vw;
    }

    .h1-modal{
        font-size: 5vh;
        text-align: center;
        font-weight: 50;
        color: #6F9492;
    }

    #close-fmodal-btn{
        background-color: #96CCC9;
        font-size: 3vh;
        width: 20vw;
        padding: 1vh 2vw;
        color: white;
    }

</style> 

