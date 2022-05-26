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
                {question: "Pregunta Abierta", type: "0"},
                {question: "Pregunta Cerrada Multiple", type: "1"},
                {question: "Pregunta Escala", type: "2"},
                {question: "Pregunta", type: "3"},
            ],
            tutorList: [
                {question: "Tiempo de la asesoría", type: "1"},
                {question: "Foto de Asesoría", type: "3"},
                {question: "Cuentanos mas de tu experiencia", type: "0",},
            ],
            studentList: [
                {question: "Comentarios ", type: "0"},
                {question: "Tiempo de la asesoría ", type: "1"},
                {question: "Claridad de explicación ", type: "2"},
                {question: "Foto de Asesoría ", type: "3"},
            ],
            tab: "student"
        }
    },
    methods: {
        checkForm(){
            'use strict'
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                form.addEventListener('submit', function (event: Event) {
                    if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        },
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
        },
        addQuestion(type: string){
            this.surveyList.push({question: "Pregunta", type: type})
        },
        deleteQuestion(place: number){
            this.surveyList.splice(place,1)
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
                        <input type="text" for="openQuestion" class="question-input" :value="subject.question" required @input="checkForm">
                        <textarea type="form-control" class="form-control" id="comments" rows="3" disabled></textarea>
                        <button class="delete-button" @click="deleteQuestion(i)"></button>
                    </div>
                    <div class="question-container" v-if="subject.type == '1'">
                        <input type="text" for="closedQuestion" class="question-input" :value="subject.question" required @input="checkForm"><br>
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
                        <button class="delete-button" @click="deleteQuestion(i)"></button>
                    </div>
                    <div class="question-container" v-if="subject.type == '2'">
                        <input type="text" for="scaleQuestion" class="question-input" :value="subject.question" required @input="checkForm"><br>
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
                        <button class="delete-button" @click="deleteQuestion(i)"></button>
                    </div>
                    <div class="question-container" v-if="subject.type == '3'">
                        <input type="text" for="formFile" class="question-input" :value="subject.question" required @input="checkForm"><br>
                        <input class="form-control" type="file" id="formFile" disabled>
                        <button class="delete-button" @click="deleteQuestion(i)"></button>
                    </div>
                </div>
            </form>
        </div>
       <a href="home" @click="checkForm">Guardar Cambios</a>
       <div class="add-question-container">
           <button class="add-question-button" data-bs-toggle="modal" data-bs-target="#class-modal"></button>
           <h1>añadir pregunta</h1>
       </div>
       <div class="modal fade" id="class-modal" tabindex="-1" aria-labelledby="classModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h2> ¿Qué tipo de pregunta deseas agregar? </h2>
                    <div class="add-button-container">
                        <div class="button-label-container">
                            <button class="add-button" id="open-button" @click="addQuestion('0')"></button>
                            <h1>Abierta</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="multiple-button" @click="addQuestion('1')"></button>
                            <h1>Multiple</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="scale-button" @click="addQuestion('2')"></button>
                            <h1>Escala</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="file-button" @click="addQuestion('3')"></button>
                            <h1>Archivo</h1>
                        </div>
                    </div>
                </div>
            </div>
       </div>
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
    padding-bottom: 0;
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
.delete-button {
    border-style: hidden;
    background-color: #26408B;
    border-radius: 100%;
    height: 5vh;
    width: 5vh;
    background-image: url('src/assets/img/delete-white.png');
    background-position: 0.56vw 0.58vh;
    background-repeat: no-repeat; /* Do not repeat the icon image */
    background-size: 70%;
    margin: 2vh 0 0 95%;
}
.add-question-button {
    border-style: hidden;
    background-color: #26408B;
    border-radius: 100%;
    height: 8vh;
    width: 8vh;
    background-image: url('src/assets/img/plus-icon.png');
    background-repeat: no-repeat; /* Do not repeat the icon image */
    background-size: 100%;
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
.question-input {
    font-family: "Catamaran";
    font-weight: medium;
    font-size: 3vh;
    color: #616161;
    border-radius: 15px;
    border-style: hidden;
    padding: 1vh 1vw;
    margin-bottom: 1vh;
    width: 100%;
}
.add-question-container {
    display: flex;
    bottom: 4vh;
    right: 4vh;
    position: fixed;
    width: 8vw;
    align-items: center;
    gap: 1vh;
    flex-direction: column;
}
h1 {
    font-family: "Ubuntu";
    font-weight: normal;
    font-size: 2.5vh;
    color: #365295;
    text-align: center;
}
.modal-content {
    display: flex;
    align-items: center;
    padding: 3vh;
    gap: 2vh;
}
h2 {
    font-family: "Catamaran";
    font-weight: bolder;
    color: #6F9492;
    font-size: 5vh;
}
.add-button-container {
    display: flex;
    gap: 4vw;
}
.add-button {
    border-style: hidden;
    background-color: #26408B;
    border-radius: 100%;
    height: 10vh;
    width: 10vh;
    background-repeat: no-repeat; /* Do not repeat the icon image */
    background-size: 70%;
}
#open-button {
    background-image: url('src/assets/img/open-question.png');
    background-position: 0.8vw 1.5vh;
}
#multiple-button {
    background-image: url('src/assets/img/multiple-question.png');
    background-position: 0.8vw 1.3vh;
}
#scale-button {
    background-image: url('src/assets/img/scale-question.png');
    background-position: 0.8vw 1.3vh;
}
#file-button {
    background-image: url('src/assets/img/file-question.png');
    background-position: 1.3vw 1.3vh;
}
</style>