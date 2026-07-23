//array
const t = [1, 2, 3, 4, 5];
t.push(6);

console.log(t);

//function
const add = (a, b) => {
  return a + b;
};

console.log(add(2, 3));

//object
const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
};

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5,
};

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov",
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University",
};
console.log(object1.name); // Arto Hellas is printed
const fieldName = "age";
console.log(object1[fieldName]); // 35 is printed
