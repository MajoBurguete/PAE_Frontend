<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { RouterLink, RouterView } from "vue-router";
    import axios from 'axios'
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
                modalMessage: "Tu cuenta ha sido creada con éxito",
                errorMessage: "Tu usuario o tu contraseña es incorrecto"
            }
        },
        mounted(){
            let messToast = localStorage.getItem("displayToast");
            var myModal = new bootstrap.Modal(document.getElementById('feedback-modal'))
            
            if(messToast == "signupStudent"){
                myModal.show()
                localStorage.setItem("displayToast", "empty")
            }
            else if(messToast == "signupTutor"){
                this.updateModalMess = "Te has registrado correctamente, te llegará un correo una vez que tu cuenta haya sido revisada."
                myModal.show()
                localStorage.setItem("displayToast", "empty")
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
            },
            updateErrorMess: {
                get(){
                    return this.errorMessage;
                },
                set(val){
                    this.errorMessage = val;
                }
            },
        },
        methods:{
            async detectUserType(){
                await axios
                .get(api + "current_user_data/?schoolID=" + this.username)
                .then( result => {
                    this.storeUserInfo(result.data[0].id ,result.data[0].user_type)
                    if(result.data[0].user_type == 2){
                        router.push('http://localhost:3000/admin-home');
                    }
                    else if(result.data[0].user_type == 1 && result.data[0].status == 2){
                        const errorMess = document.getElementById('login-error') as HTMLInputElement;
                        
                        this.updateErrorMess = "Tu cuenta aún no ha sido aprobada"
                        errorMess.style.display = "flex"

                    }
                    else{
                        router.push('http://localhost:3000/home')
                    }
                })
                .catch( error => {
                    console.log(error);
                })
            },
            storeUserInfo(userId: string, userT: string){
                localStorage.setItem("userID", userId);
                localStorage.setItem("userType", userT);
            },
            showNewPassword(){
                const password = document.getElementById("new_password") as HTMLInputElement;
                const eye = document.getElementById("visibility_new_password_image") as HTMLImageElement;
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
            showConfirmPassword(){
                const password = document.getElementById("confirm_password") as HTMLInputElement;
                const eye = document.getElementById("visibility_confirm_password_image") as HTMLImageElement;
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
                const userEmail = document.getElementById('new_password') as HTMLInputElement;
                const userPassword = document.getElementById('confirm_password') as HTMLInputElement;

                userEmail.value = "";
                userPassword.value = "";

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
            <div class="section-signup" id="section-signup">
                <div class="container-login" id="container-login">
                    <h1 class="login-message"> ¡Hola de <br/> nuevo! </h1>
                </div>
                <form class="needs-validation" novalidate  @submit.prevent="checkForm">
                    <div class="login-form" id="login-form">
                        <img src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
                        <div class="form">
                            <div class="mb-3">
                                <label class="form-label">Nueva Contraseña</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="new_password" v-model="username" placeholder="Nueva Contraseña"  @input="checkForm" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showNewPassword">
                                            <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_new_password_image">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Confirma Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="confirm_password"  v-model="password" placeholder="Confirma Contraseña"  @input="checkForm" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showConfirmPassword">
                                            <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_confirm_password_image">
                                        </span>
                                    </div>
                                </div>
                                <h3 class="error-message" id="login-error"> {{updateErrorMess}} </h3>
                            </div>
                        </div>
                        <button id="signin-button" type="submit" @click="login">Cambiar Contraseña</button>
                    </div>
                </form>
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

    button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #ffffffb5;
        transition: all 0.3s ease 0s;
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
    /*Contenedor del lado izquierdo (container-login) */
    .container-login{
        margin: 32vh 0 0 0;
        right: -30vw;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 5vh;
    }

    .container-login {
        position: absolute;
        width: 90%;
        visibility: solid;
    }


    .login-form {
        margin: 12vh 0 0 0;
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

    #signin-button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    .login-h3,
    label {
        font-family: "Catamaran";
        font-weight: bold;
        color:#26408B;
        font-size: 2.5vh;
        margin: 3.5vh 0 0 0;
    }

    .error-message{
        color: rgb(221, 31, 31);
        display: none;
        font-family: "Catamaran";
        font-weight: lighter;
    }

    #visibility_new_password_image{
        width: 2.5vw;
        height: auto;
    }
    #visibility_confirm_password_image{
        width: 2.5vw;
        height: auto;
    }
</style> 

