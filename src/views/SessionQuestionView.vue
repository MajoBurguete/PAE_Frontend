<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "../router"
import axios from "axios";
import NavBar from "../components/Navbar.vue"

const now = new Date();
const scheduleR = ref()

const api = 'http://localhost:8000/api/'
var id_subject = ref (localStorage.getItem("classId"))
var description = ref ("")
const date = ref (localStorage.getItem("sessionSelected"))
const id_tutor = ref (0)
const id_student = ref (localStorage.getItem("userID"))
const status = ref (0)
const request_time = ref (now.toISOString())


export default defineComponent({
    components: {
        NavBar
    },
    mounted(){
        let txt = localStorage.getItem("questionText");
        this.getSessionTutor();
        if(txt != null && txt.length != 0){
            console.log("ams")
            this.questionVal = txt;
            this.$forceUpdate();
        }
    },
    data(){
        return{
            classIdS: localStorage.getItem("classId"),
            classNameS: localStorage.getItem("className"),
            sessionSel: this.getSessionDate(localStorage.getItem("sessionSelected")),
            questionValData: "",
            fileName: "",
            fileUpdated: [],
            dsb: true,
            fileObject: null
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
        },
        questionVal: {
            get(){
                return this.questionValData;
            },
            set(val){
                this.questionValData = val;
            }
        }
    },
    methods: {
        async getSessionTutor(){
            const idSubject = localStorage.getItem("classId");
            const dayHour = localStorage.getItem("sessionSelected");
            await axios
            .get(api + "ordered_tutors_for_session/?subject=" + idSubject + "&dayHour=" + dayHour)
            .then(result => {
                console.log(result.data[0])
                localStorage.setItem("tutorSesId", result.data[0].id_tutor__id)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getSessionDate(dayOfWeek:String) {
            var dow = 1;
            var finalDate = new Date();
            finalDate.setDate(finalDate.getDate() + 1);
            if (dayOfWeek[0] == 't' && dayOfWeek[1] != 'h') {
                dow = 2;
            }
            if (dayOfWeek[0] == 'w') {
                dow = 3;
            }
            if (dayOfWeek[0] == 't' && dayOfWeek[1] == 'h') {
                dow = 4;
            }
            if (dayOfWeek[0] == 'f') {
                dow = 5;
            }
            finalDate.setDate(finalDate.getDate() + (dow + (7 - finalDate.getDay())) % 7);
            var month;
            if ((finalDate.getMonth() + 1) < 10) {
                month = '0' + (finalDate.getMonth() + 1);
            }
            else {
                month = finalDate.getMonth() + 1;
            }
            var day;
            if ((finalDate.getDate()) < 10) {
                day = '0' + finalDate.getDate();
            }
            else {
                day = finalDate.getDate();
            }
            if (dayOfWeek.length == 2 || (dayOfWeek.length == 3 && dayOfWeek[1] == 'h')) {
                return finalDate.getFullYear() + '-' + month + '-' + day + " 0" + dayOfWeek[dayOfWeek.length - 1] + ":00";
            }
            else {
                return finalDate.getFullYear() + '-' + month + '-' + day + " " + dayOfWeek[dayOfWeek.length - 2] + dayOfWeek[dayOfWeek.length - 1] + ":00";
            }
        },

        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },

        async postSession() {
            //id_subject.value = this.classId;
            description.value = this.questionVal;
            let formData = new FormData();
            id_tutor.value = localStorage.getItem("tutorSesId");
            formData.append('description', description.value);
            formData.append('date', this.getSessionDate(date.value));
            formData.append('status', status.value.toString());
            formData.append('request_time', request_time.value);
            formData.append('id_subject',id_subject.value);
            formData.append('id_tutor', id_tutor.value);
            formData.append('id_student', id_student.value);

            if(this.fileObject != null) {
                formData.append('file', this.fileObject)
            } 

            await axios
            .post('http://localhost:8000/api/sessions/', formData)
            .then(result => {
                console.log(result.data)
                localStorage.removeItem("className")
                localStorage.removeItem("classId")
                localStorage.removeItem("tutorSesId")
                localStorage.removeItem("questionText")
                localStorage.removeItem("sessionSelected")
                localStorage.removeItem("hoursAvailable")
                router.push("/home")
                })
            .catch(error => {
                console.log(error)
            })
        },
        editSession(){
            router.push("/date-and-class")
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

        saveFile(event) {
            const file = document.getElementById("session-file") as HTMLInputElement;
            this.fileC = [file.files[0].name];
            this.changeFileName;
            this.updateFile();
            this.fileObject = event.target.files[0]
        },

        disableNextBtn(){
            this.isDisabled = true;
            this.$forceUpdate();
        },
        enableNextBtn(){
            this.isDisabled = false;
            this.$forceUpdate();
        },
        saveQuestionTxt(){
            localStorage.setItem("questionText", this.questionVal)
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
                <textarea class="form-control" id="question-text" v-model="questionVal" @change="saveQuestionTxt" placeholder="Escribe tu duda..." rows="5"></textarea>
                <h1>Archivos complementarios</h1>
                <h2>Recuerda subir archivos menores a 2 MB</h2>
                <div class="file-attach-preview" id="file-attach-preview" @click="deleteFile">
                    <img class="attach-file" src="..\assets\img\attach.png"/>
                    <h3 class="file-name"> {{fileName}} </h3>
                </div>
                <div class="file-container" id="file-container">
                    <img id="plus-icon" src="src/assets/img/plus-icon.png"/>
                    <input class="form-control" type="file" @change="saveFile($event)" id="session-file">
                </div>
                <button id="send-button" data-bs-toggle="modal" data-bs-target="#class-modal" :disabled="isDisabled">
                    Enviar
                </button>               
            </div>
        </div>

        <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1 class="class-name">{{classNameS}}</h1>
                    <h2 class="session-sel">{{formatDate(sessionSel)}}</h2>
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
                            <button id="edit-button" data-bs-dismiss="modal" aria-label="Close" @click="editSession">Editar</button>
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

    #send-button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
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