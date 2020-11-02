import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

//on definit l'adaptateur a une nouvelle instance de notre adaptateur Enzyme.
configure({
    adapter: new Adapter(),
    disableLifecycleMethods: true //on desactive les methodede cycle de vie
});