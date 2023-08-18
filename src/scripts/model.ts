class Attack {
  name: string;
  type: number;

  constructor(name: string, type: number) {
    this.name = name;
    this.type = type;
  }
}

class Pet {
  id: string;
  name: string;
  lives = 3;
  attack!: number;
  element!: HTMLInputElement;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  decreaseLives() {
    if (this.lives > 0) {
      this.lives--;
    }
  }

  setElement() {
    this.element = document.getElementById(this.id) as HTMLInputElement;
  }
}
