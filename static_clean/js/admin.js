let backgroundContainer = document.querySelector('.image-upload-container');
let profileContainer = document.querySelector('.profile-input');
let phoneNum1 = document.querySelector('.phone1');
let phoneNum2 = document.querySelector('.phone2');
let clubDescriptionInput = document.querySelector('.club-description-input');
let clubVisionInput = document.querySelector('.club-vision-input');
let clubConfirmMessage = document.querySelector('.confirm-message');
let clubBlur = document.querySelector('.blur');
let clubEmail = document.querySelector('.club-email');
let createClubForm = document.querySelector('.create-club-form');
    
const backgroundUpload = document.querySelector('.background-upload');
const profileUpload = document.querySelector('.profile-upload');
const backgroundPreview = document.querySelector('.bg-preview');
const profilePreview = document.querySelector('.profile-preview');
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

if(document.body.id === 'create new club' || document.body.id === 'club-profile'){
backgroundUpload.addEventListener('change', function() {
  displayImagePreview(this, backgroundPreview);
});

profileUpload.addEventListener('change', function() {
  displayImagePreview(this, profilePreview);
});
}


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
  clubBlur.style.display = 'block';
}

function checkAndConfirm() {

  let hasErrors = checkInputs();

  if (!hasErrors) {
      showConfirmMessage();
  }
}

function hideConfirmMessage(){
  clubConfirmMessage.style.top = '-100%';
  clubBlur.style.display = 'none';
}

let activityRequest = document.querySelectorAll('.activity-request');
let activityInterface = document.getElementById('activity-interface-container');
let postRequest = document.querySelectorAll('.post-request');
let editRequest = document.querySelectorAll('.edit-request');
let postInterface = document.getElementById('post-interface-container');
let editedEventInterface = document.getElementById('edited-event-interface-container');
let requestContainer = document.querySelectorAll('.notif-request');

