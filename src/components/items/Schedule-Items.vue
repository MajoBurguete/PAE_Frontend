
<template>
    <body>
        <div id="weekly-schedule">
            <div class="row">
                <h2 class="col-sm-1"></h2>
                <h2 class="col-sm">Lun</h2>
                <h2 class="col-sm">Mar</h2>
                <h2 class="col-sm">Mie</h2>
                <h2 class="col-sm">Jue</h2>
                <h2 class="col-sm">Vie</h2>
            </div>
            <div class="row">
                <h2 class="col-sm">8:00</h2>
                <div class="inactive" id="m8"></div>
                <div class="inactive" id="t8"></div>
                <div class="inactive" id="w8"></div>
                <div class="inactive" id="th8"></div>
                <div class="inactive" id="f8"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">9:00</h2>
                <div class="inactive" id="m9"></div>
                <div class="inactive" id="t9"></div>
                <div class="inactive" id="w9"></div>
                <div class="inactive" id="th9"></div>
                <div class="inactive" id="f9"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">10:00</h2>
                <div class="inactive" id="m10"></div>
                <div class="inactive" id="t10"></div>
                <div class="inactive" id="w10"></div>
                <div class="inactive" id="th10"></div>
                <div class="inactive" id="f10"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">11:00</h2>
                <div class="inactive" id="m11"></div>
                <div class="inactive" id="t11"></div>
                <div class="inactive" id="w11"></div>
                <div class="inactive" id="th11"></div>
                <div class="inactive" id="f11"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">12:00</h2>
                <div class="inactive" id="m12"></div>
                <div class="inactive" id="t12"></div>
                <div class="inactive" id="w12"></div>
                <div class="inactive" id="th12"></div>
                <div class="inactive" id="f12"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">13:00</h2>
                <div class="inactive" id="m13"></div>
                <div class="inactive" id="t13"></div>
                <div class="inactive" id="w13"></div>
                <div class="inactive" id="th13"></div>
                <div class="inactive" id="f13"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">14:00</h2>
                <div class="inactive" id="m14"></div>
                <div class="inactive" id="t14"></div>
                <div class="inactive" id="w14"></div>
                <div class="inactive" id="th14"></div>
                <div class="inactive" id="f14"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">15:00</h2>
                <div class="inactive" id="m15"></div>
                <div class="inactive" id="t15"></div>
                <div class="inactive" id="w15"></div>
                <div class="inactive" id="th15"></div>
                <div class="inactive" id="f15"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">16:00</h2>
                <div class="inactive" id="m16"></div>
                <div class="inactive" id="t16"></div>
                <div class="inactive" id="w16"></div>
                <div class="inactive" id="th16"></div>
                <div class="inactive" id="f16"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">17:00</h2>
                <div class="inactive" id="m17"></div>
                <div class="inactive" id="t17"></div>
                <div class="inactive" id="w17"></div>
                <div class="inactive" id="th17"></div>
                <div class="inactive" id="f17"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">18:00</h2>
                <div class="inactive" id="m18"></div>
                <div class="inactive" id="t18"></div>
                <div class="inactive" id="w18"></div>
                <div class="inactive" id="th18"></div>
                <div class="inactive" id="f18"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">19:00</h2>
                <div class="inactive" id="m19"></div>
                <div class="inactive" id="t19"></div>
                <div class="inactive" id="w19"></div>
                <div class="inactive" id="th19"></div>
                <div class="inactive" id="f19"></div>
            </div>


        </div>
    </body>
</template>


<style scoped>

/* General styles */

body{
    margin: 5vh 5vw;
}

h2 {
    font-size: 2vh;
}

.row{
    margin: 0;
    padding: 0;
}

.col-sm-1{
    width: 2.85vw;
}

.col-sm,
.col-sm-2{
    text-align: center;
    padding: 1.5vh 0 0 0;
}

/* Class for when a div has been unselected */

.inactive{
    width: 6vw;
    height: 4.5vh;
    border: 2.5px solid #000000;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0.5vh 0.8vw;
}
.inactive:hover{
    background-color: #263f8b85;
}

</style>