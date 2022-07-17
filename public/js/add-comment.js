const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.getElementById('comment-input').value.trim();
    const event_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({
            comment_text,
            event_id,
            // will remove from body once login available
            user_id: 1
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
}

document.getElementById('comment-form').addEventListener('submit', commentFormHandler);