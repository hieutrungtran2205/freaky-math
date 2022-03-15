import { useCallback, useState } from 'react';
import '../App.css';
// import useRandom from '../hooks/useRandom';

function Expression() {
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 20);
    }

    const getRandomOperator = () => {
        const operator = ['+', '-', '*', '/'];
        return operator[Math.floor(Math.random() * operator.length)]
    }

    const [random, setRandom] = useState(0.5)

    const [score, setScore] = useState(-1)
    const op = getRandomOperator();

    const getResult = useCallback((num1, num2) => {
        return eval(`${num1} ${op} ${num2}`)
    }, [op])

    const getRandomResult = useCallback((num1, num2) => {
        console.log('random2', random);
        const result = getResult(num1, num2);
        const fakeResult = getRandomNumber(num1, num2);
        console.log("getRandomResult", random);
        return random >= 0.5 ? result : fakeResult;
    }, [getResult, random])


    const [expression, setExpression] = useState('click True to start')
    const getRandomExpression = useCallback(() => {
        const num1 = getRandomNumber();
        const num2 = getRandomNumber();

        const randomResult = getRandomResult(num1, num2)
        console.log(`${num1} ${op} ${num2} = ${randomResult} `);
        return `${num1} ${op} ${num2} = ${randomResult} `
    }, [getRandomResult, op])

    const onClickTrue = useCallback(() => {
        if (random >= 0.5) {
            setRandom(Math.random())
            setExpression(getRandomExpression())
            console.log("ex", expression);
            setScore(score => score + 1)
            console.log("clickTrue", random);
        } else {
            setRandom(0)
            setExpression("game over")
            setScore(0)
        }
    }, [expression, getRandomExpression, random])
    console.log("ex2", expression);

    const onClickFalse = useCallback(() => {
        if (random < 0.5) {
            setExpression(getRandomExpression())
            setRandom(Math.random())
            console.log(random);
            setScore(score => score + 1)

        } else {
            setExpression("game over")
            setScore(0)
        }
    }, [getRandomExpression, random])

    console.log("lastRandom", random);


    return (
        <div className='expression'>
            {expression}
            <p>Score: {score}</p>
            <div className='buttons'>
                <button onClick={onClickTrue}>True</button>
                <button onClick={onClickFalse}>False</button>
            </div>
        </div >
    );
}

export default Expression;