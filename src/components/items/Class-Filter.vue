<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

const api = 'http://localhost:8000/api/'

const subjects = ref([]);
const sessions = ref([]);

export default defineComponent({
    mounted() {
        axios
        .get(api + 'subjects/')
        .then(result => {
            subjects.value = result.data
        })
        .catch(error => {
            console.log(error)
        })
        
        const table = document.getElementById('table') as HTMLInputElement;
        const input = document.getElementById('search-input') as HTMLInputElement;        
        if(this.paletteColor == "blue"){
            table.style.backgroundColor = "#8B9FD9";
            table.style.boxShadow = "0px 0px 0px 2px #26408B";
            input.style.backgroundImage = "url(" + "src/assets/img/search-blue.png" + ")";
            table.style.color = "white";            
        } else {
            table.style.backgroundColor = "#E1F0EA";
            table.style.boxShadow = "0px 0px 0px 2px #C2E7D9";
            input.style.backgroundImage = "url(" + "src/assets/img/search.png" + ")";
            table.style.color = "#6F9492";
        }

        localStorage.setItem("classesSelected", JSON.stringify([]))
        
    },
    props: {
        paletteColor: {
            type: String,
            default: "blue" 
        },
        cancelClick: {
            type: Boolean,
            default: false
        },
        saveClick: {
            type: Boolean,
            default: false
        },
        callForceUpdate:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            subjectList: subjects,
            selectedClass: [],
            firstMount: true,
            updateFC: this.callForceUpdate,
            propCancelC: this.cancelClick,
            propSaveC: this.saveClick
        }
    },
    updated(){
        if(this.passFirstM){
            const check = document.getElementsByClassName('form-check-input') as HTMLCollection;
            const checkL = check.length;
            if(this.paletteColor == "blue"){
                for(var i=0; i<checkL; i++){
                    check[i].type = "checkbox";
                }
            }
            else {
                for(var i=0; i<checkL; i++){
                    check[i].type = "radio";
                    check[i].classList.add("form-check-input-green")
                } 
            }

            let classNameId = localStorage.getItem("className");

            if(classNameId != null && classNameId.length != 0){
                const inputCheck = document.getElementById(classNameId);

                inputCheck.checked = true;
            }            

            this.passFirstM = false
        }

        this.propCancelC = this.cancelClick;
        if(this.onCancelClick){
            this.returnToOriginalState();
            this.$emit("cancel-btn");
            this.cleanChecks();
        }

        this.propSaveC = this.saveClick;
        if(this.onSaveClick){
            this.saveChanges();
        }

        this.updateFC = this.callForceUpdate;
        if(this.updateFC){
            this.fillChecks();
            this.$emit("update-made");
            this.restartForceUpdate;
        }

        if(this.selectedClassC.length == 0){
            this.$emit("disable-btn")
        }
        else {
            if(this.arraysMatch()){
                this.$emit("disable-btn")
            }
            else{
                this.$emit("enable-btn")
            }
        }

    },
    computed: {
        passFirstM: {
            get(){
                return this.firstMount;
            },
            set(val){
                this.firstMount = false;
            }
        },
        selectedClassC: {
            get() {
                return this.selectedClass;
            },
            set(val){
                const found = this.selectedClass.indexOf(val);
                if(found == -1) {
                    this.selectedClass.push(val);
                } else {
                    this.selectedClass.splice(found, 1);
                }
            }
        },
        onCancelClick: {
            get(){
                return this.propCancelC;
            },
            set(val){
                this.propCancelC = val;
            }
        },
        onSaveClick: {
            get(){
                return this.propSaveC;
            },
            set(val){
                this.propSaveC = val;
            }
        },
        setSelectedClass: {
            get(){
                return this.selectedClass;
            },
            set(val){
                this.selectedClass = val
            }
        },
        restartForceUpdate() {
            this.updateFC = false;
        }
    },
    methods: {
        searchElements(){
            var input, td, temp, h1, i, j, filter,  txtValue;

            input = document.getElementById('search-input') as HTMLInputElement;
            filter = input.value.toUpperCase();
            td = document.getElementsByClassName('table-data');
            h1 = document.getElementsByClassName("filter-h1");

            
            for(i = 0; i < h1.length; i++){
                txtValue = h1[i].textContent || h1[i].innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1 ){
                    td[i].style.display= "";
                }
                else {
                    td[i].style.display = "none";
                }
            }
        },
        arraysMatch(){
            const lcSelectedClass = JSON.parse(localStorage.getItem("classesSelected"));
            if(lcSelectedClass.length == this.selectedClassC.length){
                for(var i = 0; i < lcSelectedClass.length; i ++){
                    if (lcSelectedClass.indexOf(this.selectedClassC[i]) == -1) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        cleanChecks(){
            const check = document.getElementsByClassName('form-check-input') as HTMLCollection;

            for( var i=0; i<check.length; i++){
                check[i].checked = false;
            }

        },
        fillChecks(){
            const lcSelectedClass = JSON.parse(localStorage.getItem("classesSelected"));
            const check = document.getElementsByClassName('form-check-input') as HTMLCollection;
            const h2 = document.getElementsByClassName("filter-h2-id");
            var txtValue, i, j;

            for( i=0; i<lcSelectedClass.length; i++){
                for( j=0; j<check.length; j++){
                    txtValue = h2[j].textContent || h2[j].innerText;
                    if(txtValue == lcSelectedClass[i]){ 
                        check[j].checked = true;
                        break;
                    }
                }
            }

        },
        async changeCheck(event: Event) {
            const classSelected = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;

            if(this.paletteColor == "blue"){
                this.selectedClassC = classSelected.value;
                this.$forceUpdate();

            }
            else{
                var sk = []
                localStorage.setItem("classId", classSelected.value);
                localStorage.setItem("className", classSelected.id);

                let response = await axios.get(api + 'available_sessions/?subject=' + localStorage.getItem("classId") + '&user=' + localStorage.getItem("userID"))
                this.sessions = response.data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                for(var i=0; i<this.sessions.length; i++) {
                    sk.push(this.sessions[i].day_hour)
                } 

                if(sk.length == 0){
                    this.$emit('empty-list')
                }
                else{
                    this.$emit('hours-available')
                }

                localStorage.setItem("hoursAvailable", JSON.stringify(sk));

                this.$emit('checked-changed');
            }
        },
        returnToOriginalState(){
            this.setSelectedClass = JSON.parse(localStorage.getItem("classesSelected"))
            this.onCancelClick = false;
        },
        saveChanges(){
            var classesSelect = []

            for(var i=0; i<this.selectedClassC.length; i++) {
                classesSelect.push(this.selectedClassC[i]);
            }

            localStorage.setItem("classesSelected", JSON.stringify(classesSelect));

            this.onSaveClick = false

            this.$emit("save-btn");
        }
    }
})
</script>

<template>
    <body>
        <div class="table-scroll">
            <table class="table table-bordered" id="table">
                <thead>
                    <tr>
                        <td>
                            <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca la materia..">
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(subject, i) in subjectList" :key="i" class="table-data">
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="form-btn"  :id=subject.name  :value=subject.id  @click="changeCheck" >
                                <label class="form-check-label" for="check-input">
                                    <div class="text-container">
                                        <h1 class="filter-h1">{{ subject.name }}</h1>
                                        <div class="id-container">
                                            <h2 class="filter-h2-id">{{ subject.id }}</h2>
                                            <h2>&nbsp;|&nbsp;</h2>
                                            <h2 class="filter-h2-career">{{ subject.id_career[0] }}</h2>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</template>

<style scoped>

    h1{
        font-family: "Montserrat";
        font-weight: bolder;
        font-size: 2.5vh;
        margin: 0;
    }

    h2{
        font-family: "Montserrat";
        font-weight: medium;
        font-size: 1.8vh;
        margin: 0;
    }

    /* Radio button style */

    .form-check{
        display: flex;
        gap: 0.7vw;
        align-items: center;
    }

    .form-check-input{
        background-color: transparent;
        border-color: white;
        min-width: 1.2vw;
    }

    .form-check-input:checked{
        background-color: white;
    }

    .form-check-input:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.686);
        transition: all 0.3s ease 0s;
    }

    .form-check-input-green:checked{
        background-color: #6F9492;
    }

    .form-check-input-green:hover{
        border-color: transparent;
        box-shadow: 0px 0px 0px 4px #9ec2c0;
        transition: all 0.3s ease 0s;
    }


    /* Table styles */

    .table-scroll{
        padding: 3vh 3vw 3vh 3vw;
    }

    table{
        border-radius: 10px;
        border-style: hidden;
        width: 40vw;
        margin: 0;
    }

    tbody { 
        display: block;
        border-style: hidden;
        border-color: transparent;
        border-bottom: 10px;
        height: 40vh;     
        overflow-y: auto;  
        overflow-x: hidden;  
    }

    tr{
        min-width: 100%;
    }

    tr:last-child{
        border-bottom: 0;
    }

    /* Search bar */
    #search-input{
        font-family: "Montserrat";
        font-weight: medium;
        border-radius: 8px;
        border-style: hidden;
        width: 38vw;
        margin: 0 0 0.5vh 0.5vw;
        padding: 0.3vh 4vh;
        /*background-image: url('src/assets/img/loupe.png');*/
        background-position: 0.2vw 0.4vh; /* Position the search icon */
        background-repeat: no-repeat; /* Do not repeat the icon image */
        background-size: 3.5%;
    }

    /* Id container */

    .id-container{
        display: flex;
    }
    

</style>