document.addEventListener('DOMContentLoaded', async () => {
  const contentDiv = document.getElementById('content');
  const sidebarLinks = document.getElementById('sidebar-links');
  const progressBar = document.querySelector('.progress-bar');
  
  // Get the current blog post path from URL
  const path = window.location.pathname.replace('/blog/', '');
  
  try {
    // Load blog index first
    const indexResponse = await fetch('/content/blog/index.txt');
    const indexText = await indexResponse.text();
    
    // Create sidebar links
    const links = indexText.split('\n').filter(line => line.trim());
    links.forEach(link => {
      const [title, path] = link.split('::');
      const a = document.createElement('a');
      a.href = `/blog/${path}`;
      a.textContent = title;
      if (window.location.pathname === `/blog/${path}`) {
        a.classList.add('active');
      }
      sidebarLinks.appendChild(a);
    });
    
    // Load the blog post content
    if (path) {
      const response = await fetch(`/content/blog/${path}`);
      const markdown = await response.text();
      
      // Update page title
      const titleMatch = markdown.match(/# (.*)/);
      if (titleMatch) {
        document.title = `${titleMatch[1]} - Debino`;
      }
      
      // Convert markdown to HTML
      contentDiv.innerHTML = marked.parse(markdown);
      
      // Add syntax highlighting if needed
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }
    
    progressBar.style.width = '100%';
    
  } catch (error) {
    console.error('Error loading content:', error);
    contentDiv.innerHTML = '<h1>Error loading content</h1><p>Please try again later.</p>';
  }
}); 