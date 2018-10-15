const dom = {
  items: document.querySelectorAll('.screen i'),
  baby: document.querySelector('.baby'),
  screen: document.querySelector('.screen'),
  buttons: document.querySelectorAll('.buttons .button')
};

const Gotchi = class {
  constructor() {
    // Refactor
    this.names = ['food', 'light', 'play', 'medical', 'shower', 'measure', 'talk', 'check'];
    this.action = [this.food.bind(this), this.light.bind(this), this.play.bind(this), this.medical.bind(this), this.shower.bind(this), this.measure.bind(this), this.talk.bind(this), this.check.bind(this)];

    this.item = -1;
    this.locked = false;

    // attrs
    this.weight = 30 + ~~(Math.random() * 25);
    this.age = 0;
    this.hungry = 3;

    setInterval(this.update, 10000);
  }

  update() {
    let r = 1 + ~~(Math.random() * 6);

    if (r == 1)
      this.hungry++;

    this.age += 0.01;
  }

  // Items
  moveItem() {
    for (let i = 0; i < dom.items.length; i++)
      dom.items[i].classList.remove('active');
    dom.items[this.item].classList.add('active');
  }

  back() {
    this.item = (this.item > 0) ? this.item - 1 : 0;
    this.moveItem();
  }

  next() {
    this.item = (this.item < 7) ? this.item + 1 : this.item;
    this.moveItem();
  }

  run() {
    if (this.locked)
      return;

    this.action[this.item].run();
  }

  // Lock/Unlock
  lock(f) {
    this.locked = true;
    setTimeout(() => {
      f();
      dom.baby.textContent = '';
      this.unlock();
    }, 4000);
  }

  unlock() {
    this.locked = false;
  }

  // Actions
  food() {
    if (this.hungry > 0) {        
      this.hungry--;
      dom.baby.classList.add('eat');        
      this.lock(() => dom.baby.classList.remove('eat'));
    }
    else
      this.nope();
  }

  light() {
    dom.baby.classList.add('sunglasses');
    this.lock(() => dom.baby.classList.remove('sunglasses'));    
  }

  play() {
    dom.baby.classList.add('play');
    this.lock(() => dom.baby.classList.remove('play'));    
  }

  medical() {
    this.nope();
  }

  shower() {
    dom.baby.classList.add('shower');
    this.lock(() => dom.baby.classList.remove('shower'));    
  }

  measure() {
    dom.baby.classList.add('off');
    dom.baby.textContent = `Weight: ${this.weight}KB`;
    this.lock(() => dom.baby.classList.remove('off'));    
  }

  talk() {
    dom.baby.classList.add('talk');
    this.lock(() => dom.baby.classList.remove('talk'));
  }

  check() {
    dom.baby.classList.add('off');
    dom.baby.innerHTML = `Hungry: ${'*'.repeat(this.hungry)}<br>Age: ${this.age}`;
    this.lock(() => dom.baby.classList.remove('off'));    
  }

  nope() {
    dom.baby.classList.add('nope');
    this.lock(() => dom.baby.classList.remove('nope'));    
  }
};

let gotchi = new Gotchi();

dom.buttons[0].onclick = () => gotchi.back();
dom.buttons[1].onclick = () => gotchi.run();
dom.buttons[2].onclick = () => gotchi.next();
