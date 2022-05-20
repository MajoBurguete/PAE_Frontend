// store.ts
import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    selectedHours: String[],
    selectedClass: String[],
    hoursAvailable: String[],
    sessionSelected: String
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        selectedHours: [],
        selectedClass: [],
        hoursAvailable:[],
        sessionSelected: ""
    },
    mutations: {
        setHours(state, val){
            state.selectedHours = val;
        },
        setClassName(state, val){
            state.selectedClass = val;
        },
        setHoursAvailable(state, val){
            state.hoursAvailable = val;
        },
        setSessionSelected(state, val){
            state.sessionSelected = val;
        }
    },
    getters: {
        getClassName: state => {
            return state.selectedClass;
        },
        state(state) {
            return state;
          }
    }
})

// define your own `useStore` composition function
export function useStore () {
    return baseUseStore(key)
}