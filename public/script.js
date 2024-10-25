async function fetchPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            ${post.imagePath ? `<img src="${post.imagePath}" alt="Post Image">` : ''}
            <p>${post.content}</p>
            <button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">Edit</button>
            <button onclick="deletePost('${post._id}')">Delete</button>
            <ul>
                ${post.comments.map(comment => `
                    <li>
                        ${comment.text}
                        <button class="delete-comment" data-post-id="${post._id}" data-comment-id="${comment._id}">Delete</button>
                    </li>
                `).join('')}
            </ul>
            <form class="comment-form" data-post-id="${post._id}">
                <input type="text" placeholder="Add a comment" required>
                <button type="submit">Add Comment</button>
            </form>
        `;

        postsContainer.appendChild(postDiv);
    });

    document.querySelectorAll('.delete-comment').forEach(button => {
        button.addEventListener('click', async (e) => {
            const postId = button.getAttribute('data-post-id');
            const commentId = button.getAttribute('data-comment-id');
            await deleteComment(postId, commentId);
            fetchPosts();
        });
    });
}

async function addPost(title, content, image) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
    });

    if (response.ok) fetchPosts();
}

async function editPost(postId, title, content) {
    const newTitle = prompt('Edit Post Title:', title);
    const newContent = prompt('Edit Post Content:', content);
    if (newTitle && newContent) {
        await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, content: newContent })
        });
        fetchPosts();
    }
}

async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
        fetchPosts();
    }
}

async function addComment(postId, text) {
    await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    fetchPosts();
}

async function deleteComment(postId, commentId) {
    await fetch(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
}

document.getElementById('post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];
    addPost(title, content, image);
    e.target.reset();
});

document.getElementById('posts-container').addEventListener('submit', (e) => {
    if (e.target.classList.contains('comment-form')) {
        e.preventDefault();
        const postId = e.target.getAttribute('data-post-id');
        const text = e.target.querySelector('input').value;
        addComment(postId, text);
        e.target.reset();
    }
});

fetchPosts();
