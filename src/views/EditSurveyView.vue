<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        changeTabC:  {
            get(){
                return this.tab;
            },
            set(val){
                console.log(val)
                this.tab = val;
            }
        }
        
    },
    mounted(){
        this.surveyList = this.studentList;
    },
    data() {
        return{
            surveyList: [
                {question: "Pregunta Abierta", type: "0", id: "1"},
                {question: "Pregunta Cerrada Multiple", type: "1", id: "2"},
                {question: "Pregunta Escala", type: "2", id: "4"},
                {question: "Pregunta", type: "3", id: "3"},
            ],
            tutorList: [
                {question: "Tiempo de la asesoría", type: "1", id: "5"},
                {question: "Foto de Asesoría", type: "3", id: "6"},
                {question: "Cuentanos mas de tu experiencia", type: "0", id: "7"},
            ],
            studentList: [
                {question: "Comentarios ", type: "0", id: "1"},
                {question: "Tiempo de la asesoría ", type: "1", id: "2"},
                {question: "Claridad de explicación ", type: "2", id: "4"},
                {question: "Foto de Asesoría ", type: "3", id: "3"},
            ],
            tab: "student"
        }
    },
    methods: {
        toStudentsTab() {
            const studentTab = document.getElementById("students-tab") as HTMLInputElement;
            const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
            tutorsTab.style.backgroundColor = "#E1F0EA";
            tutorsTab.style.color = "#6F9492";
            studentTab.style.backgroundColor = "#96CCC9";
            studentTab.style.color = "white";
            this.changeTabC = "student";
            this.changeSurvey();
        },
        toTutorsTab() {
            const studentTab = document.getElementById("students-tab") as HTMLInputElement;
            const tutorsTab = document.getElementById("tutors-tab") as HTMLInputElement;
            studentTab.style.backgroundColor = "#E1F0EA";
            studentTab.style.color = "#6F9492";
            tutorsTab.style.backgroundColor = "#96CCC9";
            tutorsTab.style.color = "white";
            this.changeTabC = "tutor";
            this.changeSurvey();
        },
        changeSurvey() {
            if (this.changeTabC == "student"){
                this.surveyList = this.studentList;
            }
            else{
                this.surveyList = this.tutorList;
            }
        }
    },
})
</script>

<template>
    <div class="container">
        <div class="head-container">
            <div class="table-tabs">
                <button id="students-tab" @click="toStudentsTab"> Alumnos </button>
                <button id="tutors-tab" @click="toTutorsTab"> Asesores </button>
            </div>
            <div class="message-container">
                Configuración de Encuesta
            </div>
        </div>
        <div class="form-container">
            <form>
                <div class="survey-container" v-for="(subject, i) in surveyList" :key="i">
                    <div class="question-container" v-if="subject.type == '0'">
                        <label for="openQuestion" class="form-label">{{subject.question}}</label>
                        <textarea type="form-control" class="form-control" id="comments" rows="3" disabled></textarea>
                    </div>
                    <div class="question-container" v-if="subject.type == '1'">
                        <label for="closedQuestion" class="form-label">{{subject.question}}</label><br>
                        <div class="answer-container">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer1" disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    20 minutos
                                </label> <br>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer2" disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    30 minutos
                                </label> <br>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer3" disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    40 minutos
                                </label> <br>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer4" disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    45 minutos
                                </label>
                            </div>   
                        </div>
                    </div>
                    <div class="question-container" v-if="subject.type == '2'">
                        <label for="scaleQuestion" class="form-label">{{subject.question}}</label><br>
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
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer1" disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer2" disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer3" disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer4" disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer5" disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Muy Claro
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="question-container" v-if="subject.type == '3'">
                        <div class="mb-3">
                            <label for="formFile" class="form-label">{{subject.question}}</label>
                            <input class="form-control" type="file" id="formFile" disabled>
                        </div>
                    </div>
                </div>
            </form>
        </div>
       <a href="home">Enviar</a>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 100vw;
}
.head-container{
    display: flex;
    flex-direction: column;
    gap:0;
}
.message-container{
    font-family: "Catamaran";
    font-weight: bold;
    color: #6F9492;
    text-align: center;
    font-size: 7vh;
    background-color: #E1F0EA;
    border-radius: 0px 15px 15px 15px;
    padding: 1.5vh 22vw;
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
#students-tab{
    border-radius: 8px 8px 0 0;
    border-color: transparent;
    background-color: #96CCC9;
    color: white;
    font-size: 3.5vh;
    width: 10vw;
    height: 6vh;
}
#tutors-tab{
    border-radius: 8px 8px 0 0;
    background-color: #E1F0EA;
    color: #6F9492;
    border-color: transparent;
    font-size: 3.5vh;
    width: 10vw;
    height: 6vh;
}
.form-step{
    margin: 1vh 1.5vw;
    font-size: 3vh;
}
.form-check-input:disabled~.form-check-label, .form-check-input[disabled]~.form-check-label {
    opacity: 1;
}
a {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 3.5vh;
    padding: 1vh 4vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #26408B;
    box-sizing: border-box;
    margin: 3vh;
    text-decoration: none;
}

</style>