class Student {
    constructor(name, age, role){
        this.name = name;
        this.age = age;
        this.role = role;
    }
}

const s = [
    new Student("one", 12, 1),
    new Student("two", 3, 1),
    new Student("three", 4 , 0),
    new Student("four", 9 , 0),
]

// filter : 조건에 해당하는 요소들로 이루어진 배열을 만든다.

const filterList = s.filter((e) => {
    return e.role === 1 && e.age > 10;
})

console.log(filterList)
console.log("\n======================\n")

// map : 기존 요소들을 이용해 새로운 배열을 만든다.

const mapList = s.map(e => e.name + " 학생");

console.log(mapList)
console.log("\n======================\n")

// reduce 

const reduceList = s.reduce((pre, cur) => {
    console.log("pre ", pre);
    console.log("cur ", cur);
    return cur
    // 반환값이 다음 함수의 pre인자로 전달된다.
})

console.log("\n======================\n")


arr = [1,2,3,4]

arr.reduce((p, c)=>{
    console.log(p, " ", c)
    return c+4
})

console.log(arr)