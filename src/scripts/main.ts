BACKGROUND_AUDIO.volume = BACKGROUND_AUDIO_VOLUME;
BACKGROUND_AUDIO.loop = true;
updateBackgroundAudioFilter();

SECTIONS.ATTACKS.style.display = "none";
SECTIONS.RESULT.style.display = "none";
SECTIONS.LIVES.style.display = "none";
SECTIONS.MESSAGES.style.display = "none";
SECTIONS.WINNER.style.display = "none";
SECTIONS.RESTART.style.display = "none";

updatePetsContainer();

document.addEventListener("click", playBackgroundAudioOnUserInteraction);

BUTTONS.AUDIO.addEventListener("click", playBackgroundAudio);
BUTTONS.SELECT.addEventListener("click", selectPlayerPet);
BUTTONS.FIRE.addEventListener("click", () => fight(ATTACKS.FIRE));
BUTTONS.WATER.addEventListener("click", () => fight(ATTACKS.WATER));
BUTTONS.EARTH.addEventListener("click", () => fight(ATTACKS.EARTH));
BUTTONS.RESTART.addEventListener("click", restart);

addAudio(SFX.SELECTION, BUTTONS.SELECT, BUTTONS.RESTART);
addAudio(SFX.CLICK, ...getPetElements());
addAudio(SFX.FIRE, BUTTONS.FIRE);
addAudio(SFX.WATER, BUTTONS.WATER);
addAudio(SFX.EARTH, BUTTONS.EARTH);

PANEL.style.overflow = "hidden";
CONTAINER.style.display = "none";

const delayOverflowPanel = setInterval(() => {
  PANEL.removeAttribute("style");
  clearInterval(delayOverflowPanel);
}, 1000);
const delayDisplayContenedor = setInterval(() => {
  CONTAINER.removeAttribute("style");

  clearInterval(delayDisplayContenedor);
}, 400);

anime.suspendWhenDocumentHidden = false;
anime({
  targets: "#container",
  keyframes: [{ zoom: 2 }, { zoom: 1 }],
  duration: 1100,
  complete: () => {
    document.body.removeAttribute("style");
  },
});
anime({
  targets: "#panel",
  keyframes: [
    { margin: "500px 0px", scaleY: "0" },
    { margin: "80px 0px", scaleY: "1" },
  ],
  complete: () => {
    PANEL.removeAttribute("style");
  },
});
anime({
  targets: "#title",
  keyframes: [{ scale: 0 }, { scale: 1 }],
  complete: () => {
    TITLE.removeAttribute("style");
  },
});
anime({
  targets: "#selection_section",
  keyframes: [{ scale: 0 }, { scale: 1 }],
  complete: () => {
    SECTIONS.SELECTION.removeAttribute("style");
  },
});
