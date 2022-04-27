<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    props: {
        showAllButtons: {
            type: String,
            default: "active"
        },
        className: {
            type: String
        },
        tutorName: {
            type: String
        },
        tutorId: {
            type: String
        },
        studentName: {
            type: String
        },
        studentId: {
            type: String
        },
        date: {
            type: String
        },
        place: {
            type: String
        }
    },
    mounted(){
        const editButton = document.getElementById('edit-button') as HTMLInputElement;
        const confirmButton = document.getElementById('confirm-button') as HTMLInputElement;


        if(this.showAllButtons == "active"){
            editButton.style.visibility = "visible"
            confirmButton.style.visibility = "visible"

        }
        else{
            editButton.style.visibility = "invisible"
            confirmButton.style.visibility = "invisible"

        }
    }
})

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title text-center">{{className}}</h1>
            <h2 class="card-subtitle">Asesor</h2>
            <h3 class="card-subtitle">{{tutorName}}</h3>
            <h4 class="card-text ">{{tutorId}}</h4>
            <h2 class="card-subtitle">Estudiante</h2>
            <h3 class="card-subtitle">{{studentName}}</h3>
            <h4 class="card-text">{{studentId}}</h4>
            <h2 class="card-title">Fecha</h2>
            <h3 class="card-subtitle">{{date}}</h3>
            <h2 class="card-title">Lugar</h2>
            <h3 class="card-subtitle">{{place}}</h3>
            <a href="#" class="btn btn-primary" id="confirm-button">Confirmar Asesor&iacute;a</a>
            <a href="#" class="btn btn-primary" id="edit-button">Editar Asesor&iacute;a</a>
            <a href="#" class="btn btn-primary" id="cancel-button">Cancelar Asesor&iacute;a</a>
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
h1 {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 3.5vh;
    margin-bottom: 2vh;

}
h2 {
    font-family: "Catamaran";
    font-weight: bold;
    font-size: 3.2vh;
    margin-bottom: 1vh;
    margin-top: 2vh;
}
h3 {
    font-family: "Catamaran";
    font-weight: regular;
    font-size: 3vh;
}
h4 {
    font-family: "Catamaran";
    font-weight: regular;
    font-size: 3vh;
    color: #636262;
}
a {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 1.8vh;
    padding: 0.5vh 0.7vw;
    border-radius: 15px;
    border-color: transparent;
    box-sizing: border-box;
    width: 6vw;
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