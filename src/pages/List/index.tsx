import { useEffect, useState } from "react";
import { Spinner, Table, Form, Button, Badge, Modal } from "react-bootstrap";

const List = () => {
    const pathName = window.location.pathname.replace('/list/', '')
    const [itens, setItens] = useState([])
    const [itensLoading, setItensLoading] = useState(true)
    const [headerTable, setHeaderTable] = useState<any>([])
    const [inputSearch, setInputSearch] = useState<any>([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`https://helprs-back.onrender.com/${pathName}`)
            .then((res) => res.json())
            .then(res => {
                setItens(res)
                setItensLoading(false)
            })

        switch (pathName) {
            case "missing":
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "idade", "value": "Idade" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "descricao", "value": "Descrição" },
                    { "key": "encontrado", "value": "Encontrado" },
                    { "key": "shelters", "value": "Abrigo" },
                ])
                break;

            case "missingpets":
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "idade", "value": "Idade" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "tipo", "value": "Tipo" },
                    { "key": "raca", "value": "Raça" },
                    { "key": "descricao", "value": "Descrição" },
                    { "key": "encontrado", "value": "Encontrado" },
                    { "key": "shelters", "value": "Abrigo" },
                    { "key": "url_imagem", "value": "Imagem" },
                ])
                break;
            case "shelters":
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "url_maps", "value": "Endereço" },
                ])
                break;
            case "donations":
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "instituicao", "value": "Instituição" },
                    { "key": "chave_pix", "value": "Pix" },
                    { "key": "link", "value": "link" },
                    { "key": "validado", "value": "Validado" },
                ])
                break;

            default:

                break;
        }
    }, [pathName])

    function search() {
        setItensLoading(true)
        fetch(`https://helprs-back.onrender.com/${pathName}?search=${inputSearch}`)
            .then((res) => res.json())
            .then(res => {
                setItens(res)
                setItensLoading(false)
            })
    }

    function editMissing(missing: any) {
        console.log(missing)
        // fetch(`https://helprs-back.onrender.com/${pathName}?search=${inputSearch}`)
        // .then((res) => res.json())
        // .then(res => {
        //     setItens(res)
        //     setItensLoading(false)
        // })
    }

    return (
        <>
            <main className="container">
                <div className="container_search">
                    <Form.Control
                        onChange={(e: any) => setInputSearch(e.target.value)}
                        id="inputPassword5"
                        placeholder="Procure por Nome"
                    />
                    <Button onClick={() => search()}>Procucurar</Button>
                </div>
                <Table striped bordered hover>
                    <thead>

                        <tr >
                            {headerTable.map((meTh: any, index: any) => <th key={index}>{meTh.value}</th>)}
                        </tr>

                    </thead>
                    <tbody>
                        {itensLoading ? <Spinner /> :
                            <>
                                {itens.map((missing: any, index) => (
                                    <tr key={index} onClick={() => editMissing(missing)}>
                                        {headerTable.map((meTh: any, i: any) => {
                                            console.log(meTh.key)
                                            if (meTh.key === "validado" || meTh.key === "encontrado") {
                                                return (
                                                    <th key={i}>{missing[meTh.key] ? <Badge bg="primary">Sim</Badge> : <Badge bg="warning">Não</Badge>}</th>
                                                )
                                            } else {
                                                return <th key={i}>{missing[meTh.key]}</th>
                                            }

                                        })}
                                    </tr>
                                ))}
                            </>
                        }
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGridState">
                                <Form.Label>Encontrado</Form.Label>
                                <Form.Select id='abrigos' defaultValue="" >
                                    <option>Sim</option>
                                </Form.Select>
                                <Form.Label>Abrigos</Form.Label>
                                <Form.Select id='abrigos' defaultValue="" >
                                    <option>Abrigos</option>
                                    <option>Abrigos2</option>
                                    <option>Abrigos3</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </>
    )
}

export default List