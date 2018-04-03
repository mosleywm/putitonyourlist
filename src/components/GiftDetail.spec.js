import React from 'react';
import {createShallow, createMount} from 'material-ui/test-utils';
import GiftDetail from './GiftDetail';

describe('(Component) GiftDetail', () => {
  let shallow;
  let mount;

  const GIFT = {
    name: 'Test Name',
    priority: true,
    description: 'Test Description'
  };
  const INDEX = 0;

  const handleCheck = jest.fn();
  const handleInputChange = jest.fn();
  const handleRemoveItem = jest.fn();

  const component = <GiftDetail
    gift={GIFT}
    index={INDEX}
    handleCheck={handleCheck}
    handleInputChange={handleInputChange}
    handleRemoveItem={handleRemoveItem}
  />;

  beforeEach(() => {
    shallow = createShallow({dive: true});
    mount = createMount();
  });

  it('should render without crashing', () => {
    shallow(component);
  });

  it('should render gift properties', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('[name="name"]')).toHaveValue(GIFT.name);
    expect(wrapper.find('[name="description"]')).toHaveValue(GIFT.description);
  });

  it('should call update functions', () => {
    const wrapper = shallow(component);
    wrapper.find('[name="name"]').simulate('change');
    wrapper.find('[name="description"]').simulate('change');
    expect(handleInputChange).toHaveBeenCalledTimes(2);
    expect(handleInputChange).toHaveBeenCalledWith(INDEX, undefined);
  });

  it('should render gift priority', () => {
    const wrapper = mount(component);
    expect(wrapper.find('input [name="priority"]')).toBeChecked();
    wrapper.unmount();
  });

  it('should call update checkbox functions', () => {
    const wrapper = mount(component);
    wrapper.find('input [name="priority"]').simulate('change');
    expect(handleCheck).toHaveBeenCalledWith(INDEX, expect.anything());
    wrapper.unmount();
  });

  it('should call remove function', () => {
    const wrapper = mount(component);
    wrapper.find('button').simulate('click');
    expect(handleRemoveItem).toHaveBeenCalledWith(INDEX);
    wrapper.unmount();
  });
});
