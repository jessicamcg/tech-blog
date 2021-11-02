const addCommentBtn = async (event) => {
    document.location.replace('/add-comment')
}

document
    .querySelector('.add-comment-btn')
    .addEventListener('click', addCommentBtn);