<script lang="ts">
import NavBar from "../components/Navbar.vue"
import { defineComponent} from "vue";

export default defineComponent({
    components: {
        NavBar
    }
})
</script>

<template>
    <header>
        <NavBar/>
    </header>
    <div class="container">
            <div class="message-container">
                ¡Ay&uacute;danos con tu opini&oacute;n!
            </div>
        <div class="form-container">
            <form>
                <div class="question-container">
                    <label for="openQuestion" class="form-label">Comentarios</label>
                    <textarea type="form-control" class="form-control" id="comments" rows="3"></textarea>
                </div>
                <div class="question-container">
                    <label for="closedQuestion" class="form-label">Tiempo de la asesor&iacute;a</label><br>
                    <div class="answer-container">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                20 minutos
                            </label> <br>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer2">
                            <label class="form-check-label" for="flexRadioDefault1">
                                30 minutos
                            </label> <br>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer3">
                            <label class="form-check-label" for="flexRadioDefault1">
                                40 minutos
                            </label> <br>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="closedAnswer4">
                            <label class="form-check-label" for="flexRadioDefault1">
                                45 minutos
                            </label>
                        </div>   
                    </div>
                </div>
                <div class="question-container">
                    <label for="scaleQuestion" class="form-label">Claridad de explicaci&oacute;n</label><br>
                    <div class="scale-container">
                        <label for="scaleQuestion" class="form-step">1</label>
                        <label for="scaleQuestion" class="form-step">2</label>
                        <label for="scaleQuestion" class="form-step">3</label>
                        <label for="scaleQuestion" class="form-step">4</label>
                        <label for="scaleQuestion" class="form-step">5</label><br>
                    </div>
                    <div class="answer-container">
                        <div class="form-check-scale">
                            <label class="form-check-label" for="flexRadioDefault1">
                            Nada Claro
                            </label>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer1">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer3">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer4">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scaleAnswer5">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Muy Claro
                            </label>
                        </div>
                    </div>
                </div>
                <div class="question-container">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Foto de Asesor&iacute;a</label>
                        <input class="form-control" type="file" id="formFile">
                    </div>
                </div>
            </form>
        </div>
       <a href="home">Enviar</a>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 100vw;
}
.message-container{
    font-family: "Catamaran";
    font-weight: bold;
    color: white;
    text-align: center;
    font-size: 7vh;
    background-color: #A4B7E3;
    border-radius: 15px;
    padding: 1.5vh 22vw;
    margin-top: 2vh;
}
.question-container{
    font-family: "Catamaran";
    font-weight: medium;
    color: #57716F;
    text-align: left;
    font-size: 4vh;
    background-color: #E1F0EA;
    border-radius: 15px;
    padding: 3vh 2vw;
    margin-top: 2vh;
    width: 55vw;
}
.answer-container{
    background-color: white;
    padding: 3vh 2vw;
    border-radius: 15px;
    flex-direction: row;
}
.scale-container{
    margin: 0vh 0vw;
    text-align: center;
}
.form-check-input{
    font-size: 2.5vh;
    margin: 1vh 1.2vw;
}
.form-check-scale {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form-check {
    display: block;
    padding: 0vh;
    display: flex;
    align-items: left;
    justify-content: left;
}
.form-check-label{
    font-size: 2.5vh;
    align-content: center;
}
.form-label{
    font-size: 3vh;
    align-content: center;
}
.form-step{
    margin: 1vh 1.5vw;
    font-size: 3vh;
}
a {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 3.5vh;
    padding: 1vh 4vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #26408B;
    box-sizing: border-box;
    margin: 3vh;
    text-decoration: none;
}
header {
    margin-bottom: 7vh;
}

</style>