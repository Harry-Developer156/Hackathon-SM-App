//////////////////////////////////////////varaible declaration//////////////////////////////////////////////////////
let usernameDisplay = document.getElementById("header-username");
let avatarDisplay = document.getElementById("header-avatar");
let logoutBtn = document.getElementById("logout-btn");
let postText = document.getElementById("post-text");
let postImageUrl = document.getElementById("post-image-url");
let postImageFile = document.getElementById("post-image-file");
let imagePreview = document.getElementById("image-preview");
let postBtn = document.getElementById("post-btn");
let postsContainer = document.getElementById("posts-container");
let searchInput = document.getElementById("search-input");
let controls = { latest: document.getElementById("latest"), oldest: document.getElementById("oldest"), mostLiked: document.getElementById("mostLiked") };
let profileModal = document.getElementById("profile-modal");
let editProfileBtn = document.getElementById("edit-profile-btn");
let profileCancel = document.getElementById("profile-cancel");
let profileSave = document.getElementById("profile-save");
let profileName = document.getElementById("profile-name");
let profileAvatarPreview = document.getElementById("profile-avatar-preview");
let profileAvatarFile = document.getElementById("profile-avatar-file");

/////////////////////////////////////// User loading /////////////////////////////////////////////////
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { username: "User", avatar: "" };
usernameDisplay.textContent = currentUser.username;
avatarDisplay.textContent = currentUser.username[0].toUpperCase();
if (currentUser.avatar) avatarDisplay.style.backgroundImage = `url(${currentUser.avatar})`;

/////////////////////////////////////// logout /////////////////////////////////////////////////
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "./login.html";
});

/////////////////////////////////////// Image checking /////////////////////////////////////////////////

postImageFile.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = () => {
        imagePreview.innerHTML = `<img src="${reader.result}" class="w-full rounded-md mt-2" />`;
    };
    reader.readAsDataURL(file);
});

/////////////////////////////////////// Posting /////////////////////////////////////////////////

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

/////////////////////////////////////// Creatw new Post /////////////////////////////////////////////////

postBtn.addEventListener("click", () => {
    let text = postText.value.trim();
    console.log("Text value: ", text);
    
    if (!text && !postImageUrl.value && !postImageFile.files.length) {
        alert("Enter text or image!");
        return; 
    }

    let image = postImageUrl.value.trim();
    console.log("Image URL value: ", image); 

    if (postImageFile.files.length) {
        let reader = new FileReader();
        reader.onload = () => {
            console.log("Image loaded successfully: ", reader.result);  
            image = reader.result;
            addPost(text, image);
        };
        reader.readAsDataURL(postImageFile.files[0]);
    } else {
        console.log("No image file, posting with URL only.");
        addPost(text, image);
    }
});


function addPost(text, image) {
    const newPost = {
        id: Date.now(),
        author: currentUser.username,
        text: text,
        image: image,
        timestamp: new Date(),
        likes: 0,
    };

    
    posts.push(newPost);
    savePosts();
    renderPosts(posts); 
}

/////////////////////////////////////// Post rendering /////////////////////////////////////////////////

function renderPosts(postsList) {
  postsContainer.innerHTML = "";
  postsList.forEach((post) => {
    let postEl = document.createElement("div");
    postEl.className = "bg-white p-4 rounded-xl shadow";
    postEl.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold overflow-hidden">${post.author[0]}</div>
        <div>
          <p class="font-semibold">${post.author}</p>
          <p class="text-xs text-gray-500">${new Date(post.timestamp).toLocaleString()}</p>
        </div>
      </div>
      <p class="mb-2">${post.text}</p>
      ${post.image ? `<img src="${post.image}" class="w-full rounded-md mb-2"/>` : ""}
      <div class="flex items-center gap-3 text-sm text-gray-500">
        <button class="like-btn flex items-center gap-1">${post.likes} ❤️</button>
        <button class="delete-btn text-red-500">Delete</button>
      </div>
    `;
    // Like
    postEl.querySelector(".like-btn").addEventListener("click", () => {
      post.likes++;
      savePosts();
      renderPosts(posts);
    });
    // Delete
    postEl.querySelector(".delete-btn").addEventListener("click", () => {
      posts = posts.filter((p) => p.id !== post.id);
      savePosts();
      renderPosts(posts);
    });
    postsContainer.appendChild(postEl);
  });
}
renderPosts(posts);

/////////////////////////////////////// Sorting /////////////////////////////////////////////////
controls.latest.addEventListener("click", () => renderPosts([...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))));
controls.oldest.addEventListener("click", () => renderPosts([...posts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))));
controls.mostLiked.addEventListener("click", () => renderPosts([...posts].sort((a, b) => b.likes - a.likes)));

/////////////////////////////////////// Search /////////////////////////////////////////////////
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  renderPosts(posts.filter(p => p.text.toLowerCase().includes(query)));
});
