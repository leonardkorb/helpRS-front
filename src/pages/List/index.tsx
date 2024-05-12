import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

const List = () => {
    const pathName = window.location.pathname.replace('/list/', '')
    const [itens, setItens] = useState([])
    const [itensLoading, setItensLoading] = useState(true)
    const [headerTable, setHeaderTable] = useState<any>([])

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
                    { "key": "validado", "value": "É Valido" },
                ])
                break;

            default:

                break;
        }
    }, [pathName])

    return (
        <>
            <main>

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
                                    <tr key={index}>
                                        {headerTable.map((meTh: any, i: any) => <th key={i}>{missing[meTh.key]}</th>)}
                                    </tr>
                                ))}
                            </>
                        }
                    </tbody>
                </Table>
            </main>
        </>
    )
}

export default List