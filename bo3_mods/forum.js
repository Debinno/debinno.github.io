const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1290079443880120322/-ReumpLfBGvlMqieA9RX7qx3IbXIlQewnc8K5ygH75-k-qsTxe3zGFWDOG6mS2OPZQsn';
const DISCORD_BOT_TOKEN = 'MTI5MDA3NjE2ODU5ODU4OTUxMA.G5WE7Y.w_rBZwW2QH5fd3DuU_QpsjjumeJv5MpJqjD5JY';
const DISCORD_CHANNEL_ID = '1290076756413382746';

const forumCategories = [
    { id: 1, name: "General Discussion", description: "Discuss anything related to BO3 mods" },
    { id: 2, name: "Mod Releases", description: "Share and discover new mods" },
    { id: 3, name: "Mod Requests", description: "Request mods or features" },
    { id: 4, name: "Tutorials", description: "Share or find modding tutorials" },
    { id: 5, name: "Bug Reports", description: "Report and discuss mod bugs" }
];

async function createForumPost(title, content, categoryId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to create a post.');
        return false;
    }

    const postData = {
        id: Date.now(),
        title,
        content,
        categoryId: parseInt(categoryId),
        author: `${user.username}#${user.discriminator}`,
        authorId: user.id,
        date: new Date().toISOString()
    };

    try {
        const response = await fetch('https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts/' + postData.id + '.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Create new forum post',
                content: btoa(JSON.stringify(postData)),
                branch: 'main'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create post on GitHub');
        }

        return true;
    } catch (error) {
        console.error('Error creating post:', error);
        alert(`Failed to create post: ${error.message}`);
        return false;
    }
}

async function renderForumCategories() {
    const categoryList = document.querySelector('.forum-categories');
    if (!categoryList) return;

    categoryList.innerHTML = '';
    for (const category of forumCategories) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'forum-category';
        const posts = await getForumPosts(category.id);
        const postCount = posts.length;
        categoryElement.innerHTML = `
            <h3><a href="category.html?id=${category.id}">${category.name}</a></h3>
            <p>${category.description}</p>
            <p class="post-count">Posts: ${postCount}</p>
        `;
        categoryList.appendChild(categoryElement);
    }
}

function initCreatePostForm() {
    const form = document.getElementById('create-post-form');
    if (!form) return;

    const categorySelect = document.getElementById('post-category');
    forumCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = quill.root.innerHTML;
        const categoryId = categorySelect.value;

        const success = await createForumPost(title, content, categoryId);
        if (success) {
            alert('Post created successfully!');
            window.location.href = `category.html?id=${categoryId}`;
        } else {
            alert('Failed to create post. Please try again.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderForumCategories();
    initCreatePostForm();
    renderLatestPosts();
    initSearchFunctionality();
});

// Add more functions for replying to posts, fetching posts, etc.

async function getForumPosts(categoryId = null) {
    try {
        const response = await fetch('https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts');
        const files = await response.json();
        
        const posts = await Promise.all(files.map(async file => {
            const contentResponse = await fetch(file.download_url);
            const content = await contentResponse.text();
            return JSON.parse(content);
        }));

        return categoryId 
            ? posts.filter(post => post.categoryId === parseInt(categoryId))
            : posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function renderCategoryPosts(categoryId) {
    const categoryTitle = document.getElementById('category-title');
    const categoryPosts = document.getElementById('category-posts');
    
    const category = forumCategories.find(cat => cat.id === parseInt(categoryId));
    if (category) {
        categoryTitle.textContent = category.name;
        document.title = `${category.name} - BO3 Mods Forum`;
    }

    const posts = await getForumPosts(categoryId);
    
    if (posts.length === 0) {
        categoryPosts.innerHTML = '<p class="no-posts">No posts found in this category.</p>';
        return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    categoryPosts.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'forum-post';
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
            <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleString()}</p>
        `;
        categoryPosts.appendChild(postElement);
    });
}

async function editForumPost(postId, newTitle, newContent) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to edit a post.');
        return false;
    }

    try {
        const postResponse = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts/${postId}.json`);
        const postFile = await postResponse.json();
        const postData = JSON.parse(atob(postFile.content));

        if (postData.authorId !== user.id) {
            alert('You can only edit your own posts.');
            return false;
        }

        postData.title = newTitle;
        postData.content = newContent;
        postData.lastEdited = new Date().toISOString();

        const response = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts/${postId}.json`, {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Edit forum post',
                content: btoa(JSON.stringify(postData)),
                sha: postFile.sha,
                branch: 'main'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to edit post on GitHub');
        }

        return true;
    } catch (error) {
        console.error('Error editing post:', error);
        alert(`Failed to edit post: ${error.message}`);
        return false;
    }
}

async function deleteForumPost(postId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to delete a post.');
        return false;
    }

    try {
        const postResponse = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts/${postId}.json`);
        const postFile = await postResponse.json();
        const postData = JSON.parse(decodeURIComponent(escape(atob(postFile.content))));

        if (postData.authorId !== user.id) {
            alert('You can only delete your own posts.');
            return false;
        }

        const response = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/posts/${postId}.json`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Delete forum post',
                sha: postFile.sha,
                branch: 'main'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to delete post on GitHub');
        }

        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        alert(`Failed to delete post: ${error.message}`);
        return false;
    }
}

async function getReplies(postId) {
    try {
        const response = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/replies/${postId}.json`);
        if (response.status === 404) {
            return []; // No replies yet
        }
        const file = await response.json();
        const replies = JSON.parse(atob(file.content));
        return replies;
    } catch (error) {
        console.error('Error fetching replies:', error);
        return [];
    }
}

