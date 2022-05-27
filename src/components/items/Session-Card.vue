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
        const detailsButton  = document.getElementById('details-button') as HTMLInputElement;
        const statusContainer = document.getElementById('status-container') as HTMLInputElement;


        if(this.showAllButtons == "active"){
            editButton.style.display = "flex"
            confirmButton.style.display = "flex"
            statusContainer.style.display ="none"
            detailsButton.style.display = "none"
        }
        else{
            editButton.style.display = "none"
            confirmButton.style.display = "none"
            detailsButton.style.display = "flex"
            cancelButton.style.width = "9vw";
            statusContainer.style.display ="contents"
        }
    }
})

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title text-center">{{className}}</h1>
            <div class="row">
                <div class="col">
                    <h2 class="card-subtitle">Asesor</h2>
                    <h3 class="card-subtitle">{{tutorName}}</h3>
                    <h4 class="card-text ">{{tutorId}}</h4>
                    <h2 class="card-subtitle">Estudiante</h2>
                    <h3 class="card-subtitle">{{studentName}}</h3>
                    <h4 class="card-text">{{studentId}}</h4>
                </div>
                <div class="col">
                    <h2 class="card-title">Fecha</h2>
                    <h3 class="card-subtitle">{{date}}</h3>
                    <h2 class="card-title">Lugar</h2>
                    <h3 class="card-subtitle">{{place}}</h3>
                </div>
            </div>
            <div id="status-container">
                <h2 class="card-title">Estatus</h2>
                <h3 class="card-subtitle" id="status">{{status}}</h3>
            </div>
            <div class="button-container">
                <button id="details-button" data-bs-toggle="modal" data-bs-target="#information-modal"> Ver detalles </button>
                <button id="confirm-button">Confirmar Asesor&iacute;a</button>
                <button id="edit-button">Editar Asesor&iacute;a</button>
                <button id="cancel-button">Cancelar Asesor&iacute;a</button>
            </div>
            <h3 class="legend"> *Recuerda que no se pueden cancelar asesorias que están a menos de 3 horas de iniciar. </h3>
        </div>
    </div>
</template>

<style scoped>
    .card {
        box-shadow: 0px 0px 0px 8px #769ABA;
        width: 22.5vw;
        padding: 0.2vh 0.2vw;
        border-radius: 34px;
        border-color: black;
        border-width: 2px;
        min-width: 290px;
    }

    h1 {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 2.8vh;
        margin-bottom: 2vh;
    }

    h2 {
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 2.5vh;
        margin-bottom: 1vh;
        margin-top: 2vh;
    }

    h3 {
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.2vh;
    }

    h4 {
        font-family: "Catamaran";
        font-weight: regular;
        font-size: 2.2vh;
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
        padding: 2.5vh 0 0.5vh 0;
        min-width: 100%;
        justify-content: center;
        display: flex;
        gap: 1vw;
    }

    button {
        display: flex;
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 1.7vh;
        padding: 0.5vh 0.7vw;
        border-radius: 15px;
        border-color: transparent;
        border-width: 0;
        box-sizing: border-box;
        width: 6vw;
        min-height: 5vh;
        min-width: 3vw;
        align-items: center;
        justify-content: center;
    }

    button:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #7690CE;
        transition: all 0.3s ease 0s;
    }

    #confirm-button{
        background-color: #26408B;
    }

    #edit-button{
        background-color: #769ABA;
    }

    #edit-button:hover{
        box-shadow: 0px 0px 0px 4px #AFCCE5;
    }

    #cancel-button{
        background-color: #F65E0B;
    }

    #cancel-button:hover{
        box-shadow: 0px 0px 0px 4px #EBA37C;
    }

    #details-button{
        background-color: #26408B;
    }

    #status{
        color: #F65E0B;
    } 

    #status-container {
        display: none;
    }

    #details-button {
        display: none;
    }
</style>