if(document.body.id = "admin-notifications"){

function handleRequestContainer(){
    for(let i = 0; i< requestContainer.length; i++){
      const approveCheckbox = requestContainer[i].querySelector('.accept-check');
      const rejectCheckbox = requestContainer[i].querySelector('.reject-check');

      approveCheckbox.addEventListener('change', function() {
        if (this.checked) {
            rejectCheckbox.checked = false;
            requestContainer[i].style.height = "70px";
        }
    });
    
    rejectCheckbox.addEventListener('change', function() {
        if (this.checked) {
            approveCheckbox.checked = false;
            requestContainer[i].style.height = "170px";
        }
        else{
            requestContainer[i].style.height = "70px";
        }
    });
    }
}
handleRequestContainer();

function showRequestContent(request,interfaceContainer){
  for(let i = 0; i < request.length; i++){
    let eventViewBtn = request[i].querySelector('.view-interface-btn');
    let clubName = request[i].querySelector('.club-name');

    eventViewBtn.addEventListener('click', ()=>{
      interfaceContainer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
      let activityPreview =
      `
      <i onclick="closeEventInterface(activityInterface)" class="fa-solid fa-x"></i>
      <div class="activity-interface interface-box">
          <div class="image-wrapper">
                  <img class="activity-image" src="${request[i].dataset.image}" class="card-img-top event-img">
              </div>
              <div class="activity-infos">
              <div class="activity-title-desc">
              <h3 class="activity-title">${request[i].dataset.title}</h3>
              <p class="activity-desc">${request[i].dataset.description}</p>
             </div>
             <div class="activity-subheaders">
              <p><i class="fa-regular fa-calendar"></i> Date: ${request[i].dataset.date}</p>
              <p><i class="fa-regular fa-clock"></i> Time: ${request[i].dataset.time}</p>
              <p><i class="fa-solid fa-location-dot"></i> Location: ${request[i].dataset.location}</p>
              <p><i class="fa-solid fa-list"></i> Category: ${request[i].dataset.category}</p>
              <p><i class="fa-regular fa-user"></i> Manager: ${request[i].dataset.manager}</p>
              <p><i class="fa-regular fa-user"></i> Vice Manager: ${request[i].dataset.vicemanager}</p>
              <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
              <p><i class="fa-solid fa-phone"></i> Phone Number: ${request[i].dataset.phone}</p>
              
             </div>
              </div>
  </div>
      
      `;

      let postPreview = `
<i onclick="closeEventInterface(postInterface)" class="fa-solid fa-x"></i>
<div class="post-interface interface-box">
  ${request[i].dataset.image !== "" ? 
      `<div class="image-wrapper">
          <img class="post-image" src="${request[i].dataset.image}" class="card-img-top event-img">
      </div>` 
      : ""}
  <div class="post-infos">
      <div class="post-title-desc">
          <h3 class="post-title">${request[i].dataset.title}</h3>
          <p class="post-desc">${request[i].dataset.description}</p>
      </div>
      <div class="post-subheaders">
          <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
      </div>
  </div>
</div>`;

let editActivityPreview =
      `
      <i onclick="closeEventInterface(editedEventInterface)" class="fa-solid fa-x"></i>
      
      <div class= "old-edited-intefaces-container">
      <div class="edited-old-box">
          <div class="box-filter old-box-filter"></div>
          <div class="image-wrapper">
                  <img class="activity-image" src="${request[i].dataset.oldimage}" class="card-img-top event-img">
              </div>
              <div class="activity-infos">
              <div class="activity-title-desc">
              <h3 class="activity-title">${request[i].dataset.oldtitle}</h3>
              <p class="activity-desc">${request[i].dataset.olddescription}</p>
             </div>
             <div class="activity-subheaders">
              <p><i class="fa-regular fa-calendar"></i> Date: ${request[i].dataset.olddate}</p>
              <p><i class="fa-regular fa-clock"></i> Time: ${request[i].dataset.oldtime}</p>
              <p><i class="fa-solid fa-location-dot"></i> Location: ${request[i].dataset.oldlocation}</p>
              <p><i class="fa-solid fa-list"></i> Category: ${request[i].dataset.oldcategory}</p>
              <p><i class="fa-regular fa-user"></i> Manager: ${request[i].dataset.oldmanager}</p>
              <p><i class="fa-regular fa-user"></i> Vice Manager: ${request[i].dataset.oldvicemanager}</p>
              <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
              <p><i class="fa-solid fa-phone"></i> Phone Number: ${request[i].dataset.oldphone}</p>
              
             </div>
              </div>
  </div>

  <div class="edited-old-box">
      <div class="box-filter edited-box-filter"></div>
      <div class="image-wrapper">
              <img class="activity-image" src="${request[i].dataset.editedimage}" class="card-img-top event-img">
          </div>
          <div class="activity-infos">
          <div class="activity-title-desc">
          <h3 class="activity-title">${request[i].dataset.editedtitle}</h3>
          <p class="activity-desc">${request[i].dataset.editeddescription}</p>
         </div>
         <div class="activity-subheaders">
          <p><i class="fa-regular fa-calendar"></i> Date: ${request[i].dataset.editeddate}</p>
          <p><i class="fa-regular fa-clock"></i> Time: ${request[i].dataset.editedtime}</p>
          <p><i class="fa-solid fa-location-dot"></i> Location: ${request[i].dataset.editedlocation}</p>
          <p><i class="fa-solid fa-list"></i> Category: ${request[i].dataset.editedcategory}</p>
          <p><i class="fa-regular fa-user"></i> Manager: ${request[i].dataset.editedmanager}</p>
          <p><i class="fa-regular fa-user"></i> Vice Manager: ${request[i].dataset.editedvicemanager}</p>
          <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
          <p><i class="fa-solid fa-phone"></i> Phone Number: ${request[i].dataset.editedphone}</p>
          
         </div>
          </div>
</div>
</div>
      
  `;
let editPostPreview = `
      <i onclick="closeEventInterface(editedEventInterface)" class="fa-solid fa-x"></i>
      <div class= "old-edited-intefaces-container">
      <div class="edited-old-box post-edited-old-box">
      <div class="box-filter old-box-filter"></div>
          ${request[i].dataset.oldimage !== "" ? 
              `<div class="image-wrapper">
                  <img class="post-image" src="${request[i].dataset.oldimage}" class="card-img-top event-img">
              </div>` 
              : ""}
          <div class="post-infos">
              <div class="post-title-desc">
                  <h3 class="post-title">${request[i].dataset.oldtitle}</h3>
                  <p class="post-desc">${request[i].dataset.olddescription}</p>
              </div>
              <div class="post-subheaders">
                  <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
              </div>
          </div>
      </div>
      
      <div class="edited-old-box post-edited-old-box">
      <div class="box-filter edited-box-filter"></div>
          ${request[i].dataset.editedimage !== "" ? 
              `<div class="image-wrapper">
                  <img class="post-image" src="${request[i].dataset.editedimage}" class="card-img-top event-img">
              </div>` 
              : ""}
          <div class="post-infos">
              <div class="post-title-desc">
                  <h3 class="post-title">${request[i].dataset.editedtitle}</h3>
                  <p class="post-desc">${request[i].dataset.editeddescription}</p>
              </div>
              <div class="post-subheaders">
                  <p><i class="fa-solid fa-cube"></i> Club Name: ${clubName.textContent}</p>
              </div>
          </div>
      </div>
  </div>`;

      if(interfaceContainer.id === 'activity-interface-container'){
          interfaceContainer.innerHTML = activityPreview;
      }
      else if(interfaceContainer.id === 'post-interface-container'){
          interfaceContainer.innerHTML = postPreview;
      }
      else if(interfaceContainer.id === 'edited-event-interface-container' && request[i].dataset.type === 'activity'){
          interfaceContainer.innerHTML = editActivityPreview;
      }
      else if(interfaceContainer.id === 'edited-event-interface-container' && request[i].dataset.type === 'post'){
          interfaceContainer.innerHTML = editPostPreview;
      }
      
    });
}
}
showRequestContent(activityRequest,activityInterface);
showRequestContent(postRequest,postInterface);
showRequestContent(editRequest,editedEventInterface);

function closeEventInterface(interface){
  interface.style.display = 'none';
  document.body.style.overflow = 'auto';
}

}