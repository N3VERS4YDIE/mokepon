//PROPS
const AUDIO_VOL = 0.5;
const BACKGROUND_AUDIO_VOLUME = 0.3;
const ATTACK_DELAY = 400;
const ATTACK_DURATION = 1000 + ATTACK_DELAY;
//END PROPS

//INITIALIZATION
const ATTACKS = {
  FIRE: 0,
  WATER: 1,
  EARTH: 2,
};
const DEFAULT_ATTACKS = [new Attack("Fire 🔥", 0), new Attack("Water 💧", 1), new Attack("Earth 🌱", 2)];
const PETS = [new Pet("Fox 🦊", "pet0"), new Pet("Puppy 🐶", "pet1"), new Pet("Kitten 😺", "pet2")];
const BUTTONS = {
  AUDIO: document.getElementById("audio_button") as HTMLButtonElement,
  SELECT: document.getElementById("select_button") as HTMLButtonElement,
  FIRE: document.getElementById("fire_button") as HTMLButtonElement,
  WATER: document.getElementById("water_button") as HTMLButtonElement,
  EARTH: document.getElementById("earth_button") as HTMLButtonElement,
  RESTART: document.getElementById("restart_button") as HTMLButtonElement,
};
const SPANS = {
  PLAYER_PET_NAME: document.getElementById("player_pet_span") as HTMLSpanElement,
  ENEMY_PET_NAME: document.getElementById("enemy_pet_span") as HTMLSpanElement,
  PLAYER_PET_LIVES: document.getElementById("player_pet_lives_span") as HTMLSpanElement,
  ENEMY_PET_LIVES: document.getElementById("enemy_pet_lives_span") as HTMLSpanElement,
};
const SECTIONS = {
  SELECTION: document.getElementById("selection_section")!,
  ATTACKS: document.getElementById("attack_section")!,
  LIVES: document.getElementById("lives_section")!,
  RESULT: document.getElementById("result_section")!,
  MESSAGES: document.getElementById("messages_section")!,
  WINNER: document.getElementById("winner_section")!,
  RESTART: document.getElementById("restart_section")!,
};
const MESSAGES = {
  CURRENT_RESULT: document.getElementById("current_result_div") as HTMLDivElement,
  ATTACKS_LOG: document.getElementById("attacks_log_ol") as HTMLOListElement,
  WINNER: document.getElementById("winner_div") as HTMLDivElement,
};
const CONTAINERS = {
  PETS: document.getElementById("pets_div")!,
  ATTACKS: document.getElementById("attacks_div")!,
};
const CONTAINER = document.getElementById("container")!;
const PANEL = document.getElementById("panel")!;
const TITLE = document.getElementById("title")!;

const SFX = {
  BACKGROUND: "../sounds/bg.mp3",
  CLICK: "../sounds/click.mp3",
  HOVER: "../sounds/hover.mp3",
  SELECTION: "../sounds/selection.mp3",
  OPEN: "../sounds/slide-open.mp3",
  CLOSE: "../sounds/slide-close.mp3",
  FIRE: "../sounds/fire.mp3",
  WATER: "../sounds/water.mp3",
  EARTH: "../sounds/earth.mp3",
  VS: "../sounds/vs.mp3",
  WIN: "../sounds/win.mp3",
  TIE: "../sounds/tie.mp3",
  LOOSE: "../sounds/loose.mp3",
  WIN_ROUND: "../sounds/win-round.mp3",
  LOOSE_ROUND: "../sounds/loose-round.mp3",
};

const BACKGROUND_AUDIO = new Audio(SFX.BACKGROUND);

let playerPet: Pet;
let enemyPet: Pet;
let playerAttacks: Attack[];
let toggles: boolean[] = [];
let togglesCount = 0;
//END INITIALIZATION
