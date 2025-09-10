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
let editClubForm = document.querySelector('.edit-club-form');
let editPostPlace = document.querySelector('.edit-post-form-place');
let postTitleData = document.getElementById('post-title-data');
let postDescData = document.getElementById('post-desc-data');


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
            <input type="text" class="club-achievment" name="edit_clubAchievment1" id="edit_clubAchievment1" placeholder="Club's Achievement" value="${clubAchievment1Data ? clubAchievment1Data.textContent : ''}">
            <input type="text" class="club-achievment" name="edit_clubAchievment2" id="edit_clubAchievment2" placeholder="Club's Achievement" value="${clubAchievment2Data ? clubAchievment2Data.textContent : ''}">
            <input type="text" class="club-achievment" name="edit_clubAchievment3" id="edit_clubAchievment3" placeholder="Club's Achievement" value="${clubAchievment3Data ? clubAchievment3Data.textContent : ''}">
            <input type="text" class="club-achievment" name="edit_clubAchievment4" id="edit_clubAchievment4" placeholder="Club's Achievement" value="${clubAchievment4Data ? clubAchievment4Data.textContent : ''}">
            <input type="text" class="club-achievment" name="edit_clubAchievment5" id="edit_clubAchievment5" placeholder="Club's Achievement" value="${clubAchievment5Data ? clubAchievment5Data.textContent : ''}">
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
            <div class= "post-btns">
            <button onclick = "showEditPostForm()" class="edit-post-btn" type="button">Edit Post</button>
            <button class="delete-post-btn" type="button">Delete Post</button>
            </div>
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

        let editPostContainer = document.querySelector('.edit-post-form-container');

       function showPostFormData(){
          let editPostFormInterface = 
          `
          <i onclick="hideEditPostForm()" class="fa-solid fa-xmark" id="post-x-mark"></i>
                  <div class="edit-post-input-wrapper">
                    <label for="e-p-e-title">Event Post Title:</label>
                <input class="input-field event-title-input" type="text" name="eventtitle" id="e-p-e-title" placeholder="Event Title" value="${postTitleData.textContent}" required>
                </div>
              
              <h6>Event Post Image:</h6>
        <div class="image-upload-container">
            <label for="e-p-file-upload" class="custom-file-upload">
            <i class="fas fa-cloud-upload-alt"></i> Choose File
        </label>
        <input id="e-p-file-upload" name="post_image" type="file" onchange="displayFiles(this)" multiple />
        </div>
        <div class="event-file-list" id="e-p-file-list"></div>
        
        <h6 class="mt-3">Event Description:</h6>
        <div class="description-container">
            <textarea class="input-field event-description-input" name="postdescription" id="e-p-e-description" placeholder="e.g The goal of this event..." required>${postDescData.textContent}</textarea>
            <strong class="description-error">The Description should be between 300-4000 letter</strong>
        </div>
        <button class="submit-edit-post-btn" type="submit" class="send-request-btn">Submit Request</button>

          `; 
          editPostPlace.innerHTML = editPostFormInterface;
        }
        showPostFormData();

        function showEditPostForm(){
          editPostContainer.style.display = "flex";
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          document.body.style.overflow = "hidden";
          
        }
        function hideEditPostForm(){
            editPostContainer.style.display = "none";
            document.body.style.overflow = "auto";

        }