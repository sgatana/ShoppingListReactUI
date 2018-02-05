import React from 'react';
import { shallow } from 'enzyme';
import AddItem from '../components/modals/addItem';
import UpdateItem from '../components/modals/addItem';
import Header from '../components/header';
import Item from '../components/items';


describe('<Item /> component', () => {
    const props = {
        history:{
            push: () =>{}
        }
    }
    const wrapper = shallow(<Item {...props}/>)
    it('should render without breaking', () => {
        expect(wrapper.find('div')).toHaveLength(3)
    });
    it('should render a table', () => {
        expect(wrapper.find('table')).toHaveLength(1)
    });
    it('should render a buttons', () => {
        expect(wrapper.find('button')).toHaveLength(2)
    });
    it('should render a h4', () => {
        expect(wrapper.find('h4')).toHaveLength(1)
    });
    it('should render a class', () => {
        expect(wrapper.find('.page-header')).toHaveLength(1)
    });
    
  
})
describe('<Item /> component contains child componenets', () => {

    it('should render <AddItem/> component', () => {
        const wrapper = shallow(<AddItem />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <Heder/> component', () => {
        const wrapper = shallow(<Header />)
        expect(wrapper.length).toEqual(1)
    });

    it('should render <UpdateItem/> component', () => {
        const wrapper = shallow(<UpdateItem />)
        expect(wrapper.length).toEqual(1)
    });

  
});
  




