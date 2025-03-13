document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/blogs")
        .then(response => response.json())
        .then(blogs => {
            const blogList = document.getElementById("blog-list");
            blogs.forEach(blog => {
                const blogDiv = document.createElement("div");
                blogDiv.classList.add("blog");
                blogDiv.innerHTML = `
                    <h2>${blog.title}</h2>
                    <p>${blog.content}</p>
                    <a href="/blog/${blog.id}" class="read-more" data-id="${blog.id}">Read More</a>
                `;
                blogList.appendChild(blogDiv);
            });

            // Handle routing for individual blog pages
            document.querySelectorAll(".read-more").forEach(link => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const blogId = event.target.getAttribute("data-id");
                    loadBlog(blogId);
                });
            });
        })
        .catch(error => console.error("Error loading blogs:", error));
});

// Function to fetch and display individual blog posts
function loadBlog(id) {
    fetch(`/api/blog/${id}`)
        .then(response => response.json())
        .then(blog => {
            document.body.innerHTML = `
                <div class="container">
                    <h1>${blog.title}</h1>
                    <p>${blog.content}</p>
                    <a href="/" onclick="window.location.reload()">Go Back</a>
                </div>
            `;
        })
        .catch(error => console.error("Error fetching blog:", error));
}

blogDiv.innerHTML = `
    <h2>${blog.title}</h2>
    <p>${blog.content.substring(0, 100)}...</p> 
    <a href="/blog/${blog.id}" class="read-more" data-id="${blog.id}">
        Read More <i class="fas fa-arrow-right"></i>
    </a>
`;