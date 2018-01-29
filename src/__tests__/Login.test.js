import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../components/accounts/login';


describe('<Login /> component', () => {
    const wrapper = shallow(<Login />)
    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(6)
    })
    it('should render form correctly', () => {
        // check register component contain one <from/>
        const RegisterForm = wrapper.find("form");
        expect(RegisterForm).toHaveLength(1);
    });
    it('should render h1', () => {
        //check that H1 is being rendered
        expect(wrapper.find('h1').text()).toEqual('User Login')
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#email').length).toEqual(1);
        expect(wrapper.find('#password').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#email').simulate('change', { target: { name: 'email', value: 'admin@gmail.com' } });
        expect(wrapper.state('email')).toEqual('admin@gmail.com')
    });
});


