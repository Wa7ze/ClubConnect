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

