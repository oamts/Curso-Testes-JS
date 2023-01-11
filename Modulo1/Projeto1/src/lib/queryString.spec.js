const { queryString } = require('./queryString');
describe('Object to query string', () => {
  it('Should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Mateus',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe('name=Mateus&profession=Developer');
  });
});
/*
describe('Query string to object', ()=>{

})*/
