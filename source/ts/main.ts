console.log(greetNamed("Duke"));
console.log(greetUnNamed("Duke"));
function greetNamed(name: string): string {
  if (name)
    return "Hi! " + name;
}
var greetUnNamed = function(name: string): string {
  if (name)
    return "Hi! " + name;
}
function add(foo: number = 0, bar: number = 0, foobar: number = 0, ...foos: number[]): number {
  var result = foo + bar + foobar;
  for (let i = 0; i < foos.length; i++) {
    result += foos[i];
  }
  return result;
}
add();
add(1, 2);
add(1, 2, 3);

function test(name: string): string;
function test(name: number): string;
function test(name: boolean): string;

function test(value: (string | number | boolean)): string {
  switch (typeof value) {
    case "string":
      return `My name is ${value}`;
    case "number":
      return `I'm ${value} years old.`;
    case "boolean":
      return value ? `I'm single.` : `I'm not single.`;
    default:
      console.log("Invalid Operation!");
  }
}
