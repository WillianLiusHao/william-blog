# ts
## 基础

`原始数据类型`
- undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

`任意值 ` 
- 允许被赋值为任意类型、访问任何属性  
- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型  
- `声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。`

`类型推论`
- 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
``` typescript
  let test = 23
  test = '123'

  //Type '"123"' is not assignable to type 'number'.
```

`联合类型`
- 只能访问此联合类型的所有类型里共有的属性或方法：
``` typescript
  function getLength(something: string | number): number {
      return something.length;
  }

  // index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
  // Property 'length' does not exist on type 'number'.
```

`接口`
- 必须属性(:)、可选属性(?:)、任意属性、只读属性
``` typescript
  interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
    readonly id: number;
  }
```
- 赋值的时候，变量的形状必须和接口的形状保持一致

`数组`
- 「类型 + 方括号」表示法
```typescript
  let fibonacci: number[] = [1, 1, 2, 3, 5]; //只允许数字存在的数组
```
- 数组泛型
```typescript
  let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

`函数声明`
```typescript
  function sum(x: number, y: number): number {
    return x + y;
  }
```
`断言`  
```typrscript

```

`类型守卫`