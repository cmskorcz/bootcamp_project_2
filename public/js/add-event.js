const newEventFromHandler = async (event) => {
    event.preventDefault();

    const name = document.getElementById('eventNameInput').value.trim();
    const address = document.getElementById('eventAddressInput').value.trim();
    const date = document.getElementById('eventDateInput').value.trim();
    const description = document.getElementById('eventDescriptionInput').value.trim();

    const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
            name,
            address,
            date,
            description,
            // replace with req.session.user_id when login page built
            user_id: 1
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.getElementById('new-event-form').addEventListener('submit', newEventFromHandler);