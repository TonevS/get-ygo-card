async function getYGOCardFromAPI(level, type, race, attribute) {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?level=${level}&type=${type}&race=${race}&attribute=${attribute}`);
        const jsonData = await response.json();
        const card = jsonData.data[Math.floor(Math.random() * jsonData.data.length)];
        return card;
    } catch (error) {
        console.log(error);
    }
}
// async function getYGOArchetypesFromAPI() {
//     try {
//         const response = await fetch("https://db.ygoprodeck.com/api/v7/archetypes.php");
//         const archetypes = await response.json();
//         return archetypes;
//     } catch (error) {
//         console.log(error);
//     }
// }
// const monsterArchetypeSelect = document.createElement('select');
// options = [];
// for (let i = 0; i < archetypes.length; i++) {
//     options.push(document.createElement('option'));
//     options[i].innerHTML = archetypes[i].archetype_name;
//     options[i].value = archetypes[i].archetype_name;
//     monsterArchetypeSelect.append(options[i]);
// }

function generateMonsterCardDOM() {

    const monsterLevelSelect = document.createElement('select');
    let options = [];
    for (let i = 0; i < 12; i++) {
        options.push(document.createElement('option'));
        options[i].innerHTML = i + 1;
        options[i].value = i + 1;
        monsterLevelSelect.append(options[i]);
    }

    const monsterTypeSelect = document.createElement('select');
    const types = ['Effect Monster', 'Flip Effect Monster', 'Flip Tuner Effect Monster', 'Gemini Monster', 'Normal Monster', 'Normal Tuner Monster', 'Pendulum Effect Monster', 'Pendulum Flip Effect Monster', 'Pendulum Normal Monster', 'Pendulum Tuner Effect Monster', 'Ritual Effect Monster', 'Ritual Monster', 'Spirit Monster', 'Toon Monster', 'Tuner Monster', 'Union Effect Monster', "Fusion Monster", 'Link Monster', 'Pendulum Effect Fusion Monster', 'Synchro Monster', 'Synchro Pendulum Effect Monster', 'Synchro Tuner Monster', 'XYZ Monster', 'XYZ Pendulum Effect Monster'];
    options = [];
    for (let i = 0; i < types.length; i++) {
        options.push(document.createElement('option'));
        options[i].innerHTML = types[i];
        options[i].value = types[i];
        monsterTypeSelect.append(options[i]);
    }

    const monsterRaceSelect = document.createElement('select');
    const races = ['Aqua', 'Beast', 'Beast-Warrior', 'Creator-God', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie'];
    options = [];
    for (let i = 0; i < races.length; i++) {
        options.push(document.createElement('option'));
        options[i].innerHTML = races[i];
        options[i].value = races[i];
        monsterRaceSelect.append(options[i]);
    }

    const monsterAttributeSelect = document.createElement('select');
    const attributes = ['DARK', 'DIVINE', 'EARTH', 'FIRE', 'LIGHT', 'WATER', 'WIND'];
    options = [];
    for (let i = 0; i < attributes.length; i++) {
        options.push(document.createElement('option'));
        options[i].innerHTML = attributes[i];
        options[i].value = attributes[i];
        monsterAttributeSelect.append(options[i]);
    }

    const getCardButton = document.createElement('button');
    getCardButton.textContent = 'Get Card';

    getCardButton.addEventListener('click', () => displayYGOCard(monsterLevelSelect.value, monsterTypeSelect.value, monsterRaceSelect.value, monsterAttributeSelect.value));

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.append(monsterLevelSelect, monsterTypeSelect, monsterRaceSelect, monsterAttributeSelect, getCardButton);
}

async function displayYGOCard(level, type, race, attribute) {
    console.log(level, type, race, attribute);
    const card = await getYGOCardFromAPI(level, type, race, attribute);
    console.log(card);
    const cardDiv = document.getElementById('card');
    const cardImage = document.createElement('img');
    cardImage.src = card.card_images[0].image_url;

    cardDiv.append(cardImage);
}
