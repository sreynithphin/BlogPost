let posts = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!"
  },
  {
    id: 2,
    title: "Learning JavaScript",
    content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation."
  },
  {
    id: 3,
    title: "Web Development Tips",
    content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary."
  }
];

const container = document.getElementById('blogContainer');
const addBtn = document.getElementById('addBtn');

// Function to render all posts
function renderPosts() {
  container.innerHTML = '';
  
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">${post.title}</h2>
        <button class="btn-edit-title" data-id="${post.id}">Edit Title</button>
      </div>
      <div class="card-body">
        ${post.content}
      </div>
      <div class="actions">
        <button class="btn-edit-content" data-id="${post.id}">Edit Content</button>
        <button class="btn-delete" data-id="${post.id}">Delete Post</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Add Post listener using Event Object (e)
addBtn.addEventListener('click', function(e) {
  const title = prompt("Enter post title:");
  if (!title) return;

  const content = prompt("Enter post content:");
  if (!content) return;

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim()
  };

  posts.push(newPost);
  renderPosts();
});

// Container listener using Event Object (e) for delegation
container.addEventListener('click', function(e) {
  const target = e.target; // Identify clicked element via event object
  const postId = Number(target.getAttribute('data-id'));

  if (!postId) return;

  if (target.classList.contains('btn-edit-title')) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newTitle = prompt("Edit Title:", post.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      post.title = newTitle.trim();
      renderPosts();
    }
  } 
  else if (target.classList.contains('btn-edit-content')) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newContent = prompt("Edit Content:", post.content);
    if (newContent !== null && newContent.trim() !== "") {
      post.content = newContent.trim();
      renderPosts();
    }
  } 
  else if (target.classList.contains('btn-delete')) {
    if (confirm("Are you sure you want to delete this blog post?")) {
      posts = posts.filter(p => p.id !== postId);
      renderPosts();
    }
  }
});

// Initial render on load
renderPosts();