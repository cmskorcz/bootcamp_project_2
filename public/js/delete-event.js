const deleteEvent = async(event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 2]

    const response = await fetch('/api/events/:id', {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/profile')
    } else {
        alert(response.statusText)
    }
}

document.getElementById('event-delete').addEventListener('click', deleteEvent)