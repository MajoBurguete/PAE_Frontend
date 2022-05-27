<template>
    <body>
        <div class="cancel-container">
            <h1>¿Estas seguro de cancelar la asesoría?</h1>
            <div class="button-container">
                <button id="cancel-button" data-bs-dismiss="modal" aria-label="Close"> No, regresar </button>
                <button id="save-button"  data-bs-dismiss="modal" aria-label="Close"> Sí, cancelar </button>
            </div>
        </div>
    </body>
</template>

<style scoped>
.cancel-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #E1F0EA;
    border-radius: 20px;
    padding: 7vh 2vw;
    gap: 3vh;
    width: 50vw;
}
h1 {
font-family: 'Montserrat';
font-weight: normal;
font-size: 5vh;
color: #6F9492;
text-align: center;
}
.button-container {
    display: flex;
    justify-content: center;
}

#cancel-button {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 3.5vh;
    padding: 1vh 4vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #96CCC9;
    box-sizing: border-box;
    margin: 3vh;
    text-decoration: none;
}
#save-button {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 3.5vh;
    padding: 1vh 4vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #F75E0B;
    box-sizing: border-box;
    margin: 3vh;
    text-decoration: none;
}
</style>