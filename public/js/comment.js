const addCommentBtn = async (event) => {
    document.location.replace('/add-comment')
}

const deleteCommentBtn = async (event) => {
    if (event.target.hasAttribute('data-comment-id')) {
        const id = event.target.getAttribute('data-comment-id');
    
        const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          location.reload();
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


