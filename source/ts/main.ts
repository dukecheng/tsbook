console.log(greetNamed("Duke"));
console.log(greetUnNamed("Duke"));

function greetNamed(name: string): string {
  if (name)
    return "Hi! " + name;
}

var greetUnNamed = function(name:string):string{
  if (name)
    return "Hi! " + name;
}
