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
          alert('Failed to delete comment');
        }
      }
};

const editCommentBtn = async (event) => {
  const id = event.target.getAttribute('data-comment-id')
  document.location.replace(`/comment/${id}`);
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
  // const delBtns = document.querySelectorAll
}

document
    .querySelector('.add-comment-btn')
    .addEventListener('click', addCommentBtn);


