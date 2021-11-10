const deleteBlogBtn = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
    
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete blog');
        }
      }
};

const editBlogBtn = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.location.replace(`/edit-blog/${id}`)
};

if (document.querySelector('.edit-blog-btn')) {
  document
    .querySelector('.edit-blog-btn')
    .addEventListener('click', editBlogBtn)
}

if (document.querySelector('.delete-blog-btn')) {
  document
    .querySelector('.delete-blog-btn')
    .addEventListener('click', deleteBlogBtn)
}
