<script lang="ts">
import { defineComponent } from 'vue'
import SignupForm from '../components/items/Register-Form.vue'
import router from "@/router";

export default defineComponent({
    components: {
        SignupForm
    },
    methods: {
        backButton() {
            localStorage.setItem("fromSignupForm", "true")
            router.push('http://localhost:3000/')
        }
    }
})
</script>


<template>
    <body>
        <img src="../assets/img/PAE-with-name-black.png" alt="PAELogoNotFound">
            <SignupForm/>
            <div class="button-container">
                <div>
                    <button class="bigger-buttons" id="back-button" @click="backButton"> Regresar </button>
                    <button class="bigger-buttons" id="signup-button"> Registrarse </button>
                </div>
            </div>
    </body>
</template>

<style scoped>

body{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3vh;
}

img{
    width: 15%;
    height: 15%;
}

button {
    padding: 0.5vh 2vw;
    margin: 1vh 0;
    font-family: "Ubuntu";
    font-weight: normal;
    border-color: transparent;
    border-radius: 1.5vh;
    color: white;
}

/* Bottom containers */
.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6.5vh;
}


/* Return and signup buttons */

.bigger-buttons{
    font-size: 2.5vh;
    padding: 0.5vh 4.5vw;
}

#back-button{
    background-color: #8699D0;
    margin-inline-end: 1vw;
}

#signup-button{
    background-color: #26408B;
    margin-inline-start: 1vw;
}

</style> 