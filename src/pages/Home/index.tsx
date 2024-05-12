import { useEffect, useState } from 'react';
import { Card, Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../App.css';
import NotPet from '../../images/notPet.png'

function Home() {
  const fotoPet = NotPet
  const [missings, setMissings] = useState([])
  const [missingsLoading, setMissingsLoading] = useState(true)
  const [missingpets, setMissingpets] = useState([])
  const [missingpetsLoading, setMissingpetsLoading] = useState(true)
  const [shelters, setShelters] = useState([])
  const [sheltersLoading, setSheltersLoading] = useState(true)
  const [donations, setDonations] = useState([])
  const [donationsLoading, setDonationsLoading] = useState(true)


  useEffect(() => {
    fetch('https://helprs-back.onrender.com/missing')
      .then((res) => res.json())
      .then(res => {
        setMissings(res)
        setMissingsLoading(false)
      })
    fetch('https://helprs-back.onrender.com/missingpets')
      .then((res) => res.json())
      .then(res => {
        setMissingpets(res)
        setMissingpetsLoading(false)
      })
    fetch('https://helprs-back.onrender.com/shelters')
      .then((res) => res.json())
      .then(res => {
        setShelters(res)
        setSheltersLoading(false)
      })
    fetch('https://helprs-back.onrender.com/donations')
      .then((res) => res.json())
      .then(res => {
        setDonations(res)
        setDonationsLoading(false)
      })
  }, [])

  return (
    <>
      <main>
        {missings.length > 0 ?
          <section className='missings'>
            <h2>Desaparecidas</h2>
            {
              missingsLoading ? <Spinner animation="grow" /> : <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Idade</th>
                      <th>Cidade</th>
                      <th>descricao</th>
                      <th>encontrado</th>
                      <th>Abrigo</th>

                    </tr>
                  </thead>
                  <tbody>
                    {missings.map((missing: any) => (
                      <tr>
                        <td>{missing.nome}</td>
                        <td>{missing.idade}</td>
                        <td>{missing.cidade}</td>
                        <td>{missing.descricao}</td>
                        <td>{missing.encontrado}</td>
                        <td>{missing.abrigo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {missings.length > 10 ? <button><Link to="/missings"> Ver mais</Link></button> : null}
              </>
            }
          </section> : null
        }

        {missingpets.length > 0 ?
          <section className='missingpets'>
            <h2>Animais desaparidos</h2>
            {missingpetsLoading ? <Spinner animation="grow" /> : <>
              <div className='container-card'>
                {missingpets.map((missingPets: any) => (
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={missingPets.url_imagem !== '' ? missingPets.url_imagem : fotoPet} />
                    <Card.Body>
                      <Card.Title>{missingPets.nome}</Card.Title>
                      <Card.Text> {missingPets.descricao} </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              {missingpets.length > 10 ? <button><Link to="/missingpets"> Ver mais</Link></button> : null}
            </>
            }
          </section> : null
        }
        {shelters.length > 0 ?
          <section className='shelters'>
            <h2>Abrigos</h2>
            {sheltersLoading ?
              <Spinner animation="grow" /> : <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shelters.map((missing: any) => (
                      <tr>
                        <td>{missing.nome}</td>
                        <td>{missing.cidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {shelters.length > 10 ? <button><Link to="/shelters"> Ver mais</Link></button> : null}
              </>
            }
          </section> : null
        }

        {donations.length > 0 ?
          <section className='donations'>
            <h2>Pix confiaveis</h2>
            {
              donationsLoading ? <Spinner animation="grow" /> : <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((missing: any) => (
                      <tr>
                        <td>{missing.nome}</td>
                        <td>{missing.cidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {donations.length > 10 ? <button><Link to="/donations"> Ver mais</Link></button> : null}

              </>
            }
          </section> : null
        }
      </main >
    </>
  );
}

export default Home;
