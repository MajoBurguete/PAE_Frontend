<script lang="ts">
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import axios from "axios";
    import NavBar from "../components/Navbar.vue";
    import ScheduleItem from "../components/items/Schedule-Item.vue";

    const api = 'http://localhost:8000/api/'

    export default defineComponent({
        components: {
            NavBar
        },
        mounted(){

        },
        data(){
            return{
                tab:"admin",
                adminList: [],
                subjectList:[]
            }

        },
        computed: {
            changeTabC:  {
                get(){
                    return this.tab;
                },
                set(val){
                    this.tab = val;
                }
            },
            updateAdminList: {
                get(){
                    return this.adminList;
                },
                set(val){
                    this.adminList = val;
                }
            },
            updateSubjectList:{
                get(){
                    return this.subjectList;
                },
                set(val){
                    this.subjectList = val;
                }
            }
        },
        methods: {
            toAdminTab() {
                const adminTab = document.getElementById("admin-tab") as HTMLInputElement;
                const subjectsTab = document.getElementById("subjects-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca al administrador.."

                subjectsTab.style.backgroundColor = "#D9EFF4";
                subjectsTab.style.color = "#7FA0A8";

                adminTab.style.backgroundColor = "#9EC7D1";
                adminTab.style.color = "white";

                adminsListT.style.display = "initial"
                subjectsListT.style.display = "none"

                title.textContent = "Administradores"

                this.changeTabC = "admin"

                //this.clickStudent(0);

            },
            toSubjectsTab() {
                const adminTab = document.getElementById("admin-tab") as HTMLInputElement;
                const subjectsTab = document.getElementById("subjects-tab") as HTMLInputElement;
                const input = document.getElementById('search-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca la unidad de formación.."

                adminTab.style.backgroundColor = "#D9EFF4";
                adminTab.style.color = "#7FA0A8";

                subjectsTab.style.backgroundColor = "#9EC7D1";
                subjectsTab.style.color = "white";

                subjectsListT.style.display = "initial"
                adminsListT.style.display = "none"

                title.textContent = "Unidades de Formación"

                this.changeTabC = "subject"
                //this.clickTutor(0);

            },
            searchElements(){
                var input, td, temp, h1, i, j, filter,  txtValue;

                if(this.changeTabC == "tutor"){
                    input = document.getElementById('search-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-tutor');
                    h1 = document.getElementsByClassName("filter-h1-tutor");

                    
                    for(i = 0; i < h1.length; i++){
                        txtValue = h1[i].textContent || h1[i].innerText;
                        if(txtValue.toUpperCase().indexOf(filter) > -1 ){
                            td[i].style.display= "";
                        }
                        else {
                            td[i].style.display = "none";
                        }
                    }
                }
                else{
                    input = document.getElementById('search-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-student');
                    h1 = document.getElementsByClassName("filter-h1-student");

                    
                    for(i = 0; i < h1.length; i++){
                        txtValue = h1[i].textContent || h1[i].innerText;
                        if(txtValue.toUpperCase().indexOf(filter) > -1 ){
                            td[i].style.display= "";
                        }
                        else {
                            td[i].style.display = "none";
                        }
                    }
                }
            }
        }
    })
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <body>
        <h1 id="table-title-tab"> Administradores </h1>
        <div class="page-container">
            <div class="subject-admin-table">
                <div class="tabs-search-input">
                    <div class="table-tabs">
                        <button id="admin-tab" @click="toAdminTab"> Administradores </button>
                        <button id="subjects-tab" @click="toSubjectsTab"> UF </button>
                    </div>
                </div>
                <div class="table-scroll" id="admin-list">
                    <table class="table table-bordered" id="table">
                        <thead>
                            <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca al administrador..">
                        </thead>
                        <tbody class="style-2">
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-admin"> Miau </h2>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-admin"> Miau </h2>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-admin"> Miau </h2>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-admin"> Miau </h2>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-admin"> Miau </h2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="admin-btn-container">
                        <button> Crear administrador </button>
                        <button> Eliminar administrador </button>
                    </div>
                </div>
                <div class="table-scroll" id="subjects-list">
                    <table class="table table-bordered" id="table">
                        <thead>
                            <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca la unidad de formación..">
                        </thead>
                        <tbody class="style-2">
                            <tr>
                                <td> 
                                    <h2 class="filter-h1-subject"> owo </h2>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id="pending-session"> Asesorías pendientes </button>
            </div>
        </div>
    </body>
</template>

<style scoped>

    body{
        margin: 9vh 0 0 0 ;
        width: 100vw;
        align-content: center;
    }

    h1{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 2.5vh;
        margin: 0;
        text-align: start;
    }

    h2{
        font-family: "Montserrat";
        font-weight: 50;
        font-size: 2.5vh;
        margin: 0;
        text-align: center;
        color: #6F9492;
    }

    button{
        font-size: 2.5vh;
        padding: 0.3vh 1vw 0.2vh 1vw;
        font-family: "Montserrat";
        font-weight: medium;
        border: transparent;
        background-color: #D9EFF4;
        color: #7FA0A8;
    }

    .page-container{
        padding: 2vh 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table-tabs{
        align-items: center;
        justify-content: center;
        display: flex;
    }

    /* Student and tutor table container */

    .subject-admin-table{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tabs-search-input{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0 2vw 0 0;
    }

    #subjects-tab{
        border-radius: 8px 8px 0 0;
    }

    #admin-tab{
        border-radius: 8px 8px 0 0;
        background-color: #9EC7D1;
        color: white;
    }

    #subjects-list{
        display: none;
    }
    
    /* Table style */

    .table-scroll{
        width: 60vw;
        border: 2px solid #C2E7D9;
        border-radius: 10px;
        background-color: #E1F0EA;
        display: flex;
    }

    table {
        border-style: hidden;
        color: transparent;
        width: 40vw;
        margin: 0;
    }

    thead {
        height: 4vw;
    }

    tbody { 
        box-shadow: 0px 0px 0px 1.5px #C2E7D9;
        border-radius: 0 0 0px 10px;
        display: block;
        border-style: hidden;
        border-color: transparent;
        border-bottom: 10px;
        height: 40vh;     
        overflow-y: auto;  
        overflow-x: hidden;  
    }

    td {
        width: 40vw;
    }

    tr {
        min-width: 100%;
        border: 2px solid #C2E7D9;
        border-inline-end: 0;
        border-inline-start: 0;
    }

    tr:first-child{
        border-top: 0;
    }

    tr:last-child {
        border-bottom: 0;
    }

    .admin-btn-container {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }

    /* Scrollbar styles */

    .style-2::-webkit-scrollbar-track
    {
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    .style-2::-webkit-scrollbar
    {
        width: 12px;
        background-color: #F5F5F5;
    }

    .style-2::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #6F9492;
    }
    
    /* Search bar */
    #search-input{
        font-family: "Montserrat";
        font-weight: medium;
        border-radius: 8px;
        border-style: hidden;
        width: 35vw;
        margin: 0.8vh 0 0 0.8vw;
        padding: 0.3vh 4vh;
        background-image: url('src/assets/img/search.png');
        background-position: 0.4vw 0.5vh; /* Position the search icon */
        background-repeat: no-repeat; /* Do not repeat the icon image */
        background-size: 7%;
    }

    #search-input:active{
        border-style: hidden;
    }

</style>