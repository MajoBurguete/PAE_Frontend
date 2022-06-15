<script lang="ts">
import { defineComponent } from "vue";
import SessionRecord from "../components/items/Session-Record.vue"
import NavBar from "../components/Navbar.vue"
import axios from 'axios';
import router from "../router"

const api = 'http://10.50.84.114:5100/api/'

export default defineComponent({
    components: {
        SessionRecord,
        NavBar
    },
    data() {
        return {
            sessions: []
        }
    },
    computed: {
        tutorSessions: {
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

        if(token == null || type != '1'|| status != '0') {
            router.push('/')
        }
    },

    mounted() {
        const user = localStorage.getItem('userID')

        axios
        .get(api + 'sessions_of_specific_tutor/?tutor=' + user)
        .then(result => {
            this.tutorSessions = result.data
        })
        .catch(error => {
            console.log(error)
        })
       
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <div class="container-tutor">
        <div class="button-container">
            <button>
                <a href="tutor-settings">
                    <img src="../assets/img/left-arrow.png"/>
                </a>
            </button>
        </div>
        <div class="table-container">
            <SessionRecord :sessionL="tutorSessions" tutorStudentSwitch="Estudiante"/>
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
