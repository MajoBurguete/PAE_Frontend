<script lang="ts">
import { defineComponent } from "vue";
import router from "../router"
import NavBar from "../components/Navbar.vue"
import axios from 'axios';

const api = 'http://10.50.84.114:5100/api/'
const userId = localStorage.getItem('selectedUser')

export default defineComponent({
    data() {
        return{
            setUser: {},
            surveyList: [],
            choicesList: [],
            partnerList: [],
            answerList: [],
            answerFileList: [],
            currentPartner: "Nombre Apellido",
            currentDate: "DD/MM/AA",
            
        }
    },
    computed: {
        changeCurrentPartner:  {
            get() {
                return this.currentPartner;
            },
            set(val) {
                this.currentPartner = val;
            }
        },
        changeDate:  {
            get() {
                return this.currentDate;
            },
            set(val) {
                this.currentDate = val;
            }
        },
        changePartnerList:  {
            get(){
                return this.partnerList;
            },
            set(val) {
                this.partnerList = val;
            }
        }
        
    },
    methods: {
        changeSurvey(newSubject: { name: string; date: string; }) {
            this.changeCurrentPartner = newSubject.name;
            this.changeDate = newSubject.date;
        },

        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },

        formatFileName(file) {
            let index = file.indexOf('media/')
            return file.substr(index + 6)
        },

        async getSurveyAndAnswerList(){
            var id_survey = 0

            if(this.setUser.user_type == '0') {
                await axios
                .get(api + 'most_recent_survey_for_students/')
                .then(result => {
                    id_survey = result.data[0].id
                    
                    axios
                    .get(api + 'answers_about_user/?student=' + userId)
                    .then(result2 => {
                        this.answerList = result2.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                    axios
                    .get(api + 'files_answers_about_user/?student=' + userId)
                    .then(result2 => {
                        this.answerFileList = result2.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                await axios
                .get(api + 'most_recent_survey_for_tutors/')
                .then(result => {
                    id_survey = result.data[0].id

                    axios
                    .get(api + 'answers_about_user/?tutor=' + userId)
                    .then(result2 => {
                        this.answerList = result2.data
                        this.getPartnerList()
                    })
                    .catch(error => {
                        console.log(error)
                    })

                    axios
                    .get(api + 'files_answers_about_user/?tutor=' + userId)
                    .then(result2 => {
                        this.answerFileList = result2.data
                    })
                    .catch(error => {
                        console.log(error)
                    })

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
        async getUser() {
            await axios
            .get(api + 'specific_user/?user=' + userId)
            .then(result => {
                this.setUser = result.data[0]
            })
            .catch(error => {
                console.log(error)
            })
        },
        async getPartnerList() {
            if(this.answerList.length > 0) {
                var aux = this.answerList[0].date
                var survey = {
                            name: '',
                            date: this.answerList[0].date
                        }

                if(this.setUser.user_type == '0'){
                    survey.name = this.answerList[0].id_tutor__id__first_name
                } else {
                    survey.name = this.answerList[0].id_student__id__first_name
                }

                var dropdownInfo = [survey]
                
                for(let i = 1; i < this.answerList.length; i++) {
                    if(aux != this.answerList[i].date) {
                        var survey = {
                            name: '',
                            date: this.answerList[i].date
                        }

                        if(this.setUser.user_type == '0'){
                            survey.name = this.answerList[i].id_tutor__id__first_name
                        } else {
                            survey.name = this.answerList[i].id_student__id__first_name
                        }
                        
                        dropdownInfo.push(survey)
                        aux = this.answerList[i].date
                    }
                }

                this.changePartnerList = dropdownInfo
                this.changeSurvey(this.partnerList[0])
            }
        },
        async partnerListIsEmpty() {
            const message = document.getElementById("message-header") as HTMLInputElement;
            const dropdown = document.getElementById("dropdown") as HTMLInputElement;
            console.log(this.partnerList.length)
            if (this.partnerList.length <= 0){
                message.textContent = "Este usuario no tiene encuestas respondidas por otros usuarios"
                dropdown.style.display = "none"
            }
            else {
                message.textContent = "Encuestas sobre " + this.setUser.id__first_name
            }
        }
    },

     beforeMount() {
        const token = localStorage.getItem('user-token')
        const type = localStorage.getItem('userType')

        if(token == null || type != '2') {
            router.push('/')
        }
    },
   
    mounted(){
        this.getUser()
        this.getSurveyAndAnswerList()
        this.partnerListIsEmpty()
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
                <h1 id="message-header"></h1>
            </div>
            <div class="dropdown-center" id="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{currentPartner}} {{ formatDate(currentDate) }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownCenterBtn">
                     <li v-for="(partner, i) in partnerList" :key="i"><button class="dropdown-item" type="button" @click="changeSurvey(partner)">{{partner['name']}} {{ formatDate(partner['date']) }}</button></li>
                </ul>
            </div>
        </div>
        <div class="form-container">
            <form>
                <div class="survey-container" v-for="(survey, i) in surveyList" :key="i">
                    <div class="for" v-for="(answer, j) in answerList" :key="j">
                        <div class="question-container" v-if="survey['question_type'] == '0' && answer['id_question'] == survey['id'] && answer['date'] == currentDate">
                            <label for="openQuestion" class="form-label">{{survey['question']}}</label>
                            <textarea type="form-control" class="form-control" id="comments" rows="3" disabled :placeholder="answer['answer']"></textarea>
                        </div>
                        <div class="question-container" v-if="survey['question_type'] == '1' && answer['id_question'] == survey['id'] && answer['date'] == currentDate">
                            <label for="closedQuestion" class="form-label">{{survey['question']}}</label><br>
                            <div class="answer-container">
                                <div v-for="(choice, j) in choicesList" :key="j" >
                                    <div  v-if="choice['id_question'] == survey['id']" class="form-check">
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault' + i" :id="'closedAnswer' + j" :value="choice['choice']" v-if="answer['answer'] == choice['choice']" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault' + i" :id="'closedAnswer' + j" :value="choice['choice']" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {{ choice['choice'] }} 
                                    </label> <br>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <div class="question-container" v-if=" survey['question_type'] == '2' && answer['id_question'] == survey['id'] && answer['date'] == currentDate">
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
                                    Nada Claro
                                    </label>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer1' + i" value="1" v-if="answer['answer'] == '1'" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer1' + i" value="1" v-else disabled>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer2' + i" value="2" v-if="answer['answer'] == '2'" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer2' + i" value="2" v-else disabled>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer3' + i" value="3" v-if="answer['answer'] == '3'" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer3' + i" value="3" v-else disabled>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer4' + i" value="4" v-if="answer['answer'] == '4'" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer4' + i" value="4" v-else disabled>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer5' + i" value="5" v-if="answer['answer'] == '5'" disabled checked>
                                    <input class="form-check-input" type="radio" :name="'flexRadioDefault2' + i" :id="'scaleAnswer5' + i" value="5" v-else disabled>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                    Muy Claro
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="for" v-for="(answerFile, j) in answerFileList" :key="j">
                        <div class="question-container" v-if=" survey['question_type'] == '3' && answerFile['id_question'] == survey['id'] && answerFile['date'] == currentDate">
                            <div class="file-container">
                                <label for="formFile" class="form-label">{{ survey['question'] }}</label>
                                <label class="form-check-label"> Descargar: </label>
                                <a class="file-link" :href="answerFile['file']" target="_blank"> {{formatFileName(answerFile['file'])}}</a>
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
    background-color: #A4B7E3;
    border-radius: 15px;
    padding: 1.5vh 8vw;
    max-width: 80vw;
    margin-top: 2vh;
    min-width: 80vw;
}
h1 {
    font-family: "Catamaran";
    font-weight: bold;
    color: white;
    text-align: center;
    font-size: 7vh;
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