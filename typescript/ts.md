## 基础用法

#### 1、变量类型

|                | 英文           | 示例                                                         |                             注意                             |
| -------------- | -------------- | ------------------------------------------------------------ | :----------------------------------------------------------: |
| 布尔值         | boolean        | `let isDone: boolean = false;`                               |                                                              |
| 数字           | number         | `let decLiteral: number = 0xf00d; `                          |                number为浮点型，可8,10,16进制                 |
| 字符串         | string         | `let name: string = "bob";`                                  |                                                              |
| 数组           | Array          | `let list: number[] = [1, 2, 3];`<br/>`let list: Array<number> = [1, 2, 3];` |          1、基本类型+[]<br>2、数组泛型 Array<类型>           |
| 元组           | Tuple          | `let x: [string, number]= ['hello', 10];`                    |         给下标越界赋值，为联合类型（string\|number）         |
| 枚举           | enum           | `enum Color {Red, Green, Blue}`                              | 1、可通过索引下标 获取指定字符串<br>2、可通过字符串下标 获取索引 |
| 任意           | Any            | `let list: any[] = [1, true];`                               |       可调用对应类型的方法，对比于不可调用方法的Object       |
| Void           | Void           | `let unusable: void = undefined;`                            |         只能为 `void` 类型赋予 `undefined` 和 `null`         |
| Null&Undefined | Null&Undefined | `let n: null = null;`                                        | `null`和`undefined`是所有类型的子类型。把 `null`和`undefined`赋值给`number`类型的变量。 |
| Never          | never          | `function error(message: string): never {    throw new Error(message); }` | 抛出异常或根本就不会有返回值的函数表达式<br>或箭头函数表达式的返回值类型 |
| Object         | object         | `let n: Object= {1:1};`                                      |                          非原始类型                          |

#### 2、类型断言

> 通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。

```typescript
let someValue: any = "this is a string";

//方法一："尖括号”语法
let strLength: number = (<string>someValue).length;
//方法二：as语法 《优先选择》
let strLength: number = (someValue as string).length;
```



## 接口

> TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
>
> *实际使用 如同一个类中的构造函数！！*

#### 1、基础用法

```typescript
//定义的接口类型 设定SquareConfig类型中 必须符合下面包含的类型
interface SquareConfig {
  //属性名后的？代表可选参数
  color?: string;
  width?: number;
}
//此处参数中的config 限制了参数类型，返回值
//后面的{ color?: string; area: number } 为返回值限定
function createSquare(config: SquareConfig): { color?: string; area: number } {
	return {color: "white", area: 100};
}

//等价于 将返回值提成接口形式 
interface config{
	color?: string;
  area: number;
}
function createSquare(config: SquareConfig): config {
	return {color: "white", area: 100};
}
```

#### 2、只读属性

`readonly` vs `const`

>最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 
>
>做为变量使用的话用 `const`，若做为属性则使用`readonly`。

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
//无法直接通过赋值修改
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

## 类

#### 1、与JS的差别

> 与java的类类似 有public private protected修饰方法 此处不过多赘述！

*要注意的是*：类的继承 构造函数中必须要调用super()

> 下面给出一个例子

```typescript
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```

> 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 方法

#### 1、与JS的差别

- 需要完全符合参数数量，JavaScript为可选

```typescript
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```

- 剩余参数收集方法

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

#### 2、this

> 当你this使用指针不当时，TypeScript会警告你犯了一个错误

```typescript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```



#### 3、重载

> 相同函数名 接收的形参不同 执行不同代码

*在JavaScript中不支持重载！因为其参数是可选项！但是typescript可以*

```typescript
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
```



## 泛型

> 除了提供的类型，用户也可以以自己的数据类型来使用组件

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```



## 枚举

#### 1、概念

> 定义一些带名字的常量。

#### 2、基础用法

- 没给值时，会根据最后的初始值进行向下排序
- 可以利用下标索引访问string ，也可以用string访问索引

```typescript
enum BooleanEnum {
  No = 2,
  haha=4,
  true,
}
console.log(BooleanEnum)		//{ '2': 'No', '4': 'haha', '5': 'true', No: 2, haha: 4, true: 5 }
console.log(BooleanEnum['haha'],BooleanEnum[5],typeof BooleanEnum[5])			//4 Yes string

```

## 类型兼容性问题

#### 1、向下兼容

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

#### 2、枚举兼容

> 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。

```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = myStatus.Ready;
myStatus = Color.Green;  // Error 不能跨enum赋值
```