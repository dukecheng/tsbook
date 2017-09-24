var foo = function() {
  console.log('foo');
}

function bar(cb: () => void) {
  console.log('bar');
  cb();
}

bar(foo);

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    alert(`Hi! My name is ${name}`);
  }
  greetDelay(time: number) {
    setTimeout(function() {
      alert(`Hi! My name is ${name}`);
    }, time);
  }
}


class Person2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    alert(`Hi! My name is ${name}`);
  }
  greetDelay(time: number) {
    setTimeout(() => {
      alert(`Hi! My name is ${name}`);
    }, time);
  }
}
