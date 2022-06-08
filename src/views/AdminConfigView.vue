<script lang="ts">
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import axios from "axios";
    import NavBar from "../components/Navbar.vue";

    const api = 'http://localhost:8000/api/'

    export default defineComponent({
        components: {
            NavBar
        },
        data(){
            return{
                tab:"admin",
                selection:"",
                index: 0,
                subjectSwitch: 0,
                careerList: ["ITC", "IRS", "LTM", "LAD"],
                adminList: [],
                subjectList:
                [ {name: "Base de datos", id: "TC001", semester: "6", career:"ITC"},
                  {name: "Algoritmos avanzados", id: "TC002", semester: "3", career:"IRS"},
                  {name: "Internet de las cosas", id: "TC003", semester: "1", career:"LTM"},
                ],
                createAdminName: '',
                createAdminEmail: '',
                createAdminPassword: '',
                editAdminName: '',
                createAdminMat: ''
            }

        },
        mounted() {
            this.getAdminNames()
            
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
            },
            updateIndex:{
                get(){
                    return this.index;
                },
                set(val){
                    this.subjectList = val;
                }
            }
        },
        methods: {
            async getAdminNames() {
                await axios
                .get(api + 'admins/')
                .then(result => {
                    this.adminList = result.data
                    console.log(this.adminList)
                })

                const admin = document.getElementById("admin-radio") as HTMLInputElement;
                const subject = document.getElementById("subject-radio") as HTMLInputElement;
                admin.checked = true;
                subject.checked = true;
                this.selection = this.adminList[0];
            },

            toAdminTab() {
                this.selection = this.adminList[0];
                const adminTab = document.getElementById("admin-tab") as HTMLInputElement;
                const subjectsTab = document.getElementById("subjects-tab") as HTMLInputElement;
                const input = document.getElementById('search-admin-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca al administrador.."

                subjectsTab.style.backgroundColor = "#E1F0EA";
                subjectsTab.style.color = "#6F9492";

                adminTab.style.backgroundColor = "#9FD5D2";
                adminTab.style.color = "white";

                adminsListT.style.display = "flex"
                subjectsListT.style.display = "none"

                title.textContent = "Administradores"

                this.changeTabC = "admin"

            },
            toSubjectsTab() {
                this.selection = this.subjectList[0].name;
                const adminTab = document.getElementById("admin-tab") as HTMLInputElement;
                const subjectsTab = document.getElementById("subjects-tab") as HTMLInputElement;
                const input = document.getElementById('search-subject-input') as HTMLInputElement;
                const adminsListT = document.getElementById('admin-list') as HTMLInputElement;
                const subjectsListT = document.getElementById('subjects-list') as HTMLInputElement;
                const title = document.getElementById('table-title-tab') as HTMLInputElement;

                input.placeholder = "Busca la unidad de formación.."

                adminTab.style.backgroundColor = "#E1F0EA";
                adminTab.style.color = "#6F9492";

                subjectsTab.style.backgroundColor = "#9FD5D2";
                subjectsTab.style.color = "white";

                subjectsListT.style.display = "flex"
                adminsListT.style.display = "none"

                title.textContent = "Unidades de Formación"

                this.changeTabC = "subject"
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
            },
            deleteItem() {
                const list = document.getElementsByClassName('subject-list');
                if (this.changeTabC == "admin"){
                    const list = document.getElementsByClassName('admin-list');
                    this.adminList.splice(this.updateIndex,1);
                }
                else {
                    this.adminList.splice(this.updateIndex,1);
                }
            },
            assignDelete(i: number) {
                console.log(i)
                this.index = i;
                const list = document.getElementsByClassName('subject-list');
                if (this.changeTabC == "admin"){
                    const list = document.getElementsByClassName('admin-list');
                    list[i].checked = true;
                    this.selection = this.adminList[i].id__first_name;
                }
                else {
                    this.selection = this.subjectList[i].name;
                    list[i].checked = true;
                }
            },
            editAdmin() {
                const input = document.getElementById('admin-name') as HTMLInputElement;
                this.adminList[this.updateIndex] = input.value;
            },
            createAdmin() {
                //const input = document.getElementById('admin-new-name') as HTMLInputElement;
                const list = document.getElementsByClassName('form-control');

                axios
                .post(api + 'users/', {
                    username: this.createAdminMat,
                    password: this.createAdminPassword,
                    email: this.createAdminEmail,
                    first_name: this.createAdminName
                })
                .then(result => {
                    const userNumId = result.data.id
                    axios
                    .post(api + "pae_users/", {
                        id: userNumId,
                        semester: 0,
                        career: 'ITC',
                        user_type: 2,
                        status: 0
                    })
                    .then(result => {
                        console.log(result.data);
                        localStorage.setItem("displayToast", "signupStudent");
                        this.$forceUpdate()
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    console.log(error)
                })
                //this.adminList.push(input.value)
                for(let i = 0; i < list.length; i++){
                    list[i].value = ""
                }
            },
            saveSubject() {
                const name = document.getElementById('subject-new-name') as HTMLInputElement;
                const id = document.getElementById('subject-id') as HTMLInputElement;
                const semester = document.getElementById('subject-new-semester') as HTMLInputElement;
                const career = document.getElementById('subject-new-career') as HTMLInputElement;
                const list = document.getElementsByClassName('form-control');
                if (this.subjectSwitch == 1) {
                    this.subjectList[this.updateIndex].name = name.value
                    this.subjectList[this.updateIndex].semester = semester.value
                    this.subjectList[this.updateIndex].career = career.value
                }
                else {
                    this.subjectList.push({name: name.value, id: id.value, semester: semester.value, career: career.value})
                }
            },
            setSubjectModal(index: number) {
                const id = document.getElementById('subject-id') as HTMLInputElement;
                const name = document.getElementById('subject-new-name') as HTMLInputElement;
                const semester = document.getElementById('subject-new-semester') as HTMLInputElement;
                const career = document.getElementById('subject-new-career') as HTMLInputElement;
                const list = document.getElementsByClassName('form-control');
                if (index == 0){
                    this.subjectSwitch = 1;
                    id.disabled = true
                    id.value = this.subjectList[this.updateIndex].id
                    name.value = this.subjectList[this.updateIndex].name
                    semester.value = this.subjectList[this.updateIndex].semester
                    career.value = this.subjectList[this.updateIndex].career
                }
                else {
                    this.subjectSwitch = 0;
                    id.disabled = false
                    for(let i = 0; i < list.length; i++){
                        list[i].value = ""
                    }
                    semester.value = "1"
                    career.value = this.careerList[0]
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
                            <tr class="table-data-admin" v-for="(admin, i) in adminList" :key="i">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input admin-list" type="radio" name="form-admin-btn" id="admin-radio" @click="assignDelete(i)">
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> {{admin.id__first_name}} </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#name-modal" @click="assignDelete(i)"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="admin-btn-container">
                        <button class="table-button" data-bs-toggle="modal" data-bs-target="#create-admin-modal"> Crear administrador </button>
                        <button class="table-button delete" data-bs-toggle="modal" data-bs-target="#delete-modal"> Eliminar administrador </button>
                    </div>
                </div>
                <div class="table-scroll" id="subjects-list">
                    <table class="table table-bordered" id="table">
                        <thead>
                            <input type="text" id="search-subject-input" v-on:keyup="searchElements" placeholder="Busca la unidad de formación..">
                        </thead>
                        <tbody class="style-2">
                            <tr class="table-data-subject" v-for="(subject, i) in subjectList" :key="i">
                                <td> 
                                    <div class="form-check">
                                        <input class="form-check-input subject-list" type="radio" name="form-subject-btn" id="subject-radio" @click="assignDelete(i)">
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-subject"> {{subject.name}} </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#subject-modal" @click="assignDelete(i) , setSubjectModal(0)"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="subject-btn-container">
                        <button class="table-button" data-bs-toggle="modal" data-bs-target="#subject-modal" @click="setSubjectModal(1)"> Crear UF </button>
                        <button class="table-button delete" data-bs-toggle="modal" data-bs-target="#delete-modal"> Eliminar UF </button>
                    </div>
                </div>
                <button id="edit-survey-button"> Editar encuesta </button>
            </div>
        </div>
        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="delete-modal-content">
                    <h1 class="h1-modal"> Eliminar: </h1>
                    <h1 class="user-h1-modal"> {{selection.id__first_name}} </h1>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn"> No, regresar </button>
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="delete-action-btn" @click="deleteItem"> Si, eliminar </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="name-modal" tabindex="-1" aria-labelledby="nameModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="name-modal-content">
                    <h1 class="h2-modal"> Nombre: </h1>
                    <input type="text" class="form-control" id="admin-name" :value="selection" minlength="1" maxlength="100" required>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn-blue"> Cancelar</button>
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="save-action-btn" @click="editAdmin"> Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="create-admin-modal" tabindex="-1" aria-labelledby="createAdminModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="create-admin-modal-content">
                    <h1 class="h2-modal"> Nombre </h1>
                    <input type="text" class="form-control" id="admin-new-name" v-model="createAdminName" placeholder="Nombre Apellido" minlength="1" maxlength="100" required>
                    <h1 class="h2-modal"> Matrícula o nómina </h1>
                    <input type="text" class="form-control" id="admin-new-name" v-model="createAdminMat" placeholder="A0XXXXXXX" minlength="1" maxlength="10" required>
                    <h1 class="h2-modal"> Correo </h1>
                    <input type="email" class="form-control" id="admin-email" v-model="createAdminEmail" placeholder="A0XXXXXXX@correo.com" minlength="1" maxlength="100" required>
                    <h1 class="h2-modal"> Contraseña </h1>
                    <input type="password" class="form-control" id="admin-password" v-model="createAdminPassword" placeholder="Contraseña" minlength="1" maxlength="100" required>
                    <div class="modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn-blue"> Cancelar</button>
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="save-action-btn" @click="createAdmin"> Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="subject-modal" tabindex="-1" aria-labelledby="createsubjectModal" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content" id="subject-modal-content">
                        <h1 class="h2-modal"> Nombre</h1>
                        <input type="text" class="form-control" id="subject-new-name" placeholder="Nombre De Materia" minlength="1" maxlength="100" required>
                        <h1 class="h2-modal"> Clave</h1>
                        <input type="text" class="form-control" id="subject-id" placeholder="TC1003B"  minlength="1" maxlength="100" required>
                        <h1 class="h2-modal"> Semestre</h1>
                        <div class="input-group">
                            <select class="form-select" id="subject-new-semester" required>
                                <option value="1">1º</option>
                                <option value="2">2º</option>
                                <option value="3">3º</option>
                                <option value="4">4º</option>
                                <option value="5">5º</option>
                                <option value="6">6º</option>
                                <option value="7">7º</option>
                                <option value="8">8º</option>
                                <option value="9">9º</option>
                            </select>
                        </div>
                        <h1 class="h2-modal"> Carrera</h1>
                        <div class="input-group">
                            <select class="form-select" id="subject-new-career" required>
                                <option v-for="(career, i) in careerList" :key="i" :value="career">{{ career }}</option>
                            </select>
                        </div>
                        <div class="modal-button-container">
                            <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn-blue"> Cancelar</button>
                            <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="save-action-btn" @click="saveSubject"> Guardar</button>
                        </div>
                    </div>
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

    #admin-tab{
        border-radius: 8px 8px 0 0;
        background-color: #9FD5D2;
        color: white;
    }

    #subjects-tab{
        border-radius: 8px 8px 0 0;
        background-color: #E1F0EA;
        color: #6F9492;
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
    /* Text boxes and dropdowns */
    .form-control, .form-select {
        font-family: "Catamaran";
        font-weight: normal;
        font-size: 2.5vh;
        padding: 0.25vh 0vw 0 0.5vw;
        border-color: black;
        border-width: 0.25vh;
        border-radius: 0.65vh;
        height: 6.5vh;
        width: 30vw;
        padding: 0 0vw 0 0.5vw;
        margin: 0 0vw 0 0vw;
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
        border-radius: 15px;
        padding: 1vh 3vw;
    }

    /* Modal */
    
    .modal-content{
        gap: 1.5vh;
        padding: 4vh 2.5vw;
        background-color: #E1F0EA;
        border-radius: 10px;
        border-color: #96BECC;
    }
    #delete-modal-content {
        align-items: center;
    }
    #name-modal-content {
        align-items: left;
    }

    .modal-lg{
        width: 35vw;
    }

    .h1-modal,
    .user-h1-modal{
        font-size: 4.5vh;
        margin: 0 0 1.5vh 0;
    }
    .h2-modal {
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 2.5vh;
        margin: 0;
        color: #26408B;
    }

    .user-h1-modal{
        font-weight: bold;
        color: #57716F;
    }

    .modal-button-container{
        width: 30vw;
        display: flex;
        justify-content: space-around;
        margin-top: 2vh;
    }

    .option-button{
        font-family: "Ubuntu";
        font-weight: normal;
        font-size: 2.6vh;
        color: white;
        border-radius: 8px;
        width: 12vw;
        padding: 1vh 1.5vw;
    }

    #cancel-action-btn{
        background-color: #96CCC9;
    }

    #delete-action-btn{
        background-color: #F65E0B;
    }
    #cancel-action-btn-blue{
        background-color: #9EB2ED;
    }

    #save-action-btn{
        background-color: #365295;
    }

</style>