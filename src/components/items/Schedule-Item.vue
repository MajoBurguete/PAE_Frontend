<script lang="ts">
import { defineComponent } from "vue";
import { store, useStore } from '../../store'

export default defineComponent({
    setup () {
        const store = useStore()
    },
    props: {
        baseColor: {
            type: String,
            default: "#26408B" 
        },
        hoverColor: {
            type: String,
            default: "#263f8b85" 
        },
        lockSchedule: {
            type: String,
            default: "inactive"
        },
        showDate: {
            type: String,
            default: "active"
        },
        scheduledHours:{
            type: Array,
            default: []
        },
        fromSignupT:{
            type: String,
            default: "false"
        }
    },
    mounted() {
        const clearButton = document.getElementById('clear-button') as HTMLInputElement;
        const squares = document.getElementsByClassName("locked") as HTMLCollection;


        const dates = document.getElementsByClassName("date") as HTMLCollection;

        if (this.showDate == "active"){
            for(var i = 0; i < 5; i++){
                dates[i].style.display = "";
            }
        }
        else{
            for(var i = 0; i < 5; i++){
                dates[i].style.display = "none";
            }
        }

        if(this.lockSchedule == "inactive") {
            clearButton.style.visibility = "visible"
        } else {
            this.lockedSchedule(clearButton); 
            this.checkLockedSchedule(squares);
            
        } 
    },
    updated() {
        const squares = document.getElementsByClassName("locked") as HTMLCollection;
        this.checkLockedSchedule(squares);
        
    },
    data(){
        return{
            selectedHoursT: []
        }
    },
    computed: {
        selectedHoursTC: {
            get() {
                return this.selectedHoursT;
            },
            set(val){
                const found = this.selectedHoursT.indexOf(val);
                if(found == -1) {
                    this.selectedHoursT.push(val);
                } else {
                    this.selectedHoursT.splice(found, 1);
                }
            }
        }
    },  
    methods:{
        checkLockedSchedule(squares: HTMLCollection){

            var i, j, n;

            n=0;

            const listL = squares.length;
            this.clearLockedSchedule();

            for(i = 0; i < listL; i++){
                for(j = 0; j < this.scheduledHours.length; j++){
                    if(squares[n].id == this.scheduledHours[j]){
                        this.scheduledHours.shift();
                        squares[n].className = "active";
                        break;
                    }
                    else if(j == this.scheduledHours.length-1){
                        n++
                    }
                }
            }
        },
        //Function to change the div color when it's been selected or unselected
        changeBackgroundColor(event: Event) {
            if(this.lockSchedule == "inactive"){
                const square = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;
                if((square.className) == "inactive"){
                    square.className = "active";
                }
                else {
                    square.className = "inactive";
                }
            }
            this.saveHourSelected(event);
        },
        currentDateTime(day: number) {
            const current = new Date();
            const currentDay = current.getDay();
            //casos que no funcionan: checarlo en sabado/domingo, primeras y ultimas fechas del mes, 
            for(var i = -4; i < 5; i++){
                if(currentDay+i == day) {
                    const date = (current.getDate()+i)+' '+(this.getMonth(current.getMonth()));
                    return date;
                }
            }
        },
        getMonth(date: Number){
            if(date == 0){
                return "Ene";
            }
            else if(date == 1){
                return "Feb";
            }
            else if(date == 2){
                return "Mar";
            }
            else if(date == 3){
                return "Abr";
            }
            else if(date == 4){
                return "May";
            }
            else if(date == 5){
                return "Jun";
            }
            else if(date == 6){
                return "Jul";
            }
            else if(date == 7){
                return "Ago";
            }
            else if(date == 8){
                return "Sep";
            }
            else if(date == 9){
                return "Oct";
            }
            else if(date == 10){
                return "Nov";
            }
            else if(date == 11){
                return "Dic";
            }
        },
        clearSchedule(){
            const squares = document.getElementsByClassName("active");
            const squares2 = document.getElementsByClassName("locked");

            let lengthS = squares.length;
            let lengthS2 = squares2.length;

            for (var _i = 0; _i < lengthS; _i++) {
                squares[0].className = "inactive";
            } 

            for (var _i = 0; _i < lengthS2; _i++) {
                squares2[0].className = "inactive";
            } 
            
        },
        clearLockedSchedule(){
            const squares = document.getElementsByClassName("active");
            const squaresSelect = document.getElementsByClassName("selected");

            let lengthS = squares.length;
            let lengthSel = squaresSelect.length;

            for (var _i = 0; _i < lengthS; _i++) {
                squares[0].className = "locked";
            } 

            for (var _i = 0; _i < lengthSel; _i++) {
                squaresSelect[0].className = "locked";
            } 
            
        },
        lockedSchedule(clearButton: HTMLInputElement){
            const squares = document.getElementsByClassName("inactive");

            let lengthS = squares.length;
            for (var _i = 0; _i < lengthS; _i++) {
                squares[0].className = "locked";
            }

            clearButton.style.visibility = "hidden";
        }, 
        saveHourSelected(event: Event){
            
            const square = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;
            const squares = document.getElementsByClassName("active") as HTMLCollection;
            const squaresSelect = document.getElementsByClassName("selected") as HTMLCollection;

            let lengthS = squares.length;
            let lengthSel = squaresSelect.length;

            if(this.fromSignupT == "true"){
                this.selectedHoursTC = square.id;

                var hoursSelect = []


                for(var i=0; i<this.selectedHoursTC.length; i++){
                    hoursSelect.push(this.selectedHoursTC[i]);
                }

                sessionStorage.setItem("hoursSelectedT", JSON.stringify(hoursSelect));
            }
            else{
                if(this.lockSchedule == "home-active"){
                    for(var i=0; i<lengthS; i ++){
                        squares[i].className = "active";
                    }

                    for(var i=0; i<lengthSel; i ++){
                        squaresSelect[i].className = "active";
                    }


                    square.className = "selected";

                    sessionStorage.setItem("sessionSelected", square.id);
                }
            }
        }  
    }
})
</script>

