/*
 * @Author: cc123nice
 * @Date: 2020-07-27 11:37:31
 * @LastEditTime: 2020-07-27 21:33:50
 * @Description: my progamme description
 * @FilePath: \ts-demo\demo2-interface\index.ts
 */
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }
// interface Config {
//   color: string;
//   area: number;
// }
// function createSquare(config: SquareConfig): Config{
//   let newSquare = { color: "white", area: 100 };
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }

// let mySquare = createSquare({ width: 10000 });
// console.log(mySquare)

// interface Point {
//   x: Array<number>;
// }
// let obj:Point={
//   x:[1,2,3]
// }
// console.log(obj)

// interface StringArray {
//   // [index: number]: string;
//   [index:number]:string;
// }

// let myArray: StringArray = ["",""];

// let myStr: string = myArray[0];
// let myStr1:number = myArray['Bob'];
// let myStr2:number = myArray['Bob1'];
// console.log(myStr,myStr1,myStr2)

// let Greeter = (function () {
//   function Greeter(message) {
//     this.greeting = message;
//   }
//   Greeter.prototype.greet = function () {
//     return "Hello, " + this.greeting;
//   };
//   return Greeter;
// })();

// let greeter = new Greeter("world");
// console.log(greeter.greet());

// let myAdd: (x: number, y: number) => number =
//   function (x: number, y: number): number {
//     return x + y;
//   };

// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function() {
//       // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//       return () => {
//           let pickedCard = Math.floor(Math.random() * 52);
//           let pickedSuit = Math.floor(pickedCard / 13);

//           return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//       }
//   }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// enum E1 { X, Y, Z }

// enum E2 {
//     A = "A", B= "b", C= "c"
// }
// enum BooleanEnum {
//   No = 2,
//   true,
//   haha=3,
// }
// let x = [0, 1, null];
// console.log(BooleanEnum,typeof x)


// interface Named {
//   name: string;
// }

// let x: Named;
// // y's inferred type is { name: string; location: string; }
// let y = { name: 'Alice', location: 'Seattle' };
// x = y;
// console.log(x)

// enum Status { Blue,Ready };
// enum Color { Red, Blue, Green };

// let mystatus = Status[Color[1]];
// console.log(mystatus)

enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let mystatus = Status.Ready;
console.log(typeof mystatus)
// mystatus = Color.Green;  // Error