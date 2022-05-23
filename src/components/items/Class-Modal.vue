<script lang="ts">
    import { defineComponent } from 'vue'
    import ClassFilter from "../items/Class-Filter.vue"


    export default defineComponent({
        components: {
            ClassFilter
        },
        props: { 
            callUpdate: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                cancelBtn: false,
                saveBtn: false,
                disabledV: true,
                forceFilterUpdate: false
            }
            
        },
        updated(){
            if(this.callUpdate){
                this.changeUpdate = true;
            }
            else{
                this.changeUpdate = false;
            }
        },
        computed:{
            onClickCancelBtn: {
                get(){
                    return this.cancelBtn;
                },
                set(val){
                    this.cancelBtn = val;
                }
            },
            onClickSaveBtn: {
                get(){
                    return this.saveBtn;
                },
                set(val){
                    this.saveBtn = val;
                }
            },
            isDisabled: {
                get(){
                    return this.disabledV;
                },
                set(val){
                    this.disabledV = val;
                }
            },
            changeUpdate: {
                get(){
                    return this.forceFilterUpdate;
                },
                set(val){
                    this.forceFilterUpdate = val;
                }
            }
        },
        methods: {
            clickCancel(){
                this.onClickCancelBtn = true;
            },
            clickSave(){
                this.onClickSaveBtn = true;
            },
            cancelEvent(){
                this.onClickCancelBtn = false;
            },
            saveEvent(){
                this.onClickSaveBtn = false;
                this.disableButton();
                this.checkClasses();
            },
            updateEvent(){
                this.changeUpdate = false
                this.$emit("modal-update")
                this.$forceUpdate();
            },
            disableButton(){
                this.isDisabled = true;
                this.$forceUpdate();
            },
            enableButton(){
                this.isDisabled = false;
                this.$forceUpdate();
            },
            checkClasses(){
                const lcSelectedClass = localStorage.getItem("classesSelected");

                if(lcSelectedClass.length == 0){
                    this.$emit("disable-classes");
                }
                else{
                    this.$emit("enable-classes");
                }
            }
        }
        
    })
</script>

<template>
    <body>
        <ClassFilter :cancelClick="onClickCancelBtn" :saveClick="onClickSaveBtn" v-on:cancel-btn="cancelEvent" v-on:save-btn="saveEvent" v-on:disable-btn="disableButton" v-on:enable-btn="enableButton" v-on:update-made="updateEvent" :callForceUpdate="changeUpdate"/>
        <div class="button-container">
            <button id="cancel-button" data-bs-dismiss="modal" aria-label="Close" @click="clickCancel"> Cancelar </button>
            <button id="save-button"  data-bs-dismiss="modal" aria-label="Close" @click="clickSave" :disabled="isDisabled"> Guardar cambios </button>
        </div>
    </body>
</template>

<style scoped>
    body{
        width: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
    }

    button{
        padding: 0.5vh 2vw;
        margin: 1vh 0;
        font-family: "Ubuntu";
        font-size: 3vh;
        font-weight: normal;
        border-color: transparent;
        border-radius: 0.7vh;
        color: white;
    }


    .button-container{
        display: flex;
        gap: 2vw;
    }

    #cancel-button{
        background-color: #9EB2ED;
    }

    #save-button{
        background-color: #26408B;
    }

    #save-button:disabled{
        background-color: #3b4f8a9f;
        color: rgba(255, 255, 255, 0.677);
    }

</style>