<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "../components/items/Schedule-Item.vue"
import SessionCard from "../components/items/Session-Card.vue"
import NavBar from "../components/Navbar.vue"
import axios from 'axios';

const api = 'http://localhost:8000/api/'
let resultHours = []

export default defineComponent({
    components: {
        ScheduleItem,
        SessionCard,
        NavBar
    },
    data() {
        return{
            hours: []
        }
    },

    computed: {
        pendingSessions: {
            get(){
                return this.hours;
            },
            set(val){
                this.hours = val;
            }
        }
    },

    methods: {
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
            for(let i = 0; i < resultHours.length; i++) {
                const date = new Date(resultHours[i].date)
                const day = date.getDay()
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

                const dateS = date.toString()
                if(dateS[16] != '0') {
                    dateString += dateS[16]
                    dateString += dateS[17]
                } else {
                    dateString += dateS[17]
                }
                sk.push(dateString)
            }

            this.hours = sk
        }
    },

    mounted() {
        this.getHours()
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
                <a href="date-and-class"> Agendar nueva asesoría </a>
                <SessionCard showAllButtons="inactive" status="En revisión" class-name="Bases de datos" date="16 mayo de 15:00" place="A1204" tutor-name="Daniela Hernández" tutor-id="A01730397@tec.mx" student-name="Marco Flamenco" student-id="A01732313@tec.mx" />
            </div>
            <div class="schedule-container">
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
                <ScheduleItem base-color="#769ABA" selectedColor="#365295" lock-schedule="home-active" :scheduledHours="hours"/>
            </div>
        </div>

        <div class="modal fade" id="information-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
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
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
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

    a{
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

    a:hover{
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