const createUserFormHandler = async (event) => {
    event.preventDefault();

    const first_name = document.getElementById('createFirstName').value.trim();
    const last_name = document.getElementById('createLastName').value.trim();
    const email = document.getElementById('createEmail').value.trim();
    const password = document.getElementById('createPassword').value.trim();

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

document.getElementById('create-user-form').addEventListener('submit', createUserFormHandler);