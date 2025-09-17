////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Randomness variables
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let randomNum = 0;

function getRandomInt() {
  randomNum = Math.floor(Math.random() * 6);
}

getRandomInt();

console.log(randomNum);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Players
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let players = new Tone.Players({
  urls: {
    zomer: "main_sound.wav",
    melLow: "drums.wav",
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

const distortion = new Tone.Distortion(0);

const delay = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.1,
  wet: 0,
});

const reverb = new Tone.Reverb(2);

const meter = new Tone.Meter();
meter.smoothing = 0.1;

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
  players.chain(filter, reverb, delay, distortion, meter, Tone.Destination);

  toggleReverb(false);

  let verbOn = false;

  diamond.addEventListener("click", (e) => {
    verbOn = !verbOn;
    toggleReverb(verbOn);
    toggleDiamondGlow(glow);
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
