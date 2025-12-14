export const showError = (message) => {
    const existingError = document.getElementById("form-error");
    if (existingError) existingError.remove();

    const error = document.createElement('p');
    error.id = 'form-error';
    error.textContent = message;
    error.className = "text-red-500 text-sm mt-3 text-center font-medium";

    const form = document.querySelector('form');
    form.appendChild(error);
}