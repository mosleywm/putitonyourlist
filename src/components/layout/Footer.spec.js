import React from 'react';
import {createShallow} from 'material-ui/test-utils';
import Footer from './Footer';

describe('(Component) Footer', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({dive: true});
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<Footer />);
  });

  it('should display shit', () => {
    const wrapper = shallow(<Footer />);
    const footerContent = '© 1999-2018 - Put It On Your List';
    expect(wrapper.find('p')).toHaveText(footerContent);
  });
});
