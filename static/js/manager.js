let eTitleInput = document.querySelector('.event-title-input');
let eventCategory = document.querySelector('.event-category-input');
let fileUpload = document.querySelector('.event-file-upload-input');
let phoneNum = document.querySelector('.event-phone-input');
let eventDescription = document.querySelector('.event-description-input');
let eventEmail = document.querySelector('.activity-email-input');
let eventPostForm = document.getElementById('event-post-form');
let eventActivityForm = document.getElementById('event-activity-form');

function displayFiles(input) {
    let fileList = document.querySelector('.event-file-list');
    fileList.innerHTML = ''; 

    let files = input.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileName = file.name;
        let fileSize = getFileSize(file.size);
        let listItem = document.createElement('div');
        listItem.textContent = fileName + ' (' + fileSize + ')';
        fileList.appendChild(listItem);
    }
}

function getFileSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


function checkFormValidation(){
    let targetedInput = document.querySelectorAll('.input-field');
    let hasErrors = false;

for(let i = 0; i < targetedInput.length; i++){
  if(targetedInput[i].value.trim() === ''){
      targetedInput[i].classList.add('error-border');
        hasErrors = true;
  }
  else{
      targetedInput[i].classList.remove('error-border');

  }
}

//image input
if(document.body.id === "create-activity-event" || document.body.id === "event-page"){
  let imageError = document.querySelector('.image-error');
if(fileUpload.value.trim() === ''){
  imageError.style.display = 'block';
  hasErrors = true;
  
}
else{
  imageError.style.display = 'none';
}

//phone number input
let phoneError = document.querySelector('.phone-error');
let numberReg = /^\+\d{2}(\s?\d){10}$/;
if(!phoneNum.value.match(numberReg) && phoneNum.value.trim() !== ''){
    phoneError.style.display = 'block';
    hasErrors = true;
}
else{
    phoneError.style.display = 'none';
}

//Email input
let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let emailError = document.querySelector('.email-error');

if(!eventEmail.value.match(emailReg) && eventEmail.value.trim() !== ''){
    emailError.style.display = 'block';
    hasErrors = true;
}
else{
    emailError.style.display = 'none';
}

}


//Description Input
let descriptionError = document.querySelector('.description-error');
descInputValue = eventDescription.value.trim();
if(descInputValue.length >= 300 && descInputValue.length <= 4000){
  descriptionError.style.display = 'none';
}
else if(descInputValue !== ''){
  descriptionError.style.display = 'block';
  hasErrors = true;
}

return hasErrors
}

let eventConfirmMessage = document.querySelector('.confirm-message');
let eventCreateBlur = document.querySelector('.blur');
function showConfirmMessage(){
eventConfirmMessage.style.top = '70px';
eventCreateBlur.style.display = 'block';
}

function checkEventFormAndConfirm(){

let hasErrors = checkFormValidation();

if (!hasErrors) {
showConfirmMessage();
}
}

function hideConfirmMessage(){
eventConfirmMessage.style.top = '-100%';
eventCreateBlur.style.display = 'none';
}

/*Start Manager Notifications JS*/
let rejectNotif = document.querySelectorAll('.notification-rejected');
        function showWhyRejected(){
           for(let i=0; i<rejectNotif.length; i++){
            let seeWhyBtn = rejectNotif[i].querySelector('.why-rejected');
            seeWhyBtn.addEventListener('click', ()=>{
                rejectNotif[i].classList.toggle('show-purpose');
            });
           }
        }
        showWhyRejected();
/*End Manager Notifications JS*/