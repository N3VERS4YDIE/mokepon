function selectPlayerPet() {
  let name = "";
  for (const PET of PETS) {
    if (PET.element.checked) {
      name = PET.name;
      playerPet = clonePet(PET);
      break;
    }
  }
  if (name) {
    SPANS.PLAYER_PET_NAME.innerText = playerPet.name;
    selectEnemyPet();
    SECTIONS.ATTACKS.style.display = "block";
    SECTIONS.LIVES.style.display = "block";
    SECTIONS.SELECTION.outerHTML = "";
    showLives();
  } else {
    alert("Select a pet");
  }
}

function selectEnemyPet() {
  enemyPet = clonePet(PETS[randomNumber(PETS.length - 1)]);
  SPANS.ENEMY_PET_NAME.innerText = enemyPet.name;
}

function fight(attack: number) {
  disableAttackButtons(true);

  if (playerPet.lives <= 0 || enemyPet.lives <= 0) {
    return;
  }

  let result = "";
  playerPet.attack = attack;
  enemyPet.attack = randomNumber(2);

  playAudio(SFX.VS, ATTACK_DURATION / 3);

  if (playerPet.attack == enemyPet.attack) {
    result = "Tie!!! 😲";
    playAudio(SFX.TIE, ATTACK_DURATION);
  } else if (
    fightResult(ATTACKS.FIRE, ATTACKS.EARTH) ||
    fightResult(ATTACKS.WATER, ATTACKS.FIRE) ||
    fightResult(ATTACKS.EARTH, ATTACKS.WATER)
  ) {
    result = "You won 😁";
    enemyPet.decreaseLives();
    playAudio(SFX.WIN, ATTACK_DURATION);
    animateLives("#enemy_pet_lives_span");
  } else {
    result = "You lost 😞";
    playerPet.decreaseLives();
    playAudio(SFX.LOOSE, ATTACK_DURATION);
    animateLives("#player_pet_lives_span");
  }

  setTimeout(() => {
    if (playerPet.lives > 0 && enemyPet.lives > 0) {
      showLives();
      disableAttackButtons(false);
    } else {
      showLives();
      showWinnerLives();
      disableAttackButtons(true);
      setTimeout(animateWinnerSectionBeginning, ATTACK_DURATION);
      showWinner();
    }
  }, ATTACK_DURATION);

  createMessage(result);

  SECTIONS.RESULT.style.display = "block";
}

function fightResult(playerPetAttack: number, enemyPetAttack: number) {
  return playerPet.attack == playerPetAttack && enemyPet.attack == enemyPetAttack;
}

function disableAttackButtons(disable: boolean) {
  BUTTONS.FIRE.disabled = disable;
  BUTTONS.WATER.disabled = disable;
  BUTTONS.EARTH.disabled = disable;
}

