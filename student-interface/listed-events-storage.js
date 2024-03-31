function createListedStorage() {
    for (let i = 0; i < eventCards.length; i++) {
        let addToListBtn = eventCards[i].querySelector('.add-to-list-btn');
        let eventImage = eventCards[i].querySelector('.event-img');
        let eventDate = eventCards[i].querySelector('.event-date');
        let eventDay = eventCards[i].querySelector('.event-day');
        let eventMonth = eventCards[i].querySelector('.event-month');
        let eventTime = eventCards[i].querySelector('.event-time');
        let cardEventTitle = eventCards[i].querySelector('.card-title');
        let cardEventDesc = eventCards[i].querySelector('.card-text');
        let cardCategory = eventCards[i].getAttribute('data-category');

        addToListBtn.addEventListener('click', function () {
            const cardID = i; // Use the index i as cardID
            const isCardInDataPro = dataPro.some(event => event.cardID === cardID);

            if (!isCardInDataPro) {
                let newPro = {
                    category: cardCategory, 
                    image: eventImage.src,
                    date: eventDate.getAttribute('data-date'),
                    day: eventDay.textContent,
                    month: eventMonth.textContent,
                    time: eventTime.textContent,
                    title: cardEventTitle.textContent,
                    description: cardEventDesc.textContent,
                    cardID: cardID // Use the index i as cardID
                };

                // Add the event to local storage
                dataPro.push(newPro);
                localStorage.setItem('product', JSON.stringify(dataPro));

                // Change button class after adding to list
                addToListBtn.classList.remove('add-to-list-plus');
                addToListBtn.classList.add('remove-from-list-minus');
            } else {
                // Remove the event from local storage
                dataPro = dataPro.filter(event => event.cardID !== cardID);
                localStorage.setItem('product', JSON.stringify(dataPro));

                // Change button class after removing from list
                addToListBtn.classList.remove('remove-from-list-minus');
                addToListBtn.classList.add('add-to-list-plus');
            }
        });

        // Check if the card's ID is present in dataPro and update button class initially
        const cardID = i; // Use the index i as cardID
        const isCardInDataPro = dataPro.some(event => event.cardID === cardID);
        if (isCardInDataPro) {
            addToListBtn.classList.remove('add-to-list-plus');
            addToListBtn.classList.add('remove-from-list-minus');
        } else {
            addToListBtn.classList.remove('remove-from-list-minus');
            addToListBtn.classList.add('add-to-list-plus');
        }
    }
}

createListedStorage();






// addToMyListBtn.forEach((addBtn, index) => {
//     // Retrieve the button status from local storage for this specific button
//     const buttonStatus = localStorage.getItem('buttonstatus_' + index);
//     // Update button class based on the stored status
//     if (buttonStatus === 'remove-from-list-minus') {
//         addBtn.classList.remove('add-to-list-plus');
//         addBtn.classList.add('remove-from-list-minus');
//     }

//     addBtn.addEventListener('click', function(event) {
//         let card = event.target.closest('.event-card'); // Find the closest parent card element

//         let eventImage = card.querySelector('.event-img');
//         let eventDate = card.querySelector('.event-date');
//         let eventDay = card.querySelector('.event-day');
//         let eventMonth = card.querySelector('.event-month');
//         let eventTime = card.querySelector('.event-time');
//         let cardEventTitle = card.querySelector('.card-title');
//         let cardEventDesc = card.querySelector('.card-text');

//         let newPro = {
//             image: eventImage.src,
//             date: eventDate.getAttribute('data-date'),
//             day: eventDay.textContent,
//             month: eventMonth.textContent,
//             time: eventTime.textContent,
//             title: cardEventTitle.textContent,
//             description: cardEventDesc.textContent
//         };

//         if (addBtn.classList.contains('add-to-list-plus')) {
//             // Add the event to local storage
//             dataPro.push(newPro);
//             localStorage.setItem('product', JSON.stringify(dataPro));

//             // Change button text and class after adding to list
//             addBtn.classList.remove('add-to-list-plus');
//             addBtn.classList.add('remove-from-list-minus');
//             localStorage.setItem('buttonstatus_' + index, 'remove-from-list-minus');

//         } else {
//             // Remove the event from local storage
//             dataPro = dataPro.filter(event => event.date !== newPro.date);
//             localStorage.setItem('product', JSON.stringify(dataPro));

//             // Change button text and class after removing from list
//             addBtn.classList.remove('remove-from-list-minus');
//             addBtn.classList.add('add-to-list-plus');
//             localStorage.setItem('buttonstatus_' + index, 'add-to-list-plus');
//         }
//     });
//     if(document.body.id === 'my-list'){
//         showData();
//     }
// });