async function createReply(postId, content) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You must be logged in to reply to a post.');
        return false;
    }

    const replyData = {
        id: Date.now(),
        postId: postId,
        author: `${user.username}#${user.discriminator}`,
        authorId: user.id,
        content: content,
        date: new Date().toISOString()
    };

    try {
        const response = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/replies/${postId}.json`);
        let method = 'PUT';
        let existingReplies = [];
        let sha;

        if (response.ok) {
            const file = await response.json();
            existingReplies = JSON.parse(atob(file.content));
            sha = file.sha;
        }

        existingReplies.push(replyData);

        const updateResponse = await fetch(`https://api.github.com/repos/Debinno/bo3-mods-data/contents/replies/${postId}.json`, {
            method: method,
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Add reply to forum post',
                content: btoa(JSON.stringify(existingReplies)),
                sha: sha,
                branch: 'main'
            })
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to create reply on GitHub');
        }

        return true;
    } catch (error) {
        console.error('Error creating reply:', error);
        return false;
    }
}

async function updateUserReputation(userId, change) {
    const user = await getUserData(userId);
    user.reputation = (user.reputation || 0) + change;
    await storeUserData(user);
}

function displayUserReputation(userId) {
    getUserData(userId).then(user => {
        const repElements = document.querySelectorAll(`.user-reputation-${userId}`);
        repElements.forEach(el => {
            el.textContent = user.reputation || 0;
        });
    });
}

async function renderLatestPosts() {
    const latestPostsContainer = document.getElementById('latest-posts');
    if (!latestPostsContainer) return;

    const posts = await getForumPosts();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestPosts = posts.slice(0, 5);

    latestPostsContainer.innerHTML = '';
    latestPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'forum-post';
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleString()}</p>
        `;
        latestPostsContainer.appendChild(postElement);
    });
}

function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

async function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const posts = await getForumPosts();

    const searchResults = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm)
    );

    renderSearchResults(searchResults);
}

function renderSearchResults(results) {
    const forumPosts = document.querySelector('.forum-posts');
    forumPosts.innerHTML = '<h2>Search Results</h2>';

    if (results.length === 0) {
        forumPosts.innerHTML += '<p>No results found.</p>';
        return;
    }

    results.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'forum-post';
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
            <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleString()}</p>
        `;
        forumPosts.appendChild(postElement);
    });
}