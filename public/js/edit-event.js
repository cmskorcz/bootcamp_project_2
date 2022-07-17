const editEventFormHandler = async (event) => {
    event.preventDefault();

    const name = document.getElementById('eventNameEdit').value.trim();
    const address = document.getElementById('eventAddressEdit').value.trim();
    const date = document.getElementById('eventDateEdit').value.trim();
    const description = document.getElementById('eventDescriptionEdit').value.trim();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 2]

    const body = {}
    if (name) {
        body.name = name;
    }

    if (address) {
        body.address = address;
    }

    if (date) {
        body.date = date;
    }

    if (description) {
        body.description = description
    }

    const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace(`/profile`);
    } else {
        alert(response.statusText);
    }
}

document.getElementById('eventUpdateButton').addEventListener('click', editEventFormHandler);