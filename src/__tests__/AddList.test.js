import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AddList from '../components/modals/addList';

describe('<AddList /> component', () => {
    const wrapper = shallow(<AddList />)
    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(8)
    })
    it('should render form correctly', () => {
        // check register component contain one <from/>
        const ItemForm = wrapper.find("form");
        expect(ItemForm).toHaveLength(1);
    });
    it('should render h1', () => {
        //check that H1 is being rendered
        expect(wrapper.find('h4').text()).toEqual('Add Shoppinglist')
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#listName').length).toEqual(1);
        expect(wrapper.find('#desc').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#listName').simulate('change', { target: { name: 'name', value: 'coffee' } });
        expect(wrapper.state('name')).toEqual('coffee')
    });
});


