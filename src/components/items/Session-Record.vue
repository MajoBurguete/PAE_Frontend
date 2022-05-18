<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return{
            subjectList: [
                {name: "Maria jose Burguete", date: "17 mayo", time: "20:00"},
                {name: "Majo Burguete", date: "17 mayo", time: "20:00"},
                {name: "Majo Burguete", date: "17 mayo", time: "20:00"},
                {name: "Majo Burguete", date: "17 mayo", time: "20:00"},
            ]
        }
    },
    props: {
        tutorStudentSwitch: {
            type: String,
            default: "Estudiante"
        }
    },
})
</script>

<template>
    <div class="container">
        <h3>Historial de asesorías</h3>
            <div class="table-container">
                 <table class="table">
                    <thead>
                        <tr>
                            <th id="cornerTL"><h1>{{tutorStudentSwitch}}</h1></th>
                            <th><h1>Fecha</h1></th>
                            <th id="cornerTR"><h1>Hora</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(subject, i) in subjectList" :key="i">
                            <td><h2>{{ subject.name }}</h2></td>
                            <td><h2>{{ subject.date }}</h2></td>
                            <td><h2>{{ subject.time }}</h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
</template>

<style scoped>

.table-container{
    padding: 0;
    margin: 0;
    border-radius: 10px;
    border-style:solid;
    border-color: #C6E1D7;
}
table{
    border-style: hidden;
    border-radius: 10px;
    font-family: "Montserrat";
    align-content: center;
    margin: 0;

}
thead{
    font-weight: bold;
    border-top-left-radius: 10px;
    background-color: #E1F0EA;
}
tbody { 
    border-style: solid;
    color: #C6E1D7;
    border-bottom: 10px; 
}
th{
}
h1{
    text-align: center;
    font-size: 3vh;
    font-weight: bold;
    color: #6F9492;
}
h2{
    text-align: center;
    font-size: 3vh;
    font-weight: medium;
    color: #6F9492;
}
h3{
    font-size: 4vh;
    font-weight: bold;
    color: #57716F;
    padding-bottom: 1.5vh;
}
#cornerTR{
    border-top-right-radius: 10px;
}
#cornerTL{
    border-top-left-radius: 10px;
}
</style>
