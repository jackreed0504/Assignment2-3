////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Global definitions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let testRange = document.getElementById("frequencySlider");

const delayFeedbackInput = document.getElementById("delayFeedbackInput");

const meterOutput = document.getElementById("meterOutput");

const diamond = document.querySelector(".diamond-container");

// const pillarWrapper = document.querySelectorAll(".pillar-wrapper");
const pillarOne = document.getElementById("one");
const pillarTwo = document.getElementById("two");
const pillarThree = document.getElementById("three");

console.log(pillarOne);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Volume Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeChimesVolume(newChimesVol) {
  /* check to see if parameter within expected range */
  if (newChimesVol >= -12 && newChimesVol < 12) {
    players.player("zomer").volume.value = newChimesVol;
  }
}
function changeMelVolume(newMelVol) {
  /* check to see if parameter within expected range */
  if (newMelVol >= -12 && newMelVol < 12) {
    players.player("melLow").volume.value = newMelVol;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Filter Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let acceptedFilterTypes = ["lowpass", "highpass", "bandpass", "notch"];

function changeFilterType(newFilterType) {
  /* check to see if parameter matches one of the accepted types in the above array */
  if (acceptedFilterTypes.includes(newFilterType)) {
    filter.set({
      type: newFilterType,
    });
  }
}

function changeFilterFreq(newFilterFreq) {
  /* check to see if parameter within expected range */
  if (newFilterFreq >= 0 && newFilterFreq < 20000) {
    filter.frequency.value = newFilterFreq;
  }
}

function changeFilterQ(newFilterQ) {
  /* check to see if parameter within expected range */
  if (newFilterQ >= 0 && newFilterQ < 20) {
    filter.Q.value = newFilterQ;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Pillar dragability
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#one").draggable({
  axis: "y",
  drag: function (event, ui) {
    let onePos = ui.position.top;
    let chimesRangeValue = 10 - onePos / 40;
    // console.log("Current Y position:", chimesRangeValue);
    changeChimesVolume(chimesRangeValue);
  },
});
$("#two").draggable({
  axis: "y",
  drag: function (event, ui) {
    let twoPos = ui.position.top;
    let filterValue = 2000 - twoPos * 3;
    console.log("Current Y position:", filterValue);
    changeFilterFreq(filterValue);
  },
});
$("#three").draggable({
  axis: "y",
  drag: function (event, ui) {
    let threePos = ui.position.top;
    let melRangeValue = 10 - threePos / 40;
    // console.log("Current Y position:", chimesRangeValue);
    changeMelVolume(melRangeValue);
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Intro Modal popup
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* find modal */
let introModal = document.getElementById("introDialog");
/* to get the backdrop working we need to open the modal with js */
document.getElementById("introDialog").showModal();
/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});
/* finally we want to initialize the synthesizer when the modal is closed */
/* because this can be through the above button, or by pressing esc, we tie it to the actual close event */
/* the referenced toneInit function is defined in toneSetup.js */
introModal.addEventListener("close", toneInit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Oscillator Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let acceptedOscTypes = ["fatsine", "fatsquare", "fatsawtooth", "fattriangle"];

function changeOscillatorType(newOscType) {
  /* check to see if parameter matches one of the accepted types in the above array */
  if (acceptedOscTypes.includes(newOscType)) {
    polySynth.set({
      oscillator: { type: newOscType },
    });
  }
}

function changeDetuneSpread(newSpreadAmt) {
  /* make sure parameter is an int : note this rounds DOWN */
  let roundedSpread = Math.floor(newSpreadAmt);
  polySynth.set({
    oscillator: {
      spread: roundedSpread,
    },
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Amp Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeAmpAttack(newAttack) {
  polySynth.set({
    envelope: {
      attack: newAttack,
    },
  });
}
function changeAmpDecay(newDecay) {
  polySynth.set({
    envelope: {
      decay: newDecay,
    },
  });
}
function changeAmpSustain(newSustain) {
  polySynth.set({
    envelope: {
      sustain: newSustain,
    },
  });
}
function changeAmpAttack(newRelease) {
  polySynth.set({
    envelope: {
      release: newRelease,
    },
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Delay Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeDelayFeedback(newFeedbackAmt) {
  delay.feedback.value = newFeedbackAmtk;
}

delayFeedbackInput.addEventListener("change", (e) => {
  let newValue = e.target.value;
  changeDelayFeedback(newValue);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Distortion Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeDistortionAmount(newDistAmt) {
  /* check to see if parameter within expected range */
  if (newDistAmt >= 0 && newDistAmt < 1) {
    distortion.set({ distortion: newDistAmt });
  }
}

function toggleDistortion(distortionOn) {
  if (distortionOn) {
    distortion.wet.value = 1;
  } else {
    distortion.wet.value = 0;
  }
}

/* set initial amount and bypass it */
changeDistortionAmount(0.9);
toggleDistortion(false);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Reverb Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeReverbDecay(newVerbDecayAmt) {
  reverb.set({ decay: newVerbDecayAmt });
}

function toggleReverb(verbOn) {
  if (verbOn) {
    reverb.wet.value = 1;
  } else {
    reverb.wet.value = 0;
  }
}

/* set initial amount and bypass it */
changeReverbDecay(2);
toggleReverb(false);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Diamond animation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
