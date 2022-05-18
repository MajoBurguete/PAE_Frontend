<script>
import { defineComponent } from "vue";
import SessionRecord from "../components/items/Session-Record.vue"

export default defineComponent({
    components: {
        SessionRecord
    },
})
</script>

<template>
    <div class="container-tutor">
        <div class="button-container">
            <button>
                <a href="home">
                    <img src="src/assets/img/left-arrow.png"/>
                </a>
            </button>
        </div>
        <div class="table-container">
            <SessionRecord tutorStudentSwitch="Estudiante"/>
        </div>
    </div>
</template>

<style scoped>

.container-tutor{
    padding: 12vh 10vw;
    display: flex;
    flex-direction: row;
    gap: 2vw;
}
.table-container{
    display: flex;
    flex-direction: column;
    width: 60vw;
}
img{
    width: 30%;
    height: 50%;
    margin: -7.5vh 0 0 0;
}
button {
    font-size: 8vh;
    border-style: hidden;
    background-color: #6F9492;
    border-radius: 13px;
    width: 4vw;
    height: 6vh;
    padding: 0vh 0;
}
</style>
