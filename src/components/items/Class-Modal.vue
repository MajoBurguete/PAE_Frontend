<script lang="ts">
    import { defineComponent } from 'vue'
    import ClassFilter from "../items/Class-Filter.vue"


    export default defineComponent({
        components: {
            ClassFilter
        }
        
    })
</script>

<template>
    <body>
        <ClassFilter/>
        <div class="button-container">
            <button id="cancel-button" data-bs-dismiss="modal" aria-label="Close"> Cancelar </button>
            <button id="save-button"> Guardar cambios </button>
        </div>
    </body>
</template>

<style scoped>
    body{
        width: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button{
        padding: 0.5vh 2vw;
        margin: 1vh 0;
        font-family: "Ubuntu";
        font-size: 3vh;
        font-weight: normal;
        border-color: transparent;
        border-radius: 0.7vh;
        color: white;
    }


    .button-container{
        display: flex;
        gap: 2vw;
    }

    #cancel-button{
        background-color: #9EB2ED;
    }

    #save-button{
        background-color: #26408B;
    }

</style>