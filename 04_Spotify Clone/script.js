// -----------------------------------    making a cursor  -----------------------------        //

// let cursor = document.querySelector(".cursor");
// let container = document.querySelector(".container");

// container.addEventListener("mousemove", (evt) => {
//   cursor.style.left = evt.clientX + "px";
//   cursor.style.top = evt.clientY + "px";
// });

//  ---------------------------------    creating many cards ---------------------------    //

let cards = document.querySelector(".cards");
function addingCards(image, first, second) {
  let div = document.createElement("div");
  div.className = "card-one";
  div.innerHTML = `
       <div class="card-img">
          <img src=${image}  alt="image" />
          <div class="play">
              <i class="fa-solid fa-play"></i>
          </div>
        </div>
       <div class="content">
        <h4>${first}</h4>
        <p>${second}</p>
       </div>
     </div>
 `;
  cards.append(div);
}

addingCards(
  "img/Arijit.jpeg",
  "Arijit Singh",
  "Arijit Singh, Sachet Tandon, The Weeknd... "
);
addingCards(
  "img/pooja.jpeg",
  "Hare Krishna",
  "Let's pray together for happy prosperous!... "
);
addingCards("img/uniqe1.jpg", "No Repeat", "Songs you love right now ");
addingCards(
  "img/uniqe2.jpg",
  "Your Time Capsule",
  "Arijit Singh, Sachet Tandon, The Weeknd... "
);
addingCards(
  "img/ranbir.jpeg",
  "Ranbir Kapur",
  "Arijit Singh, Sachet Tandon, The Weeknd... "
);
addingCards(
  "img/one.jpeg",
  "Dinner Jazz",
  "The gentle sound of some of the greatest... "
);
addingCards(
  "img/two.jpeg",
  "Dinner Lounge",
  "Soft electronic music for your dinner. "
);
addingCards(
  "img/three.jpeg",
  "Feel Good Dinner",
  "An uplifting yet tasteful dinner playli... "
);
addingCards(
  "img/four.jpeg",
  "Bossa Nova Dinner",
  "Soundtrack your cozy dinner with bossa no... "
);

// -------------------------       Appling Effect in cards Playbutton    --------------------------   //

let cardOne = document.querySelectorAll(".card-one");
let playbutton = document.querySelectorAll(".play");
let cardImage = document.querySelector(".card-img img");

cardImage.addEventListener("mousemove", (evt) => {}, true);
cardOne.forEach((cards, idx) => {
  cards.addEventListener("mousemove", (evt) => {
    cards.style.backgroundColor = "black";
    playbutton[idx].style.opacity = "1";
    playbutton[idx].style.bottom = "30px";
  });
  cards.addEventListener("mouseleave", () => {
    cards.style.backgroundColor = "#181818";
    playbutton[idx].style.opacity = "0";
    playbutton[idx].style.bottom = "5px";
  });
}, true);
let folders = [
  "http://127.0.0.1:3002/new%20folder/liked/",
  "http://127.0.0.1:3002/new%20folder/song/",
  "http://127.0.0.1:3002/new%20folder/methali/",
  "http://127.0.0.1:3002/new%20folder/Devine/",
  "http://127.0.0.1:3002/new%20folder/liked/",
  "http://127.0.0.1:3002/new%20folder/song/",
  "http://127.0.0.1:3002/new%20folder/methali/",
  "http://127.0.0.1:3002/new%20folder/Devine/",
  "http://127.0.0.1:3002/new%20folder/liked/",
  "http://127.0.0.1:3002/new%20folder/song/",
];

cardOne.forEach((card, idx) => {
  card.addEventListener("click", () => {
    takeSongs(folders[idx]);
  });
});



//// ---------------------------------💚💚💚   Fetching the songs  🧡🧡🧡---------------------------------//



let ul = document.createElement("ul");
let inside = document.querySelector(".inside");
inside.prepend(ul);
let currentSongWithUrl = [];
let currentSong = new Audio();

async function getSongs(url) {     // geting the songs
 
  let response = await fetch(url);
  let data = await response.text();

  let div = document.createElement("div");
  div.innerHTML = data;

  let anchors = div.querySelectorAll("a");
  let song = [];
  anchors.forEach((element) => {
    if (element.href.endsWith(".mp3")) {
      currentSongWithUrl.push(element.href);
      let one = element.href.split("/new%20folder/")[1];
      let two = one.split("/")[1];
      song.push(two);
    }
  });
  return song;
}


