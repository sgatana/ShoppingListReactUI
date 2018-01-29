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

