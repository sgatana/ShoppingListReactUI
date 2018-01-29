import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddItem from '../components/modals/addItem';

describe('<AddItem /> component', () => {
    const wrapper = shallow(<AddItem />)
    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(10)
    })
    it('should render form correctly', () => {
        // check register component contain one <from/>
        const ItemForm = wrapper.find("form");
        expect(ItemForm).toHaveLength(1);
    });
    it('should render h1', () => {
        //check that H1 is being rendered
        expect(wrapper.find('h4').text()).toEqual('Add Item')
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#name').length).toEqual(1);
        expect(wrapper.find('#price').length).toEqual(1);
        expect(wrapper.find('#quantity').length).toEqual(1);
        expect(wrapper.find('#unit').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#name').simulate('change', { target: { name: 'name', value: 'coffee' } });
        expect(wrapper.state('name')).toEqual('coffee')
    });
});


