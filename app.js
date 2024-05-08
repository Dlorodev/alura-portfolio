
const d = document;
const form = d.querySelector('.contact-form');
const inputs = d.querySelectorAll('.contact-form .form-control');
const button = d.querySelector('.btn-primary');

const expressions = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, pueden llevar acentos.
    mensaje: /^[a-zA-ZÀ-ÿ\s,.]{5,250}$/, // Letras y espacios, pueden llevar acentos.
};

const camps = {
    name: false,
    email: false,
    asunto: false,
    mensaje: false
}

button.disabled = true;

const formValidation = (e) => {
    switch (e.target.name) {
        case 'nombre':
            validation(expressions.nombre, e.target, 'name');
            break;
        case 'email':
            validation(expressions.email, e.target, 'email');
            break;
        case 'asunto':
            validation(expressions.asunto, e.target, e.target.name);
            break;
        case 'mensaje':
            validation(expressions.mensaje, e.target, 'mensaje');
            break;

        default:
            break;
    }
};

const validation = (expression, input, camp) => {
    if (expression.test(input.value)) {
        d.getElementById(`${camp}-group`).classList.remove('form-item-invalid');
        d.getElementById(`${camp}-group`).classList.add('form-item-valid');
        d.querySelector(`#${camp}-group i`).classList.remove('bi-x-circle-fill');
        d.querySelector(`#${camp}-group i`).classList.add('bi-check-circle-fill');
        d.querySelector(`#${camp}-group .form__input-error`).classList.remove('form__input-error-active');
        camps[camp] = true;
    } else {
        d.getElementById(`${camp}-group`).classList.add('form-item-invalid');
        d.getElementById(`${camp}-group`).classList.remove('form-item-valid');
        d.querySelector(`#${camp}-group i`).classList.remove('bi-check-circle-fill');
        d.querySelector(`#${camp}-group i`).classList.add('bi-x-circle-fill');
        d.querySelector(`#${camp}-group .form__input-error`).classList.add('form__input-error-active');
        camps[camp] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', formValidation);
    input.addEventListener('blur', formValidation);
});

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        button.disabled = !allFilled;
    })
})


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (camps.name && camps.email && camps.asunto && camps.mensaje) {
        form.reset();
        d.querySelector('.form__message-succesfull').classList.add('form__message-succesfull-active');
        setTimeout(() => {
            d.querySelector('.form__message-succesfull').classList.remove('form__message-succesfull-active');
        }, 5000);

        d.querySelectorAll('.form-item-valid').forEach((icon) => {
            icon.classList.remove('form-item-valid');
        });

    } else {

        d.querySelector('.form__error-message').classList.add('form__error-message-active');
        setTimeout(() => {
            d.querySelector('.form__error-message').classList.remove('form__error-message-active');
        }, 2000);
    }
});
