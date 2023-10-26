import React, { useEffect, useReducer, useRef, useState } from 'react'

import './QueAns.css'


const QueAns = ({ setShowStartButton, setTimer, gameStarted, questions, setRightAnswered, setGameStarted, setGameOver, gameOver }) => {

    if (!questions) {
        return;
    }

    const answergiven = new Audio('../src/assets/audios/answergiven.mp3')
    const win = new Audio('../src/assets/audios/win.mp3')
    const buzzer = new Audio('../src/assets/audios/buzzer.mp3')
    const thinking = new Audio('../src/assets/audios/thinking.mp3')

    const [queNum, setQueNum] = useState(0)
    const [question, setQuestion] = useState(null)
    const [options, setOptions] = useState([])
    const [chosen, setChosen] = useState(false)
    const answerRef = useRef();

    const handleHover = (id) => {
        if (chosen) {
            return;
        }
        document.getElementById(id).classList.add('incorrect-ans')
    }

    const handleExit = (id) => {
        if (chosen) {
            return;
        }
        document.getElementById(id).classList.remove('incorrect-ans')
    }

    useEffect(() => {
        setChosen(false)
        setQuestion(questions[queNum])
        const optCopy = question?.incorrect_answers || [];
        optCopy.push(question?.correct_answer)
        const shuffledOptions = optCopy.sort((a, b) => 0.5 - Math.random());
        setOptions(shuffledOptions)

    }, [queNum, questions, question])


    // check answer
    const handleClick = (opt, id) => {
        answergiven.play();

        setShowStartButton(false)
        setChosen(true)
        setGameStarted(false)
        if (gameOver) {
            thinking.pause();
            return;
        }
        document.getElementById(id).classList.remove('incorr-ans')
        // setGameOver(true)
        if (opt == question.correct_answer) {

            document.getElementById(id).classList.add('incorr-ans')
            setTimeout(() => {
                document.getElementById(id).classList.remove('incorr-ans')
                document.getElementById(id).classList.add('correct-ans')
                answergiven.pause();
                win.play();
            }, [2000]);

            setTimeout(() => {
                setQueNum((prev) => prev + 1)
                setOptions(null)
                setGameStarted(true)
                setTimer(60)
                setGameOver(false)
                setRightAnswered(prev => prev + 1)
            }, [5000])

        }
        else {
            document.getElementById(id).classList.add('incorr-ans')
            setTimeout(() => {
                document.getElementsByClassName('corr-ans')[0].classList.add('correct-ans')
                answergiven.pause();
                buzzer.play();
                thinking.pause();
            }, [3000])


            setTimeout(() => {
                setGameOver(true)
            }, 5000);

        }
    }

    useEffect(()=>{
        thinking.pause();
        thinking.currentTime=0;
        if(gameOver){
            return;
        }
        thinking.play();
    },[queNum])

    if (!gameStarted && !chosen) {
        return;
    }

   

    return (
        <div className='text-white my-9'>
            <div className='quest flex justify-center items-center'>
                <p className='w-4/5'> {question?.question || null}</p>
            </div>
            <div className="answers flex w-1/2 flex-wrap m-auto">
                {options && options.length > 0 &&
                    options.map((option, i) => {
                        return (
                            <div onMouseOver={() => { handleHover(i) }} onMouseLeave={() => { handleExit(i) }} ref={answerRef} role='button' onClick={() => handleClick(option, i)} className={`answer my-1 ${option === question?.correct_answer ? 'corr-ans' : ''}`} key={i} id={i} >
                                <button className='mx-2  text-white font-bold py-2 px-4 '>{option}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QueAns