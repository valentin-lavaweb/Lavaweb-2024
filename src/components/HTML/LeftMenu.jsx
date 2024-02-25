import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useStore } from '../../store'


export default function LeftMenu() {
    const store = useStore()

    const location = useLocation()
    const navigate = useNavigate()
    const leftMenuActivePage = useRef()
    const leftMenuLiMain = useRef()
    const leftMenuLiPortfolio = useRef()
    const leftMenuLiAbout = useRef()
    const leftMenuLiContacts = useRef()
    const href = location.pathname.split(`/`)[1]

    function changePage(link){
        if (location.pathname != link) {
            navigate(link)
        }
    }

    useEffect(() => {
        if (href == '') {
            leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiMain.current.offsetTop}px;`
        }
        if (href == 'portfolio') {
            leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiPortfolio.current.offsetTop}px;`

        }
        if (href == 'about') {
            leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiAbout.current.offsetTop}px;`
        }
        if (href == 'contacts') {
            leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiContacts.current.offsetTop}px;`
        }

        window.addEventListener('resize', () => {
            if (href == '') {
                if (leftMenuActivePage.current != null) {
                    leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiMain.current.offsetTop}px;`
                }
            }
            if (href == 'portfolio') {
                if (leftMenuActivePage.current != null) {
                    leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiPortfolio.current.offsetTop}px;`
                }
            }
            if (href == 'about') {
                if (leftMenuActivePage.current != null) {
                    leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiAbout.current.offsetTop}px;`
                }
            }
            if (href == 'contacts') {
                if (leftMenuActivePage.current != null) {
                    leftMenuActivePage.current.style.cssText = `top: ${leftMenuLiContacts.current.offsetTop}px;`
                }
            }
        })
    })


    return <>
    
    <div className="leftMenuContainer">
        <div className="leftMenuUl" >
                <div className="leftMenuLi" ref={leftMenuLiMain}
                onClick={(e) => {
                    changePage('/')
                }}
                onPointerEnter={() => {store.cursor.hovered = true}}
                onPointerLeave={() => {store.cursor.hovered = false}}
                >
                    <div className={href === "" ? "menuLiNameBlock active" : "menuLiNameBlock"}>Главная</div>
                    <img src="/images/home.svg" />
                </div>

                <div className="leftMenuLi" ref={leftMenuLiPortfolio}
                onClick={(e) => {
                    changePage('/portfolio')
                }}
                onPointerEnter={() => {store.cursor.hovered = true}}
                onPointerLeave={() => {store.cursor.hovered = false}}
                >
                    <div className={href === "portfolio" ? "menuLiNameBlock active" : "menuLiNameBlock"}>Портфолио</div>
                    <img src="/images/portfolio.svg" />
                </div>

                <div className="leftMenuLi" ref={leftMenuLiAbout}
                onClick={(e) => {
                    changePage('/about')
                }}
                onPointerEnter={() => {store.cursor.hovered = true}}
                onPointerLeave={() => {store.cursor.hovered = false}}
                >
                    <div className={href === "about" ? "menuLiNameBlock active" : "menuLiNameBlock"}> О нас </div>
                    <img src="/images/about.svg"/>
                </div>

                <div className="leftMenuLi" ref={leftMenuLiContacts}
                onClick={(e) => {
                    changePage('/contacts')
                }}
                onPointerEnter={() => {store.cursor.hovered = true}}
                onPointerLeave={() => {store.cursor.hovered = false}}
                >
                    <div className={href === "contacts" ? "menuLiNameBlock active" : "menuLiNameBlock"}> Контакты </div>
                    <img src="/images/contacts.svg"/>
                </div>
        </div>
        <div className="leftMenuActivePage" ref={leftMenuActivePage}>
            <div className="leftMenuActivePageLine"></div>
            <div className="leftMenuActivePageName">
                <div className="leftMenuActivePageNameText">
                    Главная
                </div>
            </div>
        </div>
    </div>

    </>
}