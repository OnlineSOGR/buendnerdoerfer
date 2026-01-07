// // Improved Guess-the-Person game with better UX and animations

// (() => {
//   const persons = [
//     {
//       name: "Albert Einstein",
//       image: "img/einstein.jpg",
//       hints: [
//         "War bekannt für sein wildes Haar",
//         "Hatte eine Leidenschaft für Musik, besonders für die Violine",
//         "Geboren in Deutschland",
//         "Wurde das Amt des Israelischen Präsidenten angeboten",
//         "Starb im Jahr 1955",
//         "Arbeitete an der Princeton Universität",
//         "Hat den 1921 Nobelpreis für Physik gewonnen",
//         "Hat die Relativitätstheorie entwickelt",
//         "Berühmte Gleichung E = mc^2",
//       ],
//     },
//     {
//       name: "Marie Curie",
//       image: "img/MarieCurie.jpg",
//       hints: [
//         "Geboren in Polen",
//         "Starb im Jahr 1934",
//         "Erste Frau, die einen Nobelpreis gewann",
//         "Entdeckte Radium und Polonium",
//         "Pionierin der Forschung zur Radioaktivität",
//         "Erhielt Nobelpreise in Physik und Chemie",
//         "Gründete die Curie-Institute",
//       ],
//     },
//     {
//       name: "Leonardo da Vinci",
//       image: "img/leonardoDaVinci.jpg",
//       hints: [
//         "Erfand Konzepte wie den Hubschrauber",
//         "Studierte Anatomie und Ingenieurwesen",
//         "Führte detaillierte Notizbücher",
//         "Lebte während der Renaissance",
//         "Geboren in Italien",
//         "Starb im Jahr 1519",
//         "Malte die Mona Lisa und das letzte Abendmahl",
//       ],
//     },
//     {
//       name: "Mahatma Gandhi",
//       image: "img/gandhi.jpg",
//       hints: [
//         "Starb im Jahr 1948",
//         'Bekannt als "Vater der Nation"',
//         "Führte sein Land zur Unabhängigkeit",
//         "Vertrat nichtgewaltsamen Widerstand",
//         "Fastete für Frieden und Gerechtigkeit",
//         "Hatte Einfluss auf Bürgerrechtsbewegungen weltweit",
//         "Geboren in Indien",
//       ],
//     },
//     {
//       name: "Nelson Mandela",
//       image: "img/NelsonMandela.jpg",
//       hints: [
//         "Erhielt den Friedensnobelpreis 1993",
//         "Verbrachte 27 Jahre im Gefängnis",
//         "Bekannt für Versöhnung und Führung",
//         "Starb im Jahr 2013",
//         "Kämpfte gegen Apartheid",
//         "Geboren in Südafrika",
//         "Erster schwarzer Präsident Südafrikas",
//       ],
//     },
//     {
//       name: "Mathias Schlegel",
//       image: "img/MathiasSchlegel.jpg",
//       hints: [
//         "Wohnt in der Schweiz",
//         "Wuchs in Graubünden auf",
//         "Bekannt für seinen guten Rechten",
//         "Lebt noch",
//         "Ist ein Fussballspieler",
//         "Wohnt in Chur",
//         "War nicht der erste schwarze Präsident Südafrikas",
//       ],
//     },
//     {
//       name: "Lars Hanselmann",
//       image: "img/LarsHanselmann.jpg",
//       hints: [
//         "Erhielt keinen Friedensnobelpreis",
//         "War nie im Gefängnis",
//         "Ist bekannt für seine Fussballwissen",
//         "Kann gut moderieren",
//         "Malte nicht die Mona Lisa",
//         "Mag Musik der 80er Jahre",
//         "Geboren in St. Gallen",
//       ],
//     },
//   ];

//   const MAX_TRIES = 5;
//   const INITIAL_BLUR = 20;

//   let currentPersonIndex = 0;
//   let correctCount = 0;
//   let person, triesLeft, revealedHints, totalHints, currentBlur;

