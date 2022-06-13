<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from "../components/Navbar.vue"
import axios from 'axios';
import router from '@/router';

const api = 'http://localhost:8000/api/'

export default defineComponent({
    computed: {
        changeTabC: {
            get() {
                return this.tab;
            },
            set(val) {
                this.tab = val;
            }
        },
        updateSelection: {
            get() {
                return this.selection;
            },
            set(val) {
                this.selection = val;
            }
        },
        updateSurveyList: {
            get() {
                return this.surveyList;
            },
            set(val) {
                this.surveyList = val;
            }
        },
        updateDeleteBtn: {
            get() {
                return this.disableDeleteBtn;
            },
            set(val) {
                this.disableDeleteBtn = val;
            }
        },
        updateSurveyIdT: {
            get() {
                return this.surveyIdT;
            },
            set(val) {
                this.surveyIdT = val;
            }
        },
        updateSurveyIdS: {
            get() {
                return this.surveyIdS;
            },
            set(val) {
                this.surveyIdS = val;
            }
        },
        isEmpty: {
            get() {
                return this.empty;
            },
            set(val) {
                this.empty = val;
            }
        }
    },
    components: {
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
        this.getStudentSurvey()
        this.getTutorSurvey()
    },

    data() {
        return {
            empty: false,
            selection: -1,
            surveyIdT: -1,
            surveyIdS: -1,
            surveyList: [],
            tutorList: [],
            studentList: [],
            choicesList: [],
            tempChoicesList: [],
            tab: "student",
            deleteIndex: -1,
            disableDeleteBtn: false
        }
    },
    methods: {
        async checkForm() {
            for (let i = 0; i < this.surveyList.length; i++) {
                if(this.surveyList[i].new == true) {
                    await axios
                    .post(api + 'questions/', this.surveyList[i])
                    .then(result => {
                        if(result.data.question_type == 1) {
                            for(let j = 0; j < this.tempChoicesList.length; j++) {
                                if(this.surveyList[i].index == this.tempChoicesList[j].id_question) {
                                    axios
                                    .post(api + 'choices/', {
                                        choice: this.tempChoicesList[j].choice,
                                        id_question: result.data.id
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    }) 
                                }
                            }
                        }   
                    })
                    .catch(error => {
                        console.log(error)
                    }) 
                } else {
                    await axios
                    .put(api + 'questions/' + this.surveyList[i].id + '/', this.surveyList[i])
                    .catch(error => {
                        console.log(error)
                    }) 
                }
            }

            router.push('/admin-home')
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
            if (this.changeTabC == "student") {
                this.surveyList = this.studentList;
            }
            else {
                this.surveyList = this.tutorList;
            }
        },
        addQuestion(type: string) {
            var question = {
                question: 'Pregunta', 
                question_type: type, 
                id_survey: 0, 
                new: true,
                index: this.surveyList.length
            }

            if (this.changeTabC == 'student') {
                question.id_survey = this.updateSurveyIdS
            } else {
                question.id_survey = this.updateSurveyIdT
            }

            this.surveyList.push(question)

            if (this.surveyList.length > 1) {
                const list = document.getElementsByClassName('delete-button')
                for (let i = 0; i < list.length; i++) {
                    list[i].style.opacity = 1
                }
                this.updateDeleteBtn = false
            }
        },

        deleteQuestion(place: number, questionId: number, event: Event) {
            event.preventDefault()
            if(!this.surveyList[place].new) {
                axios
                .delete(api + 'questions/' + questionId)
                .catch(error => {
                    console.log(error)
                })
            }

            this.surveyList.splice(place, 1)
            if (this.surveyList.length < 2) {
                const list = document.getElementsByClassName('delete-button')
                list[0].style.opacity = 0.6
                this.updateDeleteBtn = true
            }
        },

        setIndex(place: number) {
            this.deleteIndex = place;
        },

        async getTutorSurvey() {
            await axios
                .get(api + 'most_recent_survey_for_tutors/')
                .then(result => {
                    this.surveyIdT = result.data[0].id
                })
                .catch(error => {
                    console.log(error)
                })

            await axios
                .get(api + 'questions_of_specific_survey/?survey=' + this.updateSurveyIdT)
                .then(result => {
                    this.tutorList = result.data
                })
                .catch(error => {
                    console.log(error)
                })

            for (let i = 0; i < this.tutorList.length; i++) {
                this.tutorList[i].new = false
            }
        },

        async getStudentSurvey() {
            var questionList = []

            await axios
                .get(api + 'most_recent_survey_for_students/')
                .then(result => {
                    this.surveyIdS = result.data[0].id
                })
                .catch(error => {
                    console.log(error)
                })

            await axios
                .get(api + 'questions_of_specific_survey/?survey=' + this.updateSurveyIdS)
                .then(result => {
                    questionList = result.data
                })
                .catch(error => {
                    console.log(error)
                })

            axios
                .get(api + 'choices/')
                .then(result => {
                    this.choicesList = result.data
                })
                .catch(error => {
                    console.log(error)
                })

            for (let i = 0; i < questionList.length; i++) {
                questionList[i].new = false
            }

            this.studentList = questionList
            this.surveyList = this.studentList;
        },

        setSelection(i: number) {
            this.selection = i;
        },

        addOption(event : Event, idQuestion : number) {
            event.preventDefault()
            this.isEmpty = true
            this.tempChoicesList.push({choice: '', id_question: idQuestion})
        },

        deleteOption(event : Event, idOption : number) {
            event.preventDefault()
            this.tempChoicesList.splice(idOption,1)
        },

        updateQuestionInput(index : number) {
            const questionId = 'question' + index.toString()
            const questionInput = document.getElementById(questionId) as HTMLInputElement;
            if(questionInput.value.length > 0) {
                this.isEmpty = false
            }
            else {
                this.isEmpty = true
            }
            this.surveyList[index].question = questionInput.value
        },

        updateChoiceInput(index : number) {
            const choiceId = 'choice' + index.toString()
            const choiceInput = document.getElementsByName(choiceId);
            if (choiceInput[0].value.length > 0) {
                this.isEmpty = false
            }
            else {
                this.isEmpty = true
            }
            this.tempChoicesList[index].choice = choiceInput[0].value
        }
    },
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
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
            <form  name="form" class="needs-validation" id="form-edit" novalidate @submit.prevent="checkForm">
                <div class="survey-container" v-for="(subject, i) in surveyList" :key="i">
                    <div class="question-container" v-if="subject.question_type == '0'">
                        <input type="text" for="openQuestion" class="question-input" :value="subject.question" :id="'question' + i" @input="updateQuestionInput(i)" required>
                        <textarea type="form-control" class="form-control" :id="'comment' + i" rows="3"
                            disabled></textarea>
                        <button class="delete-button" type="button" data-bs-toggle="modal"
                            data-bs-target="#delete-modal" @click="setIndex(i), setSelection(subject.id)"
                            :disabled="disableDeleteBtn"></button>
                    </div>
                    <div class="question-container" v-if="subject.question_type == '1' && subject.new != true">
                        <input type="text" for="closedQuestion" class="question-input" :value="subject.question"
                             :id="'question' + i" @input="updateQuestionInput(i)" required><br>
                        <div class="answer-container">
                            <div v-for="(choice, j) in choicesList" :key="j">
                                <div v-if="choice.id_question == subject.id" class="form-check">
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault' + i" disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {{ choice.choice }}
                                    </label><br>
                                </div>
                            </div>
                        </div>
                        <button class="delete-button" type="button" data-bs-toggle="modal"
                            data-bs-target="#delete-modal" @click="setIndex(i), setSelection(subject.id)"
                            :disabled="disableDeleteBtn"></button>
                    </div>
                    <div class="question-container" v-else-if="subject.question_type == '1' && subject.new == true" >
                        <input type="text" for="closedQuestion" class="question-input" :value="subject.question"
                             :id="'question' + i" @input="updateQuestionInput(i)" required><br>
                        <div class="answer-container">
                            <div v-for="(choice, j) in tempChoicesList" :key="j">
                                <div class="form-check" id="form-check-option" v-if="choice.id_question == subject.index">
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault' + i" :value="choice" disabled>
                                    <input class="question-input" id="option-input" for="flexRadioDefault1" :name="'choice' + j" @input="updateChoiceInput(j)" :value="choice.choice" required>
                                    <button class="delete-button" id ="delete-option" type="button" @click="deleteOption($event,j)"></button><br>
                                </div>
                            </div>
                            <button @click="addOption($event, subject.index)" class="add-option-button"></button>
                        </div>
                        <button class="delete-button" type="button" data-bs-toggle="modal"
                            data-bs-target="#delete-modal" @click="setIndex(i), setSelection(subject.id)"
                            :disabled="disableDeleteBtn"></button>
                    </div>
                    <div class="question-container" v-if="subject.question_type == '2'">
                        <input type="text" for="scaleQuestion" class="question-input" :value="subject.question" :id="'question' + i" @input="updateQuestionInput(i)" required><br>
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
                                    En desacuerdo
                                </label>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer1"
                                    disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer2"
                                    disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer3"
                                    disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer4"
                                    disabled>
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer5"
                                    disabled>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    De acuerdo
                                </label>
                            </div>
                        </div>
                        <button class="delete-button" type="button" data-bs-toggle="modal"
                            data-bs-target="#delete-modal" @click="setIndex(i), setSelection(subject.id)"
                            :disabled="disableDeleteBtn"></button>
                    </div>
                    <div class="question-container" v-if="subject.question_type == '3'">
                        <input type="text" for="formFile" class="question-input" :value="subject.question" :id="'question' + i" @input="updateQuestionInput(i)" required><br>
                        <input class="form-control" type="file" id="formFile" disabled>
                        <button class="delete-button" type="button" data-bs-toggle="modal"
                            data-bs-target="#delete-modal" @click="setIndex(i), setSelection(subject.id)"
                            :disabled="disableDeleteBtn"></button>
                    </div>
                </div>
                <button id="save-exit-btn" type="submit" :disabled="isEmpty">
                    Guardar y salir
                </button>
            </form>
        </div>
        <div class="add-question-container">
            <button class="add-question-button" data-bs-toggle="modal" data-bs-target="#question-modal"></button>
            <h1>añadir pregunta</h1>
        </div>
        <div class="modal fade" id="question-modal" tabindex="-1" aria-labelledby="questionModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <h2> ¿Qué tipo de pregunta deseas agregar? </h2>
                    <div class="add-button-container">
                        <div class="button-label-container">
                            <button class="add-button" id="open-button" data-bs-dismiss="modal" aria-label="Close"
                                @click="addQuestion('0')"></button>
                            <h1>Abierta</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="multiple-button" data-bs-dismiss="modal" aria-label="Close"
                                @click="addQuestion('1')"></button>
                            <h1>Múltiple</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="scale-button" data-bs-dismiss="modal" aria-label="Close"
                                @click="addQuestion('2')"></button>
                            <h1>Escala</h1>
                        </div>
                        <div class="button-label-container">
                            <button class="add-button" id="file-button" data-bs-dismiss="modal" aria-label="Close"
                                @click="addQuestion('3')"></button>
                            <h1>Archivo</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="delete-modal-content">
                    <h3>¿Estás segurx de eliminar esta pregunta?</h3>
                    <div class="button-modal-container">
                        <button class="close-button" data-bs-dismiss="modal" aria-label="Close">No, regresar</button>
                        <button class="confirm-button" data-bs-dismiss="modal" aria-label="Close"
                            @click="deleteQuestion(deleteIndex, selection, $event)">Sí, eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.container {
    margin-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 100vw;
}

.confirm-button {
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

.close-button {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 3.5vh;
    padding: 1vh 4vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #769ABA;
    box-sizing: border-box;
    margin: 3vh;
    text-decoration: none;
}

.head-container {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.message-container {
    font-family: "Catamaran";
    font-weight: bold;
    color: #6F9492;
    text-align: center;
    font-size: 7vh;
    background-color: #E1F0EA;
    border-radius: 0px 15px 15px 15px;
    padding: 1.5vh 22vw;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
}

.question-container {
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

#save-exit-btn{
    font-family: "Ubuntu";
    font-weight: normal;
    width: 20vw;
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

.answer-container {
    background-color: white;
    padding: 3vh 2vw;
    border-radius: 15px;
    flex-direction: row;
}

.scale-container {
    margin: 0vh 0vw 0 1.5vw;
    text-align: center;
}

.form-check-input {
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
#form-check-option {
     align-items: center;
    justify-content: center;
}

.form-check-label {
    font-size: 2.5vh;
    align-content: center;

}

.form-label {
    font-size: 3vh;
    align-content: center;
}

#students-tab {
    border-radius: 8px 8px 0 0;
    border-color: transparent;
    background-color: #96CCC9;
    color: white;
    font-size: 3.5vh;
    width: 10vw;
    height: 6vh;
}

#tutors-tab {
    border-radius: 8px 8px 0 0;
    background-color: #E1F0EA;
    color: #6F9492;
    border-color: transparent;
    font-size: 3.5vh;
    width: 10vw;
    height: 6vh;
}

.form-step {
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
    background-repeat: no-repeat;
    /* Do not repeat the icon image */
    background-size: 70%;
    margin: 2vh 0 0 95%;
}
#delete-option {
    margin: 0 0 2vh 2vw;
    background-position: 0.49vw 0.78vh;
}

.add-question-button {
    border-style: hidden;
    background-color: #26408B;
    border-radius: 100%;
    height: 8vh;
    width: 8vh;
    background-image: url('src/assets/img/plus-icon.png');
    background-repeat: no-repeat;
    /* Do not repeat the icon image */
    background-size: 100%;
}
.add-option-button {
    border-style: hidden;
    background-color: #26408B;
    border-radius: 100%;
    height: 6vh;
    width: 6vh;
    background-image: url('src/assets/img/plus-icon.png');
    background-repeat: no-repeat;
    /* Do not repeat the icon image */
    background-size: 100%;
    margin: 2vh 0 0 1vw;
}

.form-check-input:disabled~.form-check-label,
.form-check-input[disabled]~.form-check-label {
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

h4 {
    color: white;
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
#option-input{
    border-color: #616161;
    border-style: solid;
    border-width: 1px;
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

h3 {
    font-family: 'Montserrat';
    font-weight: normal;
    color: white;
    font-size: 5vh;
    text-align: center;
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
    background-repeat: no-repeat;
    /* Do not repeat the icon image */
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

#delete-modal-content {
    border-radius: 20px;
    background-color: #9BAEE6;
    border-style: hidden;
}

.button-modal-container {
    display: flex;
    gap: 2vw;
    margin-top: 2vh;
}

#save-exit-btn:disabled {
    background-color: #3d46608d;
    color: #ffffffaa;
}
</style>