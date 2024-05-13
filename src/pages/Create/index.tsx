import { useEffect, useState } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { ListaDeCidade } from "../../listaDeCidades";


const Create = () => {
    const pathName = window.location.pathname.replace('/create/', '')
    const [headerTable, setHeaderTable] = useState<any>([])
    const [nome, setnome] = useState("")
    const [idade, setidade] = useState("")
    const [cidade, setcidade] = useState("")
    const [descricao, setdescricao] = useState("")
    const [tipo, settipo] = useState("")
    const [raca, setraca] = useState("")
    const [url_imagem, seturl_imagem] = useState("")
    const [url_maps, seturl_maps] = useState("")
    const [instituicao, setinstituicao] = useState("")
    const [chave_pix, setchave_pix] = useState("")
    const [link, setlink] = useState("")
    const [title, setTitle] = useState("")
    const [typeAlert, setTypeAlert] = useState("")
    const [mensagemAlert, setMensagemAlert] = useState("")
    const [mostraAlerta, setMostraAlerta] = useState(false)
    const [sendForm, setSendForm] = useState(false)

    useEffect(() => {
        switch (pathName) {
            case "missing":
                setTitle("Cadastro de Pessoa desaparecida")
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "idade", "value": "Idade" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "descricao", "value": "Descrição" }
                ])
                break;

            case "missingpets":
                setTitle("Cadastro de Animal desaparecido")
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "idade", "value": "Idade" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "tipo", "value": "Tipo" },
                    { "key": "raca", "value": "Raça" },
                    { "key": "descricao", "value": "Descrição" },
                    { "key": "url_imagem", "value": "Imagem" },
                ])
                break;
            case "shelters":
                setTitle("Cadastro de Abrigo")
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "cidade", "value": "Cidade" },
                    { "key": "url_maps", "value": "Endereço" },
                ])
                break;
            case "donations":
                setTitle("Cadastro de Donativos")
                setHeaderTable([
                    { "key": "nome", "value": "Nome" },
                    { "key": "instituicao", "value": "Instituição" },
                    { "key": "chave_pix", "value": "Pix" },
                    { "key": "link", "value": "link" },
                ])
                break;

            default:

                break;
        }
    }, [pathName])

    async function submit() {
        let body: any
        switch (pathName) {
            case "missing":
                body = {
                    nome,
                    idade,
                    cidade,
                    descricao,
                }
                break;
            case "missingpets":
                body = {
                    nome,
                    idade,
                    cidade,
                    tipo,
                    raca,
                    descricao,
                    url_imagem
                }
                break;
            case "shelters":
                body = {
                    nome,
                    cidade,
                    url_maps,
                }
                break;
            case "donations":
                body = {
                    nome,
                    instituicao,
                    chave_pix,
                    link,
                }
                break;
        }

        let arrayList: any = []

        document.querySelectorAll(".form-control").forEach((elem: any) => {
            if (elem.value === "") {
                return arrayList.push(undefined)
            } else {
                return arrayList.push(elem.value)
            }
        });

        document.querySelectorAll(".form-select").forEach((elem: any) => {
            if (elem.value === "") {
                return arrayList.push(undefined)
            } else {
                return arrayList.push(elem.value)
            }
        });

        if (arrayList.indexOf(undefined) > -1) {
            setTypeAlert("danger")
            setMostraAlerta(true)
            setMensagemAlert("Preencha todos os campos")
        } else {
            setSendForm(false)
            await fetch(`https://helprs-back.onrender.com/${pathName}`, {
                method: "POST",
                body: JSON.stringify(body)
            }).then((req) => {
                if (req.status === 201) {
                    setTypeAlert("success")
                    setMostraAlerta(true)
                    setMensagemAlert("Salvo com sucesso. Estamos torcendo pelo RS, sinta-se abraçado! ❤️‍🩹")


                    document.querySelectorAll('.mb-3 input').forEach((data: any) => data.value = "")
                    document.querySelectorAll('#cidade').forEach((data: any) => data.value = "")

                    setTimeout(() => {
                        setTypeAlert('')
                        setMensagemAlert('')
                        setMostraAlerta(false)
                        setSendForm(false)
                    }, 10000)

                } else {
                    setSendForm(false)
                    setTypeAlert("danger")
                    setMostraAlerta(true)
                    setMensagemAlert("Tente novamente mais tarde, serviço indisponível")
                }
            })
        }
    }

    return (
        <main>
            <Form>
                <h3>{title}</h3>
                {mostraAlerta ?
                    <Alert style={{ textAlign: "center" }} key={typeAlert} variant={typeAlert}>
                        {mensagemAlert}
                    </Alert>
                    : null}
                {sendForm ? <Spinner animation="grow" /> : <>
                    {headerTable.map((input_form: any) => {
                        if (input_form.key === "cidade") {
                            return (
                                <Form.Group className="mb-3" controlId="formGridState">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Select id='cidade' defaultValue="" onChange={(e) => setcidade(e.target.value)}>
                                        <option></option>
                                        {ListaDeCidade.map((cidade: any) => <option value={cidade} key={cidade}>{cidade}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            )
                        } else {
                            return (
                                <Form.Group className="mb-3" controlId={input_form.key}>
                                    <Form.Label>{input_form.value}</Form.Label>
                                    <Form.Control placeholder={input_form.value} onBlur={() => {
                                        let input = (document.getElementById(input_form.key) as HTMLInputElement | null)?.value;
                                        if (input === "") {
                                            document.getElementById(input_form.key)?.setAttribute('required', '')
                                        }
                                    }} onChange={(e: any) => {
                                        let input = (document.getElementById(input_form.key) as HTMLInputElement | null)?.value;
                                        if (input !== "") {
                                            document.getElementById(input_form.key)?.removeAttribute('required')
                                        }
                                        switch (input_form.key) {
                                            case 'nome':
                                                setnome(e.target.value)
                                                break;
                                            case 'idade':
                                                setidade(e.target.value)
                                                break;
                                            case 'descricao':
                                                setdescricao(e.target.value)
                                                break;
                                            case 'tipo':
                                                settipo(e.target.value)
                                                break;
                                            case 'raca':
                                                setraca(e.target.value)
                                                break;
                                            case 'url_imagem':
                                                seturl_imagem(e.target.value)
                                                break;
                                            case 'url_maps':
                                                seturl_maps(e.target.value)
                                                break;
                                            case 'instituicao':
                                                setinstituicao(e.target.value)
                                                break;
                                            case 'chave_pix':
                                                setchave_pix(e.target.value)
                                                break;
                                            case 'link':
                                                setlink(e.target.value)
                                                break;

                                            default:
                                                break;
                                        }
                                    }} />
                                </Form.Group>
                            )
                        }
                    })}

                    <Button onClick={(e: any) => {
                        e.preventDefault()
                        headerTable.map((item: any) => {
                            let input = (document.getElementById(item.key) as HTMLInputElement | null)?.value;
                            if (input === "") {
                                return document.getElementById(item.key)?.setAttribute('required', '')
                            } else {
                                return document.getElementById(item.key)?.removeAttribute('required')
                            }
                        })
                        submit()
                    }} variant="primary">Enviar</Button>

                </>}
            </Form>

        </main>
    )
}

export default Create