async function takeSongs(url) {    // taking the songs
  
  let songs = await getSongs(url);

  currentSong.src = currentSongWithUrl[0];
  let previousSong = currentSong.src.split("/new%20folder/")[1];
  let againSplit = previousSong.split("/")[1];
  document.querySelector(".songsinfo").innerHTML = againSplit;
  appendSongs(songs);
}
takeSongs("http://127.0.0.1:3000/New%20programing/Projects%20With%20Responsive/Spotify%20Clone/new%20folder/");
function appendSongs(songs) {
                                   // After taking Appending the songs
  ul.innerHTML = "";

  songs.forEach((song) => {
    let li = document.createElement("li");
    li.className = "songlist";
    li.innerHTML = ` 
    <div class="inside-first">
    <i class="fa-solid fa-music"></i>
    <div class="songInfo">
      <h3>${song}</h3>
      <h5>Argit Singh</h5>
    </div>
  </div>
  <div class="playnow">
    <h4>Play Now</h4>
    <i class="fa-solid fa-circle-play"></i>
  </div>`;
    ul.append(li);
  });

  let realSongs = Array.from(document.querySelectorAll(".songlist"));
  appendAllSongsOnPlaylist(realSongs);
  playAllsongs(realSongs);
  previousAndNextButton(songs);
}

function appendAllSongsOnPlaylist(songs) {
                               // After Appending, giving the animation to the songs
  let playnow = document.querySelectorAll(".playnow");
  let i = document.querySelectorAll(".playnow i");

  songs.forEach((song, idx) => {
    song.addEventListener("mousemove", (evt) => {
      song.style.backgroundColor = "#2056ca50";
      i[idx].style.fontSize = "25px";
      i[idx].style.color = "green";
      playnow[idx].style.visibility = "visible";
    });
    song.addEventListener("mouseleave", () => {
      song.style.backgroundColor = "rgb(54 88 163 / 14%)";
      i[idx].style.fontSize = "15px";
      i[idx].style.color = "white";
      playnow[idx].style.visibility = "hidden";
    });
  });
}
function playAllsongs(songs) {
                              // Preparing to play the songs by clicking
  songs.forEach((song) => {
    song.addEventListener("click", (evt) => {
      let node = evt.target.parentNode.parentNode.querySelector("h3").innerHTML;
      palyingTheSong(node);
    });
  });
}
function palyingTheSong(song) {
  currentSongWithUrl.forEach((elem) => {
    if (elem.endsWith(song)) {
      currentSong.src = elem; // playing the song
    }
  });
  currentSong.play();
  playButton.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  document.querySelector(".songsinfo").innerHTML = song;
  document.querySelector(".timer").innerHTML = "00/00";
}


//--------------------------  💖💖💖💖 Now Controling the Songs on the Playbar 💖💖💖💖  -------------------//


let playButton = document.querySelector("#play");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");

playButton.addEventListener("click", () => {
  // effect on playButton
  if (currentSong.paused) {
    currentSong.play();
    playButton.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    playButton.style.color = "#00ff3c";
  } else {
    currentSong.pause();
    playButton.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  }
});
function previousAndNextButton(song) {
  console.log(song);
  previous.addEventListener("click", () => {
    let previousSong = currentSong.src.split("/new%20folder/")[1];
    let againSplit = previousSong.split("/")[1];
    let index = song.indexOf(againSplit);
    if (index - 1 >= 0) {
      palyingTheSong(song[index - 1]);
    }
  });
  next.addEventListener("click", () => {
    let previousSong = currentSong.src.split("/new%20folder/")[1];
    let againSplit = previousSong.split("/")[1];
    let index = song.indexOf(againSplit);
    if (index + 1 < song.length) {
      palyingTheSong(song[index + 1]);
    }
  });
}




// --------------------------------------------------------------------------------------------- ---------//

function convertSecondsToMinutesAndSeconds(seconds) {  // converting second to minute

  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }
  seconds = Math.floor(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
currentSong.addEventListener("timeupdate", () => {  // updating the time of song
  document.querySelector(
    ".timer"
  ).innerHTML = `${convertSecondsToMinutesAndSeconds(
    currentSong.currentTime
  )}/${convertSecondsToMinutesAndSeconds(currentSong.duration)}`;
  document.querySelector(".circal").style.left =
    (currentSong.currentTime / currentSong.duration) * 100 + "%";
});
document.querySelector(".seekbar").addEventListener("click", (evt) => { //  Effecting the seekbar of playbar
  let parsent = (evt.offsetX / evt.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circal").style.left = parsent + "%";
  currentSong.currentTime = (currentSong.duration * parsent) / 100;
});




//---------------------------------------------  SideBar Functionalities ---------------------------------//

let hamburger = document.querySelector(".hamburger");
let closeButton = document.querySelector(".close-button");

hamburger.addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});

closeButton.addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
});

let sound = document.querySelector(".sound");
let volume = document.querySelector("input");

let click  = true;
sound.addEventListener("click",()=>{
  if(click==true){
    click = false;
    sound.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    currentSong.volume = 0;
    volume.value = 0;
    
  }
  else{
    sound.innerHTML = ' <i class="fa-solid fa-volume-high"></i>';
    currentSong.volume = 30/100;
    volume.value =   30;
    click = true;
  }
})

volume.addEventListener("change",(e)=>{
 let value =  parseInt(e.target.value);
  currentSong.volume = value/100;
})