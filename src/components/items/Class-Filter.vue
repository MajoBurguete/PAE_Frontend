<script lang="ts">
import { defineComponent, ref } from "vue";
import { store, useStore } from '../../store'
import axios from "axios";

const api = 'http://localhost:8000/api/'

const subjects = ref([]);
const sessions = ref([]);

export default defineComponent({
    setup () {
        const store = useStore()
    },
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
        
    },
    updated(){
        const check = document.getElementsByClassName('form-check-input') as HTMLCollection;
        const checkL = check.length;
        if(this.paletteColor == "blue"){
            for(var i=0; i<checkL; i++){
                console.log(i)
                console.log(check[i])
                check[i].type = "checkbox";
            }
        }
        else {
           for(var i=0; i<checkL; i++){
                check[i].type = "radio";
            } 
        }

    },
    data() {
        return {
            subjectList: subjects
        }
    },

    props: {
        paletteColor: {
            type: String,
            default: "blue" 
        }
    },
    methods: {
        searchElements(){
            var input, td, temp, h1, i, j, filter,  txtValue;

            input = document.getElementById('search-input') as HTMLInputElement;
            filter = input.value.toUpperCase();
            td = document.getElementsByClassName('table-data');
            h1 = document.getElementsByTagName('h1');

            
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

        async changeCheck(event: Event) {
            var sk = []
            const className = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;
            localStorage.setItem("classId", className.value);
            localStorage.setItem("className", className.id);
            store.commit('setClassName', className.value);

            let response = await axios.get(api + 'available_sessions/?subject='+ store.state.selectedClass)
            this.sessions = response.data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            for(var i=0; i<this.sessions.length; i++) {
                sk.push(this.sessions[i].id_tutor__schedule__day_hour)
            }

            if(sk.length == 0){
                this.$emit('empty-list')
            }
            else{
                this.$emit('hours-available')
            }

            store.commit('setHoursAvailable', sk);
        },
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
                    <tr v-for="(subject, i) in subjectList" :key="i">
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="form-btn"  :id=subject.name  :value=subject.id  @click="changeCheck" >
                                <label class="form-check-label" for="check-input">
                                    <div class="text-container">
                                        <h1>{{ subject.name }}</h1>
                                        <h2>{{ subject.id }} | {{ subject.id_career[0] }}</h2>
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
    .form-check-input-green{
        background-color: transparent;
        border-color: green;
        min-width: 1.2vw;
    }
    .form-check-input-green:checked{
        background-color: green;
    }

    .form-check-input:checked{
        background-color: white;
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

    
    

</style>