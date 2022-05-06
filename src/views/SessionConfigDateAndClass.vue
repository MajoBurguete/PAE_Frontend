<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "../components/items/Schedule-Item.vue";
import ClassFilter from "../components/items/Class-Filter.vue";
import NavBar from "../components/Navbar.vue"

export default defineComponent({
    mounted(){
        const subjectC = sessionStorage.getItem("className");
        const hoursA = JSON.parse(sessionStorage.getItem("hoursAvailable"))
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
            classLegend: "Escoge la materia para tu asesoría"
        }
    },
    updated(){
        console.log(JSON.parse(sessionStorage.getItem("hoursAvailable")))
        this.getHours = JSON.parse(sessionStorage.getItem("hoursAvailable"))
    },
    computed: {
        getHours:{
            get(){
                return this.hours;
            },
            set(val){
                console.log("hours", JSON.parse(sessionStorage.getItem("hoursAvailable")))
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
            messageContainer.style.display = "initial";
        },
        questionOutOfHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;
            messageContainer.style.display = "none";
        },
        emptyLegend(){
            this.legendDescription = "No hay horarios disponibles para esta materia"
        },
        changeLegend(){
            this.legendDescription = "Selecciona alguno de los horarios disponibles"
            this.getHours
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
            <ScheduleItem base-color="#C6E1D7" hover-color="transparent" lock-schedule="home-active" :scheduled-hours="getHours"/>
        </div>
        <div class="container-side">
            <h1 class="class-legend"> {{legendDescription}} </h1>
            <ClassFilter paletteColor="green" v-on:empty-list="emptyLegend" v-on:hours-available="changeLegend" />
            <a href="/question"> Continuar </a>
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
    display: none;
}
.container-title{
    display: flex;
    flex-direction: row;
    align-items: center;
}
a{
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

img{
    height: 3vh;
    width: auto;
    margin-left: 2vw;
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