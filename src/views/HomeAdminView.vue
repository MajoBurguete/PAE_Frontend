<script lang="ts">
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import axios from "axios";
    import NavBar from "../components/Navbar.vue";
    import ScheduleItem from "../components/items/Schedule-Item.vue";


    export default defineComponent({
        components: {
            NavBar,
            ScheduleItem
        },
        mounted(){
            this.updateUserN = this.tutorList[0].name;
            this.updateCareer = this.careerListTutor[0];
            this.updateSemester = this.semesterListTutor[0];
        },
        data(){
            return{
                usernameP: "",
                careerP: "",
                semesterP: "",
                classList: [
                    "Estructuras de datos",
                    "Bases de datos",
                    "Gráficas computacionales",
                    "Seguridad informática",
                    "Estructuras de datos",
                    "Bases de datos",
                    "Gráficas computacionales"
                ],
                scheduledHours: [],
                sessionHours: [],
                recentTutorsList: [],
                tab:"tutor",
                tutorList: [
                    {name: "Pedro Díaz Sanchez", id: 1},
                    {name: "Daniela Hernández", id: 2},
                    {name: "Aarón Cortés García", id: 3},
                    {name: "Andrea Díaz Sánchez", id: 4},
                    {name: "Juan Díaz Sánchez", id: 5},
                    {name: "Sandra Díaz Sánchez", id: 6}
                ],
                studentList:[
                    {name: "Dorelay Margarita Euán", id: 1},
                    {name: "Marco Flamenco Andrade", id: 2},
                    {name: "María José Euán", id: 3},
                    {name: "Mariana Perez", id: 4},
                    {name: "Elena del Carmen Euán", id: 5},
                    {name: "Jorge Zapata", id: 6}
                ],
                careerListTutor: [
                    "ITC",
                    "ITC",
                    "ITC",
                    "IDM",
                    "IMT",
                    "LAD"
                ],
                careerListStudent: [
                    "LAD",
                    "ITC",
                    "ITC",
                    "IDM",
                    "LRI",
                    "IMT"
                ],
                semesterListTutor: [
                    "2",
                    "6",
                    "6",
                    "4",
                    "7",
                    "3"
                ],
                semesterListStudent: [
                    "8",
                    "6",
                    "6",
                    "6",
                    "8",
                    "6"
                ]
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
            }
        },
        methods: {
            toStudentsTab(){
                const studentTab = document.getElementById("students-tab") as HTMLInputElement;
                const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const studentsListT = document.getElementById('students-list') as HTMLInputElement;
                const tutorsListT = document.getElementById('tutors-list') as HTMLInputElement;

                input.placeholder = "Busca al estudiante.."

                tutorsTab.style.backgroundColor = "#D9EFF4";
                tutorsTab.style.color = "#7FA0A8";

                studentTab.style.backgroundColor = "#9EC7D1";
                studentTab.style.color = "white";

                studentsListT.style.display = "initial"
                tutorsListT.style.display = "none"

                this.changeTabC = "student"

            },
            toTutorsTab(){
                const studentTab = document.getElementById("students-tab") as HTMLInputElement;
                const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const studentsListT = document.getElementById('students-list') as HTMLInputElement;
                const tutorsListT = document.getElementById('tutors-list') as HTMLInputElement;

                input.placeholder = "Busca al asesor.."

                studentTab.style.backgroundColor = "#D9EFF4";
                studentTab.style.color = "#7FA0A8";

                tutorsTab.style.backgroundColor = "#9EC7D1";
                tutorsTab.style.color = "white";

                tutorsListT.style.display = "initial"
                studentsListT.style.display = "none"

                this.changeTabC = "tutor"

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
            clickTutor(id: String, name: String){
                const idN = Number(id);
                this.updateUserN = name;
                this.updateCareer = this.careerListTutor[idN-1];
                this.updateSemester = this.semesterListTutor[idN-1];
            },
            clickStudent(id: String, name: String){
                const idN = Number(id);
                this.updateUserN = name;
                this.updateCareer = this.careerListStudent[idN-1];
                this.updateSemester = this.semesterListStudent[idN-1];
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
                        <button id="students-tab" @click="toStudentsTab"> Estudiantes </button>
                        <button id="tutors-tab" @click="toTutorsTab"> Asesores </button>
                    </div>
                    <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca al asesor..">
                </div>
                <div class="table-scroll" id="students-list">
                    <table class="table table-bordered" id="table">
                        <tbody class="style-2">
                            <tr v-for="(student, i) in studentList" :key="i"  class="table-data-student" @click="clickStudent(student.id, student.name)">
                                <td> 
                                    <h1 class="filter-h1-student"> {{student.name}} </h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-scroll" id="tutors-list">
                    <table class="table table-bordered" id="table">
                        <tbody class="style-2">
                            <tr v-for="(tutor, j) in tutorList" :key="j"  class="table-data-tutor" id="tutors-list" @click="clickTutor(tutor.id, tutor.name)">
                                <td> 
                                    <h1 class="filter-h1-tutor"> {{tutor.name}} </h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id="pending-session"> Asesorías pendientes </button>
            </div>
            <div class="user-information">
                <div class="information">
                    <div class="question-container-image">
                        <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover"/>
                        <div class="tooltip-style" id="popover">
                            <img src="src/assets/img/circle.png" id="scheduled">
                            Asesoría agendada <br>
                            <img src="src/assets/img/circle.png" id="available">
                            Hora disponible
                        </div>
                    </div>
                    <div class="user-info-container">
                        <h1 class="cont-h1 user-name"> {{usernameP}} </h1>
                        <h1 class="cont-h1 user-career"> {{careerP}} | {{semesterP}}° semestre </h1>
                    </div>
                    <div class="uf-user-container">
                        <h1 class="cont-h1 uf-h1"> Unidades de formación </h1>
                        <div class="uf-list-names  style-2">
                            <h2 v-for="(classN, j) in classList" :key="k" class="uf-h2"> {{classN}} </h2>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="btn-cont" data-bs-toggle="modal" data-bs-target="#delete-modal"> Baja de tutor </button>
                        <button class="btn-cont"> Encuestas </button>
                    </div>
                </div>
                <div class="user-schedule">
                    <div class="schedule-item">
                        <h1 class="schedule-h1"> Horario disponible </h1>
                        <ScheduleItem base-color="#C6E1D7" selectedColor="#6F9492" hover-color="transparent" lock-schedule="home-active" showDate="inactive"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1> Eliminar a: </h1>
                    <h1> {{usernameP}} </h1>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close"> No, regresar </button>
                        <button data-bs-dismiss="modal" aria-label="Close"> Si, eliminar </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    header {
        margin-bottom: 9vh;
    }

    h1{
        font-family: "Montserrat";
        font-weight: medium;
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
        padding: 2vh 0 0 0;
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
        box-shadow: 0px 0px 0px 12px #9EC7D1;
        border-radius: 11px; 
        display: flex;
        padding: 1vh 1vw;
        align-items: center;
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
        font-size: 2.8vh;
    }

    .uf-list-names{
        height: 18vh;
        overflow-y: scroll;
    }

    /* Button container */

    .button-container{
        display: flex;
        flex-direction: column;
        gap: 1vh;
    }

    .btn-cont,
    #pending-session{
        font-size: 3vh;
        font-family: "Ubuntu";
        font-weight: normal;
        width: 11vw;
        border-radius: 7px;
        background-color: #26408B;
        color: white;
    }

    #pending-session{
        border-radius: 9px;
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
        background-image: url('src/assets/img/search.png');
        background-position: 0.4vw 0.5vh; /* Position the search icon */
        background-repeat: no-repeat; /* Do not repeat the icon image */
        background-size: 7%;
    }
    

</style>