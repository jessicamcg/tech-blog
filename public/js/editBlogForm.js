const blogView = async (id) => {
    const title = document.querySelector('#edit-blog-title');
    const content = document.querySelector('#edit-blog-content');

    const response = await fetch(`/api/blogs/${id}`, {
        method: "GET",
    });
    const responseParsed = await response.json();

    if (responseParsed) {
        title.setAttribute("value", responseParsed.title);
        content.setAttribute("value", responseParsed.content);
    }
};

const windowArr = window.location.pathname.split("/");
const windowID = windowArr[windowArr.length - 1];
// console.log("windowid:", windowID);
blogView(windowID);

const editBlogFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#edit-blog-title').value.trim();
    const content = document.querySelector('#edit-blog-content').value.trim();
    if (title && content) {
        const response = await fetch(`/api/blogs/${windowID}`, {
            method: 'PUT',
            body: JSON.stringify({ title,content }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error: Could not edit blog');
        }
    }
};

document
    .querySelector('.edit-blog-form')
    .addEventListener('submit', editBlogFormHandler);