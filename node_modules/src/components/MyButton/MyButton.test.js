import { shallow } from 'enzyme';
import MyButton from './MyButton';
import React from 'react';

describe('Button', () => {

    it('button exist', () => {
        let component = shallow(<MyButton/>);
        const button = component.find('Button');
        expect(button.length).toBe(1); 
    });

    it('button disabled', () => {
        let props = {
            disabled: true
        }
        let component = shallow(<MyButton {...props}/>);
        expect(component.find('Button').html().includes('disabled=""')).toBe(true); 
        
    });

    it('button enable', () => {
        let props = {
            disabled: false
        }
        let component = shallow(<MyButton {...props}/>);
        expect(component.find('Button').html().includes('disabled=""')).toBe(false); 
    });

});