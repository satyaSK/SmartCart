const functions = require('./util');
test('fetching router', () =>{
    expect(functions.send('cart')).toBe("in router : cart");
});

test('data to router', () =>{
    expect(functions.data('cart',2000)).toBe("in router : cart/2000");
});

test('fetching router', () =>{
    expect(functions.send('cartt')).toBe("in router : cartt");
});


test('fetching data from router', () =>{
    expect(functions.fetch('http://localhost:8000/shopping-cart',)).toBe("in router : cartt");
});
