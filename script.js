
let generatedPattern = [];
let userInput = [];
let correctAttempts = parseInt(localStorage.getItem('correctAttempts')) || 0;
let incorrectAttempts = parseInt(localStorage.getItem('incorrectAttempts')) || 0;

const predefinedPatterns = [
    // All Patriotic Administration Center Stratagem codes
    { name: 'Machine Gun', sequence: ['S', 'A', 'S', 'W', 'D'] },
    { name: 'Anti-Material Rifle', sequence: ['S', 'A', 'D', 'W', 'S'] },
    { name: 'Stalwart', sequence: ['S', 'A', 'S', 'W', 'W', 'A'] },
    { name: 'Expendable Anti-Tank', sequence: ['S', 'S', 'A', 'W', 'D'] },
    { name: 'Recoilless Rifle', sequence: ['S', 'A', 'D', 'D', 'A'] },
    { name: 'Autocannon', sequence: ['S', 'D', 'A', 'S', 'S', 'W', 'W', 'D'] },
    { name: 'Railgun', sequence: ['S', 'D', 'A', 'S', 'S', 'W', 'A', 'S', 'D'] },
    // All Orbital Cannons Stratagem codes
    { name: 'Orbital Gatling Barrage', sequence: ['D', 'A', 'W', 'S', 'S'] },
    { name: 'Orbital 120MM HE Barrage', sequence: ['D', 'A', 'A', 'W', 'S', 'D', 'S', 'S'] },
    { name: 'Orbital 380MM HE Barrage', sequence: ['D', 'A', 'A', 'W', 'W', 'S', 'D', 'D', 'D'] },
    { name: 'Orbital Laser', sequence: ['D', 'W', 'A', 'W', 'D', 'A'] },

    // All Hangar Stratagem codes
    { name: 'Eagle Strafing Run', sequence: ['W', 'D', 'D'] },
    { name: 'Eagle Cluster Bomb', sequence: ['W', 'D', 'S', 'S', 'D', 'S'] },
    { name: 'Eagle Napalm Airstrike', sequence: ['W', 'D', 'S', 'W'] },
    { name: 'Jump Pack', sequence: ['S', 'W', 'W', 'S', 'W'] },

    // All Bridge Stratagem codes
    { name: 'Orbital Precision Strike', sequence: ['A', 'A', 'W'] },
    { name: 'Shield Generator Relay', sequence: ['S', 'W', 'A', 'D', 'A', 'S'] },


    // All Engineering Bay Stratagem codes
    { name: 'Anti-Personnel Minefield', sequence: ['S', 'A', 'S', 'W', 'D'] },
    { name: 'Grenade Launcher', sequence: ['S', 'A', 'S', 'W', 'A', 'S', 'S'] },
    { name: 'Guard Dog Rover', sequence: ['S', 'A', 'S', 'W', 'A', 'D', 'S'] },
    { name: 'Shield Generator Pack', sequence: ['S', 'W', 'A', 'S', 'D', 'D'] },

    // All Robotics Workshop Stratagem codes
    { name: 'Machine Gun Sentry', sequence: ['S', 'W', 'D', 'S', 'D', 'S', 'W'] },
    { name: 'Gatling Sentry', sequence: ['S', 'W', 'D', 'A', 'S'] },
    { name: 'Guard Dog', sequence: ['S', 'W', 'A', 'S', 'W', 'D', 'S'] },
];

function generatePattern() {
    const randomPattern = predefinedPatterns[Math.floor(Math.random() * predefinedPatterns.length)];
    generatedPattern = [...randomPattern.sequence];

    displayPattern();
}

function displayPattern() {
    const patternDisplay = document.getElementById('pattern-display');
    const currentPattern = predefinedPatterns.find(pattern => arraysEqual(pattern.sequence, generatedPattern));

    if (currentPattern) {
        patternDisplay.innerHTML = `Pattern: ${currentPattern.name} (${getArrowSymbol(generatedPattern).join(' ')})`;
    } else {
        patternDisplay.innerHTML = 'Pattern: Unknown';
    }


    userInput = [];
    updateUserInputDisplay();
}

function getArrowSymbol(sequence) {
    return sequence.map(key => {
        switch (key) {
            case 'W':
                return '<span class="arrow-up"></span>';
            case 'A':
                return '<span class="arrow-left"></span>';
            case 'S':
                return '<span class="arrow-down"></span>';
            case 'D':
                return '<span class="arrow-right"></span>';
            default:
                return key;
        }
    });
}


function updateUserInputDisplay() {
    const userInputDisplay = document.getElementById('user-input');
    userInputDisplay.innerHTML = `Your Input: ${getArrowSymbol(userInput).join(' ')}`;
}


function handleKeyPress(event) {
    const key = event.key.toUpperCase();

    if (['W', 'A', 'S', 'D'].includes(key)) {
        userInput.push(key);
        updateUserInputDisplay();

        if (arraysEqual(userInput, generatedPattern)) {
            alert('Correct! Democracy delivered.');
            correctAttempts++;
            handleResult();
        } else if (userInput.length > generatedPattern.length) {
            alert('Incorrect.');
            incorrectAttempts++;
            handleResult();
        }
    } else {
        userInput = [];
        updateUserInputDisplay();
        
        if (userInput.length === 1) {
            alert('Incorrect.');
            incorrectAttempts++;
            handleResult();
        } else {
            alert('Incorrect.');
            incorrectAttempts++;
            handleResult();
        }
    }
}

function handleResult() {
    updateAttemptsDisplay();
    localStorage.setItem('correctAttempts', correctAttempts);
    localStorage.setItem('incorrectAttempts', incorrectAttempts);
    location.reload();
}

function updateAttemptsDisplay() {
    const attemptsDisplay = document.getElementById('attempts-display');
    attemptsDisplay.innerHTML = `Correct Attempts: ${correctAttempts} | Incorrect Attempts: ${incorrectAttempts}`;
}


function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}


document.addEventListener('keydown', handleKeyPress);


generatePattern();
updateAttemptsDisplay();
