<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios';
import emailjs from 'emailjs-com';

const api = 'http://localhost:5100/api/'

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
        userId: {
            type: String
        },
        userEmail: {
            type: String
        }
    },
    data() {
        return {
            name: '',
            email: ''
        }
    },
    methods:{
        confirmTutor() {
            var info = {
                        'id': this.userId,
                        'user_type':  1,
                        'status': 0
                    }
            axios
            .put(api + "pae_users/" + this.userId + "/", info)
            .then(() => {
                this.$emit("confirm-tutor")

                var templateParams = {
                    user_name: this.tutorName,
                    user_email: this.userEmail
                };

                emailjs
                .send('service_2efcuwp', 'template_u3zai5n', templateParams, 'LPBuS8HK51bdTE-9Y')
                .then(response => {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
            })
            .catch(error =>{
                console.log(error)
            })
        },
        deleteTutor(){
            axios
            .delete(api + "users/" + this.userId + "/")
            .then(() => {
                this.$emit("delete-tutor")
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})

</script>

<template>
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">{{tutorName}}</h1>
            <h2 class="card-subtitle">{{semester}}° semestre</h2>
            <h2 class="card-text ">{{career}}</h2>
            <button href="#" class="btn btn-primary" id="confirm-button" @click="confirmTutor">Aprobar</button>
            <button href="#" class="btn btn-primary" id="cancel-button" @click="deleteTutor">Rechazar</button>
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

    button {
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
    button:hover{
        border-color: transparent;
    }

    #confirm-button{
        background-color: #26408B;
    }

    #confirm-button:hover{
        box-shadow: 0px 0px 0px 4px #7690CE;
    }

    #cancel-button{
        background-color: #F65E0B;
    }

    #cancel-button:hover{
        box-shadow: 0px 0px 0px 4px #EBA37C;
    }

</style>