<template>
    <body>
        <div id="weekly-schedule">
            <div class="date-header">
                <h2 class="col-sm-1"></h2>
                <div class="day-date">
                    <h2 class="col-sm-3" @click="changeBackgroundColor">Lunes</h2>
                    <h2 class="date">{{currentDateTime(1)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3" @click="changeBackgroundColor">Martes</h2>
                    <h2 class="date">{{currentDateTime(2)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3" @click="changeBackgroundColor">Miercoles</h2>
                    <h2 class="date">{{currentDateTime(3)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3" @click="changeBackgroundColor">Jueves</h2>
                    <h2 class="date">{{currentDateTime(4)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3" @click="changeBackgroundColor">Viernes</h2>
                    <h2 class="date">{{currentDateTime(5)}}</h2>
                </div>
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
        <button id="clear-button" @click="clearSchedule">Borrar selección</button>
    </body>
</template>


<style scoped>

/* General styles */

body{
    margin: 2vh 0.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}

button {
    font-family: "Ubuntu";
    font-weight: normal;
    color: white;
    font-size: 2.5vh;
    padding: 0.5vh 1.1vw;
    border-radius: 15px;
    border: 2.5px solid #00000000;
    background-color: #26408B;
    box-sizing: border-box;
    margin-top: 4vh;
}
.date-header{
    display: flex;
    direction: column;
    height: 6vh;
    align-content: center;
    align-items: center;
    justify-content: center;
}
.day-date{
    display: flex;
    flex-flow: column wrap;
    margin-right: 1.5vw;
    margin-left: 1.5vw;
}

.row{
    margin: 0;
    padding: 0;
}

.col-sm-1{
    width: 3vw;
}

.col-sm,
.col-sm-2{
    text-align: center;
    padding: 1.5vh 0 0 0;
}
.col-sm-3{
    text-align: center;
    width: 5vw;
    margin-bottom: 0.5vh;
}
.date{
    color: gray;

}
h2 {
    font-size: 2vh;
    text-align: center;
    }
/* Class for when a div has been unselected */

.inactive, 
.active,
.locked,
.selected{
    width: 7vw;
    height: 4.5vh;
    border: 2.5px solid #000000;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0.5vh 0.5vw;
}

.selected{
    background-color: #6F9492;
}

/* Class for when a div has been selected */
.active {
    background-color: v-bind(baseColor);
}


.locked:hover {
    background-color: #00000000;
}
.inactive:hover{
    background-color: v-bind(hoverColor);
}


</style>