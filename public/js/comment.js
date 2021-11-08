const addCommentBtn = async (event) => {
    document.location.replace('/add-comment')
}

    
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
            alert('Error: Could not create new blog post');
        }
    }

};

const deleteCommentBtn = async (event) => {
    if (event.target.hasAttribute('comment-id')) {
        const id = event.target.getAttribute('comment-id');
    
        const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete blog');
        }
      }
};

const editCommentBtn = async (event) => {
    // document.location.replace('/edit-comment')
    console.log('click');
}

if (document.querySelector('.edit-comment-btn')) {
    document
        .querySelector('.edit-comment-btn')
        .addEventListener('click', editCommentBtn);
}

if (document.querySelector('.delete-comment-btn')) {
    document
        .querySelector('.delete-comment-btn')
        .addEventListener('click', deleteCommentBtn)
}


document
    .querySelector('.add-comment-btn')
    .addEventListener('click', addCommentBtn);


// document
//     .querySelector('.add-comment-btn-form')
//     .addEventListener('submit', newCommentFormHandler);