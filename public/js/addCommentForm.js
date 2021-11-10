
const newCommentFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#new-comment-title').value.trim();
    const content = document.querySelector('#new-comment-content').value.trim();
    if (title && content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ title,content }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            // document.location.replace('/dashboard');
            history.back(); 
        } else {
            alert('Error: Could not create new comment');
        }
    }

};

document
    .querySelector('.add-comment-btn-form')
    .addEventListener('submit', newCommentFormHandler);