<script lang="ts">
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import axios from "axios";
    import NavBar from "../components/Navbar.vue";
    import ScheduleItem from "../components/items/Schedule-Item.vue";

    const api = 'http://10.50.84.114:5100/api/'

    export default defineComponent({
        components: {
            NavBar,
            ScheduleItem
        },
        beforeMount() {
            const token = localStorage.getItem('user-token')
            const type = localStorage.getItem('userType')

            if(token == null || type != '2') {
                router.push('/')
            }
        },
        mounted(){
            this.getTutorListB();
            this.getStudentListB();
            this.getPendingSessions();
            this.getPendingTutors();

            this.timer = setInterval(this.getPendingSessions, 30000)

            this.timer2 = setInterval(this.getPendingTutors, 30000)

        },
        beforeDestroy(){
            clearInterval(this.timer);
            clearInterval(this.timer2);
        },
        updated(){
            if(this.changeFirstPass){
                this.toTutorsTab()
                this.changeFirstPass = false;
            }
        },
        data(){
            return{
                usernameP: "",
                userId: "",
                careerP: "",
                semesterP: "",
                classList: [],
                recentTutorsList: [],
                scheduledHours: [],
                tab:"tutor",
                tutorList: [],
                studentList:[],
                dsbPendingSession: true,
                dsbPendingTutors: true,
                timer: null,
                timer2: null,
                noTutors: false,
                noStudents: false,
                messageWarn: "No existen tutores aprobados en el sistema",
                firstPass: true,
            }

        },
        computed: {
            changeTabC:  {
                get(){
                    return this.tab;
                },
                set(val){
                    this.tab = val;
                }
            },
            updateUserN: {
                get(){
                    return this.usernameP;
                },
                set(val){
                    this.usernameP = val;
                }
            },
            updateCareer: {
                get(){
                    return this.careerP;
                },
                set(val){
                    this.careerP = val;
                }
            },
            updateSemester: {
                get(){
                    return this.semesterP;
                },
                set(val){
                    this.semesterP = val;
                }
            },
            updateStudentList: {
                get(){
                    return this.studentList;
                },
                set(val){
                    this.studentList = val;
                }
            },
            updateTutorList: {
                get(){
                    return this.tutorList;
                },
                set(val){
                    this.tutorList = val;
                }
            },
            updateClassList: {
                get(){
                    return this.classList; 
                },
                set(val){
                    this.classList = val;
                }
            },
            updateRecentTutorsList: {
                get(){
                    return this.recentTutorsList; 
                },
                set(val){
                    this.recentTutorsList = val;
                }
            },
            updateScheduledHours: {
                get(){
                    return this.scheduledHours;
                },
                set(val){
                    this.scheduledHours = val;
                }
            },
            updateUserId: {
                get(){
                    return this.userId;
                },
                set(val){
                    this.userId = val;
                }
            },
            disablePendingSessions: {
                get(){
                    return this.dsbPendingSession; 
                },
                set(val){
                    this.dsbPendingSession= val;
                }
            },
            disablePendingTutors: {
                get(){
                    return this.dsbPendingTutors; 
                },
                set(val){
                    this.dsbPendingTutors = val;
                }
            },
            updateWarningMessage: {
                get(){
                    return this.messageWarn;
                },
                set(val){
                    this.messageWarn = val;
                }
            },
            changeFirstPass:{
                get(){
                    return this.firstPass;
                },
                set(val){
                    this.firstPass = val;
                }
            }
        },
        methods: {
            toStudentsTab() {
                const timeLabel = document.getElementById("time-label") as HTMLInputElement;
                const studentTab = document.getElementById("students-tab") as HTMLInputElement;
                const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const studentsListT = document.getElementById('students-list') as HTMLInputElement;
                const tutorsListT = document.getElementById('tutors-list') as HTMLInputElement;
                const title = document.getElementById('uf-tutors-title') as HTMLInputElement;
                const deleteButton = document.getElementById('delete-user') as HTMLInputElement;
                const ufList = document.getElementById('uf-list') as HTMLElement;
                const recentTutorsL = document.getElementById('recent-tutors-list') as HTMLElement;;

                this.getStudentListB()

                timeLabel.textContent = "Asesorías Agendadas";

                ufList.style.display = "none";
                recentTutorsL.style.display = "flex";

                input.placeholder = "Busca al estudiante.."

                tutorsTab.style.backgroundColor = "#D9EFF4";
                tutorsTab.style.color = "#7FA0A8";

                studentTab.style.backgroundColor = "#9EC7D1";
                studentTab.style.color = "white";

                studentsListT.style.display = "initial"
                tutorsListT.style.display = "none"

                title.textContent = "Asesores previos"

                deleteButton.textContent = "Baja de alumno"

                this.changeTabC = "student"

                const cardUser = document.getElementById('card-user') as HTMLElement;
                const warningMess = document.getElementById('warning-message') as HTMLElement;;

                if(this.updateStudentList.length != 0){
                    cardUser.style.display = "flex";
                    warningMess.style.display = "none";
                    this.clickStudent(0);
                }
                else{
                    this.updateWarningMessage = "No existen alumnos en el sistema";
                    cardUser.style.display = "none";
                    warningMess.style.display = "flex";
                }

            },
            toTutorsTab() {
                const timeLabel = document.getElementById("time-label") as HTMLInputElement;
                const studentTab = document.getElementById("students-tab") as HTMLInputElement;
                const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const studentsListT = document.getElementById('students-list') as HTMLElement;
                const tutorsListT = document.getElementById('tutors-list') as HTMLInputElement;
                const title = document.getElementById('uf-tutors-title') as HTMLInputElement;
                const deleteButton = document.getElementById('delete-user') as HTMLInputElement;
                const ufList = document.getElementById('uf-list') as HTMLElement;
                const recentTutorsL = document.getElementById('recent-tutors-list') as HTMLElement;;

                this.getTutorListB();

                timeLabel.textContent = "Horario Disponible";

                ufList.style.display = "";
                recentTutorsL.style.display = "none";

                input.placeholder = "Busca al asesor.."

                studentTab.style.backgroundColor = "#D9EFF4";
                studentTab.style.color = "#7FA0A8";

                tutorsTab.style.backgroundColor = "#9EC7D1";
                tutorsTab.style.color = "white";

                tutorsListT.style.display = "initial"
                studentsListT.style.display = "none"

                title.textContent = "Unidades de formación"

                deleteButton.textContent = "Baja de tutor"

                this.changeTabC = "tutor"

                if(this.updateTutorList.length != 0){
                    this.clickTutor(0);
                }

                const cardUser = document.getElementById('card-user') as HTMLElement;
                const warningMess = document.getElementById('warning-message') as HTMLElement;

                if(this.updateTutorList.length != 0){
                    cardUser.style.display = "flex";
                    warningMess.style.display = "none";
                }
                else{
                    this.updateWarningMessage = "No existen tutores aprobados en el sistema";
                    cardUser.style.display = "none";
                    warningMess.style.display = "flex";
                }

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
            searchElements(){
                var input, td, temp, h1, i, j, filter,  txtValue;

                if(this.changeTabC == "tutor"){
                    input = document.getElementById('search-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-tutor');
                    h1 = document.getElementsByClassName("filter-h1-tutor");

                    
                    for(i = 0; i < h1.length; i++){
                        txtValue = h1[i].textContent || h1[i].innerText;
                        if(txtValue.toUpperCase().indexOf(filter) > -1 ){
                            td[i].style.display= "";
                        }
                        else {
                            td[i].style.display = "none";
                        }
                    }
                }
                else{
                    input = document.getElementById('search-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-student');
                    h1 = document.getElementsByClassName("filter-h1-student");

                    
                    for(i = 0; i < h1.length; i++){
                        txtValue = h1[i].textContent || h1[i].innerText;
                        if(txtValue.toUpperCase().indexOf(filter) > -1 ){
                            td[i].style.display= "";
                        }
                        else {
                            td[i].style.display = "none";
                        }
                    }
                }
            },
            async getPendingSessions(){
                const pendingSessBtn = document.getElementById("pending-session") as HTMLInputElement;

                await axios
                .get(api + "pending_sessions")
                .then(result => {
                    if(result.data.length == 0){
                        this.disablePendingSessions = true;
                        pendingSessBtn.className = "disable";
                        this.$forceUpdate();
                    }
                    else{
                        this.disablePendingSessions = false;
                        pendingSessBtn.className = "wiggle";
                        this.$forceUpdate();
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            async getPendingTutors(){
                const pendingTutorsBtn = document.getElementById("pending-tutors") as HTMLInputElement;

                await axios
                .get(api + "pending_tutors")
                .then(result => {
                    if(result.data.length == 0){
                        this.disablePendingTutors = true;
                        pendingTutorsBtn.className = "disable";
                        this.$forceUpdate();
                    }
                    else{
                        this.disablePendingTutors = false;
                        pendingTutorsBtn.className = "wiggle";
                        this.$forceUpdate();
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            async getTutorListB(){
                await axios
                .get(api + 'tutors')
                .then(result => {
                    this.updateTutorList = result.data;

                })
                .catch(error => {
                    console.log(error);
                })
                
            },
            async getStudentListB(){
                await axios
                .get(api + 'students')
                .then(result => {
                    this.updateStudentList = result.data;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            async getClassListByTutor(tutorS: string) {
                await axios
                .get(api + 'subjects_by_tutor/?tutor=' + tutorS)
                .then(result => {
                    this.updateClassList = result.data;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            toPendingSessionsView(){
                router.push("/pending-sessions");
            },
            toPendingTutorsView(){
                router.push("/pending-tutors");
            },
            async getScheduledHoursByTutor(tutorS: string) {
                await axios
                .get(api + 'schedule_by_tutor/?tutor=' + tutorS)
                .then(result => {
                    this.updateScheduledHours = result.data;
                })
                .catch(error => {
                    console.log(error);
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
            async getScheduledHoursByStudent(studentS: string) {
                var dates: any[] = []

                await axios
                .get(api + 'schedule_of_student/?student=' + studentS)
                .then(result => {
                    this.updateScheduledHours = [];
                    dates = result.data
                })
                .catch(error => {
                    console.log(error);
                })

                let sk: any[] = []
                let currentWeekHours: any[] = []
                let nextWeekHours: any[] = []
                for(let i = 0; i < dates.length; i++) {
                    var objectD = {
                        day_hour: '',
                    }
                    const date = new Date(dates[i].date)
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
                    
                    objectD.day_hour = dateString
                    sk.push(objectD)
                }

                this.updateScheduledHours = sk;
            },

            async getRecentTutors(studentS: string) {
                await axios
                .get(api + 'recent_tutors_of_student/?student=' + studentS)
                .then(result => {
                    this.updateRecentTutorsList = result.data;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            clearTutorsSelectedH1(){
                const tutorsListT = document.getElementById('tutors-list')?.getElementsByTagName("h1") as HTMLCollectionOf<HTMLElement>;

                for(var i=0; i<tutorsListT.length; i++){
                    tutorsListT[i].style.fontWeight = "normal"
                }
            },
            clearStudentsSelectedH1(){
                const studentsListT = document.getElementById('students-list')?.getElementsByTagName("h1") as HTMLCollectionOf<HTMLElement>;

                for(var i=0; i<studentsListT.length; i++){
                    studentsListT[i].style.fontWeight = "normal"
                }
            },
            clickTutor(i: number) {
                const tutorS = this.updateTutorList[i];

                this.clearTutorsSelectedH1();
                
                const elementS = document.getElementById(tutorS.id)?.getElementsByTagName("h1") as HTMLCollectionOf<HTMLElement>;
                elementS[0].style.fontWeight = "bold"

                this.updateUserId = tutorS.id;
                this.updateUserN = tutorS.id__first_name;
                this.updateCareer = tutorS.career;
                this.updateSemester = tutorS.semester;

                this.getClassListByTutor(tutorS.id);
                this.getScheduledHoursByTutor(tutorS.id);
                
            },
            clickStudent(i: number) {
                const studentS = this.updateStudentList[i];

                this.clearStudentsSelectedH1();

                const elementS = document.getElementById(studentS.id)?.getElementsByTagName("h1") as HTMLCollectionOf<HTMLElement>;
                elementS[0].style.fontWeight = "bold"

                this.updateUserId = studentS.id;
                this.updateUserN = studentS.id__first_name;
                this.updateCareer = studentS.career;
                this.updateSemester = studentS.semester;

                this.getRecentTutors(studentS.id);
                this.getScheduledHoursByStudent(studentS.id);
            },
            deleteTutor(){
                axios
                .delete(api + "users/" + this.updateUserId + "/")
                .then(result => {
                    this.getTutorListB();
                    this.getStudentListB();
                    if(this.changeTabC == "student" && this.updateStudentList.length != 0){
                        this.clickStudent(0)
                    }
                    else{
                        this.toStudentsTab()
                    }
                    
                    if(this.changeTabC == "tutor" && this.updateTutorList.length != 0){
                        this.clickTutor(0)
                    }
                    else{
                        this.toTutorsTab();
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            toSurveyRecord() {
                localStorage.setItem('selectedUser', this.userId)
                router.push("/survey-record")
            }
        }
    })
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <body>
        <div class="page-container">
            <div class="student-tutor-table">
                <div class="tabs-search-input">
                    <div class="table-tabs">
                        <button id="students-tab" @click="toStudentsTab"> Alumnos </button>
                        <button id="tutors-tab" @click="toTutorsTab"> Asesores </button>
                    </div>
                    <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca al asesor..">
                </div>
                <div class="table-scroll" id="students-list">
                    <table class="table table-bordered" id="table">
                        <tbody class="style-2">
                            <tr v-for="(student, i) in studentList" :key="i"  class="table-data-student" :id="student['id']" @click="clickStudent(i)">
                                <td> 
                                    <h1 class="filter-h1-student"> {{student['id__first_name']}} </h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-scroll" id="tutors-list">
                    <table class="table table-bordered" id="table">
                        <tbody class="style-2">
                            <tr v-for="(tutor, j) in tutorList" :key="j"  class="table-data-tutor" :id="tutor['id']" @click="clickTutor(j)">
                                <td> 
                                    <h1 class="filter-h1-tutor"> {{tutor['id__first_name']}} </h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id="pending-session" class="wiggle" :disabled="dsbPendingSession" @click="toPendingSessionsView"> Asesorías pendientes </button>
                <button id="pending-tutors" class="wiggle" :disabled="dsbPendingTutors" @click="toPendingTutorsView"> Tutores sin confirmar </button>
            </div>
            <div class="user-information">
                <h1 id="warning-message">{{updateWarningMessage}}</h1>
                <div id="card-user">
                    <div class="information">
                        <div class="question-container-image">
                            <img src="../assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover"/>
                            <div class="tooltip-style" id="popover">
                                <img src="../assets/img/circle.png" id="scheduled">
                                Asesoría agendada <br>
                                <img src="../assets/img/circle.png" id="available">
                                Hora disponible
                            </div>
                        </div>
                        <div class="user-info-container">
                            <h1 class="cont-h1 user-name"> {{usernameP}} </h1>
                            <h1 class="cont-h1 user-career"> {{careerP}} | {{semesterP}}° semestre </h1>
                        </div>
                        <div class="uf-user-container">
                            <h1 class="cont-h1 uf-h1" id="uf-tutors-title"> Unidades de formación </h1>
                            <div class="uf-list  style-2" id="uf-list">
                                <h2 v-for="(classTutor, k) in classList" :key="k" class="uf-h2"> {{classTutor['id_subject__name']}} </h2>
                            </div>
                            <div class="recent-tutors-list  style-2" id="recent-tutors-list">
                                <h2 v-for="(recentT, l) in recentTutorsList" :key="l" class="uf-h2"> {{recentT['id_tutor__id__first_name']}} </h2>
                            </div>
                        </div>
                        <div class="button-container">
                            <button class="btn-cont" data-bs-toggle="modal" data-bs-target="#delete-modal"  id="delete-user"> Baja de tutor </button>
                            <button class="btn-cont" @click="toSurveyRecord()"> Encuestas </button>
                        </div>
                    </div>
                    <div class="user-schedule">
                        <div class="schedule-item">
                            <h1 class="schedule-h1" id="time-label"> Horario disponible </h1>
                            <ScheduleItem :userScheduledHours="updateScheduledHours" fromHomeAdmin="true" base-color="#C6E1D7" selectedColor="#6F9492" hover-color="transparent" lock-schedule="home-active" showDate="inactive"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1 class="h1-modal"> Eliminar a: </h1>
                    <h1 class="user-h1-modal"> {{usernameP}} </h1>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" id="cancel-action-btn"> No, regresar </button>
                        <button data-bs-dismiss="modal" aria-label="Close" id="delete-action-btn" @click="deleteTutor"> Sí, eliminar </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    h1{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 2.5vh;
        margin: 0;
        text-align: center;
        color: #6F9492;
    }

    button{
        font-size: 2.5vh;
        padding: 0.3vh 1vw 0.2vh 1vw;
        font-family: "Montserrat";
        font-weight: medium;
        border: transparent;
        background-color: #D9EFF4;
        color: #7FA0A8;
    }

    .page-container{
        padding: 5vh 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table-tabs{
        align-items: center;
        justify-content: center;
        display: flex;
    }

    /* Student and tutor table container */

    .student-tutor-table{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tabs-search-input{
        background-color: #EAF6F9;
        border: #D9EFF4;
        border-radius: 15px;
        width: 20vw;
        padding: 1vh 0 1vh 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #students-tab{
        border-radius: 8px 8px 0 0;
    }

    #tutors-tab{
        border-radius: 8px 8px 0 0;
        background-color: #9EC7D1;
        color: white;
    }

    #students-list{
        display: none;
    }

    /* User card information */
    .user-information{
        width: 75vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 0px 12px #9EC7D1;
        border-radius: 11px;
        padding: 1vh 1vw;
    }

    #card-user{
        display: flex;
        align-items: center;
    }

    .warning-message{
        display: none;
    }

    /* User information (Name, career and semester) */
    .information{
        display: flex;
        flex-direction: column;
        gap: 3.5vh;
    }

    .cont-h1{
        font-size: 3.5vh;
        text-align: start;
        color: black;
        font-weight: bolder;
    }

    .user-name{
        font-family: "Montserrat";
        width: 24vw;
    }

    .user-career{
        font-family: "Catamaran";
        font-weight: normal;
    }

    /* UF Container  */
    .uf-h1{
        font-family: "Catamaran";
        font-size: 3.5vh;
    }

    .uf-h2{
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.4vh;
    }

    .uf-list,
    .recent-tutors-list{
        height: 18vh;
        width: 23vw;
        overflow-y: scroll;
    }

    .recent-tutors-list{
        display: none;
        flex-direction: column;
    }

    /* Button container */

    .button-container{
        display: flex;
        flex-direction: column;
        gap: 1vh;
    }

    .btn-cont,
    #pending-session,
    #pending-tutors{
        font-size: 3vh;
        font-family: "Ubuntu";
        font-weight: normal;
        width: 12vw;
        border-radius: 7px;
        background-color: #26408B;
        color: white;
    }

    #pending-session,
    #pending-tutors{
        margin: 1vh 0 0 0;
        padding: 1vh 1vw;
        width: 13vw;
        font-size: 2.3vh;
        border-radius: 9px;
    }

    .btn-cont:hover,
    #pending-session:hover,
    #pending-tutors:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    #pending-session:disabled,
    #pending-tutors:disabled{
        background-color: #33416d;
        color: #d9eff49d;
    }

    #pending-session:disabled:hover,
    #pending-tutors:disabled:hover{
        box-shadow: none;
    }

    @keyframes wiggle {
        2% {
            -webkit-transform: translateX(3px) rotate(2deg);
            transform: translateX(3px) rotate(2deg);
        }
        4% {
            -webkit-transform: translateX(-3px) rotate(-2deg);
            transform: translateX(-3px) rotate(-2deg);
        }
        6% {
            -webkit-transform: translateX(3px) rotate(2deg);
            transform: translateX(3px) rotate(2deg);
        }
        8% {
            -webkit-transform: translateX(-3px) rotate(-2deg);
            transform: translateX(-3px) rotate(-2deg);
        }
        10% {
            -webkit-transform: translateX(2px) rotate(1deg);
            transform: translateX(2px) rotate(1deg);
        }
        12% {
            -webkit-transform: translateX(-2px) rotate(-1deg);
            transform: translateX(-2px) rotate(-1deg);
        }
        14% {
            -webkit-transform: translateX(2px) rotate(1deg);
            transform: translateX(2px) rotate(1deg);
        }
        16% {
            -webkit-transform: translateX(-2px) rotate(-1deg);
            transform: translateX(-2px) rotate(-1deg);
        }
        18% {
            -webkit-transform: translateX(1px) rotate(0);
            transform: translateX(1px) rotate(0);
        }
        20% {
            -webkit-transform: translateX(-1px) rotate(0);
            transform: translateX(-1px) rotate(0);
        }
    }

    .wiggle {
        display: inline-block;
        animation: wiggle 2.7s infinite;
    }

    .wiggle:hover {
        animation: none;
    }

    /* Schedule */

    .schedule-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .schedule-h1{
        padding: 0.5vh 0 0.5vh 0;
        color: black;
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 4vh;
        text-align: center;
    }

    .question{
        width: 1.5vw;
        height: auto;
    }

    img{
        width: 1vw;
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

    #scheduled{
        filter: invert(45%) sepia(42%) saturate(345%) hue-rotate(150deg) brightness(97%) contrast(90%);
    }

    #available{
        filter: invert(81%) sepia(31%) saturate(264%) hue-rotate(150deg) brightness(87%) contrast(86%);
    }

    .question-container-image{
        display: flex;
        gap: 1vw;
        align-items: center;
        justify-content: flex-start;
        margin: 1vh;
    }

    /* Table style */

    .table-scroll{
        padding: 3vh 3vw 3vh 3vw;
    }

    table{
        border-radius: 10px;
        border-style: hidden;
        box-shadow: 0px 0px 0px 2px black;
        width: 17vw;
        margin: 0;
    }

    tbody { 
        display: block;
        border-style: hidden;
        border-color: transparent;
        border-bottom: 10px;
        height: 40vh;     
        overflow-y: auto;  
        overflow-x: hidden;  
    }

    td{
        width: 17vw;
    }

    td h1:hover{
        color: #26408B;
    }

    .table-data-tutor,
    .table-data-student{
        cursor: pointer;
    }

    tr{
        min-width: 100%;
    }

    tr:last-child{
        border-bottom: 0;
    }

    /* Scrollbar styles */
    .style-2::-webkit-scrollbar-track
    {
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    .style-2::-webkit-scrollbar
    {
        width: 12px;
        background-color: #F5F5F5;
    }

    .style-2::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #6F9492;
    }
    
    /* Search bar */
    #search-input{
        font-family: "Montserrat";
        font-weight: medium;
        border-radius: 8px;
        border-style: hidden;
        width: 18.5vw;
        margin: 0 0 0 0;
        padding: 0.3vh 4vh;
        background-image: url('../assets/img/search.png');
        background-position: 0.4vw 0.5vh; /* Position the search icon */
        background-repeat: no-repeat; /* Do not repeat the icon image */
        background-size: 7%;
    }

    /* Modal */
    
    .modal-content{
        align-items: center;
        gap: 1.5vh;
        padding: 4vh 2.5vw;
        background-color: #E1F0EA;
        border-radius: 10px;
        border-color: #96BECC;
    }

    .modal-lg{
        width: 35vw;
    }

    .h1-modal,
    .user-h1-modal{
        font-size: 4.5vh;
        margin: 0 0 1.5vh 0;
    }

    .user-h1-modal{
        font-weight: bold;
        color: #57716F;
    }

    .modal-button-container{
        display: flex;
        gap: 1.5vw;
    }

    #cancel-action-btn,
    #delete-action-btn{
        font-family: "Ubuntu";
        font-weight: normal;
        font-size: 3vh;
        color: white;
        border-radius: 8px;
        width: 12vw;
    }

    #cancel-action-btn{
        background-color: #96CCC9;
    }

    #delete-action-btn{
        background-color: #F65E0B;
    }


    

</style>