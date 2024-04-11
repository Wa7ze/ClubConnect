let searchEvent = document.getElementById('search-for-event');
let eventCards = document.querySelectorAll('.event-card');
let NoResultsMatches = document.querySelector('.no-clubs-events-matches');
let biggerImage = document.querySelector('.bigger-profile');
const backgroundUpload = document.getElementById('background-upload');
const profileUpload = document.getElementById('profile-upload');
const backgroundPreview = document.getElementById('background-preview');
const profilePreview = document.getElementById('profile-preview');
let backgroundContainer = document.querySelector('.image-upload-container');
let profileContainer = document.querySelector('.profile-input');
let phoneNum1 = document.getElementById('phone1');
let phoneNum2 = document.getElementById('phone2');
let clubDescriptionInput = document.getElementById('club-description');
let clubVisionInput = document.getElementById('club-vision');
let clubConfirmMessage = document.getElementById('club-confirm-message');
let clubCreateBlur = document.getElementById('create-club-blur');
let clubEmail = document.getElementById('club-email');
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


function displayImagePreview(input, preview) {
  const file = input.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function() {
          const imageDataURL = reader.result;
          const img = document.createElement('img');
          img.src = imageDataURL;
          preview.innerHTML = '';
          preview.appendChild(img);
          preview.style.display = 'block';
      }
      reader.readAsDataURL(file);
  }
}

backgroundUpload.addEventListener('change', function() {
  displayImagePreview(this, backgroundPreview);
});

profileUpload.addEventListener('change', function() {
  displayImagePreview(this, profilePreview);
});


function checkInputs(){
      let clubInputs = document.querySelectorAll('.input-field');
      let hasErrors = false;
      for(let i = 0; i < clubInputs.length; i++){
          if(clubInputs[i].value.trim() === ''){
              clubInputs[i].classList.add('error-border');
;                   hasErrors = true;
          }
          else{
              clubInputs[i].classList.remove('error-border');

          }
      }

      //bg input
      if(backgroundUpload.value.trim() === ''){
          backgroundContainer.classList.add('error-border');
          hasErrors = true;
      }
      else{
          backgroundContainer.classList.remove('error-border');

      }
      //profile input
      if(profileUpload.value.trim() === ''){
          profileContainer.classList.add('error-border');
          hasErrors = true;
      }
      else{
          profileContainer.classList.remove('error-border');

      }

      
  let phoneError1 = document.querySelector('.phone-error1');
  let phoneError2 = document.querySelector('.phone-error2');
  let numberReg = /^\+\d{2}(\s?\d){10}$/;
  //phone number 1 input
  if(!phoneNum1.value.match(numberReg) && phoneNum1.value.trim() !== ''){
      phoneError1.style.display = 'block';
      hasErrors = true;
  }
  else{
      phoneError1.style.display = 'none';
  }
  //phone number 2 input
  if(!phoneNum2.value.match(numberReg) && phoneNum2.value.trim() !== ''){
      phoneError2.style.display = 'block';
      hasErrors = true;
  }
  else{
      phoneError2.style.display = 'none';
  }

  //Email input
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailError = document.querySelector('.email-error');
  if(!clubEmail.value.match(emailReg) && clubEmail.value.trim() !== ''){
      emailError.style.display = 'block';
      hasErrors = true;
  }
 else{
      emailError.style.display = 'none';
  }

  //Description input
  let descriptionError = document.querySelector('.description-error');
  descInputValue = clubDescriptionInput.value.trim();
  if(descInputValue.length >= 300 && descInputValue.length <= 4000){
      descriptionError.style.display = 'none';
  }
  else if(descInputValue !== ''){
      descriptionError.style.display = 'block';
      hasErrors = true;
  }
  //Vision input
  let visionError = document.querySelector('.vision-error');
  visionInputValue = clubVisionInput.value.trim();
  if(visionInputValue.length >= 200 && visionInputValue.length <= 3000 && visionInputValue !== ''){
      visionError.style.display = 'none';
  }
  else if(visionInputValue !== ''){
      visionError.style.display = 'block';
      hasErrors = true;
  }

  return hasErrors
  }


function showConfirmMessage(){
  clubConfirmMessage.style.top = '70px';
  clubCreateBlur.style.display = 'block';
}

function checkAndConfirm() {

  let hasErrors = checkInputs();

  if (!hasErrors) {
      showConfirmMessage();
  }
}

function hideConfirmMessage(){
  clubConfirmMessage.style.top = '-100px';
  clubCreateBlur.style.display = 'none';
}





