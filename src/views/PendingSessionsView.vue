<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import SessionCard from "../components/items/Session-Card.vue"
import router from "../router"
import NavBar from "../components/Navbar.vue"
import CancelModal from "../components/items/Cancel-Modal.vue"

const api = 'http://10.50.84.114:5100/api/'

export default defineComponent({
    components: {
        SessionCard,
        CancelModal,
        NavBar
    },

    beforeMount() {
        const token = localStorage.getItem('user-token')
        const type = localStorage.getItem('userType')

        if(token == null || type != '2') {
            router.push('/')
        }
    },

    mounted() {
        this.getSessions()
    },

    data() {
        return{
            placeTxt: "",
            subjectList: [],
            firstHalf: [],
            secondHalf: [],
            dsb: true,
            originalDate: "",
            requestTimeC: "",
            descriptionTxt: "",
            placeC: "",
            sessionIdC: "",
            tutorIdC: "",
            studentIdC: "",
            classNameC: ""
        }
    },
    computed: {
        isDisabled: {
            get(){
                return this.dsb;
            },
            set(val){
                this.dsb = val;
            }
        },
        updateDescriptionTxt: {
            get(){
                return this.descriptionTxt;
            },
            set(val){
                this.descriptionTxt = val;
            }
        },
        updateRequestT:{
            get(){
                return this.requestTimeC;
            },
            set(val){
                this.requestTimeC = val;
            }
        },
        updateSessionI:{
            get(){
                return this.sessionIdC;
            },
            set(val){
                this.sessionIdC = val;
            }
        },
        updateOriginalDate:{
            get(){
                return this.originalDate;
            },
            set(val){
                this.originalDate = val;
            }
        },
        updateClassN: {
            get(){
                return this.classNameC;
            },
            set(val){
                this.classNameC = val;
            }
        },
        updateTutorID: {
            get(){
                return this.tutorIdC;
            },
            set(val){
                this.tutorIdC = val;
            }
        },
        updateStudentID: {
            get(){
                return this.studentIdC;
            },
            set(val){
                this.studentIdC = val;
            }
        },
        updatePlace: {
            get(){
                return this.placeC;
            },
            set(val){
                this.placeC = val;
            }
        }
    },
    updated(){
        if(this.placeTxt.length != 0){
            this.isDisabled = false;
        }
        else{
            this.isDisabled = true;
        }

        if(this.subjectList.length == 0){
            router.push("/admin-home")
        }
    },
    methods: {
        defineHalves(half: number) {
            if (this.subjectList.length <= 1){
                this.firstHalf = this.subjectList
                this.secondHalf = []
            }
            else {
                this.firstHalf = this.subjectList.slice(0, half);
                if ((this.subjectList.length%2)==0){
                    this.secondHalf = this.subjectList.slice(-half);
                }
                else{
                    this.secondHalf = this.subjectList.slice(1-half);
                }
            }
        },

        async getSessions() {
            await axios
            .get(api + 'pending_sessions/')
            .then(result => {
                this.subjectList = result.data
            })
            .catch(error => {
                console.log(error)
            })

            const half = Math.round(this.subjectList.length/2);
            this.defineHalves(half);
        },

        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },

        defineSpot(spot) {
            if(spot == null){
                return 'Por definir'
            } else {
                return spot
            }
        },

        updateCards(){
            this.getSessions();
        },

        cleanInput(){
            const sessionInput = document.getElementById("session-place") as HTMLInputElement
            sessionInput.value = "";
        },

        confirmPlace(){
            let sessionIdLS = localStorage.getItem("sessionId");
            let actualSession;

            if(localStorage.getItem("sessionPlacement") == "firstHalf"){
                actualSession = this.firstHalf[Number(localStorage.getItem("sessionIndex"))]
            }
            else{
                actualSession = this.secondHalf[Number(localStorage.getItem("sessionIndex"))]
            }

            var info = {
                        'id': sessionIdLS,
                        'description': actualSession.description,
                        'date': actualSession.date,
                        'status': 0,
                        'spot': this.placeTxt,
                        'request_time': actualSession.request_time
                    }

            axios
            .put(api + "sessions/" +  sessionIdLS + "/", info)
            .then(() => {
                this.updateCards();
            })
            .catch(error => {
                console.log(error)
            })
        },

        confirmSession(){
            let sessionIdLS = localStorage.getItem("sessionId");
            let actualSession;

            if(localStorage.getItem("sessionPlacement") == "firstHalf"){
                actualSession = this.firstHalf[Number(localStorage.getItem("sessionIndex"))]
            }
            else{
                actualSession = this.secondHalf[Number(localStorage.getItem("sessionIndex"))]
            }

            var info = {
                        'id': sessionIdLS,
                        'description': actualSession.description,
                        'date': actualSession.date,
                        'status': 1,
                        'request_time': actualSession.request_time
                    }

            axios
            .put(api + "sessions/" +  sessionIdLS + "/", info)
            .then(() => {
                this.updateCards();
            })
            .catch(error => {
                console.log(error)
            })
        },

        cancelSession(){
            let actualSession;

            if(localStorage.getItem("sessionPlacement") == "firstHalf"){
                actualSession = this.firstHalf[Number(localStorage.getItem("sessionIndex"))]
            }
            else{
                actualSession = this.secondHalf[Number(localStorage.getItem("sessionIndex"))]
            }

            this.updateOriginalDate = actualSession.date
            this.updateDescriptionTxt = actualSession.description;
            this.updateRequestT = actualSession.request_time;
            this.updateSessionI = actualSession.id;
            this.updateClassN = actualSession.id_subject__name;
            this.updateTutorID = actualSession.id_tutor__id__email;
            this.updateStudentID = actualSession.id_student__id__email;
            this.updatePlace = actualSession.spot; 

        }

    }
})
</script>

