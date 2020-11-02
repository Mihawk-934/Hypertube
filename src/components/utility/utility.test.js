import {checkInput} from './utility';

describe(('checkInput'), () => {

  describe(('mail'),()=>{

    it('invalid length min mail', () => {
      const got = checkInput('mail', '', 4, 40);
      expect(got).toBe('* 4 charactères min.');
    });

    it('invalid length max mail', () => {
      const got = checkInput('mail', '1111111111111111111111111111111111111111111111', 4, 40);
      expect(got).toBe('* 40 charactères max.');
    });

    it('invalid mail', () => {
      const got = checkInput('mail', '1234567', 4, 40);
      expect(got).toBe('* Adresse Mail incorect');
    });

    it('valid mail', () => {
      const got = checkInput('mail', 'test@gmail.com', 4, 40);
      expect(got).toBe(null);
    });

    it('undefined', () => {
      const got = checkInput(undefined, 'test@gmail.com', 4, 40);
      expect(got).toBe(null);
    });

  });

  describe(('password'), () => {

    it('invalid length min password', () => {
      const got = checkInput('password', '12', 6, 15);
      expect(got).toBe('* 6 charactères min.');
    });

    it('invalid length max password', () => {
      const got = checkInput('password', 'Qwerty1234567897', 6, 15);
      expect(got).toBe('* 15 charactères max.');
    });

    it('invalid password', () => {
      const got = checkInput('password', '1234567', 6, 15);
      expect(got).toBe('* Au moins une minuscule, une majuscule et un chiffre');
    });

    it('valid password', () => {
      const got = checkInput('password', 'Password123', 6, 15);
      expect(got).toBe(null);
    });

  });

});