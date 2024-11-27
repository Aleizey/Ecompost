const Email = document.querySelector('#email');
const labelEmail = document.querySelector('.label-email');
const Password = document.querySelector('#password');
const labelPassword = document.querySelector('.label-password');

Email.addEventListener("click", () => {

    labelEmail.classList.add("label-email2")
})

document.addEventListener('click', (e) => {

    if (!Email.contains(e.target) && Email.value == '') {

        labelEmail.classList.remove("label-email2")

    }
})

Password.addEventListener("click", () => {

    labelPassword.classList.add("label-password2")

})

document.addEventListener('click', (e) => {

    if (!Password.contains(e.target) && Password.value == '') {

        labelPassword.classList.remove("label-password2")

    }
})