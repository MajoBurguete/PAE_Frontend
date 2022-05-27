<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import SessionCard from "../components/items/Session-Card.vue"
import NavBar from "../components/NavBar.vue"


const api = 'http://localhost:8000/api/'

export default defineComponent({
    data() {
        return{
            subjectList: [],
            firstHalf: [],
            secondHalf: []
        }
    },
    methods: {
        defineHalves(half: number) {
            if (this.subjectList.length <= 1){
                this.firstHalf = this.subjectList
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
        }
    },
    components: {
        SessionCard,
        NavBar
    },
    mounted() {
        this.getSessions()
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <div class="sessions-container">
        <div class="row" v-for="n in Math.round(subjectList.length/2)" :key="n">
            <div class="col" >
                <div class="card-container" id="left" v-for="(subject, i) in firstHalf" :key="i" >
                    <SessionCard  v-if="i+1==n" :class-name="subject.id_subject__name" :date="formatDate(subject.date)" :place="defineSpot(subject.spot)" :tutor-name="subject.id_tutor__id__first_name" :tutor-id="subject.id_tutor__id__email" :student-name="subject.id_student__id__first_name" :student-id="subject.id_student__id__email"></SessionCard>
                </div>
            </div>
            <div class="col" id="right">
                <div class="card-container" id="right" v-for="(subject, j) in secondHalf" :key="j">
                    <SessionCard v-if="j+1==n" :class-name="subject.id_subject__name" :date="formatDate(subject.date)" :place="defineSpot(subject.spot)" :tutor-name="subject.id_tutor__id__first_name" :tutor-id="subject.id_tutor__id__email" :student-name="subject.id_student__id__first_name" :student-id="subject.id_student__id__email"></SessionCard>
                </div>
            </div>
        </div>
    </div>
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

</style>
