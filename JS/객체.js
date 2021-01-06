const o = { "A" : "dd" , "2" : { "a" : "1", "b" : "2"} }

const { A : one ,  2 : { a : two , b : three } } = o;

console.log(one, two, three)