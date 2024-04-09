let loginEmailInput = document.querySelector('.login-email');
let signupEmailInput = document.querySelector('.signup-email');
let nameInput = document.getElementById('name');
let loginPasswordInput = document.querySelector('.login-password');
let signupPasswordInput = document.querySelector('.signup-password');
let confirmPasswordInput = document.getElementById('confirm-password');


function passwordVisible(psw){
    psw.classList.toggle('hidden-password');
    if(psw.classList.contains('hidden-password')){
        psw.type = 'password';
    }
    else{
        psw.type = 'text';
    }
}

//Regular Expression for registration form:
function checkSignupValid(){
    let invalidName = document.getElementById('invalid-name');
    let invalidemail = document.getElementById('invalid-email');
    let invalidPassword = document.getElementById('invalid-password');
    let invalidConfirmPassword = document.getElementById('invalid-confirm-password');
    let blankName = document.getElementById('blank-name');
    let blankEmail = document.getElementById('blank-email');
    let blankPassword = document.getElementById('blank-password');
    //Confirm Password
    if(signupPasswordInput.value !== confirmPasswordInput.value){
        invalidConfirmPassword.style.display = 'block';
    }
    else{
        invalidConfirmPassword.style.display = 'none';
    }
    //Password
    if(signupPasswordInput.value.trim() === ""){
        signupPasswordInput.focus();
        blankPassword.style.display = 'block';
        invalidPassword.style.display = 'none';
    }
    else if(signupPasswordInput.value.length < 8 || signupPasswordInput.value.length > 20){
        invalidPassword.style.display = 'block';
        blankPassword.style.display = 'none';
    }
    else{
        invalidPassword.style.display = 'none';
        blankPassword.style.display = 'none';
    }

    //email
    let emailReg = /(\w+|\d+)\.(\w+|\d+)@st\.uskudar\.edu\.tr/ig;
    if(signupEmailInput.value.trim() === ''){
        signupEmailInput.focus();
        blankEmail.style.display = 'block';
        invalidemail.style.display = 'none';
    }
    else if(!signupEmailInput.value.match(emailReg)){
        invalidemail.style.display = 'block';
        blankEmail.style.display = 'none';
    }
    else{
        invalidemail.style.display = 'none';
        blankEmail.style.display = 'none';
    }
    //Name
    if(nameInput.value.trim() === ""){
        nameInput.focus();
        blankName.style.display = 'block';
        invalidName.style.display = 'none';
    }
    else if(nameInput.value.length < 8 || nameInput.value.length > 20){
        invalidName.style.display = 'block';
        blankName.style.display = 'none';
    }
    else{
        invalidName.style.display = 'none';
        blankName.style.display = 'none';

    }
    

}
