console.log("loaded");
// getting Elements 
const displayEl = document.querySelector(".display_result");

const acEL = document.querySelector(".allclear");
const percentEL = document.querySelector(".percent");
const pmEL = document.querySelector(".plusminus");

const additionEL = document.querySelector(".addition");
const subtractionEL = document.querySelector(".Minus");
const multiplicationEL = document.querySelector(".multiplication");
const divisionEL = document.querySelector(".division");
const equalEL = document.querySelector(".equal");

const decimaEL = document.querySelector(".decimal");
const number0EL = document.querySelector(".number-0");
const number1EL = document.querySelector(".number-1");
const number2EL = document.querySelector(".number-2");
const number3EL = document.querySelector(".number-3");
const number4EL = document.querySelector(".number-4");
const number5EL = document.querySelector(".number-5");
const number6EL = document.querySelector(".number-6");
const number7EL = document.querySelector(".number-7");
const number8EL = document.querySelector(".number-8");
const number9EL = document.querySelector(".number-9");

const numberELArray = [
  number0EL,
  number1EL,
  number2EL,
  number3EL,
  number4EL,
  number5EL,
  number6EL,
  number7EL,
  number8EL,
  number9EL,
];
//variables in History 
let valueStrInHistory = null;
let operatorInHistory = null;
//defining functions

// function to  show the current text
const getValueAsStr = () => {
  return displayEl.textContent.split(",").join("");
}
// function to give string as number back 
const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};
// function to show the value 
const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === ".") {
    displayEl.textContent += ".";
    return;
  }
// function to split integer and nonInteger
  const [anIntegerStr, nonIntegerStr] = valueStr.split("."); // integer 1-2-3 and noneInteger 2,3 - 3,5
  if (nonIntegerStr) {
    displayEl.textContent =
      parseFloat(anIntegerStr).toLocaleString() + "." + nonIntegerStr;
  } else {
    displayEl.textContent = parseFloat(valueStr).toLocaleString();
  }
};



const getResultAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInHistory = parseFloat(valueStrInHistory);
    
    let newValueNum;
    if (operatorInHistory === "addition") {
      newValueNum = valueNumInHistory + currentValueNum;
    } else if (operatorInHistory === "Minus") {
      newValueNum = valueNumInHistory - currentValueNum;
    } else if (operatorInHistory === "multiplication") {
      newValueNum = valueNumInHistory * currentValueNum;
    } else if (operatorInHistory === "division") {
      newValueNum = valueNumInHistory / currentValueNum;
    }
   
    return  newValueNum.toString();
};

// function when clicking numbers 
const handleNumberClick = (numStr) => {
    const currentDisplayStr = getValueAsStr();
    if (currentDisplayStr === "0") {
      setStrAsValue(numStr);
    } else {
      setStrAsValue(currentDisplayStr + numStr);
    }
  };

const handleOperatorClick = (operation) => {
  const currentDisplayStr = getValueAsStr();
  
  if (!valueStrInHistory) {
    valueStrInHistory = currentDisplayStr;
    operatorInHistory = operation;
    setStrAsValue('0');
    return;
  }
  
  valueStrInHistory = getResultAsStr();
  
  operatorInHistory = operation;
  setStrAsValue('0');
};
// add and STORE THE VALUE/BUTTON THAT WAS CLICKED
// to add eventlistner to number array and function handleNumberClick
for (let i = 0; i < numberELArray.length; i++) {
  const numberEL = numberELArray[i];
  numberEL.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

decimaEL.addEventListener("click", () => {
  const currentDisplayStr = getValueAsStr();

  if (!currentDisplayStr.includes(".")) {
    setStrAsValue(currentDisplayStr + ".");
  }
  else{
      return;
  }
});

// add event listener to functions (AC,+-,%)
acEL.addEventListener("click", () => {
  setStrAsValue("0");
  valueStrInHistory = null;
  operatorInHistory = null;
});
pmEL.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentDisplayStr = getValueAsStr();

  if (currentValueNum > 0) {
    setStrAsValue("-" + currentDisplayStr);
  }  else if (currentValueNum < 0) {
    setStrAsValue(currentDisplayStr.substring(1)); //the first character of the string
  }
});
percentEL.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInHistory = null;
  operatorInHistory = null;
});

// add event listeners to operators (+,-,%,*,=)

additionEL.addEventListener("click", () => {
  handleOperatorClick("addition");
});

subtractionEL.addEventListener("click", () => {
  handleOperatorClick("Minus");
});

multiplicationEL.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});
divisionEL.addEventListener("click", () => {
  handleOperatorClick("division");
});
// EQUAL -> DISPLAY/SHOW RESULT
equalEL.addEventListener("click", () => {
  if (valueStrInHistory) {
      const newValueStr = getResultAsStr();
      setStrAsValue(getResultAsStr());
     
      valueStrInHistory = null;
      operatorInHistory = null;
  }
  else{
return;
  }
});
