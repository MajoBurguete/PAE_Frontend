<script lang="ts">
    import { defineComponent, ref } from "vue";
    import axios from 'axios'
    import router from "../router";

    const api = 'http://localhost:5100/api/'
    let dsb = true

    export default defineComponent({
        data() {
            return {
                disabledF: true,
                username: '',
                password: '',
                confirmPass: '',
                token: localStorage.getItem('user-token') || null,
                modalMessage: "Tu cuenta ha sido creada con éxito",
                errorMessage: "Tu usuario o tu contraseña es incorrecto"
            }
        },
        updated(){
            const forms = document.querySelectorAll('.needs-validation');

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
            .forEach(function (form) {
                let newPassword = form.new_password
                let confirmPassword = form.confirm_password
                if ((form.id_input.checkValidity() && form.new_password.checkValidity() && newPassword.value == confirmPassword.value)) {
                    dsb = false
                }
                else {
                    dsb = true
                }

                form.classList.add('was-validated')
            })

            this.isDisabled = dsb;
        },
        computed: {
            isDisabled: {
                get(){
                    return this.disabledF;
                },
                set(val){
                    this.disabledF = val;
                }
            },
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
            storeUserInfo(userId: string, userT: string){
                localStorage.setItem("userID", userId);
                localStorage.setItem("userType", userT);
            },
            showNewPassword(){
                const password = document.getElementById("new_password") as HTMLInputElement;
                const eye = document.getElementById("visibility_new_password_image") as HTMLImageElement;
                if (password.type == "password") {
                    password.type = "text";
                    eye.src = "../assets/img/no-visibility.png";
                } else {
                    password.type = "password";
                    eye.src = "../assets/img/visibility.png";
                }
            },
            showConfirmPassword(){
                const password = document.getElementById("confirm_password") as HTMLInputElement;
                const eye = document.getElementById("visibility_confirm_password_image") as HTMLImageElement;
                if (password.type == "password") {
                    password.type = "text";
                    eye.src = "../assets/img/no-visibility.png";
                } else {
                    password.type = "password";
                    eye.src = "../assets/img/visibility.png";
                }
            },
            cleanInputs(){
                const userEmail = document.getElementById('new_password') as HTMLInputElement;
                const userPassword = document.getElementById('confirm_password') as HTMLInputElement;

                userEmail.value = "";
                userPassword.value = "";

            },
            async recoverPassword() {
                const backMessage = document.getElementById('back-message') as HTMLInputElement;
                backMessage.style.display = "flex"
                var limit1 = -1
                var flag1 = 0
                var limit2 = -1
                var flag2 = 0
                var limit3 = -1
                var flag3 = 0
                var limit4 = -1
                var flag4 = 0
                var limit5 = -1
                var flag5 = 0
                var limit6 = -1
                var flag6 = 0
                var limit7 = -1
                var flag7 = 0
                var limit8 = -1
                var flag8 = 0
                var flag9 = 0
                await axios
                .get(api + "find_user/?schoolID=" + this.username)
                .then(async result => {
                    result.data[0].id__username = "TemporalUsername"
                    const userID = result.data[0].id
                    await axios
                    .put(api + "users/" + userID + "/", {
                        id: userID,
                        username: result.data[0].id__username,
                        password: result.data[0].id__password,
                        email: result.data[0].id__email,
                    })
                    .then(async result2 => {
                        await axios
                        .post(api + "users/", {
                            username: this.username,
                            password: this.password,
                            email: result2.data.email,
                            first_name: result2.data.first_name
                        })
                        .then(async result3 => {
                            const newUserID = result3.data.id
                            await axios
                            .post(api + "pae_users/", {
                                id: newUserID,
                                semester: result.data[0].semester,
                                career: result.data[0].career,
                                user_type: result.data[0].user_type,
                                status: result.data[0].status
                            })
                            .then(async result4 => {
                                await axios
                                .get(api + "subjects_by_user/?user=" + userID)
                                .then(async result5 => {
                                    limit1 = result5.data.length
                                    for (let i = 0; i < result5.data.length; i ++) {
                                        result5.data[i].id_tutor = newUserID
                                        await axios
                                        .put(api + "tutor_subjects/" + result5.data[i].id + "/", result5.data[i])
                                        .then(async result6 => {
                                            flag1 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "schedule_by_tutor/?tutor=" + userID)
                                .then(async result7 => {
                                    limit2 = result7.data.length
                                    for (let i = 0; i < result7.data.length; i ++) {
                                        result7.data[i].id_user = newUserID
                                        await axios
                                        .put(api + "schedules/" + result7.data[i].id + "/", result7.data[i])
                                        .then(async result8 => {
                                            flag2 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "answers_by_user/?student=" + userID)
                                .then(async result9 => {
                                    limit3 = result9.data.length
                                    for (let i = 0; i < result9.data.length; i ++) {
                                        result9.data[i].id_student = newUserID
                                        await axios
                                        .put(api + "answers/" + result9.data[i].id + "/", result9.data[i])
                                        .then(async result10 => {
                                            flag3 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "answers_by_user/?tutor=" + userID)
                                .then(async result11 => {
                                    limit4 = result11.data.length
                                    for (let i = 0; i < result11.data.length; i ++) {
                                        result11.data[i].id_tutor = newUserID
                                        await axios
                                        .put(api + "answers/" + result11.data[i].id + "/", result11.data[i])
                                        .then(async result12 => {
                                            flag4 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "files_answers_about_user/?student=" + userID)
                                .then(async result13 => {
                                    limit5 = result13.data.length
                                    for (let i = 0; i < result13.data.length; i ++) {
                                        result13.data[i].id_student = newUserID
                                        await axios
                                        .put(api + "answer_files/" + result13.data[i].id + "/", result13.data[i])
                                        .then(async result14 => {
                                            flag5 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "files_answers_about_user/?tutor=" + userID)
                                .then(async result15 => {
                                    limit6 = result15.data.length
                                    for (let i = 0; i < result15.data.length; i ++) {
                                        result15.data[i].id_tutor = newUserID
                                        await axios
                                        .put(api + "answer_files/" + result15.data[i].id + "/", result15.data[i])
                                        .then(async result16 => {
                                            flag6 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "sessions_by_user/?student=" + userID)
                                .then(async result17 => {
                                    limit7 = result17.data.length
                                    for (let i = 0; i < result17.data.length; i ++) {
                                        result17.data[i].id_student = newUserID
                                        await axios
                                        .put(api + "sessions/" + result17.data[i].id + "/", result17.data[i])
                                        .then(async result18 => {
                                            flag7 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                await axios
                                .get(api + "sessions_by_user/?tutor=" + userID)
                                .then(async result19 => {
                                    limit8 = result19.data.length
                                    for (let i = 0; i < result19.data.length; i++) {
                                        result19.data[i].id_tutor = newUserID
                                        await axios
                                        .put(api + "sessions/" + result19.data[i].id + "/", result19.data[i])
                                        .then(async result20 => {
                                            flag8 ++
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    }
                                })
                                while(flag9 != 1) {
                                    if (flag1 == limit1 && flag2 == limit2 && flag3 == limit3 && flag4 == limit4 && flag5 == limit5 && flag6 == limit6 && flag7 == limit7 && flag8 == limit8) {
                                        await axios
                                        .delete(api + "users/" + userID + "/")
                                        .then(result21 => {
                                            localStorage.setItem("displayToast", "recoverPassword");
                                            router.push("/")
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                        flag9 = 1
                                    }
                                }
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    console.log(error)
                })
            }
    }})
</script>

<template>

    <body>
        <div class="flexContainer">
            <div class="section-signup" id="section-signup">
                <div class="container-login" id="container-login">
                    <h1 class="login-message"> ¡Hola de <br /> nuevo! </h1>
                </div>
                <form class="needs-validation" novalidate id="new-form" @submit.prevent="recoverPassword">
                    <div class="login-form" id="login-form">
                        <img src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
                        <h4 id="back-message">Tu solicitud se está procesando</h4>
                        <div class="form">
                            <div class="mb-3">
                                <label class="form-label">Matrícula</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="username"
                                        placeholder="A0XXXXXXX" minlength="1" maxlength="10"
                                        id="id_input" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nueva Contraseña</label>
                                <h2>Entre 8-50 caracteres, mínimo una minúscula, una mayúscula y un número.</h2>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="new_password" v-model="password"
                                        placeholder="Nueva Contraseña"
                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$" onkeyup="form.confirm_password.pattern = this.value;" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showNewPassword">
                                            <img src="../assets/img/visibility.png" class="img-fluid"
                                                alt="visibility eye" id="visibility_new_password_image">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Confirma Contraseña</label>
                                <h2>Ambos campos deben de coincidir.</h2>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="confirm_password" v-model="confirmPass"
                                        placeholder="Confirma Contraseña" onkeyup="this.pattern = form.new_password.value;"  required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showConfirmPassword">
                                            <img src="../assets/img/visibility.png" class="img-fluid"
                                                alt="visibility eye" id="visibility_confirm_password_image">
                                        </span>
                                    </div>
                                </div>
                                <h3 class="error-message" id="login-error"> {{updateErrorMess}} </h3>
                            </div>
                        </div>
                        <button id="signin-button" type="submit" :disabled="isDisabled">Cambiar Contraseña</button>
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
        position: fixed;
        font-size: 9vh;
        font-family: "Montserrat";
        font-weight: bold;
        right: 4vw;
        top: 40vh;
        margin: 0 0 5vh 0;
    }

    h2 {
        font-family: "Catamaran";
        font-weight: bold;
        color:#0f2051;
        font-size: 1.7vh;
    }

    h3 {
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 2vh;
        color: white;
        margin: 1.5vh 0 0 0;
    }

    h4 {
        font-family: "Montserrat";
        font-weight: bold;
        display: none;
        font-size: 3.5vh;
        color:#26408B;
        margin: 1.5vh 0 -6vh 0;
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

    button:disabled{
        background-color: #3d46608d;
        color: #ffffffaa;
    }

    button:disabled:hover{
        border-color: transparent;
        box-shadow: none;
        transition: all 0.3s ease 0s;
    }

    img{
        width: 35%;
        height: 35%;
    }

    input {
        width: 40vw;
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
        width: 30vw;
    }

    /*Flexbox which contains two divs (section-recoverPassword y section-signup*/
    .flexContainer {
        display: flex;
        background-image: url("../assets/img/patternF7.png");
        width: 100vw;
        height: 100vh;
        background-size: cover;
    }

    .section-recoverPassword {
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

    .recoverPassword-message {
        text-align:end;
        margin: 0 -8vw 0 0;
    }
    /*Contenedor del lado izquierdo (container-recoverPassword) */
    .container-recoverPassword{
        margin: 32vh 0 0 0;
        right: -30vw;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 5vh;
    }

    .container-recoverPassword {
        position: absolute;
        width: 90%;
        visibility: solid;
    }


    .login-form {
        margin: 4vh 0 0 0;
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
     #signin-button:disabled{
        background-color: #3d46608d;
        color: #ffffffaa;
    }

    .login-h3,
    label {
        font-family: "Catamaran";
        font-weight: bold;
        color:#26408B;
        font-size: 2.5vh;
        margin: 3vh 0 0 0;
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

