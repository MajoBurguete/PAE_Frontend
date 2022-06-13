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
                scheduleList: [],
                tutorS: [],
                updt: false,
                firstPass: true,
                classesComplete: false,
                scheduleComplete: false,
                disable: true
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
            isDisabled: {
                get() {
                    return this.disable;
                },
                set(val) {
                    this.disable = val;
                }
            },
            tutorSubjects: {
                get(){
                    return this.classList;
                },
                set(val){
                    this.classList = val;
                }
            },
            updateVarN: {
                get(){
                    return this.updt;
                },
                set(val){
                    this.updt = val;
                }
            },
            updateFirstP: {
                get(){
                    return this.firstPass;
                },
                set(val){
                    this.firstPass = val;
                }
            },

            changeClassFiltStatus: {
                get(){
                    return this.classesComplete;
                },
                set(val){
                    this.classesComplete = val;
                }
            },

            changeScheduleStatus: {
                get(){
                    return this.scheduleComplete;
                },
                set(val){
                    this.scheduleComplete = val;
                }
            }
        },

        updated(){
            console.log("updateVarN: " + this.updateVarN)
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

                this.updateVarN = true;

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
                    this.tutorS = result.data
                    this.scheduleList = result.data
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
                const newHours = JSON.parse(localStorage.getItem('hoursSelectedT'));
                var flag1 = 0
                var limit1 = -1
                var flag2 = 0
                var limit2 = newClasses.length
                var flag3 = 0
                var limit3 = newHours.length
                var flag4 = 0
                var limit4 = this.scheduleList.length
                var flag5 = 0
                var flag6 = 0
                
                if(newClasses.length > 0) {
                    await axios
                    .get(api + 'subjects_by_tutor/?tutor=' + tutor)
                    .then(async result => {
                        limit1 = result.data.length
                        for(let i = 0; i < result.data.length; i++) {
                            await axios
                            .delete(api + 'tutor_subjects/' + result.data[i].id)
                            .then(async result2 => {
                                flag1 ++
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
                        .then(async result3 => {
                            flag2 ++
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                    this.tutorSubjects = newClasses
                }

                for(var i = 0; i < newHours.length; i++) {
                    await axios
                    .post(api + "schedules/", {
                        id_user: tutor,
                        day_hour: newHours[i]
                    })
                    .then(async result4 => {
                        flag3 ++
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }

                while(flag5 != 1) {
                    if(flag3 == limit3) {
                        console.log("Ya: " + flag3)
                        console.log("Flag3: " + flag3)
                        console.log("Limit3: " + limit3)
                        for (let i = 0; i < this.scheduleList.length; i++) {
                            console.log(this.scheduleList[i].id)
                            await axios
                            .delete(api + 'schedules/' + this.scheduleList[i].id)
                            .then(async result6 => {
                                flag4++
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                        flag5 = 1
                    }
                }

                while (flag6 != 1) {
                    if (flag1 == limit1 && flag2 == limit2 && flag4 == limit4) {
                        this.getSubjectsAndSchedule()
                        flag6 = 1
                        this.isDisabled = true
                    }
                }

                this.returnToOriginalClass();
            },

            receivedUpdateModal(){
                this.updateVarN = false;
                this.$forceUpdate();
            },

            classFilterCompleteOnChange(){
                this.changeClassFiltStatus = true;
                this.isDisabled = false;
                this.$forceUpdate();
            },
            
            classFilterIncompleteOnChange(){
                this.changeClassFiltStatus = false;
                this.isDisabled = true;
                this.$forceUpdate();
            },

            scheduleCompleteOnChange(){
                this.changeScheduleStatus = true;
                this.isDisabled = false;
                this.$forceUpdate();
            },

            scheduleIncompleteOnChange(){
                this.changeScheduleStatus = false;
                this.isDisabled = true;
                this.$forceUpdate();
            },

            returnToOriginalClass(){
                this.updateVarN = true;
                this.$forceUpdate()
            }
        },

        beforeMount() {
            const token = localStorage.getItem('user-token')
            const type = localStorage.getItem('userType')
            const status = localStorage.getItem('userStatus')

            if(token == null || type != '1'|| status != '0') {
                router.push('/')
            }
        },

        mounted() {
            this.getTutorData()
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
                            <button class="btn-cont" id="continue-button" :disabled="isDisabled" @click="saveChanges()"> Guardar Cambios </button>
                        </div>
                    </div>
                </div>
                <div class="user-schedule">
                    <div class="schedule-item">
                        <h1 class="schedule-h1"> Horario disponible </h1>
                        <h3 class="schedule-h3">Edita tu horario o Unidades de Formación cuando lo necesites y recuerda guardar tus cambios</h3>
                        <ScheduleItem v-on:schedule-complete = "scheduleCompleteOnChange" v-on:schedule-incomplete = "scheduleIncompleteOnChange" :scheduledHours="tutorSchedule" lock-schedule="home-active" showDate="inactive"/>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <ClassModal v-on:disable-classes="classFilterIncompleteOnChange" v-on:enable-classes="classFilterCompleteOnChange" v-on:modal-update="receivedUpdateModal" v-on:cancel-click-btn="returnToOriginalClass" :callUpdate="updateVarN"/>
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

    #continue-button:disabled{
        background-color: #3d46608d;
        color: #ffffffaa;
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