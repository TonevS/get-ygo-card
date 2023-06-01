async function getYGOCardFromAPI(string) {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${string}`);
        const jsonData = await response.json();
        const card = jsonData.data[Math.floor(Math.random() * jsonData.data.length)];
        return card;
    } catch (error) {
        console.log(error);
    }
}

async function displayYGOCard(inputs) {
    console.log(inputs.type, inputs.data);
    let string;
    
    if (inputs.type.includes('monster')) {
        switch (inputs.type) {
            case 'monster':
                string = `level=${inputs.data[0]}&type=${inputs.data[1]}&race=${inputs.data[2]}&attribute=${inputs.data[3]}`;
                break;
            case 'monsterPendulum':
                string = `level=${inputs.data[0]}&type=${inputs.data[1]}&race=${inputs.data[2]}&attribute=${inputs.data[3]}&scale=${inputs.data[4]}`;
                break;
            case 'monsterLink':
                string = `link=${inputs.data[0]}&type=${inputs.data[1]}&race=${inputs.data[2]}&attribute=${inputs.data[3]}`;
                break;
            default:
                break;
        }
    } else if (inputs.type === 'spell') {
        string = `type=spell%20card&race=${inputs.data[0]}`;
    } else if (inputs.type === 'trap') {
        string = `type=trap%20card&race=${inputs.data[0]}`;
    }
    console.log(string);
    const card = await getYGOCardFromAPI(string);

    console.log(card);
    const cardImageDiv = document.getElementById('card');
    const cardImage = document.createElement('img');
    cardImage.src = card.card_images[0].image_url;
    
    const cardDescriptionDiv = document.getElementById('description');
    const cardDescription = document.createElement('p');
    cardDescription.textContent = card.desc;

    cardImageDiv.append(cardImage);
    cardDescriptionDiv.append(cardDescription);
}

function cleanElementById(id) {
    const div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function generateMonsterCardDOM() {

    const monsterLevelSelect = document.createElement('select');
    fillOptionsWithLength(monsterLevelSelect, 13, 1);

    const monsterTypeSelect = document.createElement('select');
    const types = ['Effect Monster', 'Flip Effect Monster', 'Flip Tuner Effect Monster', 'Gemini Monster', 'Normal Monster', 'Normal Tuner Monster', 'Pendulum Effect Monster', 'Pendulum Flip Effect Monster', 'Pendulum Normal Monster', 'Pendulum Tuner Effect Monster', 'Ritual Effect Monster', 'Ritual Monster', 'Spirit Monster', 'Toon Monster', 'Tuner Monster', 'Union Effect Monster', "Fusion Monster", 'Link Monster', 'Pendulum Effect Fusion Monster', 'Synchro Monster', 'Synchro Pendulum Effect Monster', 'Synchro Tuner Monster', 'XYZ Monster', 'XYZ Pendulum Effect Monster'];
    fillOptionsWithArray(monsterTypeSelect, types);

    monsterTypeSelect.addEventListener('change', () => {
        if (monsterTypeSelect.value === 'Link Monster') {
            monsterLevelSelect.disabled = true;
            monsterPenScaleSelect.disabled = true;
            monsterLinkRatingSelect.disabled = false;
        } else {
            if (monsterTypeSelect.value.includes('Pendulum')) {
                monsterPenScaleSelect.disabled = false;
            } else {
                monsterPenScaleSelect.disabled = true;
            }
            monsterLevelSelect.disabled = false;
            monsterLinkRatingSelect.disabled = true;
        }
    });

    const monsterRaceSelect = document.createElement('select');
    const races = ['Aqua', 'Beast', 'Beast-Warrior', 'Creator-God', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie'];
    fillOptionsWithArray(monsterRaceSelect, races);

    const monsterAttributeSelect = document.createElement('select');
    const attributes = ['DARK', 'DIVINE', 'EARTH', 'FIRE', 'LIGHT', 'WATER', 'WIND'];
    fillOptionsWithArray(monsterAttributeSelect, attributes);


    const monsterLinkRatingSelect = document.createElement('select');
    fillOptionsWithLength(monsterLinkRatingSelect, 7, 1);
    monsterLinkRatingSelect.disabled = true;

    const monsterPenScaleSelect = document.createElement('select');
    fillOptionsWithLength(monsterPenScaleSelect, 14);
    monsterPenScaleSelect.disabled = true;

    const getCardButton = document.createElement('button');
    getCardButton.textContent = 'Get Card';

    getCardButton.addEventListener('click', () => {
        cleanElementById('card');
        cleanElementById('description');
        if (monsterTypeSelect.value === 'Link Monster') {
            displayYGOCard({type: 'monsterLink', data: [monsterLinkRatingSelect.value, monsterTypeSelect.value, monsterRaceSelect.value, monsterAttributeSelect.value]});
        } else if (monsterTypeSelect.value.includes('Pendulum')) {
            displayYGOCard({type: 'monsterPendulum', data: [monsterLevelSelect.value, monsterTypeSelect.value, monsterRaceSelect.value, monsterAttributeSelect.value, monsterPenScaleSelect.value]});
        } else {
            displayYGOCard({type: 'monster', data: [monsterLevelSelect.value, monsterTypeSelect.value, monsterRaceSelect.value, monsterAttributeSelect.value]})
        }
    });

    cleanElementById('inputs');
    cleanElementById('card');
    cleanElementById('description');

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.append(monsterTypeSelect, monsterRaceSelect, monsterAttributeSelect, monsterLevelSelect, monsterPenScaleSelect, monsterLinkRatingSelect, getCardButton);
}

function generateSpellCardDOM() {
    const spellRaceSelect = document.createElement('select');
    const races = ['Normal', 'Continuous', 'Equip', 'Field', 'Quick-Play', 'Ritual'];
    fillOptionsWithArray(spellRaceSelect, races);

    const getCardButton = document.createElement('button');
    getCardButton.textContent = 'Get Card';

    getCardButton.addEventListener('click', () => {
        cleanElementById('card');
        cleanElementById('description');
        displayYGOCard({type: 'spell', data: [spellRaceSelect.value]})
    });
    
    cleanElementById('inputs');
    cleanElementById('card');
    cleanElementById('description');

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.append(spellRaceSelect, getCardButton);
}

function generateTrapCardDOM() {
    const trapRaceSelect = document.createElement('select');
    const races = ['Normal', 'Continuous', 'Counter'];
    fillOptionsWithArray(trapRaceSelect, races);

    const getCardButton = document.createElement('button');
    getCardButton.textContent = 'Get Card';

    getCardButton.addEventListener('click', () => {
        cleanElementById('card');
        cleanElementById('description');
        displayYGOCard({type: 'trap', data: [trapRaceSelect.value]})
    });

    cleanElementById('inputs');
    cleanElementById('card');
    cleanElementById('description');

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.append(trapRaceSelect, getCardButton);
}

function fillOptionsWithLength(select, length, i = 0) {
    for (;i < length; i++) {
        const option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        select.append(option);
    }
}

function fillOptionsWithArray(select, array) {
    for (let i = 0; i < array.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = array[i];
        option.value = array[i];
        select.append(option);
    }
}