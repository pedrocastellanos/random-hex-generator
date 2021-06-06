import React, {useEffect, useState} from 'react';
import Clipboard from 'react-clipboard.js';
import './App.css';
import Copied from './Copied';

function App() {
  const [boxs, setBoxs] = useState([])
  const [copied, setCopied] = useState(false)
  
  const RandomHexColorCode = ()=>{
    let chars = "0123456789abcdef"
    let color = ""

    for (let i = 0; i < 6; i++) {
        let randomColor = Math.floor(Math.random()* chars.length)    
        color += chars.substring(randomColor, randomColor+1)
    }
    return "#"+color
  }

  const generateColors=()=>{
    let arrayToCopy=[]
    for (let i = 0; i < 100; i++) {
      let color = RandomHexColorCode()
      arrayToCopy.push(color)
    }
    setBoxs(arrayToCopy)
  }
  
  useEffect(()=>{
    generateColors()
  },[])

  const handleCopied = () =>{
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  } 

  return (
    <>
    {copied && <Copied/>}
    <button className="btn" onClick={generateColors}>Refresh</button>
    <section className="container">
      {boxs &&
        boxs.map((box,index)=>
          <Clipboard data-clipboard-text={box} key={index} className="box" style={{backgroundColor: box}} onClick={handleCopied}>
            {box}           
          </Clipboard>
        )
      }
    </section>
    </>
  );
}

export default App;
