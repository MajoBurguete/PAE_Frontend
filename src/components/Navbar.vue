<template>
    <body>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" >
                    <img src="src/assets/img/PAE-black.png" class="img-fluid" alt="Responsive image" id="PAE-logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">                     
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="src/assets/img/language.png" class="img-fluid" alt="language icon">
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" id= "lan" href="#">English</a></li>
                                <li><a class="dropdown-item" id= "lan" href="#">Español</a></li>
                            </ul>
                        </div>
                        <a class="nav-link" href="#">
                            <img src="src/assets/img/settings-black.png" class="img-fluid" alt="settings icon">
                        </a>
                        <a class="nav-link" href="home" >
                            <img src="src/assets/img/home-black.png" class="img-fluid" alt="home icon">
                        </a>
                        <a class="nav-link" href="login"> Cerrar Sesi&oacute;n</a>
                    </div>
                </div>
            </div>
        </nav>
    </body>
    
</template>

<style scoped>
    /* Estilos generales de la barra de navegacion */
     .navbar{
        position: fixed;
        top: 0;
        width: 100vw;
        background-color: #365295;
        display: flex;
        justify-content: flex-end; 
        gap: 100vw;
    }

    /* Color de hover en elementos */
    a:hover {
        color: #A0BCFF;
    }
    /* Control de tamaño y curso en titulo de navbar */
    .navbar-brand {
        width: 60%;
        cursor: default;
    }

    .navbar-collapse{
        flex-grow: 0;
    }

        /* Color de hover en iconos */
    img:hover {
        filter: invert(70%) sepia(4%) saturate(4709%) hue-rotate(189deg) brightness(104%) contrast(101%);
    }

    img{
        filter: invert(99%) sepia(99%) saturate(2%) hue-rotate(331deg) brightness(108%) contrast(100%);
        max-width: 5vh; 
        height: auto
    }
    
    #PAE-logo{
        max-width: 15%;
        pointer-events: none;
    }

    a{
        color: white;
        font-size: 2vw;
        font-family: "Ubuntu";
        font-weight: normal;
    }
    a:focus {
    color:white;
}
    #lan {
        color: black;
        font-size: 2vh;
    }
   

</style>
