<script lang="ts">
import { defineComponent } from 'vue'
import TutorCard from "../components/items/Tutor-Card.vue"
import NavBar from "../components/Navbar.vue"


export default defineComponent({
    data() {
        return{
            subjectList: [
                {tutorName: "Daniela Hernandez", semester: "1", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "2", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "3", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "4", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "5", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "6", career: "ITC"},
                {tutorName: "Daniela Hernandez", semester: "7", career: "ITC"}
            ],
            firstHalf:  [
                            {tutorName: "Nombre Apellido", semester: "#", career: "AAA"},
                            {tutorName: "Nombre Apellido", semester: "#", career: "AAA"}
                        ],
            secondHalf: [
                            {tutorName: "Nombre Apellido", semester: "#", career: "AAA"},
                            {tutorName: "Nombre Apellido", semester: "#", career: "AAA"}
                        ],
        }
        //<SessionCard v-for="(subject, i) in subjectList" :key="i" :class-name="subject.className" :date="subject.date" :place="subject.place" :tutor-name="subject.tutorName" :tutor-id="subject.tutorId" :student-name="subject.studentName" :student-id="subject.studentId" ></SessionCard>

    },
    methods: {
        defineHalves(half: number){
            this.firstHalf = this.subjectList.slice(0, half);
            if ((this.subjectList.length%2)==0){
                this.secondHalf = this.subjectList.slice(-half);

            }
            else{
                this.secondHalf = this.subjectList.slice(1-half);

            }
        }
    },
    components: {
        TutorCard,
        NavBar
    },
    mounted() {
        const half = Math.round(this.subjectList.length/2);
        this.defineHalves(half);
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
                    <TutorCard  v-if="i+1==n" :semester="subject.semester" :career="subject.career" :tutor-name="subject.tutorName"></TutorCard>
                </div>
            </div>
            <div class="col" id="right">
                <div class="card-container" id="right" v-for="(subject, j) in secondHalf" :key="j">
                    <TutorCard v-if="j+1==n" :semester="subject.semester" :career="subject.career" :tutor-name="subject.tutorName">></TutorCard>
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
