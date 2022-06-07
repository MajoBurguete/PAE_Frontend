<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "../components/items/Home-Schedule-Item.vue"
import SessionCard from "../components/items/Session-Card.vue"
import CancelModal from "../components/items/Cancel-Modal.vue"
import NavBar from "../components/Navbar.vue"
import axios from 'axios';

const api = 'http://localhost:8000/api/'
let resultHours = []

declare var bootstrap: any;

export default defineComponent({
    components: {
        ScheduleItem,
        SessionCard,
        NavBar,
        CancelModal
    },
    data() {
        return{
            hours: [],
            originalDate: "",
            daysHoursCurrentWeek: [],
            daysHoursNextWeek: [],
            sessionsIds: [],
            classNameC: "",
            tutorNameC: "",
            tutorIdC: "",
            studentNameC: "",
            studentIdC: "",
            dateC: "",
            placeC: "",
            statusC: "",
            sessionIdC: "",
            requestTimeC: "",
            cancelC: false,
            weekL: "0",
            weekSelected: "Semana actual",
            weekList:["Semana actual", "Semana próxima"],
            firstPass: true,
            showInstructB: true,
            instructionTxtV: "No cuentas con ninguna asesoría registrada.",
            descriptionTxt: "",
            fileName: "",
            fileURL: ""
        }
    },
    mounted() {
        this.getHours()

        this.testMethod()
    },
    updated(){
        if(this.changeFirstPass){
            if(resultHours.length != 0){
                this.updateInstructionText = "Escoge una asesoría para ver sus detalles"
            }
            else{
                this.updateInstructionText = "No cuentas con ninguna asesoría registrada"
            }

            this.changeFirstPass = false;
            this.$forceUpdate();
        }
    },
    computed: {
        updateDescriptionTxt: {
            get(){
                return this.descriptionTxt;
            },
            set(val){
                this.descriptionTxt = val;
            }
        },
        updateFileName: {
            get(){
                return this.fileName;
            },
            set(val){
                this.fileName = val;
            }
        },
        updateFileURL: {
            get(){
                return this.fileURL;
            },
            set(val){
                this.fileURL = val;
            }
        },
        updateRequestT:{
            get(){
                return this.requestTimeC;
            },
            set(val){
                this.requestTimeC = val;
            }
        },
        updateSessionI:{
            get(){
                return this.sessionIdC;
            },
            set(val){
                this.sessionIdC = val;
            }
        },
        updateOriginalDate:{
            get(){
                return this.originalDate;
            },
            set(val){
                this.originalDate = val;
            }
        },
        updateWeekLock: {
            get(){
                return this.weekL;
            },
            set(val){
                this.weekL = val;
            }
        },
        updateInstructionBool:{
            get(){
                return this.showInstructB;
            },
            set(val){
                this.showInstructB = val;
            }
        },
        updateInstructionText:{
            get(){
                return this.instructionTxtV;
            },
            set(val){
                this.instructionTxtV = val;
            }
        },
        updateCurrentDaysHours:{
            get(){
                return this.daysHoursCurrentWeek;
            },
            set(val){
                this.daysHoursCurrentWeek = val;
            }
        },
        updateNextDaysHours:{
            get(){
                return this.daysHoursNextWeek;
            },
            set(val){
                this.daysHoursNextWeek = val;
            }
        }
        ,
        pendingSessions: {
            get(){
                return this.hours;
            },
            set(val){
                this.hours = val;
            }
        },
        updateWeek: {
            get(){
                return this.weekSelected;
            },
            set(val){
                this.weekSelected = val;
            }
        },
        changeFirstPass: {
            get(){
                return this.firstPass;
            },
            set(val){
                this.firstPass = val;
            }
        },
        updateClassN: {
            get(){
                return this.classNameC;
            },
            set(val){
                this.classNameC = val;
            }
        },
        updateTutorN: {
            get(){
                return this.tutorNameC;
            },
            set(val){
                this.tutorNameC = val;
            }
        },
        updateStudentN: {
            get(){
                return this.studentNameC;
            },
            set(val){
                this.studentNameC = val;
            }
        },
        updateTutorID: {
            get(){
                return this.tutorIdC;
            },
            set(val){
                this.tutorIdC = val;
            }
        },
        updateStudentID: {
            get(){
                return this.studentIdC;
            },
            set(val){
                this.studentIdC = val;
            }
        },
        updateDate: {
            get(){
                return this.dateC;
            },
            set(val){
                this.dateC = val;
            }
        },
        updatePlace: {
            get(){
                return this.placeC;
            },
            set(val){
                this.placeC = val;
            }
        },
        updateStatus: {
            get(){
                return this.statusC;
            },
            set(val){
                this.statusC = val;
            }
        },
        updateCancelVal: {
            get(){
                return this.cancelC;
            },
            set(val){
                this.cancelC = val;
            }
        },
        updateHours: {
            get(){
                return this.hours;
            },
            set(val){
                this.hours = val;
            }
        }
    },
    methods: {
        async testMethod(){
            await axios
            .get(api + "sessions")
            .then(result => {
                console.log(result.data)
            })
            .catch( error => {
                console.log(error)
            })
        },
        getReferenceDate() {
            var date = new Date();
            const currentDay = date.getDay();
            if (currentDay != 0 && currentDay != 6) {
                date.setDate(date.getDate() + (5 + (7 - currentDay)) % 7)
                date.setHours(23, 59, 59)
            }
            return date;
        },

        questionOnHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;

            document.body.style.cursor = 'pointer';
            messageContainer.style.visibility = "visible";
        },

        questionOutOfHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;

            document.body.style.cursor = 'auto';
            messageContainer.style.visibility = "hidden";
        },

        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },

        async getHours() {
            const userType = localStorage.getItem('userType')
            const userID = localStorage.getItem('userID')

            if(userType == '0') {
                await axios
                .get(api + 'recent_sessions_of_student/?student=' + userID)
                .then(result => {
                    resultHours = result.data
                    console.log(result.data)
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                await axios
                .get(api + 'recent_sessions_of_tutor/?tutor=' + userID)
                .then(result => {
                    resultHours = result.data
                    console.log(result.data)
                })
                .catch(error => {
                    console.log(error)
                })
            }

            let sk = []
            let currentWeekHours = []
            let nextWeekHours = []
            for(let i = 0; i < resultHours.length; i++) {
                const date = new Date(resultHours[i].date)
                const day = date.getDay()
                const weekendDate = this.getReferenceDate()
                const dateS = date.toString()
                let dateString = ''

                if(day == 1) {
                    dateString += 'm'
                } else if(day == 2) {
                    dateString += 't'
                } else if(day == 3) {
                    dateString += 'w'
                } else if(day == 4) {
                    dateString += 'th'
                } else {
                    dateString += 'f'
                }
                if(dateS[16] != '0') {
                    dateString += dateS[16]
                    dateString += dateS[17]
                } else {
                    dateString += dateS[17]
                }
                if(date < weekendDate) {
                    currentWeekHours.push(dateString)
                } else {
                    nextWeekHours.push(dateString)
                }


                sk.push(dateString)
            }

            this.updateHours = currentWeekHours;
            this.sessionsIds = sk;
            this.updateCurrentDaysHours = currentWeekHours;
            this.updateNextDaysHours = nextWeekHours;
            console.log(currentWeekHours)

            
        },

        async getFile(id: string){
            const fileCont = document.getElementById("file-attach-container") as HTMLInputElement;

            axios
            .get(api + "sessions_files/" + id)
            .then( result => {
                console.log(result.data)

                if(result.data.file != null){
                    fileCont.style.visibility = "visible";
                    this.updateFileURL = result.data.file
                }
                else{
                    this.updateFileURL = ""
                    fileCont.style.visibility = "hidden";
                }
            })
            .catch( error => {
                console.log(error)
            })
        },

        updateCardInfo(sessionId: string, classNameI: string, tutorNameI: string, tutorIdI: string, studentNameI: string, studentIdI: string, dateI:string, placeI:string, statusI: string, canCancel: boolean, description: string, fileN: string){
            this.updateSessionI = sessionId;
            this.getFile(sessionId);
            this.updateClassN = classNameI;
            this.updateTutorN = tutorNameI;
            this.updateTutorID = tutorIdI;
            this.updateStudentN = studentNameI;
            this.updateStudentID = studentIdI;
            this.updateDate = this.formatDate(dateI);
            this.updateOriginalDate = dateI;
            this.updatePlace = placeI;
            this.updateCancelVal = canCancel;
            this.updateFileName = fileN;

            if(statusI == "0"){
                this.updateStatus = "Pendiente";
            }
            else if(statusI == "1"){
                this.updateStatus = "Confirmada";
            }
            else if(statusI == "2"){
                this.updateStatus = "Cancelada";
            }
            else{
                this.updateStatus = "Completada";
            }

            this.updateDescriptionTxt = description;
            

            this.$forceUpdate();
        },

        sessionOnClick(){
            this.updateInstructionBool = false;
            let sessionHour = localStorage.getItem("sessionCardHour");
            let hourS;

            if(this.updateWeek == "Semana actual"){
                hourS = resultHours[this.sessionsIds.indexOf(sessionHour)];
            }
            else{
                hourS = resultHours[this.sessionsIds.lastIndexOf(sessionHour)];
            }

            this.updateRequestT = hourS.request_time;

            this.updateCardInfo(hourS.id, hourS.id_subject__name, hourS.id_tutor__id__first_name, hourS.id_tutor__id__email, hourS.id_student__id__first_name, hourS.id_student__id__email, hourS.date, hourS.spot, hourS.status, hourS.cancel, hourS.description, hourS.file)
        },

        showWeek(index: number){
            this.updateWeek = this.weekList[index];
            this.updateWeekLock = index.toString();
            if(this.updateWeek == "Semana actual"){
                console.log(this.updateCurrentDaysHours)
                this.updateHours = this.updateCurrentDaysHours;
            }
            else{
                console.log(this.updateNextDaysHours.length)
                this.updateHours = this.updateNextDaysHours;
            }
        },

        cancelSession(){
            var myModal = new bootstrap.Modal(document.getElementById('cancel-modal'));
            myModal.show()
        },

        updatePage(){
            this.updateInstructionBool = true;
            this.updateInstructionText = "Escoge una asesoría para ver sus detalles"
            this.getHours();
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
            <div class="card-container">
                <a href="date-and-class" id="date-and-class-a"> Agendar nueva asesoría </a>
                <SessionCard showAllButtons="inactive" :showInstructions="updateInstructionBool" :instructionsTxt="updateInstructionText" v-on:cancel-session-event="" :status="updateStatus" :class-name="updateClassN" :date="updateDate" :place="updatePlace" :tutor-name="updateTutorN" :tutor-id="updateTutorID" :student-name="updateStudentN" :student-id="updateStudentID" :cancelBtn="updateCancelVal"/>
            </div>
            <div class="schedule-container">
                <div class="dropdown-center">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{weekSelected}}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownCenterBtn">
                        <li v-for="(weekObj, i) in weekList" :key="i">
                            <button class="dropdown-item" type="button" @click="showWeek(i)"> {{weekObj}} </button>
                        </li>
                    </ul>
                </div>
                <div class="title-container">
                    <label>Asesorías pendientes</label>
                    <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover"/>
                    <div class="tooltip-style" id="popover">
                        <img src="src/assets/img/circle.png" id="selected">
                        Asesoria Seleccionada <br>
                        <img src="src/assets/img/circle.png" id="available">
                        Asesoria Agendada
                    </div>
                </div>
                <ScheduleItem v-on:update-session-card="sessionOnClick" base-color="#769ABA" selectedColor="#365295" lock-schedule="home-active" :weekLock="updateWeekLock" :scheduledHours="updateHours" :sessionIdsArray="sessionsIds"/>
            </div>
        </div>

        <div class="modal fade" id="information-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="info-modal-content">
                    <div class="scrollbar" id="style-2">
                        <h3 class="question-val">{{descriptionTxt}}</h3>
                    </div>
                    <div class="flex-container">
                        <div class="session-info-container">
                            <div class="file-attach-container" id="file-attach-container">
                                <a :href="updateFileURL" target="_blank">
                                    <img class="attach-file-modal" src="..\assets\img\attach.png"/>
                                </a>
                                <h3 class="file-name"> {{fileName}} </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="cancel-modal" tabindex="-1" aria-labelledby="cancelModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" id="cancel-modal-lg">
                <div class="modal-content" id="cancel-modal-content">
                    <CancelModal v-on:session-canceled-event="updatePage" :date="updateOriginalDate" :description="updateDescriptionTxt" :placeTxt="updatePlace" :request_time="updateRequestT" :sessionId="updateSessionI" :tutorEmail="tutorIdC" :studentEmail="studentIdC" :className="classNameC"/>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    /* Dropdown style */

    .dropdown-center{
        display: flex;
        padding: 1vh 0 1vh;
        justify-content: center;
    }

    .dropdown-toggle{
        align-items: center;
    }

    .btn{
        font-family: "Catamaran";
        font-weight: medium;
        display: flex;
        justify-content: space-between;
        width: 10vw;
        height: 3vh;
        color: black;
        background-color: white;
        border-radius: 20px;
    }

    .btn:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #E1F0EA;
        transition: all 0.3s ease 0s;
    }

    .dropdown-item {
        font-family: "Catamaran";
        font-weight: medium;
    }

    .dropdown-item:hover{
        border-color: transparent;
        box-shadow: none;
        transition: all 0.3s ease 0s;
    }

    #nextWeek{
        display: none;
    }

    body{
        overflow: hidden;
    }

    label{
        font-family: "Montserrat";
        font-weight: bolder;
        font-size: 4vh;
    }

    img{
        width: 2vw;
        height: auto;
    }

    .tooltip-style{
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 1.5vh;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 0.5vh 0.15vw;
        visibility: hidden;
        overflow-y: visible;
        width: 11.7vw;
        margin: 0 -16vw 0 0;
    }

    #date-and-class-a{
        font-family: "Ubuntu";
        font-weight: normal;
        background-color: #26408B;
        color: white;
        border-radius: 12px;
        border: transparent;
        font-size: 2.5vh;
        padding: 1vh 2vw;
        margin: 2vh 0 3vh 0;
        text-decoration: none;
    }

    #date-and-class-a:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    .container {
        display: flex;
        min-width: 100vw;
        justify-content: center;
        gap:5vw;
    }

    .title-container{
        display: flex;
        gap: 1vw;
        align-items: center;
        justify-content: center;
        margin: 1vh;
    }

    .card-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 2vh 0 0 0;
        padding: 0 0 7vh 0;
    }

    .schedule-container{
        margin-top: 1vh;
    }

    #selected{
        height: 2vh;
        width: auto;
        filter: invert(31%) sepia(6%) saturate(6919%) hue-rotate(188deg) brightness(92%) contrast(87%);
    }
    #available{
        height: 2vh;
        width: auto;
        filter: invert(58%) sepia(44%) saturate(287%) hue-rotate(167deg) brightness(93%) contrast(89%);

    }


    /* Info Modal */

    .modal-lg{
        width: 40vw;
    }

    .modal-content{
        padding: 2vh 2.5vw 2vh 2.5vw;
        display: flex;
        gap: 0.5vh;
    }

    #info-modal-content{

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

    /* Cancel Modal */

    #cancel-modal-lg{
        width: 50vw;
    }

    #cancel-modal-content {
        background-color: #E1F0EA;
        border: 2.5px solid #96BECC;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 20px;
        padding: 7vh 2vw;
        gap: 3vh;
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
    

    #confirm-button-modal,
    #edit-button-modal{
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

    #edit-button-modal{
        background-color: #9EB2ED;
    }

    #confirm-button-modal{
        background-color: #365295;
    }
</style>