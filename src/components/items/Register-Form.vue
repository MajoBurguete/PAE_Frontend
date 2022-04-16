<template>
    <body>
        <div class="row">
            <div class="col-6 col-md">
                <div class="mb-3">
                    <label class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" id="user_name" placeholder="Nombre">
                </div>
            </div>
            <div class="col-6 col-md">
                <div class="mb-3">
                    <label class="form-label">Correo Institucional</label>
                    <input type="email" class="form-control" id="user_email" placeholder="A0XXXX@tec.com">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6 col-md">
                <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="user_password`" placeholder="Contraseña">
                </div>
            </div>
            <div class="col-6 col-md">
                <div class="mb-3">
                    <label class="form-label">Confirma tu contraseña</label>
                    <input type="password" class="form-control" id="user_confirm_password" placeholder="Contraseña">
                </div>
            </div>
        </div>

        <div class = "row">
            <div class="col-6 col-md">
                <div class="mb-3">
                    <label class="form-label">Matrícula</label>
                    <input type="text" class="form-control" id="user_id" placeholder="A0XXXX">
                </div>
            </div>
            <div class="col-6 col-lg">
                <div class="input-group">
                    <label class="dropdown-text-semester">Semestre</label>
                    <select class="form-select">
                        <option selected>Semestre</option>
                        <option value="1">1º</option>
                        <option value="2">2º</option>
                        <option value="3">3º</option>
                    </select>
                </div>
                <div class="input-group">
                    <label class="dropdown-text-career">Carrera</label>
                    <select class="form-select">
                        <option selected>Carrera</option>
                        <option value="1">ITC</option>
                        <option value="2">LMT</option>
                        <option value="3">LAD</option>
                    </select>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
    body{
        padding: 3vh 8vw;
    }
    /* Input labels */
    label {
        font-family: "Catamaran";
        font-weight: bold;
        color: #26408B;
    }
    /* Text boxes and dropdowns */
    input, 
    .form-select {
        font-family: "Catamaran";
        font-weight: normal;
        padding: 0.25vh 1.5vw 0 0.5vw;
        margin: 0;
        border-color: black;
        border-width: 0.25vh;
        border-radius: 0.65vh;
    }
    input {
        height: 4.5vh;
    }
    /* Dropdowns style */
    .form-select{
        width: 9.9vw;
    }
    .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        border-radius: 0.65vh;
    }
    .input-group {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin: 1.3vh 0 0 0;
    }
    .dropdown-text-semester{
        margin: 0 2.5vw 0 0;
    }
    .dropdown-text-career {
        margin: 0 3.3vw 0 0;
    }
</style>