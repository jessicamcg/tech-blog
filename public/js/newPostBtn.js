const newpostBtnHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/new-blog-form');
    console.log('click');
};


document
    .querySelector('#new-blog-btn')
    .addEventListener('click', newpostBtnHandler);
