const CLIENT_ID = '1290076168598589510';
const REDIRECT_URI = window.location.origin + '/bo3_mods/index.html';
const GITHUB_TOKEN = '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';
const GITHUB_REPO = 'Debinno/bo3-mods-data';
const GITHUB_API_URL = 'https://api.github.com';

function loginWithDiscord() {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
}

function handleAuth() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken) {
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
        .then(result => result.json())
        .then(response => {
            const { username, discriminator, avatar, id } = response;
            const user = { username, discriminator, avatar, id, lastLogin: new Date().toISOString() };
            localStorage.setItem('user', JSON.stringify(user));
            updateLoginButton();
            if (window.location.pathname.includes('profile.html')) {
                displayProfile(user);
            }
            storeUserData(user);  // Call the function to store user data
        })
        .catch(console.error);
    }
}

function updateLoginButton() {
    const loginBtn = document.querySelector('.login-btn');
    const profileLink = document.querySelector('.profile-link');
    if (!loginBtn || !profileLink) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        loginBtn.textContent = `Welcome, ${user.username}#${user.discriminator}!`;
        loginBtn.removeEventListener('click', loginWithDiscord);
        loginBtn.addEventListener('click', logout);
        profileLink.style.display = 'inline-block';
    } else {
        loginBtn.textContent = 'Login with Discord';
        loginBtn.removeEventListener('click', logout);
        loginBtn.addEventListener('click', loginWithDiscord);
        profileLink.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('user');
    updateLoginButton();
}

window.onload = () => {
    handleAuth();
    updateLoginButton();
};

function displayProfile(user) {
    const profileInfo = document.getElementById('profile-info');
    if (profileInfo) {
        profileInfo.innerHTML = `
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="${user.username}" class="profile-avatar">
            <h2>${user.username}#${user.discriminator}</h2>
            <p>User ID: ${user.id}</p>
            <p>Joined: ${new Date().toLocaleDateString()}</p>
        `;
    }
}

async function storeUserData(user) {
    const content = btoa(JSON.stringify(user));
    const path = `users/${user.id}.json`;
    const url = `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${path}`;

    try {
        // Check if the file already exists
        const checkResponse = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            }
        });

        let method = 'PUT';
        let body = {
            message: `Update user data for ${user.username}`,
            content: content,
        };

        if (checkResponse.ok) {
            // If file exists, we need to include its SHA to update it
            const fileData = await checkResponse.json();
            body.sha = fileData.sha;
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Failed to store user data');
        }

        console.log('User data stored successfully');
    } catch (error) {
        console.error('Error storing user data:', error);
    }
}

async function getFileSHA(path) {
    const url = `${GITHUB_API_URL}/repos/${GITHUB_REPO}/contents/${path}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            }
        });
        if (response.status === 404) {
            return null; // File doesn't exist yet
        }
        const data = await response.json();
        return data.sha;
    } catch (error) {
        console.error('Error getting file SHA:', error);
        return null;
    }
}
