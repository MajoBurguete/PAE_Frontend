<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from '../../store'

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
        selectedColor:  {
            type: String,
            default: "transparent"
        },
        scheduledHoursProp:{
            type: Array,
            default: []
        },
        weekLock:{
            type: String,
            default: "0"
        },
        activeLockWeek:{
            type: Boolean,
            default: false
        }
    },
    mounted() {

        const current = new Date();
        this.lockDays(current.getDay() + Number(this.weekLock))

        const squares = document.getElementsByClassName("locked") as HTMLCollection;

        let hoursStore = JSON.parse(localStorage.getItem("hoursAvailable"))
        if(hoursStore != null && hoursStore.length != 0){
            this.scheduledHours = hoursStore;
            this.checkLockedSchedule(squares);
        }
    },
    updated() {
        const current = new Date();
        const squares = document.getElementsByClassName("locked") as HTMLCollection;

        this.scheduledHours = this.scheduledHoursProp;

        this.lockDays(current.getDay() + Number(this.weekLock))
        this.checkLockedSchedule(squares);
        
        
    },
    data(){
        return{
            scheduledHoursData: []
        }
    },
    computed: {
        scheduledHours:{
            get(){
                return this.scheduledHoursData;
            },
            set(val){
                this.scheduledHoursData = val;
            }
        }  
        
    }, 
    methods:{
        lockDays(day: number){
            const squares = document.getElementsByClassName("active") as HTMLCollection;
            const selectSquares = document.getElementsByClassName("selected") as HTMLCollection;
            const squaresLocked = document.getElementsByClassName("locked") as HTMLCollection;

            this.clearLockedSchedule();

            let squaresLen = squares.length;
            let selectSq = selectSquares.length;
            let squareLockLen = squaresLocked.length;


            if(this.weekLock == "0"){
                while(day > 0){
                    if(day == 1){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("m") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("m") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("m") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 2){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("t") > -1 && squares[0].id.indexOf("th") == -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("t") > -1 && squares[0].id.indexOf("th") == -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("t") > -1 && squaresLocked[i].id.indexOf("th") == -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 3){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("w") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("w") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("w") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 4){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("th") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("th") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("th") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 5){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("f") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("f") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("f") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                                
                            }
                        }
                    }

                    day--;
                }
            }
            else{
                while(day < 6){
                    if(day == 1){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("m") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("m") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("m") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 2){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("t") > -1 && squares[0].id.indexOf("th") == -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("t") > -1 && squares[0].id.indexOf("th") == -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("t") > -1 && squaresLocked[i].id.indexOf("th") == -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 3){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("w") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("w") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("w") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 4){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("th") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("th") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("th") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                            }
                        }
                    }
                    if(day == 5){
                        for(var i=0; i<squaresLen; i++){
                            if(squares[0].id.indexOf("f") > -1){
                                squares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<selectSq; i++){
                            if(selectSquares[0].id.indexOf("f") > -1){
                                selectSquares[0].className = "locked";
                            }
                        }

                        for(var i=0; i<squareLockLen; i++){
                            if(squaresLocked[i].id.indexOf("f") > -1){
                                squaresLocked[i].classList.add("lockUnavailable")
                                
                            }
                        }
                    }

                    day++;
                }
            }
        },
        ifClassIsLocked(classTL: DOMTokenList){

            for(var i=0; i<classTL.length; i++){
                if(classTL.item(i) == "lockUnavailable"){
                    return true
                }
            }
            return false;
        },
        checkLockedSchedule(squares: HTMLCollection){

            var i, j, k, n;

            n=0;

            const listL = squares.length;

            for(i = 0; i < listL; i++){
                for(j = 0; j < this.scheduledHours.length; j++){
                    if(squares[n].id == this.scheduledHours[j]){
                        if(!this.ifClassIsLocked(squares[n].classList)){
                            this.scheduledHours.splice(j,1);
                            squares[n].className = "active";
                        }
                        else{
                            this.scheduledHours.splice(j,1);
                        }
                        break;
                    }
                    else if(j == this.scheduledHours.length-1){
                        n++;
                    }
                }
            }

        },
        currentDateTime(day: number) {
            const current = new Date();
            const currentDay = current.getDay();
            const currentDate = current.getDate();
            //casos que no funcionan: checarlo en sabado/domingo, primeras y ultimas fechas del mes, 
            for(var i = -5; i < 6; i++){
                var tempDate = currentDate+i +(Number(this.weekLock)*7);
                var tempMonth = current.getMonth();
                var lengthMonth1 = 31;
                var lengthMonth2 = 30;
                if (tempMonth < 7){
                    lengthMonth1 = 30;
                    lengthMonth2 = 31;
                }
                if (tempDate <= 0){
                    var negativeDate = tempDate;
                    tempMonth = (current.getMonth()-1);
                    if (tempMonth == 0){
                        tempDate = 31 + negativeDate;
                    }
                    else if (tempMonth == 1){
                        if ((current.getFullYear() % 4) == 0){
                            tempDate = 29 + negativeDate;
                        }
                        else {
                            tempDate = 28 + negativeDate;
                        }
                    }
                    else if ((tempMonth % 2) == 0){
                        tempDate = 31 + negativeDate;
                    }
                    else {
                        tempDate = 30 + negativeDate;
                    }
                    if(currentDay+i == day){
                        const date = (tempDate)+' '+(this.getMonth(tempMonth));
                        return date;
                    }
                }
                else if(tempDate > 31 && tempMonth == 0 && currentDay+i == day){
                    const date = -(31-tempDate)+' '+(this.getMonth(tempMonth+1));
                    return date;
                }
                else if(tempDate > lengthMonth1 && (tempMonth % 2 != 0) && currentDay+i == day){
                    const date = -(lengthMonth1-tempDate)+' '+(this.getMonth(tempMonth+1));
                    return date;
                }
                else if(tempDate > lengthMonth2 && (tempMonth % 2 == 0) && currentDay+i == day){
                    const date = -(lengthMonth2-tempDate)+' '+(this.getMonth(tempMonth+1));
                    return date;
                }
                else if(tempDate > 28 && tempMonth == 1 && currentDay+i == day){
                    const date = -(28-tempDate)+' '+(this.getMonth(tempMonth+1));
                    return date;
                }
                else if(currentDay+i == day) {
                    const date = (tempDate)+' '+(this.getMonth(tempMonth));
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
        clearLockedSchedule(){
            const squares = document.getElementsByClassName("active");
            const unavailableS = document.getElementsByClassName("lockUnavailable");
            const squaresSelect = document.getElementsByClassName("selected");

            let lengthS = squares.length;
            let lengthSel = squaresSelect.length;
            let lengthUn = unavailableS.length;

            if(this.activeLockWeek){
                for (var _i = 0; _i < lengthUn; _i++) {
                    unavailableS[0].classList.remove("lockUnavailable")
                } 
            }

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

            clearButton.style.display = "none";
        }, 
        saveHourSelected(event: Event){
            const square = document.getElementById((event.target as HTMLInputElement).id) as HTMLInputElement;
            const squares = document.getElementsByClassName("active") as HTMLCollection;
            const squaresSelect = document.getElementsByClassName("selected") as HTMLCollection;

            let lengthS = squares.length;
            let lengthSel = squaresSelect.length;

            if(((event.target as HTMLInputElement).className) == "active"){
                for(var i=0; i<lengthS; i ++){
                    squares[i].className = "active";
                }

                for(var i=0; i<lengthSel; i ++){
                    squaresSelect[i].className = "active";
                }

                square.className = "selected";

                this.$emit("session-enable-btn")

                localStorage.setItem("sessionSelected", square.id);
            }
        }  
    }
})
</script>

