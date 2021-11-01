const newpostFormHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/newblog')
};

document
    .querySelector('#new-blog-btn')
    .addEventListener('click', newpostFormHandler)