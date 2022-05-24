<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "../components/items/Schedule-Item.vue";
import ClassFilter from "../components/items/Class-Filter.vue";
import NavBar from "../components/Navbar.vue"
import router from "../router";

export default defineComponent({
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
            dsb: true
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
        }
    },
    components: {
        ScheduleItem,
        ClassFilter,
        NavBar
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
            this.getHours = JSON.parse(localStorage.getItem("hoursAvailable"));
            this.disableNextBtn();
        },
        nextButtonOnClick(){
            router.push("/question")
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
    <div class="container">
        <div class="container-side">
            <div class="container-title">
                <h1>Horario de Preferencia</h1>
                <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover">
                    <div class="tooltip-style" id="popover">
                        <img src="src/assets/img/circle.png" id="selected">
                        Horario Seleccionado <br>
                        <img src="src/assets/img/circle.png" id="available">
                        Horario Disponible
                    </div>
            </div>
            <ScheduleItem v-on:session-enable-btn="enableNextBtn" base-color="#C6E1D7" selectedColor="#6F9492" hover-color="transparent" lock-schedule="home-active" :scheduled-hours="getHours"/>
        </div>
        <div class="container-side">
            <h1 class="class-legend"> {{legendDescription}} </h1>
            <ClassFilter paletteColor="green" v-on:empty-list="emptyLegend" v-on:hours-available="changeLegend" v-on:checked-changed="updateHours" />
            <button @click="nextButtonOnClick" :disabled="isDisabled"> Continuar </button>
        </div>
    </div>
</template>

<style scoped>

    .class-legend{
        margin: 10vh 0 3vh 0;
        font-size: 4vh;
        text-align: center;
    }

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

    button{
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

    button:disabled{
        background-color: #3b4f8a9f;
        color: rgba(255, 255, 255, 0.677);
    }

    .question{
        height: 3.5vh;
        width: auto;
    }

    img{
        height: 1vw;
        width: auto;
    }
    #selected{
        filter: invert(65%) sepia(7%) saturate(1097%) hue-rotate(128deg) brightness(85%) contrast(84%);
        margin-left: 0vw;
    }
    #available{
        filter: invert(94%) sepia(14%) saturate(268%) hue-rotate(99deg) brightness(94%) contrast(87%);
        margin-left: 0vw;

    }
    header {
        margin-bottom: 6vh;
    }

</style>