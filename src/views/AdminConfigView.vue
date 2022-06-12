<script lang="ts">
    import { defineComponent, ref } from "vue";
    import router from "../router"
    import axios from "axios";
    import NavBar from "../components/Navbar.vue";


    const api = 'http://localhost:8000/api/'
    let dsbS = true;
    let dsbA = true;

    export default defineComponent({
        components: {
            NavBar
        },
        data(){
            return{
                subjectDisabled: true,
                adminDisabled: true,
                tab:"admin",
                selection:"",
                index: 0,
                disableDeleteAdminBtn: false,
                subjectSwitch: 0,
                adminSwitch: 0,
                careerList: [],
                adminList: [],
                subjectList: [],
                AdminName: '',
                AdminEmail: '',
                AdminPassword: '',
                AdminMat: '',
                subjectName: '',
                subjectID: '',
                subjectSemester: '',
                subjectCareer: ''
            }

        },
        mounted() {
            this.getAdminNames()
            this.getSubjectNames()
            this.getCareers()
        },
         updated(){
            const formS = document.querySelectorAll('.subject-needs-validation');
            const formA = document.querySelectorAll('.admin-needs-validation');

            // Loop over them and prevent submission
            Array.prototype.slice.call(formS)
            .forEach(function (form) {
                if ((form.subject_name.checkValidity() && form.subject_id.checkValidity() && form.subject_semester.checkValidity() && form.subject_career.checkValidity())) {
                    dsbS = false
                }
                else {
                    dsbS = true
                }
                form.classList.add('was-validated')
            })
            Array.prototype.slice.call(formA)
            .forEach(function (form) {
                if ((form.admin_name.checkValidity() && form.admin_id.checkValidity() && form.admin_password.checkValidity() && form.admin_email.checkValidity())) {
                    dsbA = false
                }
                else {
                    dsbA = true
                }
                form.classList.add('was-validated')
            })

            this.updateSubjectDisabled = dsbS;
            this.updateAdminDisabled = dsbA;
        },
        computed: {
            updateSubjectDisabled: {
                get() {
                    return this.subjectDisabled;
                },
                set(val) {
                    this.subjectDisabled = val;
                }
            },
            updateAdminDisabled: {
                get() {
                    return this.adminDisabled;
                },
                set(val) {
                    this.adminDisabled = val;
                }
            },
            updateDeleteAdminBtn: {
                get() {
                    return this.disableDeleteAdminBtn;
                },
                set(val) {
                    this.disableDeleteAdminBtn = val;
                }
            },
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
            updateCareerList: {
                get() {
                    return this.careerList;
                },
                set(val) {
                    this.careerList = val;
                }
            },
            updateSelection: {
                get() {
                    return this.selection;
                },
                set(val) {
                    this.selection = val;
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
            showPassword(passwordID: string, imageID: string){
                const password = document.getElementById(passwordID) as HTMLInputElement;
                const eye = document.getElementById(imageID) as HTMLImageElement;
                if (password.type == "password") {
                    password.type = "text";
                    eye.src = "src/assets/img/no-visibility.png";
                } else {
                    password.type = "password";
                    eye.src = "src/assets/img/visibility.png";
                }
            },
            async getAdminNames() {
                const button = document.getElementById("admin-delete-btn") as HTMLInputElement;
                await axios
                .get(api + 'admins/')
                .then(result => {
                    this.adminList = result.data
                    console.log(this.adminList)
                })

                if(this.adminList.length < 2) {
                    this.disableDeleteAdminBtn = true
                    button.style.opacity = "0.6"

                }
                else {
                    this.disableDeleteAdminBtn = false
                    button.style.opacity = "1"
                }
                const admin = document.getElementById("admin-radio") as HTMLInputElement;
                admin.checked = true;
                this.assignDelete(0)
            },

            async getSubjectNames() {
                await axios
                    .get(api + 'subjects/')
                    .then(result => {
                        this.subjectList = result.data
                        console.log(this.subjectList)
                    })

                const subject = document.getElementById("subject-radio") as HTMLInputElement;
                subject.checked = true;
                this.assignDelete(0)
            },

            async getCareers() {
                await axios
                    .get(api + 'careers/')
                    .then(result => {
                        this.careerList = result.data
                        console.log(this.careerList)
                    })
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
                this.assignDelete(0)

            },
            toSubjectsTab() {
                this.selection = this.subjectList[0];
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
                this.assignDelete(0)
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
            async deleteItem() {
                if (this.changeTabC == "admin"){
                    await axios
                    .delete(api + "users/" + this.adminList[this.index].id)
                    .then(result => {
                        console.log(result.data)
                        if (this.adminList[this.index].id == localStorage.getItem("userID")) {
                            router.push("/")
                        }
                        else {
                            this.getAdminNames()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else {
                    await axios
                        .delete(api + "subjects/" + this.subjectList[this.index].id)
                        .then(result => {
                            console.log(result.data)
                            this.getSubjectNames()
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            },
            assignDelete(i: number) {
                this.index = i;
                const list = document.getElementsByClassName('subject-list');
                if (this.changeTabC == "admin"){
                    const list = document.getElementsByClassName('admin-list');
                    list[i].checked = true;
                    this.selection = this.adminList[i];
                }
                else {
                    list[i].checked = true;
                    this.selection = this.subjectList[i];
                }
                this.clearInputs()
            },
            async editAdmin() {
                const item = this.adminList[this.index]
                var info = {
                    'first_name': this.AdminName,
                    'email': item.id__email,
                    'password': item.id__password,
                    'username': item.id__username
                }
                await axios
                .put(api + "users/" + item.id + "/", info)
                .then(result => {
                    console.log(result.data)
                    this.AdminName = ''
                    this.$forceUpdate()
                    this.getAdminNames()
                })
                .catch(error => {
                    console.log(error)
                })
            },
            async saveAdmin() {
                console.log(this.adminSwitch)
                const input = document.getElementById('admin_name') as HTMLInputElement;
                if(this.adminSwitch == 1 && input.value != ""){
                    console.log("Jajajaja")
                    this.editAdmin()
                }
                else {
                    console.log("me estoy creando")
                    await axios
                    .post(api + 'users/', {
                        username: this.AdminMat,
                        password: this.AdminPassword,
                        email: this.AdminEmail,
                        first_name: this.AdminName
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
                            this.$forceUpdate()
                            this.getAdminNames()
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                this.clearInputs()
                //const input = document.getElementById('admin-new-name') as HTMLInputElement;

            },
            async saveSubject() {
                const name = document.getElementById('subject_name') as HTMLInputElement;
                const id = document.getElementById('subject_id') as HTMLInputElement;
                const semester = document.getElementById('subject_semester') as HTMLInputElement;
                const career = document.getElementById('subject_career') as HTMLInputElement;
                const list = document.getElementsByClassName('form-control');
                let subjectCareerList = []
                var info = {
                    'id': this.selection.id,
                    'name': this.subjectName,
                    'id_career': subjectCareerList,
                    'semester': this.subjectSemester
                }
                subjectCareerList.push(this.subjectCareer)
                if (this.subjectSwitch == 1) {
                    console.log("UwuUwu")
                    axios
                    .put(api + "subjects/" + this.selection.id + "/", info)
                    .then(result => {
                        console.log(result.data)
                        this.getSubjectNames()
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else {
                    info.id = this.subjectID
                    axios
                    .post(api + "subjects/", info)
                    .then(result => {
                        console.log(result.data)
                        this.getSubjectNames()
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                this.clearInputs()
            },
            clearInputs() {
                this.AdminName =  '',
                this.AdminEmail = '',
                this.AdminPassword = '',
                this.AdminMat = '',
                this.AdminName = '',
                this.subjectName = ''
                this.subjectCareer = ''
                this.subjectSemester = ''
                this.subjectID = ''
            },
            setSubjectModal(index: number, i: number) {
                console.log("1" + this.selection.id , this.selection.id_career[0], this.selection.semester, this.selection.name)
                const id = document.getElementById('subject_id') as HTMLInputElement;
                const name = document.getElementById('subject_name') as HTMLInputElement;
                const semester = document.getElementById('subject_semester') as HTMLInputElement;
                const career = document.getElementById('subject_career') as HTMLInputElement;
                const list = document.getElementsByClassName('subject-list');
                

                if (index == 0){
                    list[i].checked = true;
                    this.selection = this.subjectList[i];
                    this.subjectSwitch = 1;
                    id.disabled = true
                    id.placeholder = this.selection.id
                    name.placeholder = this.selection.name
                    
                    for(var i = 0; i < 9; i++) {
                        if(i+1 == this.selection.semester) {
                            semester.selectedIndex = i;
                            break; 
                        }
                    }
                    for(var i = 0; i < this.careerList.length; i++) {
                        const careerOption = document.getElementById('career-option' + i) as HTMLInputElement;
                        for(var j = 0; j < this.careerList.length; j++) {
                            console.log(this.selection.id_career[i], careerOption.value)
                            if(careerOption.value == this.selection.id_career[j]) {
                                career.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
                else {
                    this.subjectSwitch = 0;
                    id.disabled = false
                    id.placeholder = "XXXXXXX"
                    name.placeholder = "Nombre De Materia"
                    this.clearInputs()
                    semester.value = ""
                    career.value = ""
                }
            },
            setAdminModal(index: number, i: number) {
                const id = document.getElementById('admin_id') as HTMLInputElement;
                const name = document.getElementById('admin_name') as HTMLInputElement;
                const password = document.getElementById('admin_password') as HTMLInputElement;
                const email = document.getElementById('admin_email') as HTMLInputElement;
                const list = document.getElementsByClassName('admin-list');

                if (index == 0){
                    console.log("alo policia")
                    list[i].checked = true;
                    this.selection = this.adminList[i];
                    console.log(this.selection)
                    this.adminSwitch = 1;
                    id.disabled = true
                    password.disabled = true
                    email.disabled = true
                    id.placeholder = this.selection.id__username
                    password.placeholder = "************"
                    password.type = "text"
                    email.placeholder = this.selection.id__email
                    name.placeholder = this.selection.id__first_name
                    
                }
                else {
                    this.adminSwitch = 0;
                    id.disabled = false
                    password.disabled = false
                    email.disabled = false
                    email.placeholder = "correo@tec.mx"
                    id.placeholder = "L0XXXXXXX"
                    name.placeholder = "Nombre De Administrador"
                    password.placeholder = "Contraseña para el nuevo administrador"
                    this.clearInputs()
                }
            },
            sendEditSurvey(){
                router.push("/edit-survey")
            }

        }
    })
</script>

<template>
    <header>
        <NavBar />
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
                            <input type="text" id="search-admin-input" v-on:keyup="searchElements"
                                placeholder="Busca al administrador..">
                        </thead>
                        <tbody class="style-2">
                            <tr class="table-data-admin" v-for="(admin, i) in adminList" :key="i">
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input admin-list" type="radio" name="form-admin-btn"
                                            id="admin-radio" @click="assignDelete(i)">
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-admin"> {{admin.id__first_name}} </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#admin-modal"
                                        @click="assignDelete(i),setAdminModal(0,i)"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="admin-btn-container">
                        <button class="table-button" data-bs-toggle="modal" data-bs-target="#admin-modal"  @click="setAdminModal(1,0)"> Crear
                            administrador </button>
                        <button class="table-button delete" data-bs-toggle="modal" data-bs-target="#delete-modal" :disabled="disableDeleteAdminBtn" id="admin-delete-btn">
                            Eliminar administrador </button>
                    </div>
                </div>
                <div class="table-scroll" id="subjects-list">
                    <table class="table table-bordered" id="table">
                        <thead>
                            <input type="text" id="search-subject-input" v-on:keyup="searchElements"
                                placeholder="Busca la unidad de formación..">
                        </thead>
                        <tbody class="style-2">
                            <tr class="table-data-subject" v-for="(subject, i) in subjectList" :key="i">
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input subject-list" type="radio"
                                            name="form-subject-btn" id="subject-radio" @click="assignDelete(i)">
                                        <label class="form-check-label" for="check-input">
                                            <h2 class="filter-h1-subject"> {{subject.name}} </h2>
                                        </label>
                                    </div>
                                    <button class="edit-btn" data-bs-toggle="modal" data-bs-target="#subject-modal"
                                        @click="setSubjectModal(0,i)"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="subject-btn-container">
                        <button class="table-button" data-bs-toggle="modal" data-bs-target="#subject-modal"
                            @click="setSubjectModal(1,0)"> Crear UF </button>
                        <button class="table-button delete" data-bs-toggle="modal" data-bs-target="#delete-modal">
                            Eliminar UF </button>
                    </div>
                </div>
                <button id="edit-survey-button" @click="sendEditSurvey"> Editar encuesta </button>
            </div>
        </div>
        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="delete-modal-content">
                    <h1 class="h1-modal"> Eliminar: </h1>
                    <h1 class="user-h1-modal" v-if="tab == 'admin'"> {{selection.id__first_name}} </h1>
                    <h1 class="user-h1-modal" v-else> {{selection.name}} </h1>
                    <div class=" modal-button-container">
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn">
                            No, regresar </button>
                        <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="delete-action-btn"
                            @click="deleteItem"> Sí, eliminar </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="admin-modal" tabindex="-1" aria-labelledby="adminModal"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <form name="form-admin" class="admin-needs-validation"  id="form-admin-id" novalidate @submit.prevent="saveAdmin">
                    <div class="modal-content" id="admin-modal-content">
                        <h1 class="h2-modal"> Nombre </h1>
                        <h3>Máximo 100 caracteres, sin números ni caracteres especiales.</h3>
                        <input type="text" class="form-control" id="admin_name" v-model="AdminName"
                            placeholder="Nombre Completo" minlength="1" maxlength="100" pattern="[ a-zA-ZÀ-ÿ\u00f1\u00d1]+" required>
                        <h1 class="h2-modal"> Matrícula o nómina </h1>
                        <h3>Identificador de máximo 10 caracteres.</h3>
                        <input type="text" class="form-control" id="admin_id" v-model="AdminMat"
                            placeholder="L0XXXXXXX" minlength="1" maxlength="10" required>
                        <h1 class="h2-modal"> Correo </h1>
                        <h3>Correo válido dentro del dominio “@tec” o “@itesm”.</h3>
                        <input type="email" class="form-control" id="admin_email" v-model="AdminEmail"
                            placeholder="L0XXXXXXX@tec.mx" minlength="1" maxlength="50" pattern="^[^@]{1,}@(itesm|tec).mx$" required>
                        <h1 class="h2-modal"> Contraseña </h1>
                        <h3>Entre 8-50 caracteres, mínimo una minúscula, una mayúscula y un número.</h3>
                        <div class="input-group">
                            <input type="password" class="form-control" id="admin_password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,50}$" v-model="AdminPassword"
                            placeholder="Contraseña" minlength="1" maxlength="100" required>
                            <div class="input-group-append">
                                <span class="input-group-text" @click="showPassword('admin_password','visibility_password_image')">
                                    <img src="src/assets/img/visibility.png" class="img-fluid" alt="visibility eye" id="visibility_password_image">
                                </span>
                            </div>
                        </div>
                        <div class="modal-button-container">
                            <button data-bs-dismiss="modal" aria-label="Close" class="option-button"
                                id="cancel-action-btn-blue" @click="clearInputs" > Cancelar</button>
                            <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="save-action-btn"
                                :disabled="updateAdminDisabled"> Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal fade" id="subject-modal" tabindex="-1" aria-labelledby="createsubjectModal"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <form name="form" class="subject-needs-validation" id="form-subject-id" novalidate @submit.prevent="saveSubject">
                    <div class="modal-content" id="subject-modal-content">
                        <h1 class="h2-modal"> Nombre</h1>
                        <h3>Máximo 200 caracteres</h3>
                        <input type="text" class="form-control" id="subject_name" v-model="subjectName" minlength="1"
                            maxlength="200" required>
                        <h1 class="h2-modal"> Clave</h1>
                        <h3>Identificador de máximo 10 caracteres.</h3>
                        <input type="text" class="form-control" id="subject_id" v-model="subjectID" minlength="1"
                            maxlength="10" required>
                        <h1 class="h2-modal"> Semestre</h1>
                        <div class="input-group">
                            <select class="form-select" id="subject_semester" v-model="subjectSemester" required>
                                <option class="option-semester" :value="1">1º</option>
                                <option class="option-semester" :value="2">2º</option>
                                <option class="option-semester" :value="3">3º</option>
                                <option class="option-semester" :value="4">4º</option>
                                <option class="option-semester" :value="5">5º</option>
                                <option class="option-semester" :value="6">6º</option>
                                <option class="option-semester" :value="7">7º</option>
                                <option class="option-semester" :value="8">8º</option>
                                <option class="option-semester" :value="9">9º</option>
                            </select>
                        </div>
                        <h1 class="h2-modal"> Carrera</h1>
                        <div class="input-group">
                            <select class="form-select" id="subject_career" v-model="subjectCareer" default required>
                                <option v-for="(career, i) in careerList" :key="i" :id="'career-option' + i">{{ career.id }}</option>
                            </select>
                        </div>
                        <div class="modal-button-container">
                            <button data-bs-dismiss="modal" aria-label="Close" class="option-button" id="cancel-action-btn-blue"
                            @click="clearInputs" > Cancelar</button>
                            <button class="option-button" id="save-action-btn" data-bs-dismiss="modal" aria-label="Close" :disabled="updateSubjectDisabled"> Guardar</button>
                        </div>
                    </div>
                </form>
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
    h3 {
        font-family: "Catamaran";
        font-weight: bold;
        font-size: 1.5vh;
        margin: 0;
        color: #122251;
        margin-top: -1vh;
        margin-bottom: -1vh;
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
    #eye-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    #admin_password {
        width: 25vh;
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
        gap: 1vw;
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
    img {
        width: 2vw;
        height: auto;
    }
    span{
        height: 6.6vh;
        margin-bottom: -0.8vh;
        width: 4vw;
    }

    #search-input:active{
        border-style: hidden;
    }

    /* Buttons in table */

    .edit-btn{
        width: 2vw;
        height: 2vw;
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
        color: #6F9492;
        font-size: 4.5vh;
        margin: 0 0 1.5vh 0;
        text-align: center;
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
    #save-action-btn:disabled{
        background-color: #3d46608d;
        color: #ffffffaa;
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