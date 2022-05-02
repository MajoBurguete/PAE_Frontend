<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ScheduleItem from "../components/items/Schedule-Item.vue"
import ClassFilter from "../components/items/Class-Filter.vue"
import { store, useStore } from '../store'
import axios from 'axios'

const api = 'http://localhost:8000/api/'
const sessions = ref([]);

export default defineComponent({
    setup () {
        const store = useStore()
    },
    mounted() {
        axios
        .get(api + 'available_sessions/')
        .then(result => {
            sessions.value = result.data
            console.log(sessions.value)
        })
        .catch(error => {
            console.log(error)
        })
    },
    data() {
    },

    computed: {
        getSessionList() {
            var sk = []
            for(var i=0; i<sessions.value.length; i++) {
                sk.push(sessions.value[i].id_tutor__schedule__day_hour)
            }
            return sk
        }
    },

    components: {
        ScheduleItem,
        ClassFilter
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
        saveAns(){
            console.log(store.state.selectedClass);
        }
    }
})
</script>

<template>
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
            <ScheduleItem base-color="#6F9492" hover-color="transparent" lock-schedule="inactive" :scheduled-hours="getSessionList"/>
        </div>
        <div class="container-side">
            <ClassFilter/>
            <button @click="saveAns">Continuar</button>
        </div>
    </div>
</template>

<style scoped>
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
button{
    font-family: "Ubuntu";
    font-weight: normal;
    background-color: #26408B;
    color: white;
    border-radius: 10px;
    border: transparent;
    font-size: 3vh;
    padding: 1vh 8vw;
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

</style>