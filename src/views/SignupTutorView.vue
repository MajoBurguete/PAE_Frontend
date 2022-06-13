
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ScheduleItem from '../components/items/Schedule-Item.vue'
import ClassModal from '../components/items/Class-Modal.vue'
import ClassFilter from "../components/items/Class-Filter.vue"
import router from "../router";
import axios from "axios";
import emailjs from 'emailjs-com';

const api = 'http://localhost:8000/api/'
const careers = ref([]);
let dsb = true;

export default defineComponent({
    components: {
        ScheduleItem,
        ClassFilter,
        ClassModal
    },
    mounted() {
        axios
        .get(api + 'careers/')
        .then(result => {
            careers.value = result.data
        })
        .catch(error => {
            console.log(error)
        })

        this.cleanInputs();
    },
    data() {
        return{
            careerList: careers,
            username: null,
            userpassword: null,
            userConfirmPassword: "",
            userId: "",
            userMail: "",
            semester: 0,
            userCareer: "",
            tutorSubjects: [],
            tutorSchedule: [],
            disabledV: true,
            updateModal: false,
            scheduleComplete: false,
            classesComplete: false,
            adminEmails: ""
        }
    },
    updated(){
        const errorMess = document.getElementById("signup-error") as HTMLInputElement;
        errorMess.style.display = "none"
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            let password = form.user_password_signup
            let confirmPassword = form.user_confirm_password_signup
            if ((form.user_name_signup.checkValidity() && form.user_email_signup.checkValidity() && form.user_id_signup.checkValidity() && form.user_semester_signup.checkValidity() && form.user_career_signup.checkValidity() && password.checkValidity() && password.value == confirmPassword.value)) {
                dsb = false
            }
            else {
                dsb = true
            }

            form.classList.add('was-validated')
        })

        if(this.scheduleComplete && this.classesComplete && !dsb){
            this.isDisabled = false;
        }
        else{
            this.isDisabled = true;
        }

    },
    computed: {
        isDisabled: {
            get(){
                return this.disabledV;
            },
            set(val){
                this.disabledV = val;
            }
        },
        changeUpdateModal: {
            get(){
                return this.updateModal;
            },
            set(val){
                this.updateModal = val;
            }
        },
        changeScheduleStatus: {
            get(){
                return this.scheduleComplete;
            },
            set(val){
                this.scheduleComplete = val;
            }
        },
        changeClassFiltStatus: {
            get(){
                return this.classesComplete;
            },
            set(val){
                this.classesComplete = val;
            }
        }

    },
    methods: {
        backButton() {
            localStorage.setItem("fromSignupForm", "true")
            router.push('/')
        },
        scheduleCompleteOnChange(){
            this.changeScheduleStatus = true;
            this.$forceUpdate();
        },
        scheduleIncompleteOnChange(){
            this.changeScheduleStatus = false;
            this.$forceUpdate();
        },
        classFilterCompleteOnChange(){
            this.changeClassFiltStatus = true;
            this.$forceUpdate();
        },
        classFilterIncompleteOnChange(){
            this.changeClassFiltStatus = false;
            this.$forceUpdate();
        },
        sendUpdateModal(){
            this.changeUpdateModal = true;
            this.$forceUpdate();
        },

        receivedUpdateModal(){
            this.changeUpdateModal = false;
            this.$forceUpdate();
        },
        async createUser() {
            await axios
            .post(api + "users/", {
                username: this.userId,
                password: this.userpassword,
                email: this.userMail,
                first_name: this.username
            })
            .then( result => {
                const userNumId = result.data.id

                axios
                .post(api + "pae_users/", {
                    id: userNumId,
                    semester: this.semester,
                    career: this.userCareer,
                    user_type: 1,
                    status: 2
                })
                .then(async result => {
                    const tutorScheduleS = JSON.parse(localStorage.getItem('hoursSelectedT'));
                    const subjectsSelected = JSON.parse(localStorage.getItem('classesSelected'));
    
                    for(var i = 0; i < tutorScheduleS.length; i++) {
                        axios
                        .post(api + 'schedules/', {
                            id_user: userNumId,
                            day_hour: tutorScheduleS[i],
                            available: true
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }
    
                    for(var i = 0; i < subjectsSelected.length; i++) {
                        axios
                        .post(api + 'tutor_subjects/', {
                            id_tutor: userNumId,
                            id_subject: subjectsSelected[i]
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }
                    
                    var emails = []
                    var emailString = ""

                    await axios
                    .get(api + 'admins_emails/')
                    .then(result => {
                        emails = result.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                    for(let i = 0; i < emails.length - 1; i++) {
                        emailString += emails[i].id__email
                        emailString += ', '
                    }

                    emailString += emails[emails.length-1].id__email

                    this.adminEmails = emailString

                    var templateParams = {
                        admin_emails: this.adminEmails,
                        message: 'Un nuevo tutor se ha registrado en el sistema. Entra a la plataforma de PAE para revisar sus datos y aprobarlo.'
                    };

                    emailjs
                    .send('service_2efcuwp', 'template_ctjjkkc', templateParams, 'LPBuS8HK51bdTE-9Y')
                    .then(response => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });

                    localStorage.setItem("displayToast", "signupTutor");
                    router.push("/")
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error.response.data)
                const errorMess = document.getElementById("signup-error") as HTMLInputElement;
                const useridInp = document.getElementById("user_id_signup") as HTMLInputElement;

                if(error.response.data.username[0] == "A user with that username already exists."){
                    errorMess.style.display = "flex";
                    useridInp.value = "";
                    window.scrollTo(0,0)
                }
                else{
                    errorMess.style.display = "none"
                }
            })

            this.createUser()
        },
        async createUser(){
            let postUser = await axios
            .post(api + "users/", {
                username: this.userId,
                password: this.userpassword,
                email: this.userMail,
                first_name: this.username
            })

            const userNumId = postUser.data.id

            axios
            .post(api + "pae_users/", {
                id: userNumId,
                semester: this.semester,
                career: this.userCareer,
                user_type: 0,
                status: 0
            })
            .then(result => {
                console.log(result.data);
                router.push("/")
            })
            .catch(error => {
                console.log(error);
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

            document.body.style.cursor = 'pointer';
            messageContainer.style.visibility = "visible"
        },
        questionNameOutOfHover(){
            const messageContainer = document.getElementById('popover-name') as HTMLInputElement;

            document.body.style.cursor = 'auto';
            messageContainer.style.visibility = "hidden"
        },
        questionEmailOnHover(){
            const messageContainer = document.getElementById('popover-email') as HTMLInputElement;

            document.body.style.cursor = 'pointer';
            messageContainer.style.visibility = "visible"
        },
        questionEmailOutOfHover(){
            const messageContainer = document.getElementById('popover-email') as HTMLInputElement;

            document.body.style.cursor = 'auto';
            messageContainer.style.visibility = "hidden"
        },
        questionPasswordOnHover(){
            const messageContainer = document.getElementById('popover-password') as HTMLInputElement;

            document.body.style.cursor = 'pointer';
            messageContainer.style.visibility = "visible"
        },
        questionPasswordOutOfHover(){
            const messageContainer = document.getElementById('popover-password') as HTMLInputElement;
            document.body.style.cursor = 'auto';
            messageContainer.style.visibility = "hidden"
        },
        questionMatOnHover(){
            const messageContainer = document.getElementById('popover-mat') as HTMLInputElement;

            document.body.style.cursor = 'pointer';
            messageContainer.style.visibility = "visible"
        },
        questionMatOutOfHover(){
            const messageContainer = document.getElementById('popover-mat') as HTMLInputElement;

            document.body.style.cursor = 'auto';
            messageContainer.style.visibility = "hidden"
        },
        showPassword(passwordID: string, imageID: string){
            const password = document.getElementById(passwordID) as HTMLInputElement;
            const eye = document.getElementById(imageID) as HTMLImageElement;
            if (password.type == "password") {
                password.type = "text";
                eye.src = "src/assets/img/no-visibility.png";
            } else {
                password.type = "password";
                eye.src = "src/assets/img/visibility.png";
            }
        }
    }
})
</script>


<template>
    <body>
        <img class="PAE-logo" src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
        <form class="needs-validation" novalidate @submit.prevent="checkForm">
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
                        <input type="text" v-model="username" class="form-control" id="user_name_signup" placeholder="Nombre" @input="checkForm" pattern="[ a-zA-ZÀ-ÿ\u00f1\u00d1]+" minlength="1" maxlength="100" required>
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
                        <input type="email" v-model="userMail" class="form-control" id="user_email_signup" placeholder="A0XXXXXXX@tec.com" pattern="^((A|a)0)[0-9]{7}@(itesm|tec).mx$" required @input="checkForm">
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
                            <input type="password" v-model="userpassword" class="form-control" id="user_password_signup" placeholder="Contraseña" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$" onkeyup="form.user_confirm_password_signup.pattern = this.value;" required>
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
                        <div class="with-icon">
                            <label class="form-label">Matrícula</label>
                            <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionMatOnHover" @mouseleave="questionMatOutOfHover">
                            <div class="tooltip-style" id="popover-mat">
                                Debe comenzar con 'A' y seguida de 8 números.
                            </div>
                        </div>
                        <input type="text" v-model="userId" class="form-control" id="user_id_signup" placeholder="A0XXXXXXX" pattern="^(A0)[0-9]{7}$" required>
                    </div>
                    <h3 class="error-message" id="signup-error"> Ya existe una cuenta con esa matrícula </h3>
                </div>
            </div>
            <div class = "row">
                <div class="col-6 col-md">
                    <div class="mb-3">
                        <label class="form-label">Confirma tu contraseña</label>
                        <div class="input-group">
                            <input type="password" v-model="userConfirmPassword" class="form-control" id="user_confirm_password_signup" placeholder="Contraseña" onkeyup="this.pattern = form.user_password_signup.value;" required>
                            <div class="input-group-append" id="pass-hide">
                                <span class="input-group-text" @click="showPassword('user_confirm_password_signup','visibility_confirm_password_image')">
                                    <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_confirm_password_image">
                                </span>
                            </div>
                        </div>
                        <input type="text" v-model="userId" class="form-control" id="user_id_signup" placeholder="A0XXXXXXX" pattern="^(A0)[0-9]{7}$" required>
                    </div>
                </div>
                <div class="col-6 col-md">
                    <div class="input-group" id="semester-IG">
                        <label class="dropdown-text-semester">Semestre</label>
                        <select v-model="semester" class="form-select" id="user_semester_signup" required>
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
                    <div class="input-group" id="career-IG">
                        <label class="dropdown-text-career">Carrera</label>
                        <select v-model="userCareer" class="form-select" id="user_career_signup" required>
                            <option v-for="(career, i) in careerList" :key="i" :value="career.id">{{ career.id }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="tutor-elections">
                <div class="schedule-info">
                    <div class="schedule-instructions">
                        <label class="section-title"> Horario </label>
                        <h2>Selecciona 5 horas que tengas libres para dar asesorias</h2>
                    </div>
                    <ScheduleItem baseColor="#26408B" hoverColor="#263f8b85" showDate="inactive" fromSignupT="true" alignItemsVal="flex-start" v-on:schedule-complete = "scheduleCompleteOnChange" v-on:schedule-incomplete = "scheduleIncompleteOnChange"/>

                </div>
                <div class="uf-container">
                    <div class="center">
                        <label class="section-title">Unidades de formación</label>
                        <h2>Escoge las unidades de formación que asesorarás.</h2>
                        <button type="button" id="register-uf" data-bs-toggle="modal" data-bs-target="#class-modal" @click="sendUpdateModal">Registrar UFs</button>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <div>
                    <button class="bigger-buttons"  id="back-button" @click="backButton"> Regresar </button>
                    <button class="bigger-buttons" @click="createUser" id="signup-button" :disabled="isDisabled"> Registrarse </button>
                </div>
            </div>
        </form>

        <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <ClassModal v-on:disable-classes="classFilterIncompleteOnChange" v-on:enable-classes="classFilterCompleteOnChange" v-on:modal-update="receivedUpdateModal" :callUpdate="changeUpdateModal"/>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    /* Class modal */
    .modal-content{
        border-radius: 10px;
    }

    body{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 3vh;
        overflow-x: hidden;
    }

    form{
        overflow-x: hidden;
    }

    .PAE-logo{
        width: 15%;
        height: 15%;
    }


    h1{
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 3.5vh;
        color: #26408B;
    }

    h2{
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        color: #26408B;
    }

    button, a {
        padding: 0.5vh 2vw;
        margin: 1vh 0;
        font-family: "Ubuntu";
        font-weight: normal;
        border-color: transparent;
        border-radius: 1.5vh;
        color: white;
    }

    .section-title {
            font-family: "Catamaran";
            font-weight: bold;
            font-size: 3vh;
            color: #26408B;
    }

    .tutor-elections{
        display: flex;
        gap: 9vw;
    }

    /* Bottom containers */
    .uf-container, 
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .uf-container{
        width: 25vw;
        align-content: center;
    }

    .button-container{
        margin-top: 6.5vh;
    }

    .center{
        margin: 0 0 0 0vw;
        padding: 2vh 0 0 0vw;
    }

    .schedule-info{
        margin: 0 0 0 0vw;
        display: flex;
        flex-direction: column;
        width: 55%;
    }

    .schedule-instructions{
        padding: 2vh 0 0 0vw;
        width: fit-content;
    }


    #register-uf{
        background-color: #769ABA;
        font-size: 2.4vh;
    }

    /* Return and signup buttons */

    .bigger-buttons{
        font-size: 2.5vh;
        padding: 0.5vh 4.5vw;
    }

    #back-button{
        background-color: #8699D0;
        margin-inline-end: 1vw;
    }

    #back-button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #ADBCE5;
        transition: all 0.3s ease 0s;
    }

    #signup-button{
        background-color: #26408B;
        margin-inline-start: 1vw;
    }

    #signup-button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    #signup-button:disabled{
        background-color: #3d46608d;
        color: #ffffffaa;
    }

    /* Modal styles */
        
    .modal-lg{
        min-width: 50vw;
    }

    /* Signup form */
    .mb-3{
        width: 40vw;
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
        width: 35vw;
        padding: 0 0vw 0 0.5vw;
        margin: 0 0vw 0 0vw;
    }

    /* Dropdowns style */

    .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        border-radius: 0.65vh;
    }

    .input-group {
        display: flex;
        flex-wrap: nowrap;
        width: 35vw;
    }

    #semester-IG,
    #career-IG{
        margin: 1.3vh 0 0 0;
    }

    .dropdown-text-semester{
        margin: 0 2.1vw 0 0;
    }

    .dropdown-text-career {
        margin: 0 3.3vw 0 0;
    }

    /* Question button */
    .question{
        width: 4%;
        height: 4%;
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

    .row {
        gap: 0.5vw;
        margin-top: 2vh;
    }

    /* Error message */
    .error-message{
        display: none;
        color: rgb(221, 31, 31);
        font-family: "Catamaran";
        font-weight: lighter;
        font-size: 3vh;
    }


</style> 