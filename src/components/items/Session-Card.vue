<script lang="ts">

import { defineComponent } from "vue";
import emailjs from 'emailjs-com';

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
        },
        sessionId: {
            type: String
        },
        listPlacement: {
            type: String
        },
        indexSession: {
            type: String
        },
        instructionsTxt: {
            type: String,
            default: "Escoge una asesoría para ver sus detalles"
        },
        showInstructions: {
            type: Boolean,
            default: false
        },
        cancelBtn: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            dsb: true,
            cancelDsb: false
        }
    },
    computed: {
        isDisabled:{
            get(){
                return this.dsb;
            },
            set(val){
                this.dsb = val;
            }
        },
        isCancelDisabled: {
            get(){
                return this.cancelDsb;
            },
            set(val){
                this.cancelDsb = val;
            }
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

        if(this.place != "Por definir"){
            this.isDisabled = false;
        }

        const cbody = document.getElementById("card-body") as HTMLInputElement;

        if(!this.showInstructions){
            cbody.style.display = ""
        }
        else{
            cbody.style.display = "none"
        }
    },
    updated(){

        this.isCancelDisabled = !this.cancelBtn;
        
        if(this.place != "Por definir"){
            this.isDisabled = false;
        }

        const cbody = document.getElementById("card-body") as HTMLInputElement;

        if(this.showInstructions){
            cbody.style.display = "none"
        }
        else{
            cbody.style.display = ""
        }

        const statusElement = document.getElementById("status") as HTMLInputElement;

        if(this.status == "Pendiente"){
            statusElement.style.color = "#FF813C"
        }
        if(this.status == "Confirmada"){
            statusElement.style.color = "#365295"
        }
        if(this.status == "Cancelada"){
            statusElement.style.color = "#FF0000"
        }
        if(this.status == "Confirmada"){
            statusElement.style.color = "#338C31"
        }
    },
    methods:{
        storageInfo(){
            localStorage.setItem("sessionId", this.sessionId)
            localStorage.setItem("sessionIndex", this.indexSession)
            localStorage.setItem("sessionPlacement", this.listPlacement)
        },
        editSession(){
            this.storageInfo();
            this.$emit("edit-session-event")
        },
        confirmSession(){
            this.storageInfo()
            this.$emit("confirm-session-event")
            var templateParams = {
                tutor_email: this.tutorId,
                student_email: this.studentId,
                session_date: this.date,
                session_subject: this.className
            };

            emailjs
            .send('service_2efcuwp', 'template_87wpyd9', templateParams, 'LPBuS8HK51bdTE-9Y')
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
        },
        cancelSession(){
            this.storageInfo()
            this.$emit("cancel-session-event")
        }
    }
})

</script>

<template>
    <div class="card">
        <h1 v-if="showInstructions" id="instruction-txt"> {{instructionsTxt}} </h1>
        <div class="card-body" id="card-body">
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
                <button id="confirm-button" :disabled="isDisabled" @click="confirmSession">Confirmar Asesor&iacute;a</button>
                <button id="edit-button" data-bs-toggle="modal" data-bs-target="#edit-session-modal" @click="editSession">Editar Asesor&iacute;a</button>
                <button id="cancel-button" :disabled="isCancelDisabled" data-bs-toggle="modal" data-bs-target="#cancel-modal" @click="cancelSession">Cancelar Asesor&iacute;a</button>
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
        font-size: 2.5vh;
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

    #instruction-txt{
        margin: 1vh 1vw;
        text-align: center;
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

    #confirm-button:disabled{
        background-color: #33416d;
        color: #d9eff49d;
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

    #cancel-button:disabled{
        background-color: #b85b29c4;
        color: #d9eff49d;
    }

    #confirm-button:disabled:hover,
    #cancel-button:disabled:hover{
        box-shadow: none;
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