function createMessage(result: string) {
  const PLAYER_PET_ATTACK = getAttackText(playerPet.attack);
  const ENEMY_PET_ATTACK = getAttackText(enemyPet.attack);
  const ATACK_ELEMENTS = [
    createElement("p", "Your " + playerPet.name + " attacked with " + PLAYER_PET_ATTACK),
    createElement("p", enemyPet.name + " attacked with " + ENEMY_PET_ATTACK),
    createElement("p", result),
  ];
  const CURRENT_ATTACK_ELEMENTS = [
    createElement("span", PLAYER_PET_ATTACK),
    createElement("span", "🆚"),
    createElement("span", ENEMY_PET_ATTACK),
  ];
  const ATTACKS_LOG_DIV = document.createElement("div");
  const ATTACK_LOG_LI = document.createElement("li");
  const CURRENT_ATACK_P = document.createElement("p");
  const LINE_HR = document.createElement("hr");
  const RESULT_P = createElement("p", result);
  const ATTACK_LOG_BUTTON = createElement(
    "button",
    PLAYER_PET_ATTACK + " VS " + ENEMY_PET_ATTACK + ": " + result
  ) as HTMLButtonElement;
  let toggleIndex = togglesCount;

  ATTACKS_LOG_DIV.className = "attacks";
  ATTACKS_LOG_DIV.style.display = "none";
  LINE_HR.className = "anim";
  RESULT_P.className = "anim";
  addAudio("", ATTACK_LOG_BUTTON);
  ATTACK_LOG_BUTTON.onclick = () => {
    if (!toggles[toggleIndex]) {
      MESSAGES.ATTACKS_LOG.childNodes.forEach((node) => {
        const LAST_CHILD = node.lastChild as HTMLLIElement;
        LAST_CHILD.style.display = "none";
      });

      ATTACKS_LOG_DIV.style.display = "block";
      for (let i = 0; i < toggles.length; i++) {
        toggles[i] = false;
      }
      toggles[toggleIndex] = true;
      playAudio(SFX.OPEN);
    } else {
      ATTACKS_LOG_DIV.style.display = "none";
      toggles[toggleIndex] = false;
      playAudio(SFX.CLOSE);
    }
  };

  for (let i = 0; i < ATACK_ELEMENTS.length; i++) {
    ATTACKS_LOG_DIV.appendChild(ATACK_ELEMENTS[i]);
    CURRENT_ATTACK_ELEMENTS[i].className = "anim";
    CURRENT_ATACK_P.appendChild(CURRENT_ATTACK_ELEMENTS[i]);
  }

  ATTACK_LOG_LI.appendChild(ATTACK_LOG_BUTTON);
  ATTACK_LOG_LI.appendChild(ATTACKS_LOG_DIV);
  MESSAGES.ATTACKS_LOG.appendChild(ATTACK_LOG_LI);

  MESSAGES.CURRENT_RESULT.innerHTML = "";
  MESSAGES.CURRENT_RESULT.appendChild(CURRENT_ATACK_P);
  MESSAGES.CURRENT_RESULT.appendChild(LINE_HR);
  MESSAGES.CURRENT_RESULT.appendChild(RESULT_P);

  animateFight();

  for (const NODE of MESSAGES.ATTACKS_LOG.childNodes) {
    const LAST_CHILD = NODE.lastChild as HTMLLIElement;
    LAST_CHILD.style.display = "none";
  }

  togglesCount++;
}

function showLives() {
  SPANS.PLAYER_PET_LIVES.innerText = getLivesText(playerPet.lives);
  SPANS.ENEMY_PET_LIVES.innerText = getLivesText(enemyPet.lives);
}

function showWinnerLives() {
  if (playerPet == getWinner()) {
    SPANS.PLAYER_PET_LIVES.innerText = getWinnerLivesText(playerPet.lives);
  } else {
    SPANS.ENEMY_PET_LIVES.innerText = getWinnerLivesText(enemyPet.lives);
  }
}

function showWinner() {
  const P = document.createElement("p");
  let mensaje = "";
  if (playerPet === getWinner()) {
    mensaje = "Your " + playerPet.name;
    playAudio(SFX.WIN_ROUND, ATTACK_DURATION + 1500);
  } else {
    mensaje = enemyPet.name + " opponent";
    playAudio(SFX.LOOSE_ROUND, ATTACK_DURATION);
  }
  P.innerText = mensaje;
  MESSAGES.WINNER.appendChild(P);

  setTimeout(() => {
    animateWinnerSection();
  }, ATTACK_DURATION + 1500);
}

function updatePetsContainer() {
  for (const PET of PETS) {
    CONTAINERS.PETS.innerHTML += `<label for="${PET.id}">${PET.name}</label> <input type="radio" name="pet" id="${PET.id}">`;
  }
  for (const PET of PETS) {
    PET.setElement();
  }
}

function updateBackgroundAudioFilter() {
  BUTTONS.AUDIO.style.filter = BACKGROUND_AUDIO.paused ? "brightness(0.5)" : "none";
}

