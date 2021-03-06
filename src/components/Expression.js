import { useCallback, useEffect, useState } from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { Progress } from 'antd';

function Expression() {
    const [expression, setExpression] = useState()
    const [score, setScore] = useState(0)
    const [isTrue, setIsTrue] = useState(true)
    const [color, setColor] = useState('green')
    const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem('highScore') ?? 0))
    const [isOver, setIsOver] = useState(false)
    const [percent, setPercent] = useState(0)

    const getRandomColor = () => {
        const colors = ['green', 'red', 'orange', 'blue', 'brown', 'pink', 'black']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const notRepeatColor = useCallback(() => {
        const randomColor = getRandomColor()
        while (randomColor === color) {
            notRepeatColor()
        }
        return randomColor
    }, [color])

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 20);
    }

    const getRandomOperator = () => {
        const operator = ['+', '-', '*'];
        return operator[Math.floor(Math.random() * operator.length)]
    }

    const op = getRandomOperator();

    const getResult = useCallback((num1, num2) => {
        return eval(`${num1} ${op} ${num2}`)
    }, [op])

    const getFakeResult = useCallback((num1, num2, result) => {
        let fakeResult = getRandomNumber(num1, num2);
        return result === fakeResult ? getFakeResult(num1, num2, result) : fakeResult
    }, [])

    const getRandomResult = useCallback((num1, num2) => {
        const randomResult = Math.random() >= 0.5;
        setIsTrue(randomResult);
        const result = getResult(num1, num2);
        const fakeResult = getFakeResult(num1, num2, result);
        return randomResult ? result : fakeResult;
    }, [getFakeResult, getResult])

    const getRandomExpression = useCallback(() => {
        const num1 = getRandomNumber();
        const num2 = getRandomNumber();
        const randomResult = getRandomResult(num1, num2)
        console.log(`${num1} ${op} ${num2} = ${randomResult} `);
        return `${num1} ${op} ${num2} = ${randomResult} `
    }, [getRandomResult, op])

    const onClickTrue = useCallback(() => {
        if (isTrue) {
            setExpression(getRandomExpression())
            setScore(score => score + 1)
            setColor(notRepeatColor())
            setHighScore(score)
            setPercent(0)
        } else {
            setExpression("game over")
            setScore(0)
            setIsOver(true)
        }
    }, [getRandomExpression, isTrue, notRepeatColor, score])

    const onClickFalse = useCallback(() => {
        if (!isTrue) {
            setExpression(getRandomExpression())
            setScore(score => score + 1)
            setColor(notRepeatColor())
            setPercent(0)
            setHighScore(score)
        } else {
            setExpression("game over")
            setScore(0)
            setIsOver(true)
            setPercent(0)
        }
    }, [getRandomExpression, isTrue, notRepeatColor, score])

    const playAgain = () => {
        setExpression(getRandomExpression())
        setScore(0)
        setHighScore(JSON.parse(localStorage.getItem('highScore')))
        setIsOver(false)
        setPercent(0)
    }

    useEffect(() => {
        const oldScore = JSON.parse(localStorage.getItem('highScore'))
        console.log("o", oldScore);
        if (oldScore <= highScore) {
            localStorage.setItem('highScore', JSON.stringify(highScore))
        }
    }, [highScore])

    useEffect(() => {
        const myInterval = setInterval(() => {
            setPercent(percent => percent + 1)
        }, 50)
        if (percent >= 100) {
            clearInterval(myInterval)
            setIsOver(true)
            setHighScore(highScore)
        }

        return () => clearInterval(myInterval)
    }, [highScore, percent])

    useEffect(() => {
        setExpression(getRandomExpression())
    }, [])

    return (
        <div className='content' style={{ backgroundColor: `${color}` }}>
            <span className='score'>Score: {score}</span>
            <div className='expression'>
                <h1>{expression}</h1>
            </div>
            {isOver
                ? <button className='btn playAgain' onClick={playAgain}>Play Again</button>
                : <Progress type='circle' className='progress' percent={percent} />
            }

            <span className='highScore'>High Score: {JSON.parse(localStorage.getItem('highScore'))}</span>
            {isOver
                ?
                <div className='buttons'>
                    <button className='btn true' disabled>True</button>
                    <button className='btn false' disabled>False</button>
                </div>
                :
                <div className='buttons'>
                    <button className='btn true' onClick={onClickTrue}>True</button>
                    <button className='btn false' onClick={onClickFalse}>False</button>
                </div>
            }
        </div>
    );
}

export default Expression;