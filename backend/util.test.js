const functions = require('./util');
test('should output if db is connected', () =>{
    expect(functions.dbcon('smartkart','test')).toBe('connected');
});
test('should output if item got in format', () =>{
    expect(functions.dbitem('www','eeee','23')).toBe('www');
});
test('insert item to db', () =>{
    expect(functions.dbinsert('smartkart', 'test2', 'www22', 'qwerty', '12')).toBe('data inserted!!!');
});