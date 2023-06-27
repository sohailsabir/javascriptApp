document.addEventListener('DOMContentLoaded', () => {
  let page = 1;
  let isLoading = false;

  const loadMorePosts = () => {
    if (isLoading) return;
    isLoading = true;
    
    fetch(`/load-more-posts/?page=${page}`)
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.getElementById('posts-container');
        data.posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>${post.date_posted}</p>
          `;
          postsContainer.appendChild(postElement);
        });
        
        isLoading = false;
        if (data.has_next) {
          page += 1;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        isLoading = false;
      });
  };

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMorePosts();
    }
  });

  loadMorePosts();
});
