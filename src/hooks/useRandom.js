import { useState } from "react";
import '../App.css';


function useRandom() {

    const [status, setStatus] = useState(true)


    const getRandomNumber = () => {
        return Math.floor(Math.random() * 20);
    }

    const getRandomOperator = () => {
        const operator = ['+', '-', '*', '/'];
        return operator[Math.floor(Math.random() * operator.length)]
    }

    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const op = getRandomOperator();
    const random = Math.random();


    const getResult = () => {
        return eval(`${num1} ${op} ${num2}`)
    }

    const getRandomResult = () => {
        const result = getResult();
        const fakeResult = getRandomNumber();
        if (random >= 0.5) {
            setStatus(true)
        } else {
            setStatus(false)
        }
        return random >= 0.5 ? result : fakeResult;
    }

    const getRandomExpresstion = () => {
        const randomResult = getRandomResult()
        return `${num1} ${op} ${num2} = ${randomResult} `
    }

    return { getRandomExpresstion, status }
}

export default useRandom;