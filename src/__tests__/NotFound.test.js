import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../components/notFound';

describe("<NotFound /> component", () => {
    const wrapper = shallow(<NotFound />);
    it("should render without failing", () => {
        expect(wrapper.find("div")).toHaveLength(4)

    });
    it('should render h1', () => {
        //check that H1 is being rendered
        expect(wrapper.find('h1').text()).toEqual('Oops!')
    });
})