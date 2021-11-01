const newpostBtnHandler = async (event) => {

};


const newpostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-blog-title').value.trim();
    const content = document.querySelector('#new-blog-content').value.trim();

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ title,content }),
        headers: { 'Content-Type': 'application/json' },
    });
    

    if (response.ok) {
        document.location.replace('/newblog');
    } else {
        alert('Error: Could not create new blog post');
    }
};



document
    .querySelector('#new-blog-btn')
    .addEventListener('click', newpostBtnHandler);

    document
    .querySelector('#create-new-blog-btn')
    .addEventListener('click', newpostFormHandler)