function randomNumber(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createElement(tag: string, text: string) {
  let p = document.createElement(tag);
  p.innerText = text;
  return p;
}

function clonePet(pet: Pet) {
  return new Pet(pet.name, pet.id);
}

function getAttackText(attack: number) {
  let attackText = "";
  switch (attack) {
    case ATTACKS.FIRE:
      attackText = "🔥";
      break;
    case ATTACKS.WATER:
      attackText = "💧";
      break;
    case ATTACKS.EARTH:
      attackText = "🌱";
      break;
  }
  return attackText;
}

function getWinner() {
  let ganador: Pet;
  if (playerPet.lives > enemyPet.lives) {
    ganador = playerPet;
  } else {
    ganador = enemyPet;
  }
  return ganador;
}

function getPetElements() {
  const PET_ELEMENTS = PETS.map((pet) => pet.element);
  return PET_ELEMENTS;
}

function getLivesText(lives: number) {
  let livesText = "";

  if (lives) {
    for (let i = 1; i <= lives; i++) {
      livesText += "❤️";
    }
  } else {
    livesText = "💔";
  }
  return livesText;
}

function getWinnerLivesText(lives: number) {
  let livesText = "";
  for (let i = 1; i <= lives; i++) {
    livesText += "❤️‍🔥";
  }
  return livesText;
}

function restart() {
  BACKGROUND_AUDIO.pause();
  location.reload();
}

function playBackgroundAudio() {
  if (!BACKGROUND_AUDIO.paused) {
    BACKGROUND_AUDIO.pause();
  } else {
    BACKGROUND_AUDIO.play();
  }
  updateBackgroundAudioFilter();
}

function playBackgroundAudioOnUserInteraction() {
  if (BACKGROUND_AUDIO.paused) {
    playBackgroundAudio();
  }
  document.removeEventListener("click", playBackgroundAudioOnUserInteraction);
}

function playAudio(src: string, delay = 0, volume = AUDIO_VOL) {
  const AUDIO = new Audio();
  AUDIO.src = src;
  AUDIO.volume = volume;
  setTimeout(() => {
    AUDIO.play();
  }, delay);
  return AUDIO;
}

function addAudio(src: string, ...buttons: (HTMLButtonElement | HTMLInputElement)[]) {
  buttons.forEach((element) => {
    element.addEventListener("pointerover", () => {
      if (!element.disabled) {
        playAudio(SFX.HOVER);
      }
    });
    if (src) {
      element.addEventListener("click", () => playAudio(src));
    }
  });
}

function animateFight() {
  anime({
    targets: "span.anim",
    scale: [0, 1],
    translateY: [0, 40],
    duration: 100,
    easing: "easeOutBack",
    delay: anime.stagger(ATTACK_DELAY),
    begin: () => {
      let enemyAttackSfx = "";
      switch (enemyPet.attack) {
        case ATTACKS.FIRE:
          enemyAttackSfx = SFX.FIRE;
          break;
        case ATTACKS.WATER:
          enemyAttackSfx = SFX.WATER;
          break;
        case ATTACKS.EARTH:
          enemyAttackSfx = SFX.EARTH;
          break;
      }
      setTimeout(() => playAudio(enemyAttackSfx), ATTACK_DELAY * 2);
    },
    complete: () => {
      anime({
        targets: "span.anim",
        translateY: [40, 0],
        duration: 100,
        easing: "easeInBack",
        delay: 250,
      });
    },
  });

  anime({
    targets: "hr.anim",
    scaleX: [0, 1],
    duration: 100,
    easing: "easeOutExpo",
    delay: ATTACK_DURATION - ATTACK_DURATION * 0.1,
  });
  anime({
    targets: "p.anim",
    scale: [0, 1],
    duration: 100,
    easing: "easeOutBack",
    delay: ATTACK_DURATION,
    complete: () => {
      const ANIM_ELEMENTS = document.getElementsByClassName("anim");
      for (const ELEMENT of ANIM_ELEMENTS) {
        ELEMENT.removeAttribute("style");
      }
    },
  });
}

function animateLives(target: string) {
  anime({
    targets: target,
    keyframes: [{ skewX: 20 }, { skewX: -20 }, { skewX: 0 }],
    duration: 800,
    delay: ATTACK_DURATION,
  });
}


function animateWinnerSectionBeginning() {
  anime({
    targets: ["#attack_section", "#result_section", "#lives_section"],
    translateY: [0, PANEL.offsetHeight],
    delay: anime.stagger(100, { direction: "reverse" }),
    easing: "easeInCirc",
    complete: () => {
      SECTIONS.ATTACKS.outerHTML = "";
      SECTIONS.LIVES.outerHTML = "";
      SECTIONS.RESULT.outerHTML = "";
    },
  });
}

function animateWinnerSection() {
  anime({
    targets: ["#winner_section", "#restart_section", "#messages_section"],
    translateY: [PANEL.offsetHeight, 0],
    delay: anime.stagger(25),
    easing: "easeOutExpo",
    begin: () => {
      PANEL.style.flexDirection = "column";
      PANEL.style.flexWrap = "nowrap";
      PANEL.style.justifyContent = "space-between";
      SECTIONS.MESSAGES.style.display = "block";
      SECTIONS.WINNER.style.display = "block";
      SECTIONS.RESTART.style.display = "block";
    },
    complete: () => {
      SECTIONS.WINNER.removeAttribute("style");
      SECTIONS.RESTART.removeAttribute("style");
      SECTIONS.MESSAGES.removeAttribute("style");
      PANEL.style.overflowY = "auto";
    },
  });
}
