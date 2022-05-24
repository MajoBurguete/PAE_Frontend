<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "../router"
import axios from "axios";
import NavBar from "../components/Navbar.vue"

const now = new Date();

const api = 'http://localhost:8000/api/'
var id_subject = ref ("")
var description = ref ("")
const date = ref ("2022-05-05 14:00")
const id_tutor = ref (4)
const id_student = ref (2)
const file = ref (null)
const status = ref (0)
const spot = ref (null)
const request_time = ref (now.toISOString())
const verify_time = ref (null)
const id_admin_verify = ref (null)


export default defineComponent({
    components: {
        NavBar
    },
    data(){
        return{
            classIdS: localStorage.getItem("classId"),
            classNameS: localStorage.getItem("className"),
            sessionSel: this.getSessionDate(localStorage.getItem("sessionSelected")),
            questionVal: "",
            fileName: "",
            fileUpdated: [],
            dsb: true
        }
    },
    updated(){
        if(this.fileName != ""){
            this.updateFile()
        }
        
        if(this.questionVal.length != 0){
            this.isDisabled = false;
        }
        else{
            this.isDisabled = true
        }
    },
    computed: {
        changeFileName(){
            this.fileName = this.fileC;
        },
        fileC: {
            get(){
                return this.fileUpdated[0]
            },
            set(val){
                this.fileUpdated = val;
            }
        },
        isDisabled:{
            get(){
                return this.dsb;
            },
            set(val){
                this.dsb = val;
            }
        }
    },
    methods: {
        getSessionDate(id: String){
            if(id == "m8"){
                return "Lunes 8:00"
            }
            if(id == "t8"){
                return "Martes 8:00"
            }
            if(id == "w8"){
                return "Miercoles 8:00"
            }
            if(id == "th8"){
                return "Jueves 8:00"
            }
            if(id == "f8"){
                return "Viernes 8:00"
            }
            if(id == "m9"){
                return "Lunes 9:00"
            }
            if(id == "t9"){
                return "Martes 9:00"
            }
            if(id == "w9"){
                return "Miercoles 9:00"
            }
            if(id == "th9"){
                return "Jueves 9:00"
            }
            if(id == "f9"){
                return "Viernes 9:00"
            }
            if(id == "m10"){
                return "Lunes 10:00"
            }
            if(id == "t10"){
                return "Martes 10:00"
            }
            if(id == "w10"){
                return "Miercoles 10:00"
            }
            if(id == "th10"){
                return "Jueves 10:00"
            }
            if(id == "f10"){
                return "Viernes 10:00"
            }
            if(id == "m11"){
                return "Lunes 11:00"
            }
            if(id == "t11"){
                return "Martes 11:00"
            }
            if(id == "w11"){
                return "Miercoles 11:00"
            }
            if(id == "th11"){
                return "Jueves 11:00"
            }
            if(id == "f11"){
                return "Viernes 11:00"
            }
            if(id == "m12"){
                return "Lunes 12:00"
            }
            if(id == "t12"){
                return "Martes 12:00"
            }
            if(id == "w12"){
                return "Miercoles 12:00"
            }
            if(id == "th12"){
                return "Jueves 12:00"
            }
            if(id == "f12"){
                return "Viernes 12:00"
            }
            if(id == "m13"){
                return "Lunes 13:00"
            }
            if(id == "t13"){
                return "Martes 13:00"
            }
            if(id == "w13"){
                return "Miercoles 13:00"
            }
            if(id == "th13"){
                return "Jueves 13:00"
            }
            if(id == "f13"){
                return "Viernes 13:00"
            }
            if(id == "m14"){
                return "Lunes 14:00"
            }
            if(id == "t14"){
                return "Martes 14:00"
            }
            if(id == "w14"){
                return "Miercoles 14:00"
            }
            if(id == "th14"){
                return "Jueves 14:00"
            }
            if(id == "f14"){
                return "Viernes 14:00"
            }
            if(id == "m15"){
                return "Lunes 15:00"
            }
            if(id == "t15"){
                return "Martes 15:00"
            }
            if(id == "w15"){
                return "Miercoles 15:00"
            }
            if(id == "th15"){
                return "Jueves 15:00"
            }
            if(id == "f15"){
                return "Viernes 15:00"
            }
            if(id == "m16"){
                return "Lunes 16:00"
            }
            if(id == "t16"){
                return "Martes 16:00"
            }
            if(id == "w16"){
                return "Miercoles 16:00"
            }
            if(id == "th16"){
                return "Jueves 16:00"
            }
            if(id == "f16"){
                return "Viernes 16:00"
            }
            if(id == "m17"){
                return "Lunes 17:00"
            }
            if(id == "t17"){
                return "Martes 17:00"
            }
            if(id == "w17"){
                return "Miercoles 17:00"
            }
            if(id == "th17"){
                return "Jueves 17:00"
            }
            if(id == "f17"){
                return "Viernes 17:00"
            }
            if(id == "m18"){
                return "Lunes 18:00"
            }
            if(id == "t18"){
                return "Martes 18:00"
            }
            if(id == "w18"){
                return "Miercoles 18:00"
            }
            if(id == "th18"){
                return "Jueves 18:00"
            }
            if(id == "f18"){
                return "Viernes 18:00"
            }
            if(id == "m19"){
                return "Lunes 19:00"
            }
            if(id == "t19"){
                return "Martes 19:00"
            }
            if(id == "w19"){
                return "Miercoles 19:00"
            }
            if(id == "th19"){
                return "Jueves 19:00"
            }
            if(id == "f19"){
                return "Viernes 19:00"
            }
        },
        postSession(){
            id_subject.value = this.classId;
            description.value = this.questionVal;

            var session = {'description': description.value, 'date': date.value, 'file': file.value, 'status': status.value, 'spot': spot.value, 'request_time': request_time.value, 'verify_time': verify_time.value, 'id_subject': id_subject.value, 'id_tutor': id_tutor.value, 'id_student': id_student.value, 'id_admin_verify': id_admin_verify.value}
            /* var newSession = {'description': session.value.description, 'date': session.value.date, 'file': session.value.file, 'status': session.value.status, 'spot': session.value.spot, 'request_time': session.value.request_time, 'verify_time': session.value.verify_time, 'id_subject': session.value.id_subject, 'id_tutor': session.value.id_tutor, 'id_student': session.value.id_student, 'id_admin_verify': session.value.id_admin_verify} */
            axios
            .post('http://localhost:8000/api/sessions/', session)
            .then(result => {
                console.log(result.data)
            })
            .catch(error => {
                console.log(error)
            })

            router.push("/home")
        },
        editSession(){
            const file = document.getElementById("session-file") as HTMLInputElement;
            console.log(file.files[0])
        },
        deleteFile(){
            const fileCont = document.getElementById("file-container") as HTMLInputElement;
            const fileAttach = document.getElementById("file-attach-preview") as HTMLInputElement;
            const file = document.getElementById("session-file") as HTMLInputElement;
            const modalFile = document.getElementById("file-attach-container") as HTMLInputElement;

            modalFile.style.visibility = "hidden"

            file.value = ""
            this.fileC = ""

            fileAttach.style.display = "none";
            fileCont.style.display = "inline-block"; 
        },
        updateFile(){
            const fileCont = document.getElementById("file-container") as HTMLInputElement;
            const fileAttach = document.getElementById("file-attach-preview") as HTMLInputElement;
            const modalFile = document.getElementById("file-attach-container") as HTMLInputElement;

            modalFile.style.visibility = "visible"

            fileCont.style.display = "none";
            fileAttach.style.display = "flex";

        },
        saveFile(){
            const file = document.getElementById("session-file") as HTMLInputElement;

            this.fileC = [file.files[0].name];
            this.changeFileName;
            this.updateFile();
        },
        disableNextBtn(){
            this.isDisabled = true;
            this.$forceUpdate();
        },
        enableNextBtn(){
            this.isDisabled = false;
            this.$forceUpdate();
        }
    }
    
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <body>
        <div class="container">
            <div class="left">
                <button id="back-button">
                    <a href="date-and-class">
                        <img src="src/assets/img/left-arrow.png"/>
                    </a>
                </button>
            </div>
            <div class="right">
                <h1>Tema específico a tratar</h1>
                <textarea class="form-control" id="question-text" v-model="questionVal" placeholder="Escribe tu duda..." rows="5"></textarea>
                <h1>Archivos complementarios</h1>
                <h2>Recuerda subir archivos menores a 2 MB</h2>
                <div class="file-attach-preview" id="file-attach-preview" @click="deleteFile">
                    <img class="attach-file" src="..\assets\img\attach.png"/>
                    <h3 class="file-name"> {{fileName}} </h3>
                </div>
                <div class="file-container" id="file-container">
                    <img id="plus-icon" src="src/assets/img/plus-icon.png"/>
                    <input class="form-control" type="file" v-on:change="saveFile" id="session-file">
                </div>
                <button id="send-button" data-bs-toggle="modal" data-bs-target="#class-modal" @click="editSession" :disabled="isDisabled">
                    Enviar
                </button>               
            </div>
        </div>

        <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1 class="class-name">{{classNameS}}</h1>
                    <h2 class="session-sel">{{sessionSel}}</h2>
                    <div class="scrollbar" id="style-2">
                        <h3 class="question-val">{{questionVal}}</h3>
                    </div>
                    <div class="flex-container">
                        <div class="session-info-container">
                            <div class="file-attach-container" id="file-attach-container">
                                <img class="attach-file-modal" src="..\assets\img\attach.png"/>
                                <h3 class="file-name"> {{fileName}} </h3>
                            </div>
                        </div>
                        <div class="session-button-container">
                            <h3 class="h3-quest-modal"> ¿Necesitas corregir la información? </h3>
                            <button id="edit-button" data-bs-dismiss="modal" aria-label="Close">Editar</button>
                            <button id="confirm-button" @click="postSession" data-bs-dismiss="modal" aria-label="Close">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    .container{
        display: flex;
        flex-direction: row;
        min-width: 100vw;
        padding: 0 2vw;
        
    }

    .left{
        margin-right: 10vw;
    }


    h1{
        color: #6F9492;
        font-family: "Montserrat";
        font-weight: bolder;
    }

    h2{
        font-family: "Montserrat";
        font-weight: normal;
        color: #96BECC;
        font-size: 3vh;
    }

    img{
        width: 30%;
        height: auto;
        margin: -8vh 0 0 0;
    }

    button{
        border: transparent;
    }

    textarea{
        width: 45vw;
        height: 25vh;
        margin: 4vh 0;
        border: transparent;
        box-shadow: 0px 0px 0px 10px #DAF4EA;
    }

    a{
        text-decoration: none;
        font-family: "Ubuntu";
        font-weight: normal;
    }

    /* File input container */

    .file-attach-preview{
        display: none;
        margin: 3vh 0 0 0;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
    }

    .file-container{
        margin-bottom: 7vh;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .file-container input[type=file] {
        font-size: 25px;
        width: 10%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    #plus-icon{
        width: 9%;
        height: auto;
        margin: 1vh 0 0 0;
        cursor: pointer;
    }


    /*Button to come back*/

    #back-button{
        font-size: 8vh;
        background-color: #6F9492;
        border-radius: 13px;
        width: 4vw;
        height: 6vh;
        padding: 0vh 0;
    }

    /* Button to send request */

    #send-button{
        text-decoration: none;
        font-family: "Ubuntu";
        font-weight: normal;
        background-color: #26408B;
        color: white;
        font-size: 3vh;
        padding: 1vh 7vw;
        border-radius: 10px;
        margin: 2vh 0 0 0;
    }

    #send-button:disabled{
        background-color: #3b4f8a9f;
        color: rgba(255, 255, 255, 0.677);
    }

    /* Modal */

    .modal-lg{
        width: 40vw;
    }

    .modal-content{
        padding: 2vh 2.5vw 2vh 2.5vw;
        display: flex;
        gap: 0.5vh;
    }

    .flex-container{
        padding: 2vh 0 0 0;
        display: flex;
        flex-direction: row;
        gap: 2vh;
    }

    .session-info-container{
        display: flex;
        flex-direction: column;
        gap: 0.5vh;
    }

    .attach-file{
        width: 10%;
        height: auto;
        margin: 0;
    }

    .attach-file-modal{
        width: 15%;
        height: auto;
        margin: 0;
    }

    .file-attach-container{
        visibility: hidden;
        flex-direction: column;
        align-items: center;
        gap: 0.5vh;
        padding: 0vh 0 0 0;
    }

    .session-button-container{
        padding: 0vh 0 2vh 0;
        display: flex;
        flex-direction: column;
        gap: 1vh;
        align-items: center;
    }

    .h3-quest-modal{
        font-size: 1vh;
        font-weight: bold;
        text-align: center;
    }

    .class-name,
    .session-sel,
    .question-val,
    .file-name{
        color: black;
        font-family: "Catamaran";
    }

    .class-name{
        font-size: 3.5vh;
        font-weight: bold;
    }

    .session-sel{
        font-weight: 100;
        font-size: 2.8vh;
    }

    .question-val{
        font-size: 2.8vh;
        text-align: justify;
    }

    .scrollbar{
        padding: 0.5vh 0.5vw 0 0;
        float: left;
        height: 18vh;
        overflow-y: scroll;
        margin-bottom: 2vh;
    }

    
    #style-2::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    #style-2::-webkit-scrollbar
    {
        width: 12px;
        background-color: #F5F5F5;
    }

    #style-2::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #26408B;
    }

    .file-name{
        font-weight: normal;
        font-size: 2.8vh;
    }
    

    #confirm-button,
    #edit-button{
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 3vh;
        width: 90%;
        border-radius: 7px;
        padding: 0.5vh 2vw;
        display: flex;
        justify-content: center;
    }

    #edit-button{
        background-color: #9EB2ED;
    }

    #confirm-button{
        background-color: #365295;
    }

    header {
        margin-bottom: 9vh;
    }





</style>