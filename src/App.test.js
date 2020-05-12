import React from 'react';
import App from './App';
import '@shopify/react-testing/matchers';
import Login from "./components/Login";
import {mount} from "@shopify/react-testing";

describe('<App />', () => {
  it('displays login screen', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toContainReactComponent(Login);
  });
})
