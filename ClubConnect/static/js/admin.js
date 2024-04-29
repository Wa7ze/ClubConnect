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
let editClubForm = document.querySelector('.edit-club-form');

if(document.body.id="club-profile"){
let editClub = document.querySelector('.edit-clubProfile-form');
let editClubBlur = document.getElementById('edit-club-blur');
let clubNameData = document.getElementById('club-name-data');
let headLineData = document.getElementById('headline-data');
let locationData = document.getElementById('location-data');
let clubManageData = document.getElementById('club-manager-data');
let viceManagerData = document.getElementById('vice-manager-data');
let phone1Data = document.getElementById('phone1-data');
let phone2Data = document.getElementById('phone2-data');
let clubEmailData = document.getElementById('club-email-data');
let clubCategoryData = document.getElementById('club-category-data');
let numOfMembersData = document.getElementById('num-of-members-data');
let clubAchievment1Data = document.getElementById('club-achievment1-data');
let clubAchievment2Data = document.getElementById('club-achievment2-data');
let clubAchievment3Data = document.getElementById('club-achievment3-data');
let clubAchievment4Data = document.getElementById('club-achievment4-data');
let clubAchievment5Data = document.getElementById('club-achievment5-data');
let clubVisionData = document.getElementById('club-vision-data');
let clubDescriptionData = document.getElementById('club-description-data');
let editClubPlace = document.querySelector('.edit-club-form-place');
let clubActivitiesContainer = document.querySelector('.events-cards-container');
let noClubsFoundMessage = document.querySelector('.no-clubs-events-matches');

    function isContainerEmpty(container, excludeElement) {
        for (let i = 0; i < container.childNodes.length; i++) {
            const childNode = container.childNodes[i];
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                if (childNode !== excludeElement) {
                    return false;
                }
            }
        }
        return true;
    }
    
    if (isContainerEmpty(clubActivitiesContainer, noClubsFoundMessage)) {
        noClubsFoundMessage.classList.remove('hidden-div');
    } else {
        noClubsFoundMessage.classList.add('hidden-div');

    }
     function showEditClubFormData(){
            let editClubFormInterface = 
        `
            <div class="image-upload-container">
                <div onclick="backgroundUpload.click()" class="image-preview bg-preview" id="edit-background-preview"></div>
                <label for="edit-background-upload" class="custom-background-upload">
                    <i class="fas fa-cloud-upload-alt"></i> Choose A File
                </label>
                <input class="background-upload" id="edit-background-upload" type="file" name="edit_bg_club" required/>
                <div class="profile-input">
                    <div onclick="profileUpload.click()" class="image-preview profile-preview" id="edit-profile-preview"></div>
                    <label for="edit-profile-upload" class="custom-profile-upload">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </label>
                    <input class="profile-upload" id="edit-profile-upload" type="file" name="edit_profile_club" required/>
                </div>
            </div>

        <div class="club-infos edit-club-infos">
            <input class="input-field club-name" id="edit-club-name" name="edit_clubname" type="text" placeholder="Club Name" value="${clubNameData.textContent}" required>
            <input class="input-field headline" id="edit-headline" name="edit_headline" type="text" placeholder="Headline" value="${headLineData.textContent}" required>
            <input class="input-field club-location" id="edit-club-location" name="edit_location" type="text" placeholder="Location" value="${locationData.textContent}" required>
            <input class="input-field club-manager" id="edit-club-manager" name="edit_clubmanager" type="text" placeholder="Club Manager" value="${clubManageData.textContent}" required>
            <input class="input-field club-vice-manager" id="edit-club-vice-manager" name="edit_clubvicemanager" type="text" placeholder="Club Vice Manager" value="${viceManagerData.textContent}" required>
            <div class="input-div">
            <input class="input-field phone1" id="edit-phone1" name="edit_phonenumber1" type="tel" placeholder="Phone Number 1" value="${phone1Data.textContent}" required>
            <strong class="phone-error1">Invalid Number</strong>
            </div>
            <div class="input-div">
            <input class="input-field phone2" id="edit-phone2" name="edit_phonenumber2" type="tel" placeholder="Phone Number 2" value="${phone2Data.textContent}" required>
            <strong class="phone-error2">Invalid Number</strong>
            </div>
            <div class="input-div">
            <input class="input-field club-email" id="edit_club-email" name="edit_email" type="email" placeholder="Email Adress" value="${clubEmailData.textContent}" required>
            <strong class="email-error">Invalid Email</strong>
        </div>
            <select name="edit_category" id="edit-s-categories">
                <option value="${clubCategoryData.textContent}">${clubCategoryData.textContent}</option>
                <option value="sport">Sport</option>
                <option value="gaming">Gaming</option>
                <option value="technology">Technology</option>
                <option value="society">Society</option>
                <option value="programming">Programming</option>
                <option value="art">Art</option>
            </select>
            <input class="input-field" type="number" name="numOfMembers" placeholder="Number of Members" value="${parseInt(numOfMembersData.textContent)}" required>
            <input type="text" class="club-achievment" name="edit_clubAchievment1" id= "edit_clubAchievment1" placeholder="Club's Achievment" value="${clubAchievment1Data.textContent}">
            <input type="text" class="club-achievment" name="edit_clubAchievment2" id= "edit_clubAchievment2" placeholder="Club's Achievment" value="${clubAchievment2Data.textContent}">
            <input type="text" class="club-achievment" name="edit_clubAchievment3" id= "edit_clubAchievment3" placeholder="Club's Achievment" value="${clubAchievment3Data.textContent}">
            <input type="text" class="club-achievment" name="edit_clubAchievment4" id= "edit_clubAchievment3" placeholder="Club's Achievment" value="${clubAchievment4Data.textContent}">
            <input type="text" class="club-achievment" name="edit_clubAchievment5" id= "edit_clubAchievment3" placeholder="Club's Achievment" value="${clubAchievment5Data.textContent}">
            <div class="area-div">
            <textarea class="input-field club-vision-input" name="edit_clubvision" id="edit-club-vision-input" placeholder="Club Vision" required>${clubVisionData.textContent}</textarea>
            <strong class="vision-error">The club vision should be between 200-3000 letter</strong>
            </div>
            <div class="area-div">
            <textarea class="input-field club-description-input" name="edit_clubdescription" id="edit-club-description-input" placeholder="Club Description" required>${clubDescriptionData.textContent}</textarea>
            <strong class="description-error">The club description should be between 300-4000 letter</strong>
            </div>
            <div class="create-club-btn"><button onclick="checkAndConfirm()" type="button">Edit Club</button></div>
        </div>
    </form>
        `;
        editClubPlace.innerHTML =  editClubFormInterface;
        }
        showEditClubFormData();

      function showEditClubForm(){
          editClub.style.display = "block";
          editClubBlur.style.display = "block";
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
         
      }
      function hideEditClubForm(){
        editClub.style.display = "none";
        editClubBlur.style.display = "none";
   
    }

    let postCard = document.querySelectorAll('.profile-post-card');
    let biggerPostContainer = document.querySelector('.bigger-post-container');
    function showBiggerPost(){
        for(let i = 0; i < postCard.length; i++){
          let postImage = postCard[i].querySelector(".profile-post-card img");
          let postTitle = postCard[i].querySelector(".event-post-title");
          let postDesc = postCard[i].querySelector(".event-post-description");
          postCard[i].addEventListener('click',()=>{
            let biggerPost = 
            `
            <i onclick="hideBiggerPost()" class="fa-solid fa-xmark"></i>
    <div class="bigger-post">
            <img src="${postImage.src}">
            <h3>${postTitle.textContent}</h3>
            <p>${postDesc.textContent}</p>
    </div>
            `;
            biggerPostContainer.innerHTML = biggerPost;
            biggerPostContainer.style.display = "flex";
        
        });
    }
    }
    showBiggerPost();

    function hideBiggerPost(){
        biggerPostContainer.style.display = "none";
    }
}
       
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


let rejectionContainer = document.querySelector('.admin-rejection-purpose');
let rejectionBlur = document.getElementById('admin-notification-blur');
function showRejectionPurpose(){
  document.body.style.overflow = 'hidden';
  rejectionContainer.style.display = 'block';
  rejectionBlur.style.display = 'block';
}

function hideRejectionPurpose(){
    document.body.style.overflow = 'auto';
    rejectionContainer.style.display = 'none';
    rejectionBlur.style.display = 'none';
}