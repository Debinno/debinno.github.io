document.addEventListener('DOMContentLoaded', async () => {
  const contentDiv = document.getElementById('content');
  const docLinks = document.querySelector('.doc-links');
  const progressBar = document.querySelector('.progress-bar');
  
  // Determine if we're in blog or docs section
  const isBlog = window.location.pathname.startsWith('/blog');
  const contentType = isBlog ? 'blog' : 'docs';
  
  try {
    // Load index file
    const indexResponse = await fetch(`/content/${contentType}/index.txt`);
    const indexText = await indexResponse.text();
    
    // Create sidebar links
    const links = indexText.split('\n').filter(line => line.trim());
    links.forEach(link => {
      const [title, path] = link.split('::');
      const a = document.createElement('a');
      a.href = `/${contentType}/${path}`;
      a.textContent = title;
      if (window.location.pathname === `/${contentType}/${path}`) {
        a.classList.add('active');
      }
      docLinks.appendChild(a);
    });
    
    // Get the current path
    const path = window.location.pathname.replace(`/${contentType}/`, '');
    
    // Load content if a specific page is requested
    if (path && path !== contentType) {
      const response = await fetch(`/content/${contentType}/${path}`);
      const markdown = await response.text();
      
      // Update page title from markdown
      const titleMatch = markdown.match(/# (.*)/);
      if (titleMatch) {
        document.title = `${titleMatch[1]} - Debino`;
      }
      
      // Convert markdown to HTML
      contentDiv.innerHTML = marked.parse(markdown);
      
      // Add syntax highlighting
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