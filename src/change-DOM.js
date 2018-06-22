import informEmail from './inform-email'
import createCredentials from './create-credentials'
import confirmCode from './confirm-code'
import login from './login'

function showWelcome() {
    document.getElementById("inner-body").classList.remove("hidden")
    document.getElementById("login-form").classList.add("hidden")
}

function showLoginForm(){
    let confirm = document.getElementById("confirm")
    let email = document.getElementById("email")

    document.getElementById("inner-body").classList.add("hidden")
    document.getElementById("login-form").classList.remove("hidden")
    email.addEventListener("keypress", event => {if (event.keyCode == 13) informEmail()}, false)
    email.focus()
    confirm.addEventListener("click", informEmail)
    replaceGoogleButton()
}

function unconfirmedEmail() {
    document.getElementById("auth-instruction").innerText = string.auth.unconfirmedEmail
    document.getElementById("password-label").innerText = string.settings.newPassword
    document.getElementById("password-container").classList.remove("hidden")
    $("#password-container>a").addClass("hidden")

    let password = document.getElementById("password")
    password.addEventListener("keypress", e => { if (e.keyCode == 13) createCredentials()}, false)
    password.focus()

    let confirm = document.getElementById("confirm")
    
    confirm.innerHTML = string.auth.migrate
    confirm.removeEventListener("click", informEmail)
    confirm.addEventListener("click", createCredentials)
}

function goodAccount() {
    document.getElementById("auth-instruction").innerText = string.auth.goodAccount
    document.getElementById("password-container").classList.remove("hidden")

    let confirm = document.getElementById("confirm")

    confirm.innerHTML = string.auth.login
    confirm.removeEventListener("click", informEmail)
    confirm.addEventListener("click", login)

    let password = document.getElementById("password")
    password.addEventListener("keypress", e => {if(e.keyCode == 13) login()}, false)
    password.focus()
}

function wrongPassword() {
    document.getElementById("auth-instruction").innerText = string.auth.wrongPassword
    document.getElementById("password-container").classList.remove("hidden")
    confirm.innerHTML = string.auth.login
    confirm.setAttribute("onclick", "Auth.login()")
}

function noAccount() {
    document.getElementById("auth-instruction").innerText = string.auth.noAccount
    document.getElementById("password-container").classList.remove("hidden")
    $("#password-container>a").addClass("hidden")

    let password = document.getElementById("password")

    password.addEventListener("keypress", e => { if (e.keyCode == 13) createCredentials() }, false)
    password.focus()

    let confirm = document.getElementById("confirm")

    confirm.innerHTML = string.auth.createAccount
    confirm.removeEventListener("click", informEmail)
    confirm.addEventListener("click", createCredentials)
}

function askForCode() {
    document.getElementById("auth-instruction").innerHTML =
        `<p>${string.auth.codeSent[0]} <span class="text-primary">${localStorage.email}</span></p>
        <p>${string.auth.codeSent[1]}</p>`
}

function receiveCode() {
    document.getElementById("auth-instruction").innerHTML =
        `<p>${string.auth.codeSent[0]} <span class="text-primary">${localStorage.email}</span></p>
        <p>${string.auth.codeSent[1]}</p>`
    document.getElementById("email-container").remove()
    document.getElementById("password-container").remove()
    document.getElementById("code-container").classList.remove("hidden")

    let code = document.getElementById("code")
    code.addEventListener("keypress", e => { if (e.keyCode == 13) confirmCode()}, false)
    code.focus()

    let confirm = document.getElementById("confirm")

    confirm.innerHTML = "OK"
    confirm.removeEventListener("click", createCredentials)
    confirm.addEventListener("click", confirmCode)
}

function resetPassword() {
    document.getElementById("auth-instruction").innerText = string.auth.resetPasswordInstructions
    document.getElementById("password-container").classList.add("hidden")
    confirm.innerHTML = string.auth.confirmResetPassword
    confirm.setAttribute("onclick", "Auth.claimEmailOwnership()")
}

function prepareToReceiveResetPasswordCode() {
    document.getElementById("auth-instruction").innerText = string.auth.resetPasswordCodeSent
    document.getElementById("code-container").classList.remove("hidden")
    confirm.innerHTML = string.buttons.verify
    confirm.setAttribute("onclick", "Auth.verifyResetPasswordCode()")
}

function prepareToCreateNewPassword() {
    $(".alert").remove()
    document.getElementById("code-container").classList.add("hidden")
    document.getElementById("password-container").classList.remove("hidden")
    $("#password-container>a").addClass("hidden")
    document.getElementById("password-confirmation-container").classList.remove("hidden")
    document.getElementById("auth-instruction").innerText = string.auth.createNewPassword
    confirm.innerText = string.buttons.createNewPassword
    confirm.setAttribute("onclick", "Auth.verifyPassword()")
}

export { 
    showWelcome,
    showLoginForm,
    unconfirmedEmail,
    goodAccount,
    wrongPassword,
    noAccount,
    askForCode,
    receiveCode,
    resetPassword,
    prepareToReceiveResetPasswordCode,
    prepareToCreateNewPassword
}