
<script lang="ts">
import { defineComponent } from 'vue'
import ScheduleItem from '@/components/items/Schedule-Item.vue'
import SignupForm from '@/components/items/Register-Form.vue'
import ClassModal from '@/components/items/Class-Modal.vue'


export default defineComponent({
    components: {
        ScheduleItem,
        SignupForm,
        ClassModal
    },
    data() {
        return{
            showModal:false
        }
    },
    methods: {
        backButton() {
            this.$emit('back-button');
        },
        showClasses(){

            var myModal = document.getElementById('class-modal') as HTMLInputElement;
            var myInput = document.getElementById('register-uf') as HTMLInputElement;
            

            myModal.addEventListener('shown.bs.modal', function () {
                myInput.focus()
            });
        }
    }
})
</script>


<template>
    <body>
        <SignupForm/>
        <div class = "schedule-instructions">
            <label> Horario </label>
            <h2>Selecciona las horas que tengas libres para dar asesorias</h2>
        </div>
        <ScheduleItem baseColor="#26408B" hoverColor="#263f8b85"/>
        <div class="uf-container">
            <div class="center">
                <h1>Unidades de formación</h1>
                <h2>Escoge las unidades de formación que asesorarás.</h2>
                <button type="button" id="register-uf" data-bs-toggle="modal" data-bs-target="#class-modal">Registrar UFs</button>
            </div>
        </div>
        <div class="button-container">
            <div>
                <button class="bigger-buttons" id="back-button" @click="backButton"> Regresar </button>
                <button class="bigger-buttons" id="signup-button"> Registrarse </button>
            </div>
        </div>

        <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <ClassModal/>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    body{
        display: flex;
        flex-direction: column;
        padding-bottom: 3vh;
    }

    h1{
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 3.5vh;
        color: #26408B;
    }

    h2{
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        color: #26408B;
    }

    button, a {
        padding: 0.5vh 2vw;
        margin: 1vh 0;
        font-family: "Ubuntu";
        font-weight: normal;
        border-color: transparent;
        border-radius: 1.5vh;
        color: white;
    }

    label {
            font-family: "Catamaran";
            font-weight: bold;
            font-size: 3vh;
            color: #26408B;
        }

    /* Bottom containers */
    .uf-container, .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button-container{
        margin-top: 6.5vh;
    }

    .center{
        margin-inline-start: -4vw;
    }

    .schedule-instructions{
        padding: 2vh 0 0 9vw;
    }


    #register-uf{
        background-color: #769ABA;
        font-size: 2.4vh;
    }

    /* Return and signup buttons */

    .bigger-buttons{
        font-size: 2.5vh;
        padding: 0.5vh 4.5vw;
    }

    #back-button{
        background-color: #8699D0;
        margin-inline-end: 1vw;
    }

    #signup-button{
        background-color: #26408B;
        margin-inline-start: 1vw;
    }

    /* Modal styles */
        
    .modal-lg{
        min-width: 50vw;
    }

</style> 