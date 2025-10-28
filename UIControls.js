////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Global definitions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let testRange = document.getElementById("frequencySlider");

const delayFeedbackInput = document.getElementById("delayFeedbackInput");

const meterOutput = document.getElementById("meterOutput");

const pillarOne = document.getElementById("one");
const pillarTwo = document.getElementById("two");
const pillarThree = document.getElementById("three");

const diamond = document.querySelector(".dia-wrapper");

const sphere = document.querySelector(".sphere");

const glow = document.querySelector(".diamondGlow");

const dice = document.querySelector(".dice-wrapper");

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
    players.player("snare").volume.value = newMelVol;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Filter Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeFilterFreq(newFilterFreq) {
  /* check to see if parameter within expected range */
  if (newFilterFreq >= 0 && newFilterFreq < 20000) {
    filter.frequency.value = newFilterFreq;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Pillar dragability
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#one").draggable({
  scroll: false,
  axis: "y",
  drag: function (event, ui) {
    let onePos = ui.position.top;
    ui.position.top = clamp(onePos, -2, 677);
    let chimesRangeValue = clamp(remapRange(onePos, -2, 677, 12, -12), -12, 12);
    changeChimesVolume(chimesRangeValue);
  },
});
$("#two").draggable({
  scroll: false,
  axis: "y",
  drag: function (event, ui) {
    let twoPos = ui.position.top;
    ui.position.top = clamp(twoPos, -2, 677);
    let filterValue = clamp(
      remapRange(twoPos, -2, 677, 20000, 200),
      200,
      20000
    );
    changeFilterFreq(filterValue);
  },
});
$("#three").draggable({
  scroll: false,
  axis: "y",
  drag: function (event, ui) {
    let threePos = ui.position.top;
    ui.position.top = clamp(threePos, -2, 677);
    let melRangeValue = clamp(remapRange(threePos, -2, 677, 12, -12), -12, 12);
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
///////// Delay Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toggleDelay(delayOn) {
  if (delayOn) {
    delay.wet.value = 0.5;
  } else {
    delay.wet.value = 0;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Reverb Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toggleReverb(verbOn) {
  if (verbOn) {
    reverb.wet.value = 1;
  } else {
    reverb.wet.value = 0;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// Visual Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toggleDiamondGlow(glow) {
  if (glow.style.visibility == "visible") {
    glow.style.visibility = "hidden";
  } else {
    glow.style.visibility = "visible";
  }
}

function toggleSphereGlow(sphereGlow) {
  if (sphere.style.boxShadow == "none") {
    sphere.style.boxShadow = "0 0 20px 10px rgba(255, 255, 255, 0.7)";
  } else {
    sphere.style.boxShadow = "none";
  }
}
