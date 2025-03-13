document.addEventListener("DOMContentLoaded", () => {
    fetchBlogs();
    
    // Handle blog submission
    document.getElementById("blogForm").addEventListener("submit", (event) => {
        event.preventDefault();
        submitBlog();
    });
});

// Fetch all blogs from backend
function fetchBlogs() {
    fetch("/api/blogs")
        .then(response => response.json())
        .then(blogs => {
            const blogList = document.getElementById("blog-list");
            blogList.innerHTML = ""; 

            blogs.forEach(blog => {
                const blogDiv = document.createElement("div");
                blogDiv.classList.add("blog");
                blogDiv.innerHTML = `
                    <h2>${blog.title}</h2>
                    <p>${blog.content.substring(0, 100)}...</p> 
                    <a href="#" class="read-more" data-id="${blog._id}">
                        Read More →
                    </a>
                `;

                blogList.appendChild(blogDiv);
            });

            document.querySelectorAll(".read-more").forEach(link => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const blogId = event.target.closest("a").getAttribute("data-id");
                    loadBlog(blogId);
                });
            });
        })
        .catch(error => console.error("Error loading blogs:", error));
}

// Fetch and display a single blog post
function loadBlog(id) {
    fetch(`/api/blog/${id}`)
        .then(response => response.json())
        .then(blog => {
            document.body.innerHTML = `
                <header>
                    <h1>${blog.title}</h1>
                </header>
                <div class="full-blog">
                    <p>${blog.content}</p>
                    <a href="/">⬅ Go Back</a>
                </div>
            `;
        })
        .catch(error => console.error("Error fetching blog:", error));
}

// Submit a new blog post
function submitBlog() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("blogForm").reset();
        fetchBlogs();
    })
    .catch(error => console.error("Error adding blog:", error));
}
