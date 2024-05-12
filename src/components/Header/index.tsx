import { useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
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
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
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
                </Container>
            </Navbar>
        </header>
    )
}

export default Header