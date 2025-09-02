////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Players
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let players = new Tone.Players({
  urls: {
    zomer: "track_two.mp3",
    melLow: "track_one.mp3",
  },
  baseUrl: "./assets/audioSamples/",
});

players.player("zomer").loop = true;
players.player("melLow").loop = true;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Audio Effects
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filter = new Tone.Filter(20000, "lowpass");

const distortion = new Tone.Distortion(0);

const delay = new Tone.Delay("8n", 0.5);

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
  players.chain(filter, distortion, meter, Tone.Destination);
  players.player("zomer").start();
  players.player("melLow").start();
  //  Tone.Transport.start();
  Tone.start();
}
