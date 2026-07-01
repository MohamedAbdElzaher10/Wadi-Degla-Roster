// ======================================
// WADI DEGLA PLAYER PROFILE
// ======================================

// قراءة رقم اللاعب من الرابط
const params = new URLSearchParams(window.location.search);
const playerId = Number(params.get("id"));

// تحميل البيانات
async function loadPlayer() {

    try {

        const response = await fetch("players.json");
        const players = await response.json();

        const player = players.find(p => p.id === playerId);

        if (!player) {

            document.body.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    color:white;
                    font-family:Inter;
                    font-size:30px;
                ">
                    Player Not Found
                </div>
            `;

            return;

        }

        renderPlayer(player);

    }

    catch (error) {

        console.error(error);

    }

}

loadPlayer();


// ======================================
// Calculate Age
// ======================================

function getAge(date){

    if(!date) return "-";

    const parts=date.split("/");

    const birth=new Date(
        parts[2],
        parts[1]-1,
        parts[0]
    );

    const today=new Date();

    let age=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(month<0||(month===0&&today.getDate()<birth.getDate())){

        age--;

    }

    return age;

}


// ======================================
// Avatar
// ======================================

function avatar(name){

    return `
        <div class="avatar">
            ${name.charAt(0).toUpperCase()}
        </div>
    `;

}


// ======================================
// Render
// ======================================

function renderPlayer(player){

    // صورة اللاعب

    const photo=document.getElementById("player-photo");

    if(player.image && player.image!==""){

        photo.innerHTML=`
            <img src="${player.image}" alt="${player.name}">
        `;

    }else{

        photo.innerHTML=avatar(player.name);

    }

    // البيانات

    document.getElementById("player-name").textContent=player.name;

    document.getElementById("player-position").textContent=
    player.position.join(" • ");

    document.getElementById("age").textContent=
    getAge(player.birth);

    document.getElementById("height").textContent=
    player.height+" cm";

    document.getElementById("weight").textContent=
    player.weight+" kg";

    document.getElementById("appearances").textContent=
    player.appearances;

    document.getElementById("goals").textContent=
    player.goals;

    document.getElementById("assists").textContent=
    player.assists;

    document.getElementById("minutes").textContent=
    player.minutes;

    document.getElementById("percentage").textContent=
    player.percentage;

}



// ======================================
// حفظ Scout Report
// ======================================

const report=document.getElementById("report");

if(report){

    const key="report-"+playerId;

    report.value=localStorage.getItem(key)||"";

    report.addEventListener("input",()=>{

        localStorage.setItem(

            key,

            report.value

        );

    });

}
