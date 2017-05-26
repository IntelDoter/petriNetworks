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


//Объявление переменных
let positionsWeightArr = [1, 1, 2, 0];
let amountOfTransitions = 3;
let activatedTransitionsCounter = 0;
let isWeightActivated = [false, false, false];
let input = document.getElementById("transition_input");
let btn = document.getElementById("activate_transition");

let arrOfObjects = [];
let arrOfText = [];
let canvas = new fabric.StaticCanvas('canvas');

let transitionInputArr = {
    1: [0, 1, 3],
    2: [1],
    3: [2]
};

let transitionOutputArr = {
    1: [0],
    2: [2],
    3: [1, 3, 3]
};


// Графика
let imgElement = document.getElementById('my-image');
let imgInstance = new fabric.Image(imgElement, {
    left: 0,
    top: 0
});
canvas.add(imgInstance);

function clearChips() {
    for (let i = 0; i < arrOfObjects.length; i++) {
        arrOfObjects[i].remove();
    }
    arrOfObjects.length = 0;
}

function clearWeights() {
    for (let i = 0; i < arrOfText.length; i++) {
        arrOfText[i].remove();
    }
    arrOfText.length = 0;
}

function drawWeights(number) {
    let coordsWeight = {
        1: {
            left: 75,
            top: 340
        },
        2: {
            left: 430,
            top: 10
        },
        3: {
            left: 830,
            top: 10
        },
        4: {
            left: 435,
            top: 490
        }
    };

    let text = new fabric.Text(positionsWeightArr[number - 1].toString(), { left: coordsWeight[number].left, top: coordsWeight[number].top });
    arrOfText.push(text);
    canvas.add(text);
}

function addChip(type, num) {
    let coordsPositions = {
        1: {
            left: 75,
            top: 275
        },
        2: {
            left: 430,
            top: 90
        },
        3: {
            left: 830,
            top: 90
        },
        4: {
            left: 435,
            top: 425
        }
    };

    let coordsTransitions = {
        1 : {
            left: 240,
            top: 280
        },
        2: {
            left: 605,
            top: 80
        },
        3: {
            left: 640,
            top: 440
        }
    };

    function drawChip(position) {
        let circle = new fabric.Circle({
            radius: 10, left: position.left, top: position.top
        });
        arrOfObjects.push(circle);
        canvas.add(circle);
    }

    if (type == "position") {
        drawChip(coordsPositions[num])
    } else {
        drawChip(coordsTransitions[num])
    }

}

function refresh() {
    clearChips();
    clearWeights();

    for (let i = 1; i <= positionsWeightArr.length; i++) {
        if (positionsWeightArr[i - 1] > 0) {
            addChip("position", i);
        }
        drawWeights(i);
    }

}


// Main
refresh();

function activateTransition(num) {
    for (let i = 0; i < transitionInputArr[num].length; i++) {
        let index = transitionInputArr[num][i];
        if (positionsWeightArr[index] <= 0) {
            console.log("Переход невозможен");
            return;
        }
    }

    for (let i = 0; i < transitionInputArr[num].length; i++) {
        let index = transitionInputArr[num][i];
        positionsWeightArr[index] -= 1;
    }

    refresh();
    addChip("transition", num);

    for (let i = 0; i < transitionOutputArr[num].length; i++) {
        let index = transitionOutputArr[num][i];
        positionsWeightArr[index] += 1;
    }

    setTimeout(refresh, 500);
    console.log(positionsWeightArr);
}


btn.onclick = function() {
    if (input.value) {
        let index = input.value;
        if (!isWeightActivated[index - 1]) {
            activateTransition(input.value);
            input.value = "";
            isWeightActivated[index - 1] = true;
            activatedTransitionsCounter++;
        } else {
            console.log("Переход уже был активирован в данной итерации");
        }
    }

    if (activatedTransitionsCounter == amountOfTransitions) {
        for (let i = 0; i < isWeightActivated.length; i++) {
            isWeightActivated[i] = false;
        }
        activatedTransitionsCounter = 0;
    }
};


