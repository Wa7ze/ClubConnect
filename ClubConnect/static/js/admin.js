let searchEvent = document.getElementById('search-for-event');
let eventCards = document.querySelectorAll('.event-card');
let NoResultsMatches = document.querySelector('.no-clubs-events-matches');
let biggerImage = document.querySelector('.bigger-profile');
let eventsFound;

function searchForEvent(){
  eventsFound = false;
   for(let i = 0; i < eventCards.length; i++){
  let eventTitle = eventCards[i].querySelector('.card-title');
  if(eventTitle.textContent.toLowerCase().includes(searchEvent.value.toLowerCase())){
     eventCards[i].classList.remove('hidden-card');
     eventsFound = true;
  }
  else{
     eventCards[i].classList.add('hidden-card');
  }
}
checkEventsFound();
}


function checkEventsFound(){
  if (!eventsFound) {
      NoResultsMatches.classList.remove('hidden-div');
  } else {
      NoResultsMatches.classList.add('hidden-div');
     
  }
}

function openImage(){
  biggerImage.style.display = 'flex';
}
function closeImage(){
  biggerImage.style.display = 'none';
}





