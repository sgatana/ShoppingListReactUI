import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../components/dashboard';

describe("<Dashboard /> component", () => {
    const wrapper = shallow(<Dashboard />);
    it("should render without failing", () => {
        expect(wrapper.find("div")).toHaveLength(8)

    })
})