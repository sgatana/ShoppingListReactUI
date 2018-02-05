import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Header from '../components/header';
// import { exists } from 'fs';


describe('<Header /> component', () => {
    const wrapper = shallow(<Header />)
    
    it('should render without throwing an error', () => {
        expect(wrapper.exists(<div class="container" />)).toBe(true)
    });
    it('should render <nav/> correctly', ()=> {
        expect(wrapper.exists(<nav className="navbar" />)).toBe(true)
    })
    it('should render a button input', () =>{
        expect(wrapper.find('button').length).toEqual(1)
    })
})
describe('Header.onUserLogout', () => {
    it('returns true when called', () => {
        const wrapper = shallow(<Header />);
        const instance = wrapper.instance();

        // spy on the instance instead of the component
        spyOn(instance, 'onUserLogout').and.callThrough();

        expect(instance.onUserLogout()).toBe(true);
        expect(instance.onUserLogout).toHaveBeenCalled();
    });
});

