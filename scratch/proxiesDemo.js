/* eslint-disable class-methods-use-this */
class Cat {
  meow() {
    return 'Meow!';
  }

  chew() {
    return 'chewing a cord...';
  }
}

class Dog {
  bark() {
    return 'bark!';
  }

  chew() {
    return 'chewing a shoe...';
  }
}

const mal = new Cat();
const puck = new Dog();

const allPets = new Proxy(puck, {
  get: function (target, property) {
    return target[property] || mal[property];
  },
});

console.log('allPets.chew():', allPets.chew());
console.log('allPets.meow():', allPets.meow());
/* eslint-disable class-methods-use-this */
