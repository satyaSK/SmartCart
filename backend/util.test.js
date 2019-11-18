const functions = require('./util');
test('should output if db is connected', () =>{
    expect(functions.bdcon()).toBe('connected');
});