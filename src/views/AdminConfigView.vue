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
                const input = document.getElementById('search-admin-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca al administrador.."

                subjectsTab.style.backgroundColor = "#D9EFF4";
                subjectsTab.style.color = "#7FA0A8";

                adminTab.style.backgroundColor = "#9EC7D1";
                adminTab.style.color = "white";

                adminsListT.style.display = "flex"
                subjectsListT.style.display = "none"

                title.textContent = "Administradores"

                this.changeTabC = "admin"

                //this.clickStudent(0);

            },
            toSubjectsTab() {
                const adminTab = document.getElementById("admin-tab") as HTMLInputElement;
                const subjectsTab = document.getElementById("subjects-tab") as HTMLInputElement;
                const input = document.getElementById('search-subject-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca la unidad de formación.."

                adminTab.style.backgroundColor = "#D9EFF4";
                adminTab.style.color = "#7FA0A8";

                subjectsTab.style.backgroundColor = "#9EC7D1";
                subjectsTab.style.color = "white";

                subjectsListT.style.display = "flex"
                adminsListT.style.display = "none"

                title.textContent = "Unidades de Formación"

                this.changeTabC = "subject"
                //this.clickTutor(0);

            },
            searchElements(){
                var input, td, temp, h1, i, j, filter,  txtValue;

                if(this.changeTabC == "admin"){
                    input = document.getElementById('search-admin-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-admin');
                    h1 = document.getElementsByClassName("filter-h1-admin");

                    
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
                    input = document.getElementById('search-subject-input') as HTMLInputElement;
                    filter = input.value.toUpperCase();
                    td = document.getElementsByClassName('table-data-subject');
                    h1 = document.getElementsByClassName("filter-h1-subject");

                    
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
                            <input type="text" id="search-admin-input" v-on:keyup="searchElements" placeholder="Busca al administrador..">
                        </thead>
                        <tbody class="style-2">
                            <tr class="table-data-admin">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-admin-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> Miau </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-admin">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-admin-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> Miu </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-admin">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-admin-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> Mio </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-admin">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-admin-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> MiaO </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-admin">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-admin-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> Miau </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="admin-btn-container">
                        <button class="table-button"> Crear administrador </button>
                        <button class="table-button delete"> Eliminar administrador </button>
                    </div>
                </div>
                <div class="table-scroll" id="subjects-list">
                    <table class="table table-bordered" id="table">
                        <thead>
                            <input type="text" id="search-subject-input" v-on:keyup="searchElements" placeholder="Busca la unidad de formación..">
                        </thead>
                        <tbody class="style-2">
                            <tr class="table-data-subject">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-subject-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-subject"> owo </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-subject">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-subject-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-subject"> owu </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                            <tr class="table-data-subject">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="form-subject-btn" >
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-subject"> uwo </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="subject-btn-container">
                        <button class="table-button"> Crear UF </button>
                        <button class="table-button delete"> Eliminar UF </button>
                    </div>
                </div>
                <button id="edit-survey-button"> Editar encuesta </button>
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

    #table-title-tab{
        font-size: 5vh;
        font-weight: bold;
        padding: 0 0 0 20vw;
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
        height: 3vw;
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
        display: flex;
        gap: 0vw;
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

    .form-check{
        width: 90%;
    }

    .form-check-input{
        background-color: transparent;
        border-color: #6F9492;
    }

    .form-check-input:checked{
        background-color: #6F9492;
        
    }

    .form-check-input:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #79a9a7;
        transition: all 0.3s ease 0s;
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
    #search-admin-input,
    #search-subject-input{
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
        background-size: 3%;
    }

    #search-input:active{
        border-style: hidden;
    }

    /* Buttons in table */

    .edit-btn{
        border-radius: 100%;
        background-position: center;
        background-color: #6F9492;
        background-image: url('src/assets/img/writing-white.png');
        background-repeat: no-repeat;
        background-size: 70%;
    }

    .admin-btn-container,
    .subject-btn-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .table-button{
        width: 12vw;
        margin: 2vh 0 0 0;
        color: white;
        background-color: #26408B;
        border-radius: 10px;
    }

    .delete{
        background-color: #F65E0B;
    }

    /* Pending sessions button */
    #edit-survey-button{
        font-size: 4vh;
        font-family: "Ubuntu";
        font-weight: normal;
        margin: 3vh 0 0 0;
        background-color: #6F9492;
        color: white;
        border-radius: 5px;
    }

</style>