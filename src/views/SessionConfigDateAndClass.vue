<script lang="ts">
import { defineComponent } from "vue";
import ScheduleItem from "@/components/items/Schedule-Items.vue"
export default defineComponent({
    components: {
        ScheduleItem
    },
    methods: {
        questionOnHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;
            messageContainer.style.visibility = "visible"
        },
        questionOutOfHover(){
            const messageContainer = document.getElementById('popover') as HTMLInputElement;
            messageContainer.style.visibility = "hidden"
        },
    }
})
</script>

<template>
  <div class="container">
      <div class="container-side">
            <div class="container-title">
                <h1>Horario de Preferencia</h1>
                <img src="src/assets/img/question-icon.png" class="question" @mouseover="questionOnHover" @mouseleave="questionOutOfHover">
                    <div class="tooltip-style" id="popover">
                        <img src="src/assets/img/circle.png" id="selected">
                        Horario Seleccionado <br>
                        <img src="src/assets/img/circle.png" id="available">
                        Horario Disponible
                    </div>
            </div>
            <ScheduleItem base-color="#6F9492" hover-color="transparent"/>
      </div>
      <div class="container-side">
          <h1>aqui va el classfilter</h1>
          <button>Continuar</button>
      </div>
  </div>
</template>

<style scoped>
.container{
    display: flex;
}
.container-side{
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container-title{
    display: flex;
    flex-direction: row;
    align-items: center;
}
button{
    font-family: "Ubuntu";
    font-weight: normal;
    background-color: #26408B;
    color: white;
    border-radius: 10px;
    border: transparent;
    font-size: 3vh;
    padding: 1vh 8vw;
}

img{
    height: 2vh;
    width: auto;
    margin-left: 2vw;
}
#selected{
    filter: invert(65%) sepia(7%) saturate(1097%) hue-rotate(128deg) brightness(85%) contrast(84%);
    margin-left: 0vw;
}
#available{
    filter: invert(94%) sepia(14%) saturate(268%) hue-rotate(99deg) brightness(94%) contrast(87%);
    margin-left: 0vw;

}

</style>