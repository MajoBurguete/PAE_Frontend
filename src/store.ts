// store.ts
import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
    count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0
    },
    mutations: {
        setValue(state, val){
            state.count = val;
        }
    }
})

// define your own `useStore` composition function
export function useStore () {
    return baseUseStore(key)
}