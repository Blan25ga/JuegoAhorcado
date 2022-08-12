
import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage'
import { letters} from './helpers/letters'
import { getRandomWord } from './helpers/getRandomWord';

import './App.css';

function App() {

  const [ word, setWord ]= useState(getRandomWord() );
  const [ hiddenWord, setHiddenWord ] = useState("_ ".repeat(word.length));// repite el caracter "_" tantas veces como letras tiene la palabra
  const [ attempts, setAttemps] = useState(0); 
  const [ lose, setLose ] = useState(false);
  const [ win, setWin ] = useState(false);

  useEffect(() => {
    if(attempts === 9){ // si se llega a 9 intentos, se pierde
      setLose(true);
    }
  } , [attempts]);

  // Dar un mensaje si la persona gana
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join(""); // split: quita los espacios que haya entre las letras de la palabra oculta para que el join: compare con la palabra original
    if( currentHiddenWord === word){
      setWin(true);
    }
  } , [hiddenWord]);




  const checkLeter = (letter: string) => {
    if ( lose ) return;
    if ( win ) return;

    if (!word.includes (letter)) { // si la letra no esta en la palabra  se aumenta el numero de intentos
      setAttemps( Math.min(attempts + 1, 9)); // Math.min: devuelve el menor de dos numeros 
      return;
    }
    
    
    // si la letra esta en la palabra se muestra en el hiddenWord
    const hiddenWordArray=  hiddenWord.split(" ")
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  }

    const newGame = () => { // reinicia el juego, reinicia los valores de los estados y la palabra oculta
      console.log("nuevo juego")
      const newWord = getRandomWord();
      setWord(newWord);
      setHiddenWord("_ ".repeat(newWord.length));
      setAttemps(0);
      setLose(false);
      setWin(false);

    }



  return(
    <div className="App">

      {/* Imagenes */}
        <HangImage imageNumber={ attempts } />


      {/* Palabra Oculta */}
      <h3> { hiddenWord }</h3>

      {/* Contador de intentos */}
      <h3>Intentos: { attempts }</h3>


      {/* mensaje cuando pierde la partida */}
      {
        lose && <h1>Game Over!!!</h1>
      }

       {/* mensaje si gana la partida!! */}
      {
        win && <h1>Muy bien, adivinaste la Palabra!!!</h1>
      }

      {/* Botones de letras */}
      {
          letters.map( (letter) => (
            <button 
              onClick={ () => checkLeter(letter) }
              key={letter}>
              {letter}
              </button>
          ))
        
      }

      <br /> <br />
      <button onClick={ newGame }>¿Nuevo Juego?</button>

    </div>
  ) 

}
export default  App;
