import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./Banner";
import QueAns from "./QueAns";
import Youhavewon from "./Youhavewon";

function App() {
  const [questions, setQuestions] = useState(null);
  const [rightAnswered, setRightAnswered] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);

  const letsPlay = new Audio("audios/letsplay.mp3");

  const handleClick = () => {
                         setGameStarted(true);
    letsPlay.play();
  };

  useEffect(() => {
    if (!gameStarted) {
      return;
    }

              const interval = setInterval(() => {
                setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
        }

        if (gameOver) {
          clearInterval(interval);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameStarted, gameOver]);

  const url =
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";

  const getQuestions = async () => {
    const data = await fetch(url);
    const res = await data.json();
    setQuestions(res.results);
    console.log(res.results.correct_answer);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    console.log(rightAnswered);
  }, [rightAnswered]);
  return (
    <>
      <Banner rightAnswered={rightAnswered} timer={timer} />
      {!gameOver ? (
        <QueAns
          setShowStartButton={setShowStartButton}
          setTimer={setTimer}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          gameOver={gameOver}
          setGameOver={setGameOver}
          rightAnswered={rightAnswered}
          setRightAnswered={setRightAnswered}
          questions={questions}
        />
      ) : (
        <Youhavewon rightAnswered={rightAnswered} />
      )}

      {!gameStarted && showStartButton && (
        <div className="flex justify-center my-9">
          <button onClick={handleClick}>
            <img
              className="playbtn"
              width="100"
              height="100"
              src="https://img.icons8.com/flat-round/64/play--v1.png"
              alt="play--v1"
            />
          </button>
        </div>
      )}
      <p className="text-center text-white text-lg">
        Copyright &copy; Errun Lee, 2023 Inc
      </p>
    </>
  );
}

export default App;
