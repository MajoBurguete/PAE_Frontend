<script lang="ts">
import axios from 'axios';

const api = 'http://localhost:8000/api/'

import { defineComponent } from "vue";
import emailjs from 'emailjs-com';

export default defineComponent({
    props: {
        sessionId: {
            type: String
        },
        description: {
            type: String
        },
        date: {
            type: String
        },
        placeTxt: {
            type: String
        },
        request_time: {
            type: String
        },
        tutorEmail: {
            type: String
        }, 
        studentEmail: {
            type: String
        }, 
        className: {
            type: String
        }
    },
    methods: {
        async cancelSession(){

            var info = {
                        'id': this.sessionId,
                        'description': this.description,
                        'date': this.date,
                        'status': 2,
                        'spot': this.placeTxt,
                        'request_time': this.request_time
                    }

            await axios
            .put(api + "sessions/" + this.sessionId + "/", info)
            .then(() => {
                this.$emit("session-canceled-event")

                var templateParams = {
                    tutor_email: this.tutorEmail,
                    student_email: this.studentEmail,
                    session_date: this.formatDate(this.date),
                    session_subject: this.className
                };

                emailjs
                .send('service_2efcuwp', 'template_unnr568', templateParams, 'LPBuS8HK51bdTE-9Y')
                .then(response => {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
            })
            .catch(error => {
                console.log(error)
            })
        },

        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },
    }
})

</script>

<template>
    <body>
        <div class="cancel-container">
            <h1>¿Estás seguro de cancelar la asesoría?</h1>
            <div class="button-container">
                <button id="cancel-button" data-bs-dismiss="modal" aria-label="Close"> No, regresar </button>
                <button id="save-button" @click="cancelSession" data-bs-dismiss="modal" aria-label="Close"> Sí, cancelar </button>
            </div>
        </div>
    </body>
</template>

<style scoped>

    .cancel-container,
    body {
        background-color: transparent;
    }

    h1 {
    font-family: 'Montserrat';
    font-weight: normal;
    font-size: 5vh;
    color: #6F9492;
    text-align: center;
    }

    .button-container {
        display: flex;
        justify-content: center;
    }

    button:hover{
        border-color: transparent;
        transition: all 0.3s ease 0s;
    }

    #cancel-button {
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 3.5vh;
        padding: 1vh 4vw;
        border-radius: 15px;
        border: 2.5px solid #00000000;
        background-color: #96CCC9;
        box-sizing: border-box;
        margin: 3vh;
        text-decoration: none;
    }

    #save-button {
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 3.5vh;
        padding: 1vh 4vw;
        border-radius: 15px;
        border: 2.5px solid #00000000;
        background-color: #F75E0B;
        box-sizing: border-box;
        margin: 3vh;
        text-decoration: none;
    }

    #save-button:hover{
        box-shadow: 0px 0px 0px 4px #EBA37C;
    }

    #cancel-button:hover{
        box-shadow: 0px 0px 0px 4px #c3eae8;
    }

</style>