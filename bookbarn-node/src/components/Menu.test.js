import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Menu from "./Menu";

configure({ adapter: new Adapter() });

describe("<Menu />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Menu />);
  });

  it("Should display four menu items when 'authenticated' - Home, Register, Login, Add Book ", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find("Link")).toHaveLength(4);
  });

  it("Should display three menu items when 'NOT authenticated' - Home, Register, Login ", () => {
    expect(wrapper.find("Link")).toHaveLength(3);
  });
});
