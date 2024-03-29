let addToMyListBtn = document.querySelectorAll('.add-to-list-btn');
let clubsContainer = document.querySelector('.clubs-container');
let searchByName = document.getElementById('search-by-name');
let FilterList = document.querySelector('.filter-list');
let blurry = document.querySelector('.blur');
let filterCategories = document.querySelectorAll('.filter-list ul li');
let cards = document.querySelectorAll('.card-to-filter');
let NoResultsMatches = document.querySelector('.no-clubs-events-matches');
let dateInputFrom = document.getElementById("search-by-date-from");
let dateInputTo = document.getElementById("search-by-date-to");
let cardEventDesc = document.querySelectorAll(".card-body .card-text");
let cardEventTitle = document.querySelectorAll(".card-body .card-title");
let clubsFound;
let eventsFound;
//show filters and blur
function showFilters(){
    FilterList.style.transform = 'translateX(0)';
    blurry.classList.add('show-blur');
    document.body.classList.add('unable-scroll');
}
// hide filters and blur
function hideFilters(){
    FilterList.style.transform = 'translateX(100%)';
    blurry.classList.remove('show-blur');
    document.body.classList.remove('unable-scroll');
}

//filter the cards from the chosen cards in searches
function filterCards(chosenCategory){
    clubsFound = false;
    eventsFound = false;
   for(let i = 0; i< cards.length; i++){
    if(cards[i].dataset.category.includes(chosenCategory.dataset.category) ){
       cards[i].classList.remove('hidden-card-category');
       clubsFound = true;
       
    }
    else{
       cards[i].classList.add('hidden-card-category');
    }
   }
}

//search cards by name
function searchCardByName() {
    clubsFound = false;
    for (let i = 0; i < cards.length; i++) {
        let clubName = cards[i].querySelector('.card-title');
        if (clubName.textContent.toLowerCase().includes(searchByName.value.toLowerCase()) && !cards[i].classList.contains('hidden-card-category')) {
            cards[i].classList.remove('hidden-card');
            clubsFound = true;

        } else {
            cards[i].classList.add('hidden-card');
        }
    }
    checkClubsFound();
}
//search cards by date
function searchCardByDate(){
    eventsFound = false;
    let fromDate = new Date(dateInputFrom.value);
    let toDate = new Date(dateInputTo.value);
    if(!isNaN(fromDate.getTime()) || !isNaN(fromDate.getTime())){
        for(let i = 0; i< cards.length; i++){
          let eventDate = cards[i].querySelector('.event-date');
          let targetDate = new Date(eventDate.dataset.date);

          if( targetDate >= fromDate  && targetDate <= toDate && !cards[i].classList.contains('hidden-card-category')){
        
              cards[i].classList.remove('hidden-card');
              eventsFound = true;
    } 
          else {
              cards[i].classList.add('hidden-card');
             
    }
   }     
   checkEventsFound();
    } 
    
}
  
function resetPage() {
    window.location.reload();
}


//check if clubs or events found
function checkClubsFound(){
    if (!clubsFound) {
        NoResultsMatches.classList.remove('hidden-div');
    } else {
        NoResultsMatches.classList.add('hidden-div');
       
    }
}
function checkEventsFound(){
    if (!eventsFound) {
        NoResultsMatches.classList.remove('hidden-div');
    } else { 
        NoResultsMatches.classList.add('hidden-div');
    }
}

/**Start For Home and Events JS */
if(document.body.id === 'home' || document.body.id === 'events'){

addToMyListBtn.forEach(ListBtn =>{
    ListBtn.addEventListener('click', function(){
     for(let i = 0; i< addToMyListBtn.length; i++){
        ListBtn.classList.toggle('add-to-list-plus');
        ListBtn.classList.toggle('remove-from-list-minus');
    }
    });
    
});
}
/**End For Home and Events JS */

/*Start Home Page Js */
if(document.body.id === 'home'){

//Scroll previous next clubs
function scrollNextClub(){
    clubsContainer.scrollBy({
        left: 1200,
        behavior: "smooth"
    });
}
function scrollPreviousClub(){
    clubsContainer.scrollBy({
        left: -1200,
        behavior: "smooth"
    });
}
}
/*End Home Page Js */

/*Start Clubs Page JS */
if(document.body.id === 'clubs' || document.body.id === 'events' || document.body.id === 'my-list'){
    
    filterCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove 'active-category' class from all categories
            filterCategories.forEach(cat => cat.classList.remove('active-category'));
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Add 'active-category' class to the clicked category
            this.classList.add('active-category');
            hideFilters();
            filterCards(category);

            // Reset the search input field
            if(document.body.id === 'clubs'){
                searchByName.value = '';
                // Clear the search results
                 searchCardByName();
            }
            else{
                searchCardByDate();
            }
        });
    });
}
    
/*End Clubs Page JS */


/*Start Clubs and Events Pages JS */



/*End Clubs and Events Pages JS */


/*Start Events Page JS*/
if(document.body.id === 'events'){

    // Add an event listener to prevent keyboard input on the date input field
    dateInputFrom.addEventListener("keydown", function(event) {
    event.preventDefault(); // Prevent any keyboard input
    });
    dateInputTo.addEventListener("keydown", function(event) {
        event.preventDefault(); // Prevent any keyboard input
    });


 // Add an event listener to listen for the "change" event on the date input
    // dateInput.addEventListener("change", function() {
    // // When the date is changed, set the value of the input field to the selected date
    // var selectedDate = dateInput.value;
    // var dateObject = new Date(selectedDate);
    // var day = dateObject.getDate();
    // var monthByName = dateObject.toLocaleString('default', { month: 'long' })
    // var month = dateObject.getMonth() + 1;
    // var year= dateObject.getFullYear();
    // // Here, you might want to perform additional actions with the selected date if needed
    // console.log("Selected date:", selectedDate);
    // console.log("day:", day);
    // console.log("month:", month);
    // console.log("month by name:", monthByName);
    // console.log("year:", year);
    // });


    //make the paragraph withing 40 words
    cardEventDesc.forEach(description => {
        let cardText = description.textContent;
        let words = cardText.split(' ');
        let truncatedText = words.slice(0, 50).join(' ');
        if (words.length > 50) {
            truncatedText += '...';
        }
        description.textContent = truncatedText;
        });
        cardEventTitle.forEach(eventTitle => {
        let cardTitle = eventTitle.textContent;
        let words = cardTitle.split(' ');
        let truncatedTitle = words.slice(0, 4).join(' ');
        if (words.length > 4) {
            truncatedTitle += '...';
        }
        eventTitle.textContent = truncatedTitle;
        });
    }

   
        
/*End Events Page JS*/
