// store.ts
import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    selectedHours: String[],
    selectedClass: String[],
    sessionSelected: String
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        selectedHours: [],
        selectedClass: [],
        sessionSelected: ""
    },
    mutations: {
        setHours(state, val){
            state.selectedHours = val;
        },
        setClassName(state, val){
            state.selectedClass = val;
        },
        setSessionSelected(state, val){
            state.sessionSelected = val;
        }
    }
})

// define your own `useStore` composition function
export function useStore () {
    return baseUseStore(key)
}