//   // Create container
//   const container = document.createElement("div");
//   container.className = "famous-container";

//   const title = document.createElement("h3");
//   title.textContent = "Wer bin ich?";
//   container.appendChild(title);

//   // Progress indicator
//   const progress = document.createElement("div");
//   progress.className = "famous-progress";
//   container.appendChild(progress);

//   // Mute button
//   const muteBtn = document.createElement("button");
//   muteBtn.className = "mute-btn";
//   muteBtn.innerHTML = `<svg width="23" height="23"><use href="#unmute-icon"></use></svg>`;
//   muteBtn.title = "Musik stumm schalten";
//   container.appendChild(muteBtn);

//   const imageEl = document.createElement("div");
//   imageEl.className = "famous-image";
//   container.appendChild(imageEl);

//   const popup = document.createElement("div");
//   popup.className = "famous-popup";
//   container.appendChild(popup);

//   const hintsTitle = document.createElement("div");
//   hintsTitle.className = "famous-hints-title";
//   hintsTitle.innerHTML = `Hinweise: <span class="tries-right">5 Versuche</span>`;
//   container.appendChild(hintsTitle);

//   const hintsList = document.createElement("ol");
//   hintsList.className = "famous-hints";
//   container.appendChild(hintsList);

//   const controls = document.createElement("div");
//   controls.className = "famous-controls";

//   const input = document.createElement("input");
//   input.className = "famous-input";
//   input.placeholder = "Vorname Nachname";
//   input.autocomplete = "off";
//   controls.appendChild(input);

//   const btn = document.createElement("button");
//   btn.className = "famous-btn";
//   btn.textContent = "raten";
//   controls.appendChild(btn);

//   const hintBtn = document.createElement("button");
//   hintBtn.className = "famous-hint-btn";
//   hintBtn.innerHTML = `<span>🃏</span> Joker`;
//   hintBtn.title = "Einen zusätzlichen Hinweis zeigen (1x pro Runde)";
//   controls.appendChild(hintBtn);

//   container.appendChild(controls);

//   const hintEl = document.createElement("div");
//   hintEl.className = "famous-hint";
//   container.appendChild(hintEl);

//   document.body.appendChild(container);

//   // Background music
//   const bgMusic = document.createElement("audio");
//   bgMusic.src = "music/MorningShelves.mp3";
//   bgMusic.autoplay = true;
//   bgMusic.loop = true;
//   bgMusic.volume = 0.3;
//   document.body.appendChild(bgMusic);

//   let guessesCount = 0;
//   let isGameOver = false;
//   let hintUsed = false;
//   let musicStarted = false;

//   function updateProgress() {
//     const dots = [];
//     for (let i = 0; i < persons.length; i++) {
//       const dot = document.createElement("span");
//       dot.className = "progress-dot";
//       if (i < currentPersonIndex) {
//         dot.classList.add("completed");
//       } else if (i === currentPersonIndex) {
//         dot.classList.add("active");
//       }
//       dots.push(dot);
//     }
//     progress.innerHTML = "";
//     dots.forEach((d) => progress.appendChild(d));
//   }

//   function resetGame(index) {
//     currentPersonIndex = index;
//     person = persons[index];
//     triesLeft = MAX_TRIES;
//     revealedHints = 1;
//     totalHints = Math.min(person.hints.length, 6);
//     currentBlur = INITIAL_BLUR;
//     guessesCount = 0;
//     isGameOver = false;
//     hintUsed = false;
//     input.disabled = false;
//     hintBtn.disabled = false;
//     input.value = "";
//     input.classList.remove("wrong", "correct");
//     popup.style.display = "none";
//     hintEl.textContent = "";
//     btn.textContent = "raten";
//     title.innerHTML = `Wer bin ich? <span class="round">${currentPersonIndex + 1}/${persons.length}</span>`;
//     hintsTitle.innerHTML = `Hinweise: <span class="tries-right">${triesLeft} Versuche</span>`;
//     imageEl.style.backgroundImage = "";
    
//     updateProgress();
//     renderHints();
    
