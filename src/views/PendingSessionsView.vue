<script lang="ts">
import { defineComponent } from 'vue'
import SessionCard from "../components/items/Session-Card.vue"

export default defineComponent({
    data() {
        return{
            subjectList: [
                {className: "Base de datos y otras cosas 1", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                {className: "Programacion Competitiva 2", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                {className: "Computacion para dummies 3", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                {className: "biologia Computacional 4", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                {className: "biologia Computacional 5", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
            ],
            firstHalf: [{className: "Base de datos 1", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                        {className: "Base de datos 1", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                        ],
            secondHalf: [{className: "Base de datos 1", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                        {className: "Base de datos 1", tutorName: "Daniela Hernandez", tutorId: "A01732313@tec.mx", studentName: "Majo Burguete", studentId: "A01732313@tec.mx", date: "17 de mayo 20:00", place: "el parque"},
                        ]
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
        SessionCard
    },
    mounted() {
        const half = Math.round(this.subjectList.length/2);
        this.defineHalves(half);
    }
})
</script>

<template>
    <div class="sessions-container">
        <div class="row" v-for="n in Math.round(subjectList.length/2)" :key="n">
            <div class="col" >
                <div class="card-container" id="left" v-for="(subject, i) in firstHalf" :key="i" >
                    <SessionCard  v-if="i+1==n" :class-name="subject.className" :date="subject.date" :place="subject.place" :tutor-name="subject.tutorName" :tutor-id="subject.tutorId" :student-name="subject.studentName" :student-id="subject.studentId"></SessionCard>
                </div>
            </div>
            <div class="col" id="right">
                <div class="card-container" id="right" v-for="(subject, j) in secondHalf" :key="j">
                    <SessionCard v-if="j+1==n" :class-name="subject.className" :date="subject.date" :place="subject.place" :tutor-name="subject.tutorName" :tutor-id="subject.tutorId" :student-name="subject.studentName" :student-id="subject.studentId"></SessionCard>
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
