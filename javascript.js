function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return Math.round( (a * b) * 1000) / 1000;
}
function divide(a, b) {
    if(b === 0) {
        firstNum = "";
        operation = "";
        secondNum = "";
        flag = false;
        display.textContent = "";
        alert("NOPE! Start again");
        return "SURE";
    }
    return Math.round( (a / b) * 1000) / 1000;
}

function operate(firstNum, operation, secondNum) {
    let answer = 0;
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    switch(operation) {
        case "+" :
            answer = add(firstNum, secondNum);
            break;
        case "-" : 
            answer = subtract(firstNum, secondNum);
            break;
        case "*" : 
            answer = multiply(firstNum, secondNum);
            break;
        case "/" : 
            answer = divide(firstNum, secondNum);
            break;
    }

    return answer;
}

function displayOnScreen(text) {
    display.textContent += text;
}

let firstNum = "";
let operation = "";
let secondNum = "";
let flag = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

buttons.forEach( btn => {
    btn.addEventListener("click", event => {
        const target = event.target;
        const btnClicked = target.textContent;

        switch(target.className) {
            case "number":
                if(flag) {
                    secondNum += btnClicked;
                    displayOnScreen(btnClicked);
                }
                else {
                    firstNum += btnClicked;
                    displayOnScreen(btnClicked);
                }
                break;

            case "operator":
                if (!flag) {
                    flag = true;
                    operation = btnClicked;
                    displayOnScreen(` ${btnClicked} `);
                }
                else {
                    const ans = operate(firstNum, operation, secondNum);
                    if(typeof(ans) === "string") break;
                    operation = btnClicked;
                    firstNum = ans;
                    secondNum = "";
                    flag = true;
                    display.textContent = "";
                    displayOnScreen(ans);
                    displayOnScreen(` ${btnClicked} `);
                }
                break;

            case "clear":
                display.textContent = "";
                firstNum = "";
                operation = "";
                secondNum = "";
                flag = false;
                break;

            case "result":
                if(flag) {
                    const ans = operate(firstNum, operation, secondNum);
                    if(typeof(ans) === "string") break;
                    firstNum = ans;
                    operation = "";
                    secondNum = "";
                    flag = false;
                    display.textContent = "";
                    displayOnScreen(ans);
                }
                break;
        }
    });
});
