<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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


        }
    }
})
</script>

<template>
    <body>
        <div class="table-scroll">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <td>
                            <input type="text" id="search-input" v-on:keyup="searchElements" placeholder="Busca la materia..">
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Estructura de datos</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Bases de datos</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Gráficas Computacionales</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Modelación computaciónal de las leyes del movimiento</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Modelación computaciónal de las leyes del movimiento</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Modelación computaciónal de las leyes del movimiento</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-data">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <div class="text-container">
                                        <h1>Modelación computaciónal de las leyes del movimiento</h1>
                                        <h2>TC2005B | 1º | ITC | Ingeniería</h2>
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
    }

    .form-check-input:checked{
        background-color: white;
    }

    /* Table styles */

    .table-scroll{
        padding: 3vh 3vw;
    }

    table{
        color: white;
        border-radius: 10px;
        border-style: hidden;
        background-color: #8B9FD9;
        box-shadow: 0px 0px 0px 2px #26408B;
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
        background-image: url('src/assets/img/search-blue.png'); /* Add a search icon to input */
        background-position: 0.2vw 0.4vh; /* Position the search icon */
        background-repeat: no-repeat; /* Do not repeat the icon image */
        background-size: 3.5%;
    }

    
    

</style>