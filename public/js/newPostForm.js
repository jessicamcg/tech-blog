
const newpostFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#new-blog-title').value.trim();
    const content = document.querySelector('#new-blog-content').value.trim();
    if (title && content) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title,content }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error: Could not create new blog post');
        }
    }

};

document
    .querySelector('.create-new-blog-btn-form')
    .addEventListener('submit', newpostFormHandler);