//     // Preload image
//     const img = new Image();
//     img.onload = () => {
//       imageEl.style.transition = "none";
//       imageEl.style.backgroundImage = `url('${person.image}')`;
//       imageEl.style.filter = `blur(${currentBlur}px)`;
//       setTimeout(() => {
//         imageEl.style.transition = "";
//       }, 10);
//     };
//     img.src = person.image;
    
//     // Focus input
//     setTimeout(() => input.focus(), 100);
//   }

//   function renderHints() {
//     hintsList.innerHTML = "";
//     for (let i = 0; i < totalHints; i++) {
//       const li = document.createElement("li");
//       if (i < revealedHints) {
//         li.textContent = person.hints[i];
//         li.classList.add("revealed");
//       } else {
//         li.textContent = "—";
//         li.classList.add("hidden");
//       }
//       hintsList.appendChild(li);
//     }
//   }

//   function setBlur(px) {
//     currentBlur = Math.max(0, px);
//     imageEl.style.filter = `blur(${currentBlur}px)`;
//   }

//   function normalizeName(s) {
//     return s.trim().replace(/\s+/g, " ").toLowerCase();
//   }

//   function levenshtein(a, b) {
//     if (a.length === 0) return b.length;
//     if (b.length === 0) return a.length;
//     const matrix = [];
//     for (let i = 0; i <= b.length; i++) {
//       matrix[i] = [i];
//     }
//     for (let j = 0; j <= a.length; j++) {
//       matrix[0][j] = j;
//     }
//     for (let i = 1; i <= b.length; i++) {
//       for (let j = 1; j <= a.length; j++) {
//         if (b.charAt(i - 1) === a.charAt(j - 1)) {
//           matrix[i][j] = matrix[i - 1][j - 1];
//         } else {
//           matrix[i][j] = Math.min(
//             matrix[i - 1][j - 1] + 1,
//             matrix[i][j - 1] + 1,
//             matrix[i - 1][j] + 1
//           );
//         }
//       }
//     }
//     return matrix[b.length][a.length];
//   }

//   function endGame(win) {
//     if (win) correctCount++;
//     input.disabled = true;
//     hintBtn.disabled = true;
    
//     const titleText = win ? "🎉 Richtig!" : "⏱️ Keine Versuche mehr!";
//     const actions = win
//       ? `<button class="next" type="button">weiter →</button>`
//       : `<button class="retry" type="button">↻ wiederholen</button> <button class="next" type="button">weiter →</button>`;
    
//     popup.innerHTML = `
//       <div class="popup-content">
//         <div class="msg">${titleText}</div>
//         <img src="${person.image}" alt="${person.name}" class="popup-image">
//         <div class="reveal">${person.name}</div>
//         <div class="popup-actions">
//           ${actions}
//         </div>
//       </div>
//     `;
//     popup.style.display = "flex";
//     popup.classList.add("show");

//     const retryBtn = popup.querySelector(".retry");
//     const nextBtn = popup.querySelector(".next");
    
//     if (retryBtn) {
//       retryBtn.addEventListener("click", () => {
//         popup.classList.remove("show");
//         setTimeout(() => {
//           resetGame(currentPersonIndex);
//           popup.style.display = "none";
//         }, 300);
//       });
//     }
    
//     if (nextBtn) {
//       nextBtn.addEventListener("click", () => {
//         popup.classList.remove("show");
//         setTimeout(() => {
//           if (currentPersonIndex < persons.length - 1) {
//             currentPersonIndex++;
//             resetGame(currentPersonIndex);
//             popup.style.display = "none";
//           } else {
//             // Final message
//             popup.innerHTML = `
//               <div class="popup-content final">
//                 <div class="msg">🏆 Gut gemacht!</div>
//                 <div class="score-circle">
//                   <span class="score-number">${correctCount}</span>
//                   <span class="score-total">/${persons.length}</span>
//                 </div>
//                 <div class="reveal">Du erkanntest ${correctCount} von ${persons.length} Personen.</div>
//                 <div class="popup-actions">
//                   <button class="restart" type="button">↻ Neues Spiel</button>
//                 </div>
//               </div>
//             `;
//             popup.style.display = "flex";
//             popup.classList.add("show");
            
