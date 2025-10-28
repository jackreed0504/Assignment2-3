////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Randomness variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let randomNum = 0;

function getRandomInt() {
  randomSnare = Math.floor(Math.random() * 7);
  randomDrums = Math.floor(Math.random() * 6);
  randomSound = Math.floor(Math.random() * 5);
}

getRandomInt();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Players
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let players = new Tone.Players({
  urls: {
    zomer: `sound${randomSound}.wav`,
    melLow: `drums${randomDrums}.wav`,
    snare: `snare${randomNum}.wav`,
  },
  baseUrl: "./assets/audioSamples/",
});

players.player("zomer").loop = true;
players.player("melLow").loop = true;
players.player("snare").loop = true;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Audio Effects
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filter = new Tone.Filter(20000, "lowpass");

const delay = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.1,
  wet: 0,
});

const reverb = new Tone.Reverb(2);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////// Init Function
// This gets triggered when the user closes the dialog element
// It will connect the polysynth => filter => distortion => meter => audio output
function toneInit() {
  // polySynth.chain(filter, distortion, reverb, delay, meter, Tone.Destination);
  // This is an alternative statement if the sampler is instead chosen : the only difference is the variable name
  // The sampler above must be uncommented for this to work, as well as the declaration on line 3 of keyboardController.js
  players.chain(filter, reverb, delay, Tone.Destination);

  toggleReverb(false);

  let verbOn = false;

  diamond.addEventListener("click", (e) => {
    verbOn = !verbOn;
    toggleReverb(verbOn);
    toggleDiamondGlow(glow);
  });

  dice.addEventListener("click", (e) => {
    getRandomInt();
    players.player("zomer").stop();
    players.player("melLow").stop();
    players.player("snare").stop();
    players
      .player("zomer")
      .load(`./assets/audioSamples/sound${randomSound}.wav`);
    players
      .player("melLow")
      .load(`./assets/audioSamples/drums${randomDrums}.wav`);
    players
      .player("snare")
      .load(`./assets/audioSamples/snare${randomSnare}.wav`);
    players.player("zomer").start();
    players.player("melLow").start();
    players.player("snare").start();
    dice.classList.add("dice-clicked");
    setTimeout(() => {
      dice.classList.remove("dice-clicked");
    }, 200);
  });

  toggleDelay(false);

  let delayOn = false;

  sphere.style.boxShadow = "none";

  sphere.addEventListener("click", (e) => {
    delayOn = !delayOn;
    toggleDelay(delayOn);
    toggleSphereGlow(sphere);
  });

  players.player("zomer").start();
  players.player("melLow").start();
  players.player("snare").start();

  //  Tone.Transport.start();
  Tone.start();
}
