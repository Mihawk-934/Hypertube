import React from 'react';
import Register from './Register';
import { mount } from 'enzyme';
import MyInput from '../../../components/MyInput/MyInput';
describe('In Register', () => {

  it('if Form exist', () => {
    const component = mount(<Register/>);
    const wrapper = component.find('Form');
    expect(wrapper.length).toBe(1);
  });

  test('if i have 2 Input', () => {
    const component = mount(<Register/>);
    const input = component.find(MyInput);
    expect(input.length).toBe(2);
  });

  test('if Form.Text exist', () => {
    const component = mount(<Register/>);
    const input = component.find('FormText');
    expect(input.length).toBe(1);
  });

  test('if MyButton exist', () => {
    const component = mount(<Register/>);
    const input = component.find('MyButton');
    expect(input.length).toBe(1);
  });
});


it('Form oSubmit', () => {
  const onSubmitFn = jest.fn();
  const wrapper = mount(<Register onSubmit={onSubmitFn}/>);
  const form = wrapper.find('Form');
  form.simulate('submit');
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});

it('Input onChange()' , () => {
  const component = mount(<Register/>);
  let input = component.find(`[data-test='Email']`).first();
  expect(input.length).toBe(1);
  // input.simulate('change', {
  //   target: { value:'mehdi123'} 
  // })
  // input = component.find('Input').first();
  // expect(input.props().value).toEqual('mehdi123');
});