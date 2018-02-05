import React from 'react';
import { shallow } from 'enzyme';
import Home from '../components/home';

describe("<Dashboard /> component", () => {
    const wrapper = shallow(<Home />);
    it("should render without failing", () => {
        expect(wrapper.find("div")).toHaveLength(4)

    })
})