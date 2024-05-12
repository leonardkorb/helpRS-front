import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [missing, setMissing] = useState([])
  const [missingpets, setMissingpets] = useState([])
  const [shelters, setShelters] = useState([])
  const [donations, setDonations] = useState([])


  useEffect(() => {
    fetch('http://localhost:3001/missing').then((res) => console.log('missing', res.body))
    fetch('https://helprs-back.onrender.com/missingpets', {
      headers: {
        "Access-Control-Allow-Origin": "no-cors"
      }
    }).then((res) => console.log('missingpets', res.body))
    fetch('https://helprs-back.onrender.com/shelters', {
      headers: {
        "Access-Control-Allow-Origin": "no-cors"
      }
    }).then((res) => console.log('shelters', res.body))
    fetch('https://helprs-back.onrender.com/donations', {
      headers: {
        "Access-Control-Allow-Origin": "no-cors"
      }
    }).then((res) => console.log('donations', res.body))
  }, [])





  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Lista de pessoas desaparecidas</h2>
          <ul>
            <li>João</li>
            <li>João</li>
            <li>João</li>
            <li>João</li>
            <li>João</li>
          </ul>
          <button>Ver mais</button>
        </section>

        <section>
          <h2>Animais desaparidos</h2>
          <ul>
            <li><img /> bob</li>
            <li><img /> bob</li>
            <li><img /> bob</li>
            <li><img /> bob</li>
            <li><img /> bob</li>
          </ul>
          <button>Ver mais</button>
        </section>

        <section>
          <h2>Abrigos</h2>
          <ul>
            <li>Quadra de esposrtes: Rua ......</li>
            <li>Quadra de esposrtes: Rua ......</li>
            <li>Quadra de esposrtes: Rua ......</li>
            <li>Quadra de esposrtes: Rua ......</li>
            <li>Quadra de esposrtes: Rua ......</li>
          </ul>
          <button>Ver mais</button>
        </section>

        <section>
          <h2>Lista de itens para doação</h2>
          <ul>
            <li>Agua</li>
            <li>Comida</li>
            <li>Roupas</li>
            <li>Cobertas</li>
          </ul>
          <button>Ver mais</button>
        </section>

        <section>
          <h2>Pix confiaveis</h2>
          <ul>
            <li>Pretinho basico</li>
            <li>Pretinho basico</li>
            <li>Pretinho basico</li>
            <li>Pretinho basico</li>
          </ul>
          <button>Ver mais</button>
        </section>
      </main>
    </>
  );
}

export default App;
