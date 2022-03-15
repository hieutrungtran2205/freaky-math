import { useCallback, useEffect, useState } from 'react';
import '../App.css';
// import useRandom from '../hooks/useRandom';

function Expression() {
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 20);
    }

    const getRandomOperator = () => {
        const operator = ['+', '-', '*'];
        return operator[Math.floor(Math.random() * operator.length)]
    }

    // const [random, setRandom] = useState(0.5)

    const [score, setScore] = useState(0)
    const [isTrue, setIsTrue] = useState(true)

    const op = getRandomOperator();

    const getResult = useCallback((num1, num2) => {
        return eval(`${num1} ${op} ${num2}`)
    }, [op])

    const getRandomResult = useCallback((num1, num2) => {
        const randomResult = Math.random() >= 0.5;
        setIsTrue(randomResult);
        const result = getResult(num1, num2);
        const fakeResult = getRandomNumber(num1, num2);
        return randomResult ? result : fakeResult;
    }, [getResult])


    const [expression, setExpression] = useState('click True to start')
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
        } else {
            setExpression("game over")
            setScore(0)
        }
    }, [getRandomExpression, isTrue])
    console.log("ex2", expression);

    const onClickFalse = useCallback(() => {
        if (!isTrue) {
            setExpression(getRandomExpression())
            setScore(score => score + 1)

        } else {
            setExpression("game over")
            setScore(0)
        }
    }, [getRandomExpression, isTrue])

    
    useEffect(() => {
        console.log('avc');
        setExpression(getRandomExpression())
    }, [])


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