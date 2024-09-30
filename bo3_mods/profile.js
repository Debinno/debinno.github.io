document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        displayProfile(user);
        fetchUserActivity(user.id);
    } else {
        window.location.href = 'index.html';
    }
});

function fetchUserActivity(userId) {
    // This is a placeholder function. In a real application, you would fetch the user's activity from your backend.
    const userActivity = document.getElementById('user-activity');
    userActivity.innerHTML += `
        <ul>
            <li>Posted in "General Discussion" - 2 days ago</li>
            <li>Replied to "Need help with a mod" - 5 days ago</li>
            <li>Created a new topic "My first BO3 mod" - 1 week ago</li>
        </ul>
    `;
}
