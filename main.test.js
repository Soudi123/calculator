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
const displayEl = document.querySelector(".display_result");
const getValueAsStr= require('./calculator.js').getValueAsStr



const expectedOutput = []
Test('we can get value as string',()=> {
expect(getValueAsStr().toContain(expectedOutput));
})
