<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

const api = 'http://localhost:8000/api/'
const careers = ref([]);

export default defineComponent({

    mounted() {
        axios
        .get(api + 'careers/')
        .then(result => {
            careers.value = result.data
        })
        .catch(error => {
            console.log(error)
        })
    },

    data() {
        return {
            careerList: careers
        }
    },

    methods:{
        checkForm(){
            'use strict'
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
            })
        },
        cleanInputs(){
            const userName = document.getElementById('user_name_signup') as HTMLInputElement;
            const userEmail = document.getElementById('user_email_signup') as HTMLInputElement;
            const userPassword = document.getElementById('user_password_signup') as HTMLInputElement;
            const userConfirmPassword = document.getElementById('user_confirm_password_signup') as HTMLInputElement;
            const userId = document.getElementById('user_id_signup') as HTMLInputElement;

            userName.value = "";
            userEmail.value = "";
            userPassword.value = "";
            userConfirmPassword.value = "";
            userId.value = "";

        },
        questionNameOnHover(){
            const messageContainer = document.getElementById('popover-name') as HTMLInputElement;

            messageContainer.style.visibility = "visible"
        },
        questionNameOutOfHover(){
            const messageContainer = document.getElementById('popover-name') as HTMLInputElement;

            messageContainer.style.visibility = "hidden"
        },
        questionEmailOnHover(){
            const messageContainer = document.getElementById('popover-email') as HTMLInputElement;

            messageContainer.style.visibility = "visible"
        },
        questionEmailOutOfHover(){
            const messageContainer = document.getElementById('popover-email') as HTMLInputElement;

            messageContainer.style.visibility = "hidden"
        },
        questionPasswordOnHover(){
            const messageContainer = document.getElementById('popover-password') as HTMLInputElement;

            messageContainer.style.visibility = "visible"
        },
        questionPasswordOutOfHover(){
            const messageContainer = document.getElementById('popover-password') as HTMLInputElement;

            messageContainer.style.visibility = "hidden"
        },
        questionMatOnHover(){
            const messageContainer = document.getElementById('popover-mat') as HTMLInputElement;

            messageContainer.style.visibility = "visible"
        },
        questionMatOutOfHover(){
            const messageContainer = document.getElementById('popover-mat') as HTMLInputElement;

            messageContainer.style.visibility = "hidden"
        },
        showPassword(passwordID: string, imageID: string){
            const password = document.getElementById(passwordID) as HTMLInputElement;
            const eye = document.getElementById(imageID) as HTMLImageElement;
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
        }
    }
    
})
</script>

<template>
    <body>
        <form class="needs-validation" novalidate>
            <div class="row">
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <div class="with-icon">
                            <label class="form-label">Nombre completo</label>
                            <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionNameOnHover" @mouseleave="questionNameOutOfHover">
                            <div class="tooltip-style" id="popover-name">
                                Máximo 100 caracteres, sin números ni caracteres especiales.
                            </div>
                        </div>
                        <input type="text" class="form-control" id="user_name_signup" placeholder="Nombre" @input="checkForm" required>
                    </div>
                </div>
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <div class="with-icon">
                            <label class="form-label">Correo Institucional</label>
                            <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionEmailOnHover" @mouseleave="questionEmailOutOfHover">
                            <div class="tooltip-style" id="popover-email">
                                Correo válido dentro del dominio “@tec” o “@itesm”.
                            </div>
                        </div>
                        <input type="email" class="form-control" id="user_email_signup" placeholder="A0XXXX@tec.com" required @input="checkForm">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <div class="with-icon">
                            <label class="form-label">Contraseña</label>
                            <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionPasswordOnHover" @mouseleave="questionPasswordOutOfHover">
                            <div class="tooltip-style" id="popover-password">
                                Entre 8-50 caracteres, mínimo una minúscula, una mayúscula y un número
                            </div>
                        </div>
                       <div class="input-group">
                            <input type="password" class="form-control" id="user_password_signup" placeholder="Contraseña" required>
                            <div class="input-group-append">
                                <span class="input-group-text" @click="showPassword('user_password_signup','visibility_password_image')">
                                    <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_password_image">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <label class="form-label">Confirma tu contraseña</label>
                        <div class="input-group">
                            <input type="password" class="form-control" id="user_confirm_password_signup" placeholder="Contraseña" required>
                            <div class="input-group-append">
                                <span class="input-group-text" @click="showPassword('user_confirm_password_signup','visibility_confirm_password_image')">
                                    <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_confirm_password_image">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "row">
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <div class="with-icon">
                            <label class="form-label">Matrícula</label>
                            <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionMatOnHover" @mouseleave="questionMatOutOfHover">
                            <div class="tooltip-style" id="popover-mat">
                                Debe comenzar con 'A' y seguida de 8 números.
                            </div>
                        </div>
                        <input type="text" class="form-control" id="user_id_signup" placeholder="A0XXXX" required>
                    </div>
                </div>
                <div class="col-6 col-md">
                    <div class="input-group">
                        <label class="dropdown-text-semester">Semestre</label>
                        <select class="form-select" required>
                            <option selected>Semestre</option>
                            <option value="1">1º</option>
                            <option value="2">2º</option>
                            <option value="3">3º</option>
                            <option value="4">4º</option>
                            <option value="5">5º</option>
                            <option value="6">6º</option>
                            <option value="7">7º</option>
                            <option value="8">8º</option>
                            <option value="9">9º</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label class="dropdown-text-career">Carrera</label>
                        <select class="form-select">
                            <option selected>Carrera</option>
                            <option v-for="(career, i) in careerList" :key="i" value="{{ career.id }}">{{ career.id }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    </body>
</template>

<style scoped>

    body{
        padding: 0 0 0 2vw;
    }

    /* Input labels */
    label {
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 2.5vh;
        margin: 0;
        color: #26408B;
    }
    span{
        height: 6.6vh;
        margin-bottom: -0.8vh;
        width: 4vw;
    }
    /* Text boxes and dropdowns */
    input, 
    .form-select {
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        padding: 0.25vh 0vw 0 0.5vw;
        border-color: black;
        border-width: 0.25vh;
        border-radius: 0.65vh;
    }

    input {
        height: 6.5vh;
        width: 23.93vw;
        margin: 0 0vw 0 0vw;
    }

    /* Dropdowns style */

    .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        border-radius: 0.65vh;
    }

    .input-group {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        margin: 1.3vh 0 0 0;
        width: 24vw;
    }

    .dropdown-text-semester{
        margin: 0 2.1vw 0 0;
    }

    .dropdown-text-career {
        margin: 0 3.3vw 0 0;
    }

    /* Question button */
    .question{
        width: 6%;
        height: 6%;
        margin: 0 0 0vh 0;
    }

    .with-icon{
        display: flex;
        gap: 0.5vh;
        align-items: center;
        margin: 0 0 0 0;
    }

    .tooltip-style{
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 1.2vh;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 0.5vh 0.15vw;
        visibility: hidden;
        width: 11.7vw;
    }

    #user_confirm_password_signup{
        margin: 0.75vh 0 0 0;
    }

    .row {
        gap: 3vw;
        margin-top: 2vh;
    }

</style>