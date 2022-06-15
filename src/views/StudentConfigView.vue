<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SessionRecord from "../components/items/Session-Record.vue";
import NavBar from "../components/Navbar.vue"
import axios from 'axios';
import router from "../router"

const api = 'http://10.50.84.114:5100/api/'
var user = localStorage.getItem('userID')

export default defineComponent({
    components: {
        SessionRecord,
        NavBar
    },

    data() {
        return {
            name: '',
            career: '',
            semester: '',
            sessions: []
        }
    },
    computed: {
        studentSessions: {
            get(){
                return this.sessions;
            },
            set(val){
                this.sessions = val;
            }
        }
    },

    beforeMount() {
        const token = localStorage.getItem('user-token')
        const type = localStorage.getItem('userType')
        const status = localStorage.getItem('userStatus')

        if(token == null || type != '0'|| status != '0') {
            router.push('/')
        }
    },

    mounted() {
        user = localStorage.getItem('userID')
        axios
        .get(api + 'students/?student=' + user)
        .then(result => {
            this.name = result.data[0].id__first_name
            this.career = result.data[0].career
            this.semester = result.data[0].semester    
        })
        .catch(error => {
            console.log(error)
        })

        axios
        .get(api + 'sessions_of_specific_student/?student=' + user)
        .then(result => {
            this.studentSessions = result.data
        })
        .catch(error => {
            console.log(error)
        })
       
    },

    methods: {
        deleteStudent() {
            axios
            .delete(api + 'users/' + user + '/')
            .then(result => {
                router.push('/')
                })
            .catch(error => {
                console.log(error)
            })
        }
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <body>
        <div class="container">
            <div class="container-head">
                <div class="container-profile">
                    <h1>{{ name }}</h1>
                    <div class="container-info">
                        <h2>{{ career }}</h2>
                        <h2> | </h2>
                        <h2>{{ semester }}°</h2>
                        <h2> Semestre</h2>
                    </div>
                </div>
                <button @click="deleteStudent()">Eliminar<br>Perfil</button>
            </div>
            <div class="container-table-info">
                <SessionRecord :sessionL="studentSessions"/>
            </div>
        </div>
    </body>
</template>

<style scoped>
    .container{
        display: flex;
        padding: 12vh 7vw;
        flex-direction: column;
        gap: 4vh;
    }
    
    body{
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 100vw;
    }

    .container-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
    }

    .container-profile{
        display: flex;
        flex-direction: column;
    }

    .container-info{
        display: flex;
        flex-direction: row;
        gap: 0.5vw;
    }

    .container-table-info{
        padding: 0 10vw;
    }

    h1{
        font-family: "Montserrat";
        font-weight: bolder;
        font-size: 5vh;
    }

    h2{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 3vh;
    }

    h3{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 3vh;
        color: #57716F;
    }

    button {
        font-family: "Ubuntu";
        font-weight: normal;
        text-align: center;
        color: white;
        font-size: 3.5vh;
        padding: 0.5vh 2.5vw;
        border-radius: 15px;
        border: 2.5px solid #00000000;
        background-color: #F65E0B;
        box-sizing: border-box;
        text-decoration: none;
    }

    button:hover{
        box-shadow: 0px 0px 0px 4px #EBA37C;
        border-color: transparent;
        transition: all 0.3s ease 0s;
    }
    
</style>