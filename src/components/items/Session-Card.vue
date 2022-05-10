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
        },
        status: {
            type: String
        }
    },
    mounted(){
        const editButton = document.getElementById('edit-button') as HTMLInputElement;
        const confirmButton = document.getElementById('confirm-button') as HTMLInputElement;
        const cancelButton  = document.getElementById('cancel-button') as HTMLInputElement;
        const statusContainer = document.getElementById('status-container') as HTMLInputElement;


        if(this.showAllButtons == "active"){
            editButton.style.display = ""
            confirmButton.style.display = ""
            statusContainer.style.display ="none"
        }
        else{
            editButton.style.display = "none"
            confirmButton.style.display = "none"
            cancelButton.style.width = "9vw";
            statusContainer.style.display =""



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
            <div id="status-container">
                <h2 class="card-title">Estatus</h2>
                <h3 class="card-subtitle" id="status">{{status}}</h3>
            </div>
            <div class="button-container">
                <a href="#" class="btn btn-primary" id="confirm-button">Confirmar Asesor&iacute;a</a>
                <a href="#" class="btn btn-primary" id="edit-button">Editar Asesor&iacute;a</a>
                <a href="#" class="btn btn-primary" id="cancel-button">Cancelar Asesor&iacute;a</a>
            </div>
            <h3 class="legend"> *Recuerda que no se pueden cancelar asesorias que están a menos de 3 horas de iniciar. </h3>
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

    .card-body {
        padding: 0.8vh 0.8vw;
    }

    .legend{
        padding: 0.5vh 0 0 0;
        text-align: center;
        font-size: 1.5vh;
    }

    .button-container{
        padding: 2vh 0 0 0;
        min-width: 100%;
        justify-content: center;
        display: flex;
        gap: 1vw;
    }

    a {
        display: flex;
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 1.8vh;
        padding: 0.5vh 0.7vw;
        border-radius: 15px;
        border-color: transparent;
        box-sizing: border-box;
        width: 6vw;
        min-height: 5vh;
        min-width: 3vw;
        align-items: center;
        justify-content: center;
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

    #status{
        color: #F65E0B;
    }
    
    </style>