<template>
    <body class="schedule-body">
        <div id="weekly-schedule">
            <div class="date-header">
                <h2 class="col-sm-1"></h2>
                <div class="day-date">
                    <h2 class="col-sm-3">Lunes</h2>
                    <h2 class="date">{{currentDateTime(1)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3">Martes</h2>
                    <h2 class="date">{{currentDateTime(2)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3">Miercoles</h2>
                    <h2 class="date">{{currentDateTime(3)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3">Jueves</h2>
                    <h2 class="date">{{currentDateTime(4)}}</h2>
                </div>
                <div class="day-date">
                    <h2 class="col-sm-3">Viernes</h2>
                    <h2 class="date">{{currentDateTime(5)}}</h2>
                </div>
            </div>
            <div class="row">
                <h2 class="col-sm">8:00</h2>
                <div class="locked" id="m8" @click="saveHourSelected"></div>
                <div class="locked" id="t8" @click="saveHourSelected"></div>
                <div class="locked" id="w8" @click="saveHourSelected"></div>
                <div class="locked" id="th8" @click="saveHourSelected"></div>
                <div class="locked" id="f8" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">9:00</h2>
                <div class="locked" id="m9" @click="saveHourSelected"></div>
                <div class="locked" id="t9" @click="saveHourSelected"></div>
                <div class="locked" id="w9" @click="saveHourSelected"></div>
                <div class="locked" id="th9" @click="saveHourSelected"></div>
                <div class="locked" id="f9" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">10:00</h2>
                <div class="locked" id="m10" @click="saveHourSelected"></div>
                <div class="locked" id="t10" @click="saveHourSelected"></div>
                <div class="locked" id="w10" @click="saveHourSelected"></div>
                <div class="locked" id="th10" @click="saveHourSelected"></div>
                <div class="locked" id="f10" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">11:00</h2>
                <div class="locked" id="m11" @click="saveHourSelected"></div>
                <div class="locked" id="t11" @click="saveHourSelected"></div>
                <div class="locked" id="w11" @click="saveHourSelected"></div>
                <div class="locked" id="th11" @click="saveHourSelected"></div>
                <div class="locked" id="f11" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">12:00</h2>
                <div class="locked" id="m12" @click="saveHourSelected"></div>
                <div class="locked" id="t12" @click="saveHourSelected"></div>
                <div class="locked" id="w12" @click="saveHourSelected"></div>
                <div class="locked" id="th12" @click="saveHourSelected"></div>
                <div class="locked" id="f12" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">13:00</h2>
                <div class="locked" id="m13" @click="saveHourSelected"></div>
                <div class="locked" id="t13" @click="saveHourSelected"></div>
                <div class="locked" id="w13" @click="saveHourSelected"></div>
                <div class="locked" id="th13" @click="saveHourSelected"></div>
                <div class="locked" id="f13" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">14:00</h2>
                <div class="locked" id="m14" @click="saveHourSelected"></div>
                <div class="locked" id="t14" @click="saveHourSelected"></div>
                <div class="locked" id="w14" @click="saveHourSelected"></div>
                <div class="locked" id="th14" @click="saveHourSelected"></div>
                <div class="locked" id="f14" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">15:00</h2>
                <div class="locked" id="m15" @click="saveHourSelected"></div>
                <div class="locked" id="t15" @click="saveHourSelected"></div>
                <div class="locked" id="w15" @click="saveHourSelected"></div>
                <div class="locked" id="th15" @click="saveHourSelected"></div>
                <div class="locked" id="f15" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">16:00</h2>
                <div class="locked" id="m16" @click="saveHourSelected"></div>
                <div class="locked" id="t16" @click="saveHourSelected"></div>
                <div class="locked" id="w16" @click="saveHourSelected"></div>
                <div class="locked" id="th16" @click="saveHourSelected"></div>
                <div class="locked" id="f16" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">17:00</h2>
                <div class="locked" id="m17" @click="saveHourSelected"></div>
                <div class="locked" id="t17" @click="saveHourSelected"></div>
                <div class="locked" id="w17" @click="saveHourSelected"></div>
                <div class="locked" id="th17" @click="saveHourSelected"></div>
                <div class="locked" id="f17" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">18:00</h2>
                <div class="locked" id="m18" @click="saveHourSelected"></div>
                <div class="locked" id="t18" @click="saveHourSelected"></div>
                <div class="locked" id="w18" @click="saveHourSelected"></div>
                <div class="locked" id="th18" @click="saveHourSelected"></div>
                <div class="locked" id="f18" @click="saveHourSelected"></div>
            </div>
            <div class="row">
                <h2 class="col-sm">19:00</h2>
                <div class="locked" id="m19" @click="saveHourSelected"></div>
                <div class="locked" id="t19" @click="saveHourSelected"></div>
                <div class="locked" id="w19" @click="saveHourSelected"></div>
                <div class="locked" id="th19" @click="saveHourSelected"></div>
                <div class="locked" id="f19" @click="saveHourSelected"></div>
            </div>
        </div>
    </body>
</template>


<style scoped>

    /* General styles */

    .schedule-body{
        margin: 0vh 0.5vw 0.5vh 0.5vw;
        width: 46vw;
        display: flex;
        flex-direction: column;
        align-items: v-bind(alignItemsVal);
        background-color: transparent;
    }

    button {
        font-family: "Ubuntu";
        font-weight: normal;
        color: white;
        font-size: 2.5vh;
        padding: 0.5vh 1.1vw;
        border-radius: 15px;
        border: 2.5px solid transparent;
        background-color: #26408B;
        box-sizing: border-box;
        margin-top: 4vh;
    }
    
    .button-container-schedule{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .date-header{
        display: flex;
        direction: column;
        height: 6vh;
        align-content: center;
        align-items: center;
        justify-content: flex-end;
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
        padding: 1vh 0 0 0;
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

    /* Error message container */

    img{
        width: 2.5%;
        height: auto;
    }

    .warning-container{
        display: none;
        align-items: center;
        height: fit-content;
        width: 100%;
        gap: 1vw;
    }

    #error-message-h2{
        text-align: start;
        width: fit-content;
        color: rgb(221, 31, 31);
        font-family: "Catamaran";
        font-weight: lighter;
        margin:0;
    }

    /* Class for when a div has been unselected */

    .inactive, 
    .active,
    .locked,
    .selected,
    .unavailable,
    .available,
    .lockUnavailable{
        width: 7vw;
        height: 4vh;
        border: 2.5px solid #000000;
        box-sizing: border-box;
        border-radius: 12px;
        margin: 0.5vh 0.5vw;
    }

    .inactive,
    .active,
    .selected{
        cursor: pointer;
    }

    .lockUnavailable{
        background-color: #B8B8B8;
    }

    .selected{
        background-color: v-bind(selectedColor);
    }

    /* Class for when a div has been selected */
    .active {
        background-color: v-bind(baseColor);
    }

    .available{
        background-color: v-bind(baseColor);
    }

    .unavailable{
        background-color: v-bind(unavailableColor);
    }

    .locked:hover {
        background-color: none;
    }

    .inactive:hover{
        background-color: v-bind(hoverColor);
    }



</style>