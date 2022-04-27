<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "@/components/items/Schedule-Item.vue"

export default defineComponent({
    components: {
        ScheduleItem
    }
})
</script>

<template>
    <body>
        <div class="container">
            <div class="schedule-container">
                <div class="title-container">
                    <label>Asesorías pendientes</label>
                    <img src="src/assets/img/question-icon.png" />
                </div>
                <ScheduleItem base-color="#365295" lock-schedule="inactive"/>
            </div>
            <div class="card-container">
                    <h1>card uwu</h1>
                    <button> Agendar nueva asesoría </button>
            </div>
        </div>
    </body>
</template>

<style scoped>
    label{
        font-family: "Montserrat";
        font-weight: bolder;
        font-size: 3vh;
    }

    img{
        width: 4%;
        height: 4%;
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
    }

    .container {
        display: flex;
    }

    .title-container{
        display: flex;
        gap: 1vw;
        align-items: center;
        justify-content: center;
    }

    .card-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>