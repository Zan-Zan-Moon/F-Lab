// {setTimeout(
//   function (name) {
//     let coffeeList = name;
//     console.log(coffeeList);

//     setTimeout(
//       function (name) {
//         coffeeList += ', ' + name;
//         console.log(coffeeList);

//         setTimeout(
//           function (name) {
//             coffeeList += ', ' + name;
//             console.log(coffeeList);

//             setTimeout(
//               function (name) {
//                 coffeeList += ', ' + name;
//                 console.log(coffeeList);
//               },
//               500,
//               '카페라떼'
//             );
//           },
//           500,
//           '카페모카'
//         );
//       },
//       500,
//       '아메리카노'
//     );
//   },
//   500,
//   '에스프레소'
// );}

// {
//   let coffeeList = '';

//   const addEspresso = (name) => {
//     coffeeList = name;
//     console.log(coffeeList);
//     setTimeout(addAmericano, 500, '아메리카노');
//   };

//   const addAmericano = (name) => {
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
//     setTimeout(addMocha, 500, '카페모카');
//   };

//   const addMocha = (name) => {
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
//     setTimeout(addLatte, 500, '카페라떼');
//   };

//   const addLatte = (name) => {
//     coffeeList += ', ' + name;
//     console.log(coffeeList);
//   };

//   addEspresso('에스프레소');
// }

// new Promise(function (resolve) {
//   setTimeout(function () {
//     let name = '에스프레소';
//     console.log(name);
//     resolve(name);
//   }, 1000);
// }).then(function (prevName) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       let name = prevName + ', 아메리카노';
//       console.log(name);
//       resolve(name);
//     }, 1000);
//   }).then(function (prevName) {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         let name = prevName + ' .카페모카';
//         console.log(name);
//         resolve(name);
//       }, 1000);
//     }).then(function (prevName) {
//       return new Promise(function (resolve) {
//         setTimeout(function () {
//           let name = prevName + ' .카페모카';
//           console.log(name);
//           resolve(name);
//         }, 1000);
//       });
//     });
//   });
// });

// const addCoffee = (name) => (prevName) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let newName = prevName ? prevName + ', ' + name : name;
//       console.log(newName);
//       resolve(newName);
//     }, 1000);
//   });
// };

// addCoffee('에스프레소')()
//   .then(addCoffee('아메리카노'))
//   .then(addCoffee('카페모카'))
//   .then(addCoffee('카페라떼'));

// const addCoffee = function (prevName, name) {
//   setTimeout(function () {
//     coffeeMaker.next(prevName ? prevName + ', ' + name : name);
//   }, 1000);
// };

// const coffeeGenerator = function* () {
//   const espresso = yield addCoffee('', '에스프레소');
//   console.log(espresso);
//   const americano = yield addCoffee(espresso, '아메리카노');
//   console.log(americano);
//   const mocha = yield addCoffee(americano, '카페모카');
//   console.log(mocha);
//   const latte = yield addCoffee(mocha, '카페라떼');
//   console.log(latte);
// };

// const coffeeMaker = coffeeGenerator();
// coffeeMaker.next();

const addCoffee = function (name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
};

const coffeeMaker = async function () {
  let coffeeList = '';
  let _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ',' : '') + (await addCoffee(name));
  };

  await _addCoffee('에스프레소');
  console.log(coffeeList);
  await _addCoffee('아메리카노');
  console.log(coffeeList);
  await _addCoffee('카페모카');
  console.log(coffeeList);
  await _addCoffee('카페라떼');
  console.log(coffeeList);
};

coffeeMaker();
