import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';


configure({adapter: new Adapter ()});
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    push: jest.fn()
};
global.localStorage = localStorageMock;