const functions = require('./util');
var apple = {name: 'apple',price: '2', count: '12'};
test('add item', () =>{
    expect(functions.add(apple,'12312312312312')).toBe("{name: 'apple',price: '2', count: '12'}");
});

test('increase count', () =>{
    expect(functions.increase()).toBe("{name: 'apple',price: '2', count: '13'}");
});

test('decrease count', () =>{
    expect(functions.decrease()).toBe(""{name: 'apple',price: '2', count: '13'}"");
});


test('clear', () =>{
    expect(functions.clear('',)).toBe("");
});
