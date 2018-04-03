import React from 'react';
import {createShallow} from 'material-ui/test-utils';
import Header from './header';

describe('(Component) Header', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({dive: true});
  });

  it('should render without crashing', () => {
    shallow(<Header />);
  });

  it('should render the correct text', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h2')).toHaveText('Put It On Your List');
  });
});