<template>
    <header>
        <NavBar />
    </header>

    <body>
        <div class="sessions-container">
            <div class="row" v-for="n in Math.round(subjectList.length/2)" :key="n">
                <div class="col">
                    <div class="card-container" id="left" v-for="(subject, i) in firstHalf" :key="i">
                        <SessionCard v-on:confirm-session-event="confirmSession" v-on:edit-session-event="cleanInput"
                            v-on:cancel-session-event="cancelSession" v-if="i+1==n"
                            :class-name="subject['id_subject__name']" :date="formatDate(subject['date'])"
                            :place="defineSpot(subject['spot'])" :sessionId="subject['id']"
                            :tutor-name="subject['id_tutor__id__first_name']" :tutor-id="subject['id_tutor__id__email']"
                            :student-name="subject['id_student__id__first_name']"
                            :student-id="subject['id_student__id__email']" :indexSession="i.toString()"
                            listPlacement="firstHalf"></SessionCard>
                    </div>
                </div>
                <div class="col" id="right">
                    <div class="card-container" id="right" v-for="(subject, j) in secondHalf" :key="j">
                        <SessionCard v-on:confirm-session-event="confirmSession" v-on:edit-session-event="cleanInput"
                            v-on:cancel-session-event="cancelSession" v-if="j+1==n"
                            :class-name="subject['id_subject__name']" :date="formatDate(subject['date'])"
                            :place="defineSpot(subject['spot'])" :sessionId="subject['id']"
                            :tutor-name="subject['id_tutor__id__first_name']" :tutor-id="subject['id_tutor__id__email']"
                            :student-name="subject['id_student__id__first_name']"
                            :student-id="subject['id_student__id__email']" :indexSession="j.toString()"
                            listPlacement="secondHalf"></SessionCard>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="edit-session-modal" tabindex="-1" aria-labelledby="sessionModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h1> Lugar de la asesoría </h1>
                    <h2> Ingresa el link o espacio </h2>
                    <input id="session-place" v-model="placeTxt" placeholder="Escribe el lugar de la asesoría..."
                        type="text">
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" @click="confirmPlace" :disabled="isDisabled"
                            id="confirm-btn-modal"> Confirmar </button>
                        <button data-bs-dismiss="modal" aria-label="Close" @click="cleanInput" id="cancel-btn-modal">
                            Cancelar </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="cancel-modal" aria-labelledby="cancelModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" id="cancel-modal-lg">
                <div class="modal-content" id="cancel-modal-content">
                    <CancelModal v-on:session-canceled-event="updateCards" :date="updateOriginalDate"
                        :description="updateDescriptionTxt" :placeTxt="updatePlace" :request_time="updateRequestT"
                        :sessionId="updateSessionI" :tutorEmail="updateTutorID" :studentEmail="updateStudentID"
                        :className="updateClassN" />
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

    .row{
        display:flex;
        justify-content: center;
    }

    .sessions-container{
        display: flex;
        gap: 8vh;
        flex-direction: column;
        padding: 10vh 10vw;

    }

    .card-container{
        display: flex;
        padding: 0 5vw;
    }

    #left{
        justify-content: right;
    }

    #right{
        justify-content: left;
    }

    /* Modal styles */
    h1{
        font-family: "Catamaran";
        font-weight: bold;
    }

    h2{
        font-family: "Catamaran";
        font-weight: 100;
    }

    input{
        font-family: "Catamaran";
        font-weight: normal;
        background: #FFFFFF;
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #A4B7E3;
        border-radius: 8px;
        height: 7vh;
        width: 60%;
    }

    .modal-content{
        padding: 2vh 2vw;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 2vh;
        align-items: center;
    }

    .modal-lg{
        width: 35vw;
    }

    /* Modal buttons */
    
    .modal-button-container{
        margin: 2vh 0 0 0;
        padding: 0vh 0 2vh 0;
        display: flex;
        gap: 1vh;
        align-items: center;
    }

    #confirm-btn-modal,
    #cancel-btn-modal{
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 3vh;
        border-radius: 7px;
        border-color: transparent;
        padding: 0.5vh 2vw;
        display: flex;
        justify-content: center;
    }

    #cancel-btn-modal{
        background-color: #9EB2ED;
    }

    #confirm-btn-modal{
        background-color: #365295;
    }

    #confirm-btn-modal:disabled{
        background-color: #33416d;
        color: #d9eff49d;
    }

    #confirm-btn-modal:disabled:hover{
        box-shadow: none;
    }

    /* Cancel Modal */

    #cancel-modal-lg{
        width: 50vw;
    }

    #cancel-modal-content {
        background-color: #E1F0EA;
        border: 2.5px solid #96BECC;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 20px;
        padding: 7vh 2vw;
        gap: 3vh;
    }
    


</style>
