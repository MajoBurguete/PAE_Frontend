<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "../components/items/Session-Schedule-Item.vue";
import ClassFilter from "../components/items/Class-Filter.vue";
import NavBar from "../components/Navbar.vue"
import router from "../router";
import axios from "axios";

const api = 'http://localhost:8000/api/'

export default defineComponent({
    components: {
        ScheduleItem,
        ClassFilter,
        NavBar
    },
    mounted(){
        const subjectC = localStorage.getItem("className");
        const hoursA = JSON.parse(localStorage.getItem("hoursAvailable"))
        if(subjectC != null){
            if(hoursA.length == 0){
                this.legendDescription = "No hay horarios disponibles para esta materia"
            }
            else{
                this.legendDescription = "Selecciona alguno de los horarios disponibles"
            }
        }
    },
    data() {
        return{
            hours: [],
            classLegend: "Escoge la materia para tu asesoría",
            dsb: true,
            weekSelected: "Semana actual",
            weekList:["Semana actual", "Semana próxima"],
            weekL: "0",
            activeLockWeek: false
        }
    },
    computed: {
        getHours:{
            get(){
                return this.hours;
            },
            set(val){
                this.hours = val;
            }
        },
        legendDescription: {
            get() {
                return this.classLegend;
            },
            set(val) {
                this.classLegend = val;
            }
        },
        isDisabled: {
            get(){
                return this.dsb;
            },
            set(val){
                this.dsb = val;
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
        updateWeekLock: {
            get(){
                return this.weekL;
            },
            set(val){
                this.weekL = val;
            }
        },
        changeLockWeekStatus: {
            get(){
                return this.activeLockWeek;
            },
            set(val){
                this.activeLockWeek = val;
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
        emptyLegend(){
            this.legendDescription = "No hay horarios disponibles para esta materia"
        },
        changeLegend(){
            this.legendDescription = "Selecciona alguno de los horarios disponibles"
            this.getHours
        },
        updateHours(){
            if(JSON.parse(localStorage.getItem("hoursAvailable")) != null){
                this.getHours = JSON.parse(localStorage.getItem("hoursAvailable"));
            }
            else{
                this.getHours = [];
            }
            console.log(this.getHours)
            this.disableNextBtn();
        },
        nextButtonOnClick(){
            this.getSessionTutor();
            router.push("/question")
        },
        disableNextBtn(){
            this.isDisabled = true;
            this.$forceUpdate();
        },
        enableNextBtn(){
            this.isDisabled = false;
            this.$forceUpdate();
        },
        async getSessionTutor(){
            const idSubject = localStorage.getItem("classId");
            const dayHour = localStorage.getItem("sessionSelected");
            await axios
            .get(api + "ordered_tutors_for_session/?subject=" + idSubject + "&dayHour=" + dayHour)
            .then(result => {
                console.log(result.data[0])
                localStorage.setItem("tutorSesId", result.data[0].id_tutor__id);
            })
            .catch(error => {
                console.log(error)
            })
        },
        deactiveLockWeek(){
            this.changeLockWeekStatus = false;
        },
        showWeek(index: number){
            this.updateWeek = this.weekList[index];
            this.updateWeekLock = index.toString();
            this.changeLockWeekStatus = true;
            this.updateHours();
            this.$forceUpdate();
        }
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <div class="container">
        <div class="container-side">
            <div class="container-title">
                <h1>Horario de Preferencia</h1>
                <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover">
                    <div class="tooltip-style" id="popover">
                        <img src="src/assets/img/circle.png" id="selected">
                        Horario Seleccionado <br>
                        <img src="src/assets/img/circle.png" id="available">
                        Horario Disponible <br>
                        <img src="src/assets/img/circle.png" id="unavailable">
                        Horario No Disponible
                    </div>
            </div>
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
            <ScheduleItem v-on:session-enable-btn="enableNextBtn" v-on:deactive-lock="deactiveLockWeek" base-color="#C6E1D7" selectedColor="#6F9492" hover-color="transparent" :scheduledHoursProp="getHours" :weekLock="updateWeekLock" :activeLockWeek="changeLockWeekStatus"/>
        </div>
        <div class="container-side">
            <h1 class="class-legend"> {{legendDescription}} </h1>
            <ClassFilter paletteColor="green" v-on:empty-list="emptyLegend" v-on:hours-available="changeLegend" v-on:checked-changed="updateHours" />
            <button @click="nextButtonOnClick" :disabled="isDisabled" id="next-btn"> Continuar </button>
        </div>
    </div>
</template>

<style scoped>

    .class-legend{
        margin: 10vh 0 3vh 0;
        font-size: 4vh;
        text-align: center;
    }

    /* Containers */

    .container{
        display: flex;
        min-width: 100vw;
        justify-content: center;
    }

    .container-side{
        margin-top: 3vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Simbology popover */

    .tooltip-style{
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 1.5vh;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 0.5vh 0.15vw;
        visibility: hidden;
        overflow-y: visible;
        width: 11.7vw;
        visibility: hidden;
        margin: 0 -15vw 0 0;
    }

    .container-title{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1vw;
    }

    #next-btn{
        font-family: "Ubuntu";
        font-weight: normal;
        background-color: #26408B;
        color: white;
        border-radius: 10px;
        border: transparent;
        font-size: 3vh;
        padding: 1vh 8vw;
        text-decoration: none;
    }

    #next-btn:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    #next-btn:disabled{
        background-color: #394b819f;
        color: rgba(255, 255, 255, 0.677);
    }

    #next-btn:disabled:hover{
        border-color: transparent;
        box-shadow: none;
        transition: all 0.3s ease 0s;
    }

    .question{
        height: 3.5vh;
        width: auto;
    }

    img{
        height: 1vw;
        width: auto;
    }

    /* Simbology colors */

    #selected{
        filter: invert(65%) sepia(7%) saturate(1097%) hue-rotate(128deg) brightness(85%) contrast(84%);
        margin-left: 0vw;
    }
    
    #available{
        filter: invert(94%) sepia(14%) saturate(268%) hue-rotate(99deg) brightness(94%) contrast(87%);
        margin-left: 0vw;

    }

    #unavailable{
        filter: invert(65%) sepia(77%) saturate(0%) hue-rotate(61deg) brightness(98%) contrast(92%);
        margin-left: 0vw;
    }

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
        height: 7vh;
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

</style>