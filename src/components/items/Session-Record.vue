<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return{
            sessionList: this.sessionL
        }
    },
    mounted(){
        console.log(this.sessionL)
    },
    updated(){
        this,this.updateSessionL = this.sessionL;
    },
    props: {
        tutorStudentSwitch: {
            type: String,
            default: "Tutor"
        },
        sessionL: {
            type: Array,
            default: []
        }
    },
    computed: {
        updateSessionL:{
            get(){
                return this.sessionList;
            },
            set(val){
                this.sessionList = val; 
            }
        }
    }, 

    methods: {
        formatDate(date) {
            const dateF = new Date(date).toLocaleString()
            return dateF.slice(0, -3) 
        },

        formatStatus(status) {
            if(status == 0) {
                return 'Pendiente'
            } else if(status == 1) {
                return 'Confirmada'
            } else if(status == 2) {
                return 'Cancelada'
            } else {
                return 'Completada'
            }
        }
    }
})
</script>

<template>
    <div class="container-record">
        <h3>Historial de asesorías</h3>
            <div class="table-container">
                 <table class="table">
                    <thead>
                        <tr>
                            <th id="cornerTL"><h1>{{tutorStudentSwitch}}</h1></th>
                            <th><h1>Materia</h1></th>
                            <th><h1>Fecha</h1></th>
                            <th id="cornerTR"><h1>Estatus</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(session, i) in sessionList" :key="i">
                            <td v-if="tutorStudentSwitch == 'Estudiante'"><h2>{{ session.id_student__id__first_name }}</h2></td>
                            <td v-else><h2>{{ session.id_tutor__id__first_name }}</h2></td>
                            <td><h2>{{ session.id_subject__name }}</h2></td>
                            <td><h2>{{ formatDate(session.date) }}</h2></td>
                            <td><h2>{{ formatStatus(session.status) }}</h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
</template>

<style scoped>
.container{
    padding: 0;
}
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
    font-size: 4.5vh;
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
