import React from 'react';
import { shallow, render } from 'enzyme';
import DashBoard from '../components/dashboard';
import AddItem from '../components/modals/addItem';
import AddList from '../components/modals/addList';
import updateItem from '../components/modals/updateItem';


describe("<Dashboard /> component", () => {
    const props = {
        history:{
            push: () => {}
        }
    }
    const wrapper = shallow(<DashBoard {...props} />);
    it("should render without failing", () => {
        expect(wrapper.find("div")).toHaveLength(9)

    });
});

describe('<Dashboard /> component contains child componenets', () => {
 
    it('should render <AddItem/> component', () => {
        const wrapper = render(<AddItem />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <AddList/> component', () => {
        const wrapper = shallow(<AddList  />)
        expect(wrapper.length).toEqual(1)
    });
    it('should render <UpdateList /> component', () => {
        const wrapper = shallow(<updateItem />)
        expect(wrapper.length).toEqual(1)
    })
});
