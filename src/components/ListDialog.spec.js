import React from 'react';
import {createShallow, createMount} from 'material-ui/test-utils';
jest.mock('../services/List.service');
import {createList} from '../services/List.service';
import ListDialog from './ListDialog';

describe('(Component) ListDialog', () => {
  let shallow;
  let mount;

  const onClose = jest.fn();

  const LIST_STATE = {
    isPublic: true,
    name: 'test name',
    description: 'test description'
  };

  const PARSED_LIST = Object.assign({userId: '1'}, LIST_STATE);

  const NULL_LIST_STATE = {
    isPublic: false,
    name: '',
    description: ''
  };

  beforeEach(() => {
    shallow = createShallow({dive: true});
    mount = createMount();
    createList.mockReturnValue(Promise.resolve(PARSED_LIST));
  });

  it('should render without crashing', () => {
    shallow(<ListDialog open={true} onClose={onClose} userid={'1'} />);
  });

  it('should set list as public', () => {
    const wrapper = mount(<ListDialog open={true} onClose={onClose} userid={'1'} />);
    const elementSelector = 'input [name="isPublic"]';
    const checkBox = wrapper.find(elementSelector);
    expect(wrapper.find(elementSelector)).not.toBeChecked();
    checkBox.simulate('change');
    expect(wrapper.find(elementSelector)).toBeChecked();
  });

  it('should assign list name', () => {
    const wrapper = shallow(<ListDialog open={false} onClose={onClose} userid={'1'} />);
    const elementSelector = '[name="name"]';
    expect(wrapper.find(elementSelector)).toHaveValue('');
    wrapper.find(elementSelector).simulate('change', {target: {
      name: 'name',
      value: LIST_STATE.name
    }});
    expect(wrapper.find(elementSelector)).toHaveValue(LIST_STATE.name);
  });

  it('should assign list name', () => {
    const wrapper = shallow(<ListDialog open={false} onClose={onClose} userid={'1'} />);
    const elementSelector = '[name="description"]';
    expect(wrapper.find(elementSelector)).toHaveValue('');
    wrapper.find(elementSelector).simulate('change', {target: {
      name: 'description',
      value: LIST_STATE.description
    }});
    expect(wrapper.find(elementSelector)).toHaveValue(LIST_STATE.description);
  });

  it('should cancel list creation', () => {
    const wrapper = shallow(<ListDialog open={false} onClose={onClose} userid={'1'} />);
    wrapper.setState(LIST_STATE);
    expect(wrapper.state()).toEqual(LIST_STATE);
    wrapper.find('[type="button"]').simulate('click', {preventDefault: () => {}});
    expect(onClose).toHaveBeenCalledWith(false);
    expect(wrapper.state()).toEqual(NULL_LIST_STATE);
  });

  it('should save created list', () => {
    const wrapper = shallow(<ListDialog open={false} onClose={onClose} userid={'1'} />);
    wrapper.setState(LIST_STATE);
    expect(wrapper.state()).toEqual(LIST_STATE);
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    // Flush component promise before
    // https://github.com/facebook/jest/issues/2157
    const flush = Promise.resolve();
    flush.then(() => {
      expect(createList).toHaveBeenCalledWith(PARSED_LIST);
      expect(onClose).toHaveBeenLastCalledWith(PARSED_LIST);
      expect(wrapper.state()).toEqual(NULL_LIST_STATE);
    });
  });
});
