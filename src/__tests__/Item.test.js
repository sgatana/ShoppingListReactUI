import React from 'react';
import { shallow } from 'enzyme';
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
    })
})
