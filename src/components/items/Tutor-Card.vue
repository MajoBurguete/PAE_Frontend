<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    props: {
        semester: {
            type: String
        },
        tutorName: {
            type: String
        },
        career: {
            type: String
        },
    }
})

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">{{tutorName}}</h1>
            <h2 class="card-subtitle">{{semester}}° semestre</h2>
            <h2 class="card-text ">{{career}}</h2>
            <a href="#" class="btn btn-primary" id="confirm-button">Aprobar</a>
            <a href="#" class="btn btn-primary" id="cancel-button">Rechazar</a>
        </div>
    </div>
</template>

<style scoped>
.card {
    box-shadow: 0px 0px 0px 8px #769ABA;
    width: 24.5vw;
    padding: 0.2vh 0.2vw;
    border-radius: 34px;
    border-color: black;
    border-width: 2px;
    min-width: 290px;
}
#status-container{
    display: none;
    flex-direction: column;
}
h1 {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 3.5vh;
    margin-bottom: 2vh;
    color: #26408B;

}
h2 {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 3.2vh;
}
a {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 2.5h;
    padding: 0.5vh 0.7vw;
    border-radius: 15px;
    border-color: transparent;
    box-sizing: border-box;
    width: 10vw;
    margin: 4vh 0.3vw 0vh;
    min-width: 80px;
}
a:hover{
    border-color: transparent;
}
#confirm-button{
    background-color: #26408B;
}
#edit-button{
    background-color: #769ABA;
}
#cancel-button{
    background-color: #F65E0B;
}
</style>