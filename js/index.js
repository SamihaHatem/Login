const username = document.getElementById('username')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm_password')


const confirm_password_err = document.getElementById('confirm_password_err')
const password_err = document.getElementById('password_err')
const username_err = document.getElementById('username_err')
const passMatch_err = document.getElementById('passMatch_err')
const username_exist_err = document.getElementById('username_exist_err')
const liveToastBtn = document.getElementById('liveToastBtn');
const currentUser = document.getElementById('currentUser');
const login_err = document.getElementById('login_err');


let users = JSON.parse(localStorage.getItem('users')) || []
let current_user = JSON.parse(localStorage.getItem('current_user')) || {}

if (current_user && currentUser) currentUser.innerText = `Welcome ${current_user.username}`

function changeUsername() {
    if (username_exist_err) username_exist_err.innerHTML = ''
    if (login_err) login_err.innerHTML = '';
    if (username.value && username.value.length >= 3) {
        username_err.innerHTML = ``;
    }
}

function changePassword() {
    if (password.value && password.value.length >= 3) {
        password_err.innerHTML = ``;
        login_err.innerHTML = '';

        if (password.value === confirm_password.value) {
            passMatch_err.innerHTML = '';
        }
    }
}

function changeConfirmPassword() {
    if (confirm_password.value && confirm_password.value.length >= 3) {
        confirm_password_err.innerHTML = ``;
        if (password.value === confirm_password.value) {
            passMatch_err.innerHTML = '';
        }
    }
}


function register() {
    username_err.innerHTML = '';
    password_err.innerHTML = '';
    confirm_password_err.innerHTML = '';
    passMatch_err.innerHTML = '';
    username_exist_err.innerHTML = '';
    isError = false;

    if (!username.value || username.value.length < 3) {
        username_err.innerHTML = `<p class="text-center text-danger fs-small">Please enter at least 3 charachters!</p>`;
        isError = true;
    }

    if (!password.value || password.value.length < 6) {
        password_err.innerHTML = `<p class="text-center text-danger fs-small">Please enter at least 6 charachters!</p>`;
        isError = true;
    }

    if (!confirm_password.value || confirm_password.value.length < 6) {
        confirm_password_err.innerHTML = `<p class="text-center text-danger fs-small">Please enter at least 6 charachters!</p>`;
        isError = true;
    }

    if (password.value && password.value.length >= 6 && confirm_password.value && confirm_password.value.length >= 6 && password.value !== confirm_password.value) {
        passMatch_err.innerHTML = `<p class="text-center text-danger fs-small">password should match confirm password!</p>`;
        isError = true;
    }

    if (!isError) {
        let exists = users.some(user => user.username === username.value);
        if (exists) {
            username_exist_err.innerHTML = `<p class="text-center text-danger fs-small">This user is already exist. Try another one!</p>`;
        }
        else {
            users.push({ username: username.value, password: password.value });
            localStorage.setItem('users', JSON.stringify(users));
            liveToastBtn.click();
            setTimeout(() => {
                window.location.href = './login.html';
            }, 500);
        }
        users = JSON.parse(localStorage.getItem('users')) || []
    }
}

function login() {
    let user_exist = users.filter(user => user.username === username.value);
    console.log(username.value, user_exist)
    if (user_exist.length == 0) {
        login_err.innerHTML = `<p class="text-center text-danger fs-small">Can't find user try again!</p>`;
    }
    else {
        let userFound = user_exist[0]
        if (userFound.password === password.value) {
            liveToastBtn.click();
            setTimeout(() => {
                window.location.href = './home.html';
            }, 500);
        }
        else {
            login_err.innerHTML = `<p class="text-center text-danger fs-small">Can't find user try again!</p>`;
        }
    }
}

function logout() {
    localStorage.removeItem('current_user')
    window.location.href = './login.html';
}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}