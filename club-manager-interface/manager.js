let eTitleInput = document.getElementById('e-title');
let eventCategory = document.getElementById('s-categories');
let fileUpload = document.getElementById('file-upload');
let phoneNum = document.getElementById('p-number');
let eventDescription = document.getElementById('e-description');
function displayFiles(input) {
    var fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; 

    var files = input.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileName = file.name;
        var fileSize = getFileSize(file.size);
        var listItem = document.createElement('div');
        listItem.textContent = fileName + ' (' + fileSize + ')';
        fileList.appendChild(listItem);
    }
}

function getFileSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function checkFormValidation(){
    let targetedInput = document.querySelectorAll('input');
    let isEmpty = false;
    targetedInput.forEach(input => {
        if (input.value.trim() === '') {
            isEmpty = true;
            input.focus();
            return;
        }
    });
    if (!isEmpty) {
        alert("Form submitted successfully!");
    }

    //image input
    let imageError = document.querySelector('.image-error');
    if(fileUpload.value.trim() === ''){
    
        imageError.style.display = 'block';
    }
    else{
        imageError.style.display = 'none';
    }

    //phone number input
    let phoneError = document.querySelector('.phone-error');
    let numberReg = /^\+\d{2}\d{10}$/;
    if(!phoneNum.value.match(numberReg)){
        phoneError.style.display = 'block'
    }
    else{
        phoneError.style.display = 'none';
    }

    //Description

    let descriptionError = document.querySelector('.description-error');
    descInputValue = eventDescription.value.trim();
    if(descInputValue.length >= 300 && descInputValue.length <= 4000){
        descriptionError.style.display = 'none';
    }
    else{
        descriptionError.style.display = 'block';
    }
}

