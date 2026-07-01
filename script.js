// =====================================================
// WADI DEGLA SC
// Women's Team Roster
// =====================================================

let players = [];
let filteredPlayers = [];

const container = document.getElementById("players-container");

const searchInput = document.getElementById("search");

const positionFilter = document.getElementById("positionFilter");

const sortFilter = document.getElementById("sortFilter");

// =========================
// Load JSON
// =========================

async function loadPlayers(){

    try{

        const response = await fetch("players.json");

        players = await response.json();

        filteredPlayers = [...players];

        updateDashboard();

        renderPlayers(filteredPlayers);

    }

    catch(error){

        container.innerHTML=

        `<div class="no-results">

        Error Loading Players

        </div>`;

        console.error(error);

    }

}

loadPlayers();

// =========================
// Calculate Age
// =========================

function getAge(date){

    if(!date) return 0;

    const parts=date.split("/");

    const birth=new Date(

        parts[2],

        parts[1]-1,

        parts[0]

    );

    const today=new Date();

    let age=today.getFullYear()-birth.getFullYear();

    const m=today.getMonth()-birth.getMonth();

    if(m<0||(m===0&&today.getDate()<birth.getDate())){

        age--;

    }

    return age;

}
// =========================
// Dashboard
// =========================

function updateDashboard(){

document.getElementById("players-count").textContent=players.length;

const goals=players.reduce((a,b)=>a+Number(b.goals||0),0);

document.getElementById("total-goals").textContent=goals;

const assists=players.reduce((a,b)=>a+Number(b.assists||0),0);

document.getElementById("total-assists").textContent=assists;

const avgHeight=

players.reduce((a,b)=>a+Number(b.height||0),0)/players.length;

document.getElementById("avg-height").textContent=

avgHeight.toFixed(0)+" cm";

const avgWeight=

players.reduce((a,b)=>a+Number(b.weight||0),0)/players.length;

document.getElementById("avg-weight").textContent=

avgWeight.toFixed(0)+" kg";

const avgAge=

players.reduce((a,b)=>a+getAge(b.birth),0)/players.length;

document.getElementById("avg-age").textContent=

avgAge.toFixed(1);

}
// =========================
// Avatar
// =========================

function avatar(name){

return name.charAt(0).toUpperCase();

}

// normalize local image paths to ensure they resolve under GitHub Pages
function normalizeImagePath(path){
    if(!path) return path;
    if(path.startsWith('http') || path.startsWith('./')) return path;
    return './' + path.replace(/^\//, '');
}

// =========================
// Card
// =========================

function playerCard(player){

    const img = player.image && player.image !== "" ?
        `<img src="${normalizeImagePath(player.image)}" alt="${player.name}">`
        :
        `<div class="player-avatar">
            ${avatar(player.name)}
        </div>`;

    return `

    <div class="player-card">

        <div class="player-image">

            ${img}

        </div>

        <div class="player-info">

            <div class="player-number">

                #${player.id}

            </div>

            <h2 class="player-name">

                ${player.name}

            </h2>

            <div class="player-position">

                ${player.position.join(" • ")}

            </div>

            <div class="player-details">

                <div class="detail">

                    <h4>Height</h4>

                    <p>${player.height} cm</p>

                </div>

                <div class="detail">

                    <h4>Weight</h4>

                    <p>${player.weight} kg</p>

                </div>

                <div class="detail">

                    <h4>Goals</h4>

                    <p>${player.goals}</p>

                </div>

                <div class="detail">

                    <h4>Assists</h4>

                    <p>${player.assists}</p>

                </div>

            </div>

            <button

                class="profile-btn"

                onclick="openPlayer(${player.id})">

                Scout Report →

            </button>

        </div>

    </div>

    `;

}
// =========================
// Render
// =========================

function renderPlayers(data){

    if(data.length===0){
        container.innerHTML =
            `<div class="no-results">
                No Players Found
            </div>`;
        return;
    }

    container.innerHTML = data.map(playerCard).join("");

}

// =========================
// Open Profile
// =========================

function openPlayer(id){

window.location.href=

`player.html?id=${id}`;

}
// =========================
// Search
// =========================

searchInput.addEventListener("input",filterPlayers);

positionFilter.addEventListener("change",filterPlayers);

sortFilter.addEventListener("change",filterPlayers);

function filterPlayers(){

const keyword=

searchInput.value.toLowerCase();

const position=

positionFilter.value;

filteredPlayers=

players.filter(player=>{

const matchName=

player.name

.toLowerCase()

.includes(keyword);

const matchPosition=

position==="All"

||

player.position.includes(position);

return matchName&&matchPosition;

});

sortPlayers();

}

// =========================
// Sort
// =========================

function sortPlayers(){

const value=

sortFilter.value;

filteredPlayers.sort((a,b)=>{

if(value==="name"){

return a.name.localeCompare(b.name);

}

return Number(b[value])-Number(a[value]);

});

renderPlayers(filteredPlayers);

}
