<script lang="ts">
import { defineComponent } from 'vue'
import SignupForm from '@/components/items/Register-Form.vue'

export default defineComponent({
    components: {
        SignupForm
    },
    methods: {
        backButton() {
            this.$emit('back-button');
        }
    }
})
</script>


<template>
    <body>
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
    padding-bottom: 3vh;
    z-index: 10;
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