import { shallow, mount } from 'enzyme';
import React from 'react';
import MyInput from './MyInput';


describe('In MyInput', () => {
  
  let component;
  beforeEach(() => {
    let mockFunc = jest.fn(); 
    let props = {
      label:'FirstName',
      type:'text',
      controlId:'firstname',
      onChange: mockFunc,
      error: 'error'
    }
    component = shallow(<MyInput {...props}/>);
  });

  test('if Form.Group exist', () => {
    let input = component.find('FormGroup');
    expect(input.length).toBe(1);
  });

  test('if Form.Label exist', () => {
    let input = component.find('FormLabel');
    expect(input.length).toBe(1);
  });

  test('if Form.Control exist', () => {
    let input = component.find('FormControl');
    expect(input.length).toBe(1);
  });

  test('if Form.Text exist', () => {
    let input = component.find('FormText');
    expect(input.length).toBe(1); 
  });

});

describe('Testing with error', () => {
 
  it('render date input correctly with null value', () => {  
    const props = {
      label: null
    };
    const error = mount(<MyInput {...props} />);
    expect((error).prop('label')).toEqual(null);
  });

});