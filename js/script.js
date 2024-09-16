
let posts = [
    {
        'logo': './images/nasa.png',
        'name': 'Nasa',
        'image': './images/andromeda.jpg',
        'location': 'Polen',
        'isLiked': true,
        'likes': 7,
        'description': 'The Andromeda Galaxy, our nearest spiral neighbor, is about 2.537 million light-years away and will collide with the Milky Way in about 4.5 billion years.',
        'usernames': [],
        'comments': [],
        'date': '12 May 2024', 
    },

    {
        'logo': './images/instagram.png',
        'name': 'Instagram',
        'image': './images/moon.jpg',
        'location': 'Germany',
        'isLiked': true,
        'likes': 20,
        'description': 'The Moon, Earths natural satellite, orbits about 384,400 kilometers away. It influences our tides, and its phases have fascinated humans for centuries.',
        'usernames': [],
        'comments': [],
        'date': '12 December 2024',

    },

    {
        'logo': './images/facebook.png',
        'name': 'Facebook',
        'image': './images/javascript.jpg',
        'location': 'USA',
        'isLiked': true,
        'likes': 30,
        'description': 'JavaScript was invented by Brendan Eich in just 10 days.',
        'usernames': [],
        'comments': [],
        'date': '12.05.2024',

    },

];
load();
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        content.innerHTML += renderHTML(post, i);


        const commentsContent = document.getElementById(`commentsContent${i}`);
        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];
            const username = post['usernames'][j]; 
            commentsContent.innerHTML += `<div><strong>${username}:</strong> ${comment}</div>`;
        }
        Likes(i);
    }
}



function renderHTML(post, i) {
    return `
        <div class="card">
        <div class="main-card-headline">
        <div class="card-headline">
           <img src="http://127.0.0.1:8000${post.logo}" alt="Logo" width="100" />
    <h2>${post.name}</h2>
        <p>${post['location']}</p>
        <div>${post['date']}</div>
        </div>
        </div>
          <img src="http://127.0.0.1:8000${post.image}" alt="Image"  />
        <div>
        <img src="./images/blackHeart.png" alt="" class="blackHeart" id="blackHeart${i}" onclick="toggleHeart(${i})">
        <img src="./images/sprechblase.png" alt="SprechblasenSymbol" class="sprachblasenSymbol">
        <img src="./images/senden.png" alt="sendenSymbol" class="sendenSymbol">
        <p class="likeCounter" id="likeCounter${i}">Likes ${posts[i]['likes']}</p>
        <div class="description" >${post['description']}</div>
        </div>
        <div class="wrapWord" id="commentsContent${i}"></div>
        <input id="nameInput${i}" placeholder="Dein Name">
        <input id="input${i}" placeholder="Kommentar"><button onclick="addComment(${i})">Comment</button>
        <button onclick="deleteComment(${i})">Delete</button>
      </div>
    `;
    }


function addComment(i) {
    let input = document.getElementById(`input${i}`);
    let usernameInput = document.getElementById(`nameInput${i}`);
    posts[i]['comments'].push(input.value);
    posts[i]['usernames'].push(usernameInput.value);
    input.value = '';
    usernameInput.value = '';
    saveComments(); 
    render(); 
}

function deleteComment(i) {
    posts[i]['comments'].splice(0, 1);
    posts[i]['usernames'].splice(0, 1);
    saveComments(); 
    render();
}

//load();
//render();

function toggleHeart(i) {
    if (posts[i]['isLiked']) {
        document.getElementById(`blackHeart${i}`).src = './images/redHeart.png';
        posts[i]['isLiked'] = false;
        posts[i]['likes']++;
        Likes(i);
    } else {
        document.getElementById(`blackHeart${i}`).src = './images/blackHeart.png';
        posts[i]['isLiked'] = true;
        posts[i]['likes']--;
        Likes(i);

    }
    saveComments();
    Likes(i)
}
function Likes(i) {
    let likeCounter = document.getElementById(`likeCounter${i}`);
    let heart = document.getElementById(`blackHeart${i}`);
    if (posts[i]['isLiked']) {
        heart.src = './images/blackHeart.png';
    } else {
        heart.src = './images/redHeart.png';
    }
    likeCounter.innerHTML = `Likes ${posts[i]['likes']}`;
}

function saveComments() {
    let postsAddAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAddAsText)
}

function load() {
    let storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
}

const apiURL = "http://127.0.0.1:8000/api/posts/"; // Adres API

// Funkcja do pobierania danych z API
function fetchPosts() {
    fetch(apiURL)
        .then(response => response.json())  // Przekształcenie odpowiedzi na format JSON
        .then(fetchedPosts => {
            // Przypisz wszystkie pobrane posty z API do zmiennej posts
            posts = fetchedPosts;
            render(); // Renderowanie wszystkich postów
        })
        .catch(error => console.error('Błąd podczas pobierania danych:', error));
}

// Funkcja renderująca pozostałe elementy strony (tak jak wcześniej)
function render() {
    let content = document.getElementById('content');
    content.innerHTML = ''; // Wyczyszczenie istniejących postów
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        content.innerHTML += renderHTML(post, i);

        const commentsContent = document.getElementById(`commentsContent${i}`);
        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];
            const username = post['usernames'][j];
            commentsContent.innerHTML += `<div><strong>${username}:</strong> ${comment}</div>`;
        }
        Likes(i);
    }
}





// Wywołanie funkcji fetch na początku ładowania strony
document.addEventListener('DOMContentLoaded', fetchPosts);
