<script lang="ts">
    import axios from 'axios';
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import ScheduleItem from "../components/items/Config-Schedule-Item.vue";
    import ClassModal from '../components/items/Class-Modal.vue';
    import NavBar from "../components/Navbar.vue"

    const api = 'http://localhost:8000/api/'
    var schedule = []

    export default defineComponent({
        components: {
            ScheduleItem,
            ClassModal,
            NavBar
        },
        
        mounted() {
            this.getTutorData()
        },

        data(){
            return{
                usernameP: "",
                careerP: "",
                semesterP: "",
                hours: "",
                classList: [],
                tutorS: [],
            }
        },

        computed: {
            tutorSchedule: {
                get(){
                    return this.tutorS;
                },
                set(val){
                    this.tutorS = val;
                }
            },
            tutorSubjects: {
                get(){
                    return this.classList;
                },
                set(val){
                    this.classList = val;
                }
            }
        },

        methods: {
            async getSubjectsAndSchedule() {
                const user = localStorage.getItem('userID')
                await axios
                .get(api + 'subjects_by_tutor/?tutor=' + user)
                .then(result => {
                    this.classList = result.data
                })
                .catch(error => {
                    console.log(error)
                })

                await axios
                .get(api + 'schedule_by_tutor/?tutor=' + user)
                .then(result => {
                    var aux = []
                    for(var i = 0; i < result.data.length; i++){
                        aux.push(result.data[i].day_hour);
                    }

                    this.tutorSchedule = aux;
                })
                .catch(error => {
                    console.log(error)
                })
            },
            async getTutorData() {
                const user = localStorage.getItem('userID')
                await axios
                .get(api + 'tutors/?tutor=' + user)
                .then(result => {
                    this.usernameP = result.data[0].id__first_name
                    this.careerP = result.data[0].career
                    this.semesterP = result.data[0].semester    
                })
                .catch(error => {
                    console.log(error)
                })

                await axios
                .get(api + 'subjects_by_tutor/?tutor=' + user)
                .then(result => {
                    this.classList = result.data   
                })
                .catch(error => {
                    console.log(error)
                })

                var sk = []
                for(let i = 0; i < this.classList.length; i++) {
                    sk.push(this.classList[i].id_subject__id)
                }

                localStorage.setItem("classesSelected", JSON.stringify(sk))

                await axios
                .get(api + 'service_hours/?tutor=' + user)
                .then(result => {
                    this.hours = result.data[0].service_hours
                })
                .catch(error => {
                    console.log(error)
                })

                await axios
                .get(api + 'schedule_by_tutor/?tutor=' + user)
                .then(result => {
                    var aux = [];

                    for(var i = 0; i < result.data.length; i++){
                        aux.push(result.data[i].day_hour);
                    }

                    this.tutorSchedule = aux;
                })
                .catch(error => {
                    console.log(error)
                })
            },

            async saveChanges() {
                const tutor = localStorage.getItem('userID')
                const newClasses = JSON.parse(localStorage.getItem('classesSelected'));
                var flag1 = 0
                var limit1 = -1
                var flag2 = 0
                var limit2 = newClasses.length
                var flag3 = 0
                
                if(newClasses.length > 0) {
                    await axios
                    .get(api + 'subjects_by_tutor/?tutor=' + tutor)
                    .then(result => {
                        limit1 = result.data.length
                        for(let i = 0; i < result.data.length; i++) {
                            axios
                            .delete(api + 'tutor_subjects/' + result.data[i].id)
                            .then(result2 => {
                                flag1 = flag1 + 1
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })

                    for(var i = 0; i < newClasses.length; i++) {
                        await axios
                        .post(api + 'tutor_subjects/', {
                            id_tutor: tutor,
                            id_subject: newClasses[i]
                        })
                        .then(result => {
                            flag2 = flag2 + 1
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                    this.tutorSubjects = newClasses
                    while (flag3 != 1) {
                        if (flag1 == limit1 && flag2 == limit2) {
                            this.getSubjectsAndSchedule()
                            flag3 = 1
                        }
                    }
                }
                this.$forceUpdate()
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
            <div class="user-information">
                <div class="information">
                    <div class="user-info-container">
                        <h1 class="cont-h1 user-name"> {{usernameP}} </h1>
                        <h1 class="cont-h1 user-career"> {{careerP}} | {{semesterP}}° semestre </h1>
                    </div>
                    <div class="uf-user-container">
                        <h1 class="cont-h1 uf-h1"> Unidades de formación </h1>
                        <div class="uf-list-names  style-2">
                            <h2 v-for="(classN, j) in classList" :key="k" class="uf-h2"> {{classN.id_subject__name}} </h2>
                        </div>
                    </div>
                    <div class="button-time-container">
                        <div class="time-container">
                            <h4 id="hours"> {{hours}} </h4>
                            <h4>Horas de servicio</h4>
                        </div>
                        <div class="button-container">
                            <a class="btn-cont" href="tutor-session-record"> Historial </a>
                            <button class="btn-cont" data-bs-toggle="modal" data-bs-target="#class-modal"> Editar UFs </button>
                            <button class="btn-cont" @click="saveChanges()"> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
                <div class="user-schedule">
                    <div class="schedule-item">
                        <h1 class="schedule-h1"> Horario disponible </h1>
                        <h3 class="schedule-h3">Edita tu horario o Unidades de Formación cuando lo necesites y recuerda guardar tus cambios</h3>
                        <ScheduleItem :scheduledHours="tutorSchedule" lock-schedule="home-active" showDate="inactive"/>
                        <!-- <ScheduleItem base-color="#769ABA" hover-color="#A9BFD2" lock-schedule="active" showDate="inactive"/> -->
                    </div>
                </div>
            </div>
            <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <ClassModal/>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    body{
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 100vw;
    }

    h1{
        font-family: "Montserrat";
        font-weight: medium;
        font-size: 2.5vh;
        margin: 0;
        text-align: center;
        color: #6F9492;
    }

    h3{
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2vh;
        margin: 0;
        margin: 0 0 -2.5vh 0;
        text-align: center;
    }

    h4{
        font-family: "Ubuntu";
        font-weight: normal;
        text-align: center;
        color: #26408B;
    }

    h4,
    #hours{
        color: #4778A4;
    }

    a{
        padding: 0.7vh 1.5vw;
        border: transparent;
        font-size: 2.5vh;
        text-align: center;
        font-family: "Ubuntu";
        font-weight: normal;
        border-radius: 7px;
        background-color: #26408B;
        color: white;
        text-decoration: none;
    }

    button{
        padding: 0.7vh 1.5vw;
        border: transparent;
        font-size: 2.5vh;
        font-family: "Ubuntu";
        font-weight: normal;
        border-radius: 7px;
        background-color: #26408B;
        color: white;
    }

    .time-container{
        width: 10vw;
        border-radius: 40px;
        background-color: #C3DEF6;
        padding: 2vh 1vw;
    }

    .page-container{
        padding: 5vh 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button-time-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5vw;
    }

    /* User card information */
    .user-information{
        display: flex;
        gap: 5vw
    }

    /* User information (Name, career and semester) */
    .information{
        display: flex;
        flex-direction: column;
        gap: 3.5vh;
        padding-top: 8vh;
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

    /* Button container */
    .button-container{
        display: flex;
        flex-direction: column;
        gap: 1.5vh;
    }

    /* Schedule */
    .schedule-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .schedule-h1{
        padding: 0vh 0 0.5vh 0;
        color: black;
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 4vh;
        text-align: center;
    }
    .schedule-h3{
        padding: 0.5vh 0 2vh 0;
    }

</style>