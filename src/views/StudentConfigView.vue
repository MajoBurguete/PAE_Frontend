<script lang="ts">
import { defineComponent } from "vue";
import SessionRecord from "../components/items/Session-Record.vue";
import NavBar from "../components/Navbar.vue"


export default defineComponent({
    components: {
        SessionRecord,
        NavBar
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <body>
        <div class="container">
            <div class="container-head">
                <div class="container-profile">
                    <h1>Daniela Hernandez</h1>
                    <div class="container-info">
                        <h2>ITC</h2>
                        <h2> | </h2>
                        <h2>6to</h2>
                        <h2> Semestre</h2>
                    </div>
                </div>
                <a href="/">Eliminar<br>Perfil</a>
            </div>
            <div class="container-table-info">
                <SessionRecord/>
            </div>
        </div>
    </body>
</template>

<style scoped>
    .container{
        display: flex;
        padding: 12vh 7vw;
        flex-direction: column;
        gap: 4vh;
    }
    
    body{
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 100vw;
    }

    .container-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
    }

    .container-profile{
        display: flex;
        flex-direction: column;
    }

    .container-info{
        display: flex;
        flex-direction: row;
        gap: 0.5vw;
    }

    .container-table-info{
        padding: 0 10vw;
    }

    h1{
        font-family: "Montserrat";
        font-weight: bolder;
        font-size: 5vh;
    }

    h2{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 3vh;
    }

    h3{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 3vh;
        color: #57716F;
    }

    a {
        font-family: "Ubuntu";
        font-weight: normal;
        text-align: center;
        color: white;
        font-size: 3.5vh;
        padding: 0.5vh 2.5vw;
        border-radius: 15px;
        border: 2.5px solid #00000000;
        background-color: #F65E0B;
        box-sizing: border-box;
        text-decoration: none;
    }
    
</style>