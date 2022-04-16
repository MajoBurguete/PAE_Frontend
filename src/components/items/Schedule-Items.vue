<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        baseColor: {
            type: String,
            default: "#26408B" 
        },
        hoverColor: {
            type: String,
            default: "#263f8b85" 
        }
    },
    methods:{
        //Function to change the div color when it's been selected or unselected
        changeBackgroundColor(event: Event) {
            const square = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;
            if((square.className) == "inactive"){
                square.className = "active";
            }
            else {
                square.className = "inactive";
            }
        }
    }
})
</script>

<template>
    <body>
        <div id="weekly-schedule">
            <div class="row">
                <h2 class="col-sm-1"></h2>
                <h2 class="col-sm" @click="changeBackgroundColor">Lun</h2>
                <h2 class="col-sm" @click="changeBackgroundColor">Mar</h2>
                <h2 class="col-sm" @click="changeBackgroundColor">Mie</h2>
                <h2 class="col-sm" @click="changeBackgroundColor">Jue</h2>
                <h2 class="col-sm" @click="changeBackgroundColor">Vie</h2>
            </div>
            <div class="row">
                <h2 class="col-sm">8:00</h2>
                <div class="inactive" id="m8" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t8" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w8" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th8" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f8" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">9:00</h2>
                <div class="inactive" id="m9" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t9" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w9" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th9" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f9" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">10:00</h2>
                <div class="inactive" id="m10" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t10" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w10" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th10" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f10" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">11:00</h2>
                <div class="inactive" id="m11" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t11" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w11" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th11" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f11" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">12:00</h2>
                <div class="inactive" id="m12" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t12" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w12" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th12" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f12" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">13:00</h2>
                <div class="inactive" id="m13" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t13" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w13" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th13" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f13" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">14:00</h2>
                <div class="inactive" id="m14" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t14" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w14" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th14" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f14" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">15:00</h2>
                <div class="inactive" id="m15" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t15" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w15" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th15" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f15" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">16:00</h2>
                <div class="inactive" id="m16" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t16" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w16" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th16" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f16" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">17:00</h2>
                <div class="inactive" id="m17" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t17" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w17" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th17" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f17" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">18:00</h2>
                <div class="inactive" id="m18" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t18" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w18" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th18" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f18" @click="changeBackgroundColor"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">19:00</h2>
                <div class="inactive" id="m19" @click="changeBackgroundColor"></div>
                <div class="inactive" id="t19" @click="changeBackgroundColor"></div>
                <div class="inactive" id="w19" @click="changeBackgroundColor"></div>
                <div class="inactive" id="th19" @click="changeBackgroundColor"></div>
                <div class="inactive" id="f19" @click="changeBackgroundColor"></div>
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

/* Class for when a div has been selected */
.active {
    background-color: v-bind(baseColor);
    width: 6vw;
    height: 4.5vh;
    border: 2.5px solid #000000;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0.5vh 0.8vw;
}
.inactive:hover{
    background-color: v-bind(hoverColor);
}

</style>