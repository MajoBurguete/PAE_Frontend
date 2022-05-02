// store.ts
import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    selectedHours: String[],
    selectedClass: String[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        selectedHours: [],
        selectedClass: []
    },
    mutations: {
        setHours(state, val){
            state.selectedHours = val;
        },
        setClassName(state, val){
            state.selectedClass = val;
        }
    }
})

// define your own `useStore` composition function
export function useStore () {
    return baseUseStore(key)
}