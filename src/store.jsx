import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

const store = proxy({ 
    openedCase: false,
    scroll: 0,
    cursor: {
        hovered: false,
        x: 0,
        y: 0
    },
    soundsActive: false,
    transitionSound: false,
    timeG: 0
})
export const useStore = () => useProxy(store)