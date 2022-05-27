<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import TutorCard from "../components/items/Tutor-Card.vue"

const api = 'http://localhost:8000/api/'

export default defineComponent({
    data() {
        return{
            tutorsList: [],
            firstHalf:  [],
            secondHalf: [],
        }
    },
    methods: {
        defineHalves(half: number){
            if (this.tutorsList.length <= 1){
                this.firstHalf = this.tutorsList
            }
            else {
                this.firstHalf = this.tutorsList.slice(0, half);
                if ((this.tutorsList.length%2)==0){
                    this.secondHalf = this.tutorsList.slice(-half);
                }
                else{
                    this.secondHalf = this.tutorsList.slice(1-half);
                }
            }
        },

        async getTutors() {
            await axios
            .get(api + 'pending_tutors/')
            .then(result => {
                this.tutorsList = result.data
            })
            .catch(error => {
                console.log(error)
            })

            const half = Math.round(this.tutorsList.length/2);
            this.defineHalves(half);
        },
    },
    components: {
        TutorCard
    },
    mounted() {
        this.getTutors()
    }
})
</script>

<template>
    <div class="sessions-container">
        <div class="row" v-for="n in Math.round(tutorsList.length/2)" :key="n">
            <div class="col" >
                <div class="card-container" id="left" v-for="(tutor, i) in firstHalf" :key="i" >
                    <TutorCard  v-if="i+1==n" :semester="tutor.semester" :career="tutor.career" :tutor-name="tutor.id__first_name"></TutorCard>
                </div>
            </div>
            <div class="col" id="right">
                <div class="card-container" id="right" v-for="(tutor, j) in secondHalf" :key="j">
                    <TutorCard v-if="j+1==n" :semester="tutor.semester" :career="tutor.career" :tutor-name="tutor.id__first_name">></TutorCard>
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
