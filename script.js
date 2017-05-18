"use strict";

/*let positionsWeightArr = [1, 0, 2, 1];
let transitionWeightArr = [0, 0];

let transitionInputArr = [
    [0],
    [1, 2]
];

let transitionOutputArr = [
    [1, 2],
    [0, 3]
];*/

let positionsWeightArr = [1, 1, 0, 2];
let transitionWeightArr = [0, 0, 0];

let transitionInputArr = [
    [0, 1, 3],
    [1],
    [2]
];

let transitionOutputArr = [
    [0],
    [2],
    [1, 3, 3]
];

let state = "Resting";

function setNextState() {
    if (state === "Resting") {
        state = "Active";
    } else {
        state = "Resting";
    }
}

function nextState() {
    if (state === "Resting") {
        setNextState();
        for (let i = 0; i < transitionInputArr.length; i++) {
            for (let j = 0; j < transitionInputArr[i].length; j++) {
                let index = transitionInputArr[i][j];
                let isWeightChanged = false;

                if (positionsWeightArr[index] > 0) {
                    positionsWeightArr[index] -= 1;
                    isWeightChanged = true;
                }

                if (isWeightChanged) {
                    transitionWeightArr[i] = transitionOutputArr[i].length;
                }
            }
        }

    } else {
        setNextState();
        for (let i = 0; i < transitionOutputArr.length; i++) {
            if (transitionWeightArr[i] > 0) {
                for (let j = 0; j < transitionOutputArr[i].length; j++) {
                    let index = transitionOutputArr[i][j];
                    positionsWeightArr[index] += 1;
                }
                transitionWeightArr[i] = 0;
            }
        }
    }

    console.log(state);
    console.log("Веса переходов", positionsWeightArr);
    console.log("Веса состояний", transitionWeightArr);
}

let btn = document.getElementById("btn_next_state");
btn.onclick = function() {
    nextState();
};

console.log(state);
console.log(positionsWeightArr);
