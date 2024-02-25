import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import App from './3D/App.jsx'
// import TransitionComponent from './HTML/transitionComponent/TransitionComponent.jsx'
// import BottomLoadComponent from './HTML/bottomLoadComponent/BottomLoadComponent.jsx'
import SoundComponent from './HTML/soundComponent/SoundComponent.jsx'
import CursorComponent from './HTML/cursorComponent/CursorComponent.jsx'

export default function MainContent() {
    const location = useLocation()
    const [rendered, setRendered] = useState(false)
    const [activePage, setActivePage] = useState(location.pathname)
    
    useEffect(() => {
        setRendered(true)
        setActivePage(location.pathname)
    }, [location])

    useEffect(() => {
        document.getElementById('root').style.cssText = `z-index: 3;`
    }, []);


    // // TRANSITION BETWEEN PAGES
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //     setCurrentPage(location.pathname);
    //     }, 500)

    //     return () => {
    //     clearTimeout(timeoutId);
    //     }
    // }, [location]);



    return <>
        <App 
        location={location} 
        rendered={rendered} setRendered={setRendered} 
        activePage={activePage} setActivePage={setActivePage}
        />
        {/* <SoundComponent rendered={rendered}/> */}
        {/* <CursorComponent rendered={rendered} /> */}
        {/* <TransitionComponent /> */}
    </>
}