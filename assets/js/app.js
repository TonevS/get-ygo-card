async function getYGOCardFromAPI(type) {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${type}`);
        const jsonData = await response.json();
        const card = jsonData.data[Math.floor(Math.random() * jsonData.data.length)];
        return card;
    } catch (error) {
        console.log(error);
    }
}

function generateMonsterCardDOM() {
    const getCardButton = document.createElement('button');
    getCardButton.textContent = 'Get Card';

    getCardButton.addEventListener('click', () => displayYGOCard('Normal Monster'));

    const inputsDiv = document.getElementById('inputs');
    inputsDiv.append(getCardButton);
}

async function displayYGOCard(type) {
    console.log(type);
    const card = await getYGOCardFromAPI(type);
    console.log(card);
    const cardDiv = document.getElementById('card');
    const cardImage = document.createElement('img');
    cardImage.src = card.card_images[0].image_url;

    cardDiv.append(cardImage);
}