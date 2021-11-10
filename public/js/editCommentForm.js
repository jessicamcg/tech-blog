const commentView = async (id) => {
    const title = document.querySelector('#edit-comment-title');
    const content = document.querySelector('#edit-comment-content');

    const response = await fetch(`/api/comments/${id}`, {
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
commentView(windowID);

const editCommentFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#edit-comment-title').value.trim();
    const content = document.querySelector('#edit-comment-content').value.trim();
    if (title && content) {
        const response = await fetch(`/api/comments/${windowID}`, {
            method: 'PUT',
            body: JSON.stringify({ title,content }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error: Could not create new comment');
        }
    }
};

document
    .querySelector('.edit-comment-btn-form')
    .addEventListener('submit', editCommentFormHandler);