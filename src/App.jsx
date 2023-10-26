import { useEffect, useState } from 'react'
import './App.css'
import Banner from './Banner'
import QueAns from './QueAns'
import Youhavewon from './Youhavewon'
// import letsPlay from './assets/audios/letsPlay.mp3'
// import answergiven from './assets/audios/answergiven.mp3'
// import thinking from './assets/audios/thinking.mp3'
// import win from './assets/audios/win.mp3'
// import ls from './assets/audios/letsPlay.mp3'

function App() {
  const [questions, setQuestions] = useState(null)
  const [rightAnswered, setRightAnswered] = useState(0)
  const [timer, setTimer] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true)

  const letsPlay=new Audio('../src/assets/audios/letsplay.mp3');


  const handleClick = () => {
    setGameStarted(true);
    letsPlay.play();
  }

  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true)
        }

        if (gameOver) {
          clearInterval(interval);
        }

        return prev - 1;
      });
    }, 1000)

    return () => { clearInterval(interval) }
  }, [gameStarted, gameOver])

  const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy'

  const getQuestions = async () => {
    const data = await fetch(url)
    const res = await data.json();
    setQuestions(res.results)
    console.log(res.results.correct_answer)
  }

  useEffect(() => {
    getQuestions();
  }, [])

  useEffect(()=>{
  console.log(rightAnswered)

  },[rightAnswered])
  return (
    <>
      <Banner rightAnswered={rightAnswered} timer={timer} />
      {!gameOver ?
        <QueAns setShowStartButton={setShowStartButton} setTimer={setTimer} gameStarted={gameStarted} setGameStarted={setGameStarted} gameOver={gameOver} setGameOver={setGameOver} rightAnswered={rightAnswered} setRightAnswered={setRightAnswered} questions={questions} />
        :
        <Youhavewon rightAnswered={rightAnswered} />}

      {!gameStarted && showStartButton && <div className='flex justify-center'><button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-9 text-xl" onClick={handleClick}>Start</button>
      </div>}

    </>
  )
}

export default App



