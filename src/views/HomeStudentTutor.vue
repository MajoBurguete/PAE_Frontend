<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "@/components/items/Schedule-Item.vue"
import SessionCard from "@/components/items/Session-Card.vue"

export default defineComponent({
    components: {
        ScheduleItem,
        SessionCard
    },
    methods: {
        questionOnHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;
            messageContainer.style.display = "initial";
        },
        questionOutOfHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;
            messageContainer.style.display = "none";
        }
    }
})
</script>

<template>
    <body>
        <div class="container">
            <div class="schedule-container">
                <div class="title-container">
                    <label>Asesorías pendientes</label>
                    <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover"/>
                    <div class="tooltip-style" id="popover">
                        <img src="src/assets/img/circle.png" id="selected">
                        Horario Seleccionado <br>
                        <img src="src/assets/img/circle.png" id="available">
                        Horario Disponible
                    </div>
                </div>
                <ScheduleItem base-color="#365295" lock-schedule="inactive"/>
            </div>
            <div class="card-container">
                    <session-card/>
                    <button> Agendar nueva asesoría </button>
            </div>
        </div>
    </body>
</template>

<style scoped>
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
        display: none;
        overflow-y: visible;
    }   

    button{
        font-family: "Ubuntu";
        font-weight: normal;
        background-color: #26408B;
        color: white;
        border-radius: 12px;
        border: transparent;
        font-size: 2.5vh;
        padding: 1vh 2vw;
        margin-top: 3vh;
    }

    .container {
        display: flex;
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

</style>