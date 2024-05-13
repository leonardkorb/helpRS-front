import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from '../../images/logo.png'

const Header = () => {

    const [menuMobile, setMenuMobile] = useState(false)
    let width = 0
    if (typeof window !== 'undefined') {
        // Your client-side code that uses window goes here
        width = window.screen.width;
    }

    useEffect(() => {

    }, [width])

    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container >
                    <Navbar.Brand href="/"><img style={{ width: 70 }} src={Logo} /> HELP RS</Navbar.Brand>

                    {width < 1024 ? <Button variant="light" onClick={() => setMenuMobile(true)}>Menu</Button> : (
                        <Nav className="me-auto">
                            <Nav.Link href="/list/missing">Desaparecidos</Nav.Link>
                            <Nav.Link href="/list/missingpets">Pets Desaparecidos</Nav.Link>
                            <Nav.Link href="/list/shelters">Abrigos</Nav.Link>
                            <Nav.Link href="/list/donations">Donativos</Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-create">
                                    Cadastrar
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/create/missing">Pessoa Desaparecida</Dropdown.Item>
                                    <Dropdown.Item href="/create/missingpets">Animal Desaparecido</Dropdown.Item>
                                    <Dropdown.Item href="/create/shelters">Abrigo</Dropdown.Item>
                                    <Dropdown.Item href="/create/donations">Ajuda aos desabrigados</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                    {menuMobile ? (
                        <div className="menu-container">
                            <div className="menu-mobile">
                                <header>
                                    <button onClick={() => setMenuMobile(false)}>x</button>
                                </header>

                                <section>
                                    <h5>Listas</h5>
                                    <Nav.Link href="/list/missing">Desaparecidos</Nav.Link>
                                    <Nav.Link href="/list/missingpets">Pets Desaparecidos</Nav.Link>
                                    <Nav.Link href="/list/shelters">Abrigos</Nav.Link>
                                    <Nav.Link href="/list/donations">Donativos</Nav.Link>
                                </section>
                                <section>
                                    <h5>Cadastre</h5>
                                    <Nav.Link href="/create/missing">Pessoa Desaparecida</Nav.Link>
                                    <Nav.Link href="/create/missingpets">Animal Desaparecido</Nav.Link>
                                    <Nav.Link href="/create/shelters">Abrigo</Nav.Link>
                                    <Nav.Link href="/create/donations">Ajuda aos desabrigados</Nav.Link>
                                    
                                </section>
                            </div>
                        </div>

                    ) : null}
                </Container>
            </Navbar>
        </header>
    )
}

export default Header