<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/Navbar.vue"


export default defineComponent({
    data() {
        return{
            setUser: "Daniela hernandez y Hernandez",
            surveyList: [
                {question: "Pregunta Abierta", type: "0", id: "1"},
                {question: "Pregunta Cerrada Multiple", type: "1", id: "2"},
                {question: "Pregunta Escala", type: "2", id: "3"},
                {question: "Pregunta", type: "3", id: "4"}
            ],
            partnerList: [
                {name: "Marco Flamenco", date: "17/02/22"},
                {name: "Emilio Flamenco", date: "18/02/22"},
                {name: "Francisco Hernandez Flamenco", date: "19/02/22"}
            ],
            answerList: [
                {answer: "1", id: "2"},
                {answer: "A ok que loco", id: "1"},
                {answer: "4", id: "3"},
                {answer: "fotoAsesoria.jpg", id: "4"},
            ],
            currentPartner: "Nombre Apellido",
            currentDate: "DD/MM/AA"
        }
    },
    computed: {
        changeCurrentPartner:  {
            get(){
                return this.currentPartner;
            },
            set(val){
                console.log(val)
                this.currentPartner = val;
            }
        },
        changeDate:  {
            get(){
                return this.currentDate;
            },
            set(val){
                console.log(val)
                this.currentDate = val;
            }
        }
        
    },
    methods: {
        changeSurvey(newSubject: { name: string; date: string; }) {
            this.changeCurrentPartner = newSubject.name;
            this.changeDate = newSubject.date;
        }
    },
    mounted(){
        this.changeSurvey(this.partnerList[0])
    },
    components: {
        NavBar
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <div class="container">
        <div class="head-container">
            <div class="message-container">
                Encuestas sobre {{setUser}}
            </div>
            <div class="dropdown-center">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{currentPartner}} {{currentDate}}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownCenterBtn">
                     <li v-for="(partner, i) in partnerList" :key="i"><button class="dropdown-item" type="button" @click="changeSurvey(partner)">{{partner.name}} {{partner.date}}</button></li>
                </ul>
            </div>
        </div>
        <div class="form-container">
            <form>
                <div class="survey-container" v-for="( survey, i) in surveyList" :key="i">
                    <div class="for" v-for="(answer, j) in answerList" :key="j">
                        <div class="question-container" v-if=" survey.type == '0' && answer.id == survey.id">
                            <label for="openQuestion" class="form-label">{{ survey.question}}</label>
                            <textarea type="form-control" class="form-control" id="comments" rows="3" disabled :placeholder="answer.answer"></textarea>
                        </div>
                        <div class="question-container" v-if="survey.type == '1' && answer.id == survey.id">
                            <label for="closedQuestion" class="form-label">{{survey.question}}</label><br>
                            <div class="answer-container">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer1" v-if="answer.answer == '0'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer1" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        20 minutos
                                    </label> <br>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer2" v-if="answer.answer == '1'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer2" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        30 minutos
                                    </label> <br>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer3" v-if="answer.answer == '2'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer3" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        40 minutos
                                    </label> <br>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer4" v-if="answer.answer == '3'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer4" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        45 minutos
                                    </label>
                                </div>   
                            </div>
                        </div>
                        <div class="question-container" v-if=" survey.type == '2' && answer.id == survey.id">
                            <label for="scaleQuestion" class="form-label">{{survey.question}}</label><br>
                            <div class="scale-container">
                                <label for="scaleQuestion" class="form-step">1</label>
                                <label for="scaleQuestion" class="form-step">2</label>
                                <label for="scaleQuestion" class="form-step">3</label>
                                <label for="scaleQuestion" class="form-step">4</label>
                                <label for="scaleQuestion" class="form-step">5</label><br>
                            </div>
                            <div class="answer-container">
                                <div class="form-check-scale">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                    Nada Claro
                                    </label>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer1" v-if="answer.answer == '0'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer1" v-else disabled>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer2" v-if="answer.answer == '1'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer2" v-else disabled>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer3" v-if="answer.answer == '2'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer3" v-else disabled>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer4" v-if="answer.answer == '3'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer4" v-else disabled>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer5" v-if="answer.answer == '4'" disabled checked>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault2" id="scaleAnswer5" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Muy Claro
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="question-container" v-if=" survey.type == '3' && answer.id == survey.id">
                            <div class="file-container">
                                <label for="formFile" class="form-label">{{ survey.question}}</label>
                                <a class="file-link" :href="answer.answer"> Descargar: {{answer.answer}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin-top: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 100vw;
    margin-bottom: 5vh;
}
.dropdown-center{
    display: flex;
    padding: 3vh 0 1vh;
    justify-content: center;
}
.dropdown-menu {
    max-height: 40vh;
    overflow: auto;
}
.head-container{
    display: flex;
    flex-direction: column;
    gap:0;
}
.dropdown-toggle{
    align-items: center;
}
.file-container{
    display: flex;
    flex-direction: column;
}
.file-link {
    font-family: "Catamaran";
    font-weight: medium;
    color: #57716F;
    font-size: 3vh;
    background-color: white;
    padding: 2vh 2vw;
    border-radius: 15px;
}
.btn{
    font-family: "Catamaran";
    font-weight: medium;
    display: flex;
    justify-content: space-between;
    width: 30vw;
    color: black;
    background-color: white;
    border-radius: 20px;
}
.form-check-input:checked {
    background-color: #57716F;
    border-color: #57716F;
}
.dropdown-item {
    font-family: "Catamaran";
    font-weight: medium;
}
.message-container{
    font-family: "Catamaran";
    font-weight: bold;
    color: white;
    text-align: center;
    font-size: 7vh;
    background-color: #A4B7E3;
    border-radius: 15px;
    padding: 1.5vh 8vw;
    max-width: 80vw;
    margin-top: 2vh;
    min-width: 80vw;
}
.question-container{
    font-family: "Catamaran";
    font-weight: medium;
    color: #57716F;
    text-align: left;
    font-size: 4vh;
    background-color: #E1F0EA;
    border-radius: 15px;
    padding: 3vh 2vw;
    margin-top: 2vh;
    width: 55vw;
}
.answer-container{
    background-color: white;
    padding: 3vh 2vw;
    border-radius: 15px;
    flex-direction: row;
}
.scale-container{
    margin: 0vh 0vw;
    text-align: center;
}
.form-check-input{
    font-size: 2.5vh;
    margin: 1vh 1.2vw;
}
.form-check-scale {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form-check {
    display: block;
    padding: 0vh;
    display: flex;
    align-items: left;
    justify-content: left;
}
.form-check-label{
    font-size: 2.5vh;
    align-content: center;
    
}
.form-label{
    font-size: 3vh;
    align-content: center;
}
.form-step{
    margin: 1vh 1.5vw;
    font-size: 3vh;
}
.form-check-input:disabled~.form-check-label, .form-check-input[disabled]~.form-check-label {
    opacity: 1;
}

</style>