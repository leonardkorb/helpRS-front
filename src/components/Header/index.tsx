import { useEffect } from "react";

const Header = () => {
    let width = 0
    if (typeof window !== 'undefined') {
        // Your client-side code that uses window goes here
        width = window.screen.width;
    }

    useEffect(() => {
        console.log(width)

    }, [width])


    const menuList = (
        <>
            <ul>
                <li><a href="/">Abrigos</a></li>
                <li><a href="/">Doações</a></li>
                <li><a href="/">Cadastrar desaparecido</a></li>
                <li><a href="/">Cadastrar Animal</a></li>
                <li><a href="/">Lista de pessoas encontradas</a></li>
            </ul>
        </>
    )

    return (
        <header>
            <div>
                <span>
                    Help RS
                </span>


                {width < 998 ? (
                    <></>
                ) : menuList}


            </div>

        </header>
    )
}

export default Header