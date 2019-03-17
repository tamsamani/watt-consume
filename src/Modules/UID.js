export default (n, b = 36) => [...Array(n)].map(e => (Math.random() * b | 0).toString(b)[`to${Math.random()>.5?"Low":"Upp"}erCase`]()).join("");
