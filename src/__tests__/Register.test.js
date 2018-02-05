import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render} from 'enzyme';
import Register from '../components/accounts/register';
import moxios from 'moxios';
import sinon from 'sinon';


describe('<Register /> component', () => {
    const wrapper = shallow(<Register />)
    it('should render without throwing an error', () => {
        expect(wrapper.find("div")).toHaveLength(8)
    })
    it('should render form correctly', () => {
        // check register component contain one <from/>
        const RegisterForm = wrapper.find("form");
        expect(RegisterForm).toHaveLength(1);
    });
    it('should render h1', () => {
        //check that H1 is being rendered
        expect(wrapper.find('h1').text()).toEqual('User Registration')
    });
    it('should render form inputs', () => {
        expect(wrapper.find('#username').length).toEqual(1);
        expect(wrapper.find('#password').length).toEqual(1);
        expect(wrapper.find('#email').length).toEqual(1);
        expect(wrapper.find('#confirm').length).toEqual(1);
    });
    it('input should respond to change event and change the state', () => {
        wrapper.find('#email').simulate('change', {target : {name:'email', value: 'admin@gmail.com'}});
        expect(wrapper.state('email')).toEqual('admin@gmail.com')
    });
});
describe('register user successfully', () => {
    beforeEach( function () {
        moxios.install()
    })
    afterEach(function() {
        moxios.uninstall()
    })
    it('should register user without throwing an error', () => {
        sinon.spy(Register.prototype, 'handleRegister');
        const wrapper = shallow(<Register />);
        wrapper.setState({email: 'admin@gmail.com', username:'admin', password:'pass123', confirm:'pass123'})
        const Form = wrapper.find('form')
      
        Form.simulate('submit', { preventDefault() { } })
        expect(Register.prototype.handleRegister.calledOnce).toEqual(true)
    });
});

