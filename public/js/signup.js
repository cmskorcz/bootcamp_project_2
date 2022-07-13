async function signupFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const fistName = document.querySelector('#signup-fistName').value.trim();
    const lastName = document.querySelector('#signup-lastName').value.trim();


    if (username && password) {
        const response = await fetch('/signup', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                fistName,
                lastName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);