//             const restartBtn = popup.querySelector(".restart");
//             restartBtn.addEventListener("click", () => {
//               popup.classList.remove("show");
//               setTimeout(() => {
//                 currentPersonIndex = 0;
//                 correctCount = 0;
//                 resetGame(0);
//                 popup.style.display = "none";
//               }, 300);
//             });
//           }
//         }, 300);
//       });
//     }
    
//     isGameOver = true;
//     btn.textContent = "wiederholen";
//   }

//   function showHint() {
//     if (isGameOver || hintBtn.disabled) return;
//     if (revealedHints >= totalHints) return;
//     if (hintUsed) return;
    
//     // Hint is free - no cost to tries
//     revealedHints += 1;
//     hintUsed = true;
//     hintBtn.disabled = true;
    
//     renderHints();
//   }

//   function tryGuess() {
//     if (isGameOver) {
//       resetGame(currentPersonIndex);
//       return;
//     }
//     if (input.disabled) return;
    
//     const guess = normalizeName(input.value);
//     if (!guess) {
//       input.classList.add("shake");
//       setTimeout(() => input.classList.remove("shake"), 400);
//       return;
//     }
    
//     guessesCount += 1;
//     const answer = normalizeName(person.name);
    
//     if (guess === answer) {
//       input.classList.remove("wrong");
//       input.classList.add("correct");
//       setBlur(0);
//       setTimeout(() => endGame(true), 600);
//       return;
//     }

//     // Wrong guess
//     triesLeft -= 1;
//     hintsTitle.innerHTML = `Hinweise: <span class="tries-right">${triesLeft} Versuche</span>`;
//     input.classList.remove("correct");
//     input.classList.add("wrong");
//     setTimeout(() => input.classList.remove("wrong"), 2000);

//     // Feedback
//     const dist = levenshtein(guess, answer);
//     const nameParts = person.name.toLowerCase().split(" ");
//     const first = nameParts[0];
//     const last = nameParts[1] || "";
    
//     if (dist <= 2) {
//       hintEl.textContent = "🔥 Nah dran! Überprüfe deinen Text.";
//       hintEl.className = "famous-hint hot";
//     } else if (guess.includes(first) || (last && guess.includes(last))) {
//       hintEl.textContent = "👍 Du bist auf dem richtigen Weg! Die Person teilt einen Namen.";
//       hintEl.className = "famous-hint warm";
//     } else {
//       hintEl.textContent = "❄️ Nicht ganz. Lies nochmals die Hinweise.";
//       hintEl.className = "famous-hint cold";
//     }

//     // Reveal next hint
//     if (revealedHints < totalHints) revealedHints += 1;
//     // Hint button stays disabled after being used once per round
    
//     const steps = MAX_TRIES;
//     const newBlur = Math.max(0, Math.round(INITIAL_BLUR * (triesLeft / steps)));
//     setBlur(newBlur);
//     renderHints();

//     if (triesLeft <= 0) {
//       setBlur(0);
//       input.classList.remove("wrong");
//       setTimeout(() => endGame(false), 600);
//     }
//   }

//   function toggleMute() {
//     bgMusic.muted = !bgMusic.muted;
//     updateMuteIcon();
//   }

//   function updateMuteIcon() {
//     muteBtn.innerHTML = bgMusic.muted
//       ? `<svg width="23" height="23"><use href="#mute-icon"></use></svg>`
//       : `<svg width="23" height="23"><use href="#unmute-icon"></use></svg>`;
//   }

//   function startMusicIfNeeded() {
//     if (!musicStarted) {
//       bgMusic.play().catch(() => {});
//       musicStarted = true;
//     }
//   }

//   resetGame(0);

//   btn.addEventListener("click", () => {
//     startMusicIfNeeded();
//     tryGuess();
//   });
  
