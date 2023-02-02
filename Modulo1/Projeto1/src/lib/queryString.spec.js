const { queryString } = require('./queryString');
describe('Object to query string', () => {
  it('Should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Mateus',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Mateus&profession=Developer');
  });

  it('Should create a valid query string even when a array is passed as a value', () => {
    const obj = {
      name: 'Mateus',
      profession: 'Developer',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe(
      'name=Mateus&profession=Developer&abilities=JS,TDD',
    );
  });

  it('Should throw an error when a object is passed as a value', () => {
    const obj = {
      name: 'Mateus',
      profession: 'Developer',
      abilities: { first: 'JS', second: 'TDD' },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});
/*
describe('Query string to object', ()=>{

})*/
