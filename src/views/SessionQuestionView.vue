<template>
    <body>
        <div class="container">
            <div class="left">
                <button id="back-button">
                    <img src="src/assets/img/left-arrow.png"/>
                </button>
            </div>
            <div class="right">
                <h1>Tema específico a tratar</h1>
                <textarea class="form-control" placeholder="Escribe tu duda..." rows="3"></textarea>
                <h1>Archivos complementarios</h1>
                <h2>Recuerda subir archivos menores a 2 MB</h2>
                <div class="file-container">
                    <img id="plus-icon" src="src/assets/img/plus-icon.png"/>
                </div>
                <button id="send-button">Enviar</button>
            </div>
        </div>
    </body>
</template>

<style scoped>

    h1{
        color: #6F9492;
        font-family: "Montserrat";
        font-weight: bolder;
    }

    h2{
        font-family: "Montserrat";
        font-weight: normal;
        color: #96BECC;
    }

    img{
        width: 30%;
        height: 50%;
        margin: -7.5vh 0 0 0;
    }

    button{
        font-family: "Ubuntu";
        font-weight: normal;
        border: transparent;
    }

    textarea{
        width: 45vw;
        height: 25vh;
        margin: 3vh 0 0 0;
        border: transparent;
        box-shadow: 0px 0px 0px 10px #DAF4EA;
    }

    /*Button to come back*/

    #back-button{
        font-size: 8vh;
        background-color: #6F9492;
        border-radius: 13px;
        width: 4vw;
        height: 6vh;
        padding: 0vh 0;
    }

    #plus-icon{
        width: 10%;
        height: 10%;
        margin: 3vh 0 0 0;
        cursor: pointer;
    }

    /* Button to send request */

    #send-button{
        background-color: #26408B;
        color: white;
        font-size: 3vh;
        padding: 1vh 7vw;
        border-radius: 10px;
    }



</style>