//   input.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       startMusicIfNeeded();
//       tryGuess();
//     }
//   });
  
//   input.addEventListener("input", () => {
//     hintEl.textContent = "";
//     hintEl.className = "famous-hint";
//   });
  
//   hintBtn.addEventListener("click", () => {
//     startMusicIfNeeded();
//     showHint();
//   });
  
//   muteBtn.addEventListener("click", toggleMute);
// })();
(() => {
  const places = [
    {
      name: "Chur",
      image: "img/chur.jpg",
      hints: ["Älteste Stadt der Schweiz", "Hauptort von Graubünden", "Tor zu den Alpen", "Liegt am Alpenrhein", "Besitzt eine autofreie Altstadt", "Wahrzeichen ist die Kathedrale St. Mariä Himmelfahrt"]
    },
    {
      name: "St. Moritz",
      image: "img/stmoritz.jpg",
      hints: ["Weltbekannter Kurort im Engadin", "Gastgeber von zwei Olympischen Winterspielen", "Liegt an einem See auf 1856 m ü. M.", "Bekannt für das 'Champagner-Klima'", "Hausberg ist die Corviglia", "Berühmt für Luxushotels und Jetset"]
    },
    {
      name: "Davos",
      image: "img/davos.jpg",
      hints: ["Höchstgelegene Stadt Europas", "Jährlicher Austragungsort des WEF", "Bekannt für das Kirchner Museum", "Berühmter Eishockeyclub (HCD)", "Schauplatz von Thomas Manns 'Der Zauberberg'", "Zweitgrösste Gemeinde der Schweiz nach Fläche"]
    },
    {
      name: "Arosa",
      image: "img/arosa.jpg",
      hints: ["Liegt am Ende des Schanfigger Tales", "Seit 2014 mit der Lenzerheide verbunden", "Bekannt für das Bärenland", "Slogan: 'Arosa Geniessen'", "Beliebtes Ziel für das Humorfestival", "Eichhörnchenweg ist eine Attraktion"]
    },
    {
      name: "Flims",
      image: "img/flims.jpg",
      hints: ["Gehört zur Destination Flims Laax Falera", "Bekannt für den Caumasee", "Liegt am UNESCO Welterbe Tektonikarena Sardona", "Berühmt für den Flimser Bergsturz", "Bietet Zugang zur Rheinschlucht (Ruinaulta)", "Beliebt bei Bikern und Wanderern"]
    },
    {
      name: "Poschiavo",
      image: "img/poschiavo.jpg",
      hints: ["Hauptort eines italienischsprachigen Bündner Südtals", "Liegt an der Berninalinie der Rhätischen Bahn", "Besitzt einen markanten Dorfplatz (Piazza)", "Bekannt für die 'Casa Tomé'", "Liegt nördlich des Lago di Poschiavo", "Teil des UNESCO Welterbes"]
    },
    {
      name: "Scuol",
      image: "img/scuol.jpg",
      hints: ["Hauptort des Unterengadins", "Bekannt für seine Thermalbäder (Bogn Engiadina)", "Hier spricht man Vallader (Romanisch)", "Wahrzeichen ist das Schloss Tarasp (nahebei)", "Typische Engadiner Häuser mit Sgraffito", "Mineralwasserquellen direkt aus Dorfbrunnen"]
    },
    {
      name: "Thusis",
      image: "img/thusis.jpg",
      hints: ["Liegt am nördlichen Eingang zur Viamala-Schlucht", "Wichtiger Verkehrsknotenpunkt am Splügen- und San Bernardino-Pass", "Austragungsort des jährlichen Viamala-Laufs", "Gehört zur Region Viamala", "Endpunkt der Albulalinie Richtung St. Moritz", "Historischer Handelsplatz"]
    },
    {
      name: "Disentis",
      image: "img/disentis.jpg",
      hints: ["Bekannt für die imposante Benediktinerabtei", "Liegt in der Region Surselva", "Hier entspringt der Medelserrhein", "Wichtiger Ort an der Matterhorn-Gotthard-Bahn", "Traditionelles Zentrum der rätoromanischen Kultur", "Liegt am Fusse des Lukmanierpasses"]
    },
    {
      name: "Maienfeld",
      image: "img/maienfeld.jpg",
      hints: ["Weltbekannt als Schauplatz der Heidi-Bücher", "Liegt in der Bündner Herrschaft", "Bekannt für exzellenten Wein (Blauburgunder)", "Dritthöchstes Schloss des Kantons (Schloss Salenegg)", "Liegt nahe der Grenze zu Liechtenstein", "Historische Stadt mit engen Gassen"]
    }
  ];

  const MAX_TRIES = 5;
  let currentPlaceIndex = 0;
  let correctCount = 0;
  let place, triesLeft, revealedHints, totalHints, hintUsed;

  // UI Setup
  const container = document.createElement("div");
  container.className = "famous-container";

  const title = document.createElement("h3");
  title.textContent = "Welcher Ort ist das?";
  container.appendChild(title);

  const progress = document.createElement("div");
  progress.className = "famous-progress";
  container.appendChild(progress);

  const popup = document.createElement("div");
  popup.className = "famous-popup";
  container.appendChild(popup);

  const hintsTitle = document.createElement("div");
  hintsTitle.className = "famous-hints-title";
  hintsTitle.innerHTML = `Hinweise: <span class="tries-right">5 Versuche</span>`;
  container.appendChild(hintsTitle);

  const hintsList = document.createElement("ol");
  hintsList.className = "famous-hints";
  container.appendChild(hintsList);

  const controls = document.createElement("div");
  controls.className = "famous-controls";

  const input = document.createElement("input");
  input.className = "famous-input";
  input.placeholder = "Ort eingeben...";
  input.autocomplete = "off";
  controls.appendChild(input);

  const btn = document.createElement("button");
  btn.className = "famous-btn";
  btn.textContent = "raten";
  controls.appendChild(btn);

  const hintBtn = document.createElement("button");
  hintBtn.className = "famous-hint-btn";
  hintBtn.innerHTML = `<span>🃏</span> Joker`;
  container.appendChild(hintBtn); // Joker unter dem Input für bessere UI

  container.appendChild(controls);

  const hintEl = document.createElement("div");
  hintEl.className = "famous-hint";
  container.appendChild(hintEl);

  document.body.appendChild(container);

  let isGameOver = false;

  function updateProgress() {
    progress.innerHTML = "";
    for (let i = 0; i < places.length; i++) {
      const dot = document.createElement("span");
      dot.className = "progress-dot" + (i < currentPlaceIndex ? " completed" : i === currentPlaceIndex ? " active" : "");
      progress.appendChild(dot);
    }
  }

  function resetGame(index) {
    currentPlaceIndex = index;
    place = places[index];
    triesLeft = MAX_TRIES;
    revealedHints = 1;
    totalHints = Math.min(place.hints.length, 6);
    isGameOver = false;
    hintUsed = false;
    input.disabled = false;
    hintBtn.disabled = false;
    input.value = "";
    input.classList.remove("wrong", "correct");
    popup.style.display = "none";
    hintEl.textContent = "";
    btn.textContent = "raten";
    title.innerHTML = `Welcher Bündner Ort ist gesucht? <span class="round">${currentPlaceIndex + 1}/${places.length}</span>`;
    hintsTitle.innerHTML = `Hinweise: <span class="tries-right">${triesLeft} Versuche</span>`;
    updateProgress();
    renderHints();
    setTimeout(() => input.focus(), 100);
  }

  function renderHints() {
    hintsList.innerHTML = "";
    for (let i = 0; i < totalHints; i++) {
      const li = document.createElement("li");
      if (i < revealedHints) {
        li.textContent = place.hints[i];
        li.classList.add("revealed");
      } else {
        li.textContent = "—";
        li.classList.add("hidden");
      }
      hintsList.appendChild(li);
    }
  }

  function useJoker() {
    if (isGameOver || hintUsed || revealedHints >= totalHints) return;
    revealedHints++;
    hintUsed = true;
    hintBtn.disabled = true;
    renderHints();
  }

  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function endGame(win) {
    if (win) correctCount++;
    input.disabled = true;
    hintBtn.disabled = true;
    isGameOver = true;
    
    const titleText = win ? "🎉 Richtig!" : "⏱️ Vorbei!";
    const buttonLabel = (currentPlaceIndex < places.length - 1) ? "nächster Ort →" : "Endergebnis zeigen";
    
    popup.innerHTML = `
      <div class="popup-content">
        <div class="msg">${titleText}</div>
        <img src="${place.image}" alt="${place.name}" class="popup-image">
        <div class="reveal">${place.name}</div>
        <div class="popup-actions">
          <button class="next" type="button">${buttonLabel}</button>
        </div>
      </div>
    `;
    popup.style.display = "flex";
    popup.classList.add("show");

    popup.querySelector(".next").addEventListener("click", () => {
      popup.classList.remove("show");
      setTimeout(() => {
        if (currentPlaceIndex < places.length - 1) {
          resetGame(currentPlaceIndex + 1);
        } else {
          showFinalScore();
        }
      }, 300);
    });
  }

  function showFinalScore() {
    const feedback = correctCount > 7 ? "Hopp Schwiiz! Du bist ein Graubünden-Profi!" : "Nicht schlecht! Kennst du schon alle Täler?";
    
    popup.innerHTML = `
      <div class="popup-content final">
        <div class="msg">🏆 Ergebnisse</div>
        <div class="score-circle">
          <span class="score-number">${correctCount}</span>
          <span class="score-total">/${places.length}</span>
        </div>
        <div class="reveal">${feedback}</div>
        <p style="font-size: 0.9em; margin-top: 10px; color: #ccc;">Du hast ${correctCount} von ${places.length} Orten richtig erraten.</p>
        <div class="popup-actions">
          <button class="restart" type="button">↻ Neues Spiel</button>
        </div>
      </div>
    `;
    popup.style.display = "flex";
    popup.classList.add("show");
    popup.querySelector(".restart").addEventListener("click", () => {
      location.reload();
    });
  }

  function tryGuess() {
    if (isGameOver) return;
    const guess = input.value.trim().toLowerCase();
    const answer = place.name.toLowerCase();
    
    if (!guess) return;

    if (guess === answer) {
      input.classList.add("correct");
      setTimeout(() => endGame(true), 600);
    } else {
      triesLeft--;
      input.classList.add("wrong");
      setTimeout(() => input.classList.remove("wrong"), 1000);
      hintsTitle.innerHTML = `Hinweise: <span class="tries-right">${triesLeft} Versuche</span>`;
      if (revealedHints < totalHints) revealedHints++;
      renderHints();
      if (triesLeft <= 0) endGame(false);
    }

         // Feedback
// Feedback Logik
const dist = levenshtein(guess, answer);
const nameParts = place.name.toLowerCase().split(" ");

if (dist <= 2) {
  hintEl.textContent = "🔥 Nah dran! Überprüfe deinen Text.";
  hintEl.className = "famous-hint hot";
} else if (nameParts.some(part => part.length > 2 && guess.includes(part))) {
  hintEl.textContent = "👍 Fast! Ein Teil des Namens stimmt.";
  hintEl.className = "famous-hint warm";
} else {
  hintEl.textContent = "❄️ Nicht ganz. Lies nochmals die Hinweise.";
  hintEl.className = "famous-hint cold";
}

if (revealedHints < totalHints) revealedHints++;
renderHints();
if (triesLeft <= 0) endGame(false);
}

  resetGame(0);

  input.addEventListener("input", () => {
    hintEl.textContent = "";
    hintEl.className = "famous-hint";
  });

  btn.addEventListener("click", tryGuess);
  hintBtn.addEventListener("click", useJoker);
  input.addEventListener("keydown", (e) => e.key === "Enter" && tryGuess());
})();