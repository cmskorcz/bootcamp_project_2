const signupFormHandler = async(event) => {
    event.preventDefault();

    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const first_name = document.querySelector('#signup-firstName').value.trim()
    const last_name = document.querySelector('#signup-lastName').value.trim()

    if (email && password && first_name && last_name) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                first_name,
                last_name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);