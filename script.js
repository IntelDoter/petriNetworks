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
let isWeightChanged = [false, false ,false, false];
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

function checkChanges() {
    for (let i = 0; i < isWeightChanged.length; i++) {
        if (isWeightChanged[i]) {
            positionsWeightArr[i] -= 1;
            isWeightChanged[i] = false;
        }
    }
}

function nextState() {
    clearWeights();

    if (state === "Resting") {
        setNextState();
        for (let i = 0; i < transitionInputArr.length; i++) {
            for (let j = 0; j < transitionInputArr[i].length; j++) {
                let index = transitionInputArr[i][j];

                if (positionsWeightArr[index] > 0) {
                    isWeightChanged[index] = true;
                    transitionWeightArr[i] = transitionOutputArr[i].length;
                }
            }
        }

        checkChanges();

        clearChips();
        for (let i = 0; i < transitionWeightArr.length; i++) {
            if (transitionWeightArr[i] > 0) {
                addChip("active", i)
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
                transitionWeightArr[i] -= 1;
            }
        }

        clearChips();
        for (let i = 0; i < positionsWeightArr.length; i ++) {
            if (positionsWeightArr[i] > 0) {
                addChip("rest", i);
            }
        }
    }

    for (let i = 0; i < positionsWeightArr.length; i++) {
        drawWeights(i);
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

let canvas = new fabric.StaticCanvas('canvas');

let imgElement = document.getElementById('my-image');
let imgInstance = new fabric.Image(imgElement, {
    left: 0,
    top: 0
});
canvas.add(imgInstance);

let arrOfObjects = [];
let arrOfText = [];
function clearChips() {
    for (let i = 0; i < arrOfObjects.length; i++) {
        arrOfObjects[i].remove();
    }
    arrOfObjects.length = 0;
}

function drawWeights(number) {
    let coordsWeight = {
        0: {
            left: 43,
            top: 230
        },
        1: {
            left: 375,
            top: 130
        },
        2: {
            left: 630,
            top: 0
        },
        3: {
            left: 290,
            top: 350
        }
    };

    let text = new fabric.Text(positionsWeightArr[number].toString(), { left: coordsWeight[number].left, top: coordsWeight[number].top });
    arrOfText.push(text);
    canvas.add(text);
}

function clearWeights() {
    for (let i = 0; i < arrOfText.length; i++) {
        arrOfText[i].remove();
    }
    arrOfText.length = 0;
}

function addChip(type, num) {
    let coordsPositions = {
        0: {
            left: 43,
            top: 172
        },
        1: {
            left: 370,
            top: 70
        },
        2: {
        left: 630,
            top: 70
        },
        3: {
            left: 300,
            top: 290
        }
    };

    let coordsTransitions = {
        0 : {
            left: 175,
            top: 172
        },
        1: {
            left: 505,
            top: 50
        },
        2: {
            left: 475   ,
            top: 300
        }
    };

    function drawChip(position) {
        let circle = new fabric.Circle({
            radius: 10, left: position.left, top: position.top
        });
        arrOfObjects.push(circle);
        canvas.add(circle);
    }

    if (type === "rest") {
        drawChip(coordsPositions[num])
    } else {
        drawChip(coordsTransitions[num])
    }
}

for (let i = 0; i < positionsWeightArr.length; i ++) {
    if (positionsWeightArr[i] > 0) {
        addChip("rest", i);
    }
}

for (let i = 0; i < positionsWeightArr.length; i++) {
    drawWeights(i);
}


