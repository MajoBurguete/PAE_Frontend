<script lang="ts">
import router from '../router';
import axios from 'axios';
import { defineComponent } from "vue";

const api = 'http://localhost:5100/api/'
const user_type = localStorage.getItem('userType')

export default defineComponent({
    data() {
        return{
            surveyList: [],
            choicesList: [],
            id_student: '',
            id_tutor: '', 
            answer: {},
            fileObject: null,
        }
    },

    beforeMount() {
        const token = localStorage.getItem('user-token')
        const status = localStorage.getItem('userStatus')

        if(token == null || status != '1') {
            router.push('/')
        }
    },

    mounted(){
        this.getQuestions()
    },
    
    methods: {
        async getQuestions() {
            var id_survey = 0

            if(user_type == '0') {
                await axios
                .get(api + 'most_recent_survey_for_students/')
                .then(result => {
                    id_survey = result.data[0].id
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                await axios
                .get(api + 'most_recent_survey_for_tutors/')
                .then(result => {
                    id_survey = result.data[0].id
                })
                .catch(error => {
                    console.log(error)
                })
            }

            await axios
            .get(api + 'questions_of_specific_survey/?survey=' + id_survey)
            .then(result => {
                this.surveyList = result.data
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
        },

        saveFile(event) {
            this.fileObject = event.target.files[0]
        },

        async submitAnswer() {
           const id_user = localStorage.getItem('userID')
           const now = new Date();
           const now2 = now.toISOString()

           if(user_type == '0') {
               await axios
               .get(api + 'recent_completed_session/?student=' + id_user)
               .then(result => {
                   this.id_tutor = result.data[0].id_tutor
               })
               this.id_student = id_user
           } else {
               await axios
               .get(api + 'recent_completed_session/?tutor=' + id_user)
               .then(result => {
                   this.id_student = result.data[0].id_student
               })
               this.id_tutor = id_user
           }

            var input = document.getElementById('') as HTMLInputElement;
            var index = ''

            for(let j = 0; j < this.surveyList.length; j++) {
                if(this.surveyList[j].question_type == 0) {
                    index = 'comment' + j.toString()
                    input = document.getElementById(index) as HTMLInputElement;

                    await axios
                    .post(api + 'answers/', {
                        id_question:  this.surveyList[j].id,
                        id_student: this.id_student,
                        id_tutor: this.id_tutor,
                        date: now2,
                        answer: input.value
                    })
                    .catch(error => {
                        console.log(error)
                    })

                } else if(this.surveyList[j].question_type == 1) {
                    for(let i = 0; i < this.choicesList.length; i++) {
                        if(this.surveyList[j].id == this.choicesList[i].id_question) {
                            index = 'closedAnswer' + i.toString()
                            input = document.getElementById(index) as HTMLInputElement;
                            
                            if(input.checked) {        
                                await axios
                                .post(api + 'answers/', {
                                    id_question:  this.surveyList[j].id,
                                    id_student: this.id_student,
                                    id_tutor: this.id_tutor,
                                    date: now2,
                                    answer: input.value
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                            }
                        }
                    }
                } else if(this.surveyList[j].question_type == 2) {
                    for(let i = 1; i < 6; i++) {
                        index = 'scaleAnswer' + i.toString() + j.toString()
                        input = document.getElementById(index) as HTMLInputElement;
                        if(input.checked) {                            
                            await axios
                            .post(api + 'answers/', {
                                id_question:  this.surveyList[j].id,
                                id_student: this.id_student,
                                id_tutor: this.id_tutor,
                                date: now2,
                                answer: input.value
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    }
                } else {
                    index = 'formFile' + j.toString() 
                    let formData = new FormData();
                    formData.append('id_question', this.surveyList[j].id)
                    formData.append('id_student', this.id_student)
                    formData.append('id_tutor', this.id_tutor)
                    formData.append('date', now2)
                    formData.append('file', this.fileObject)
                    
                    await axios
                    .post(api + 'answer_files/', formData)
                    .catch(error => {
                        console.log(error)
                    })
                }
            }
            localStorage.setItem("userStatus", "0")
            router.push('/home')
        }
    }
})
</script>

<template>
    <div class="container">
            <div class="message-container">
                ¡Ay&uacute;danos con tu opini&oacute;n!
            </div>
        <form name="form" @submit.prevent="submitAnswer">
            <div class="form-container" v-for="(survey, i) in surveyList" :key="i">
                <div class="question-container" v-if=" survey['question_type'] == '0'">
                    <label for="openQuestion" class="form-label">{{survey['question']}}</label>
                    <textarea type="form-control" class="form-control" :id="'comment' + i" rows="3" required></textarea>
                </div>
                <div class="question-container"  v-if=" survey['question_type'] == '1'">
                    <label for="closedQuestion" class="form-label">{{survey['question']}}</label><br>
                    <div class="answer-container">
                        <div v-for="(choice, j) in choicesList" :key="j" >
                            <div  v-if="choice['id_question'] == survey['id']" class="form-check">
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault' + i" :id="'closedAnswer' + j" required :value="choice['choice']">
                            <label class="form-check-label" for="flexRadioDefault1">
                                {{ choice['choice'] }} 
                            </label> <br>
                            </div> 
                        </div> 
                    </div>
                </div>
                <div class="question-container" v-if=" survey['question_type'] == '2'">
                    <label for="scaleQuestion" class="form-label">{{survey['question']}}</label><br>
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
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer1' + i" value="1" required>
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer2' + i" value="2" required>
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer3' + i" value="3" required>
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer4' + i" value="4" required>
                            <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer5' + i" value="5" required>
                            <label class="form-check-label" for="flexRadioDefault1">
                            De acuerdo
                            </label>
                        </div>
                    </div>
                </div>
                <div class="question-container"  v-if=" survey['question_type'] == '3'">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">{{survey['question']}}</label>
                        <input class="form-control" type="file" @change="saveFile($event)" :id="'formFile' + i" required>
                    </div>
                </div>
            </div>
            <button>Enviar</button>
        </form>
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
}
.message-container{
    font-family: "Catamaran";
    font-weight: bold;
    color: white;
    text-align: center;
    font-size: 7vh;
    background-color: #A4B7E3;
    border-radius: 15px;
    padding: 1.5vh 22vw;
    margin-top: 2vh;
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
.form-check-input:checked {
    background-color: #57716F;
    border-color: #57716F;
}
.answer-container{
    background-color: white;
    padding: 3vh 2vw;
    border-radius: 15px;
    flex-direction: row;
}
.scale-container{
    margin: 0vh 0vw 0 1.5vw;
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
form {
    margin-top: 4vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
}
.form-label{
    font-size: 3vh;
    align-content: center;
}
.form-step{
    margin: 1vh 1.5vw;
    font-size: 3vh;
}

button {
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
header {
    margin-bottom: 7vh;
}

</style>