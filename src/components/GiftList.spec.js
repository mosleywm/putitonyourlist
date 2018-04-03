import React from 'react';
import {createShallow, createMount} from 'material-ui/test-utils';
jest.mock('../services/Gift.service');
import * as GiftService from '../services/Gift.service';
import GiftList from './GiftList';

describe('(Component) GiftList', () => {
  let shallow,
      mount;
  const GIFTS = [
    {
      id: '1',
      listId: '1',
      name: 'Test Name',
      description: 'Test Description',
      priority: true
    }, {
      id: '2',
      listId: '1',
      name: 'Test Name Two',
      description: 'Test Description Two',
      priority: false
    }
  ];

  const SAVED_GIFT = {
    id: '3',
    name: 'Returned',
    description: 'Desc'
  };

  beforeEach(() => {
    shallow = createShallow({dive: true});
    mount = createMount();
    GiftService.getListGifts.mockReturnValue(Promise.resolve(JSON.parse(JSON.stringify(GIFTS))));
    GiftService.deleteGift.mockReturnValue(Promise.resolve());
    GiftService.updateGift.mockReturnValue(Promise.resolve(SAVED_GIFT));
    GiftService.createGift.mockReturnValue(Promise.resolve(SAVED_GIFT));
  });

  it('should render without crashing', () => {
    shallow(<GiftList userId={'1'} listId={'1'}/>);
  });

  describe('manipulating gift items', () => {
    it('should add a new gift', () => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'}/>);
      wrapper.setState({gifts: [].concat(GIFTS)});
      expect(wrapper.find('WithStyles(GiftDetail)').length).toBe(2);
      expect(wrapper.find('[type="submit"]')).toBeDisabled();
      wrapper.find('[type="button"]').simulate('click', {preventDefault: () => {}});
      expect(wrapper.find('WithStyles(GiftDetail)').length).toBe(3);
      expect(wrapper.find('[type="submit"]')).not.toBeDisabled();
    });

    it('should remove a gift', done => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'}/>);
      wrapper.setState({gifts: [].concat(GIFTS)});
      wrapper.find('WithStyles(GiftDetail)').at(0).prop('handleRemoveItem')(0);
      expect(GiftService.deleteGift).toHaveBeenCalledWith(GIFTS[0]);
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find('WithStyles(GiftDetail)').length).toBe(1);
        done();
      });
    });

    it('should mark a gift as a priority', () => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'} />);
      wrapper.setState({
        gifts: [].concat(GIFTS),
        savedGifts: JSON.parse(JSON.stringify(GIFTS))
      });
      wrapper.find('WithStyles(GiftDetail)').at(0).prop('handleCheck')(0);
      wrapper.update();
      expect(wrapper.state('gifts')[0].priority).toBeFalsy();
      expect(wrapper.find('[type="submit"]')).not.toBeDisabled();
      wrapper.find('WithStyles(GiftDetail)').at(0).prop('handleCheck')(0);
      wrapper.update();
      expect(wrapper.state('gifts')[0].priority).toBeTruthy();
      expect(wrapper.find('[type="submit"]')).toBeDisabled();
    });

    it('should update name and description', () => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'} />);
      wrapper.setState({
        gifts: [].concat(GIFTS),
        savedGifts: JSON.parse(JSON.stringify(GIFTS))
      });
      wrapper.update();
      expect(wrapper.state('gifts')[0].name).toBe('Test Name');
      expect(wrapper.state('gifts')[0].description).toBe('Test Description');
      expect(wrapper.find('[type="submit"]')).toBeDisabled();
      wrapper.find('WithStyles(GiftDetail)').at(0).prop('handleInputChange')(0, {
        target: {
          value: 'Name Change',
          name: 'name'
        }
      });
      wrapper.find('WithStyles(GiftDetail)').at(0).prop('handleInputChange')(0, {
        target: {
          value: 'Description Change',
          name: 'description'
        }
      });
      wrapper.update();
      expect(wrapper.state('gifts')[0].name).toBe('Name Change');
      expect(wrapper.state('gifts')[0].description).toBe('Description Change');
      expect(wrapper.find('[type="submit"]')).not.toBeDisabled();
    });
  });

  describe('saving data', () => {
    it('should save a new gift', done => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'} />);
      wrapper.setState({
        gifts: [{name: 'test'}],
        isUpdateDisabled: false,
      });
      wrapper.update();
      expect(wrapper.find('[type="submit"]')).not.toBeDisabled();
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});
      expect(GiftService.createGift).toHaveBeenCalledWith({name: 'test'});
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.state('gifts')).toEqual([SAVED_GIFT]);
        expect(wrapper.find('[type="submit"]')).toBeDisabled();
        done();
      });
    });

    it('should update a gift', done => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'} />);
      wrapper.setState({
        gifts: [{id: '3'}],
        isUpdateDisabled: false,
      });
      wrapper.update();
      expect(wrapper.find('[type="submit"]')).not.toBeDisabled();
      wrapper.find('form').simulate('submit', {preventDefault: () => {}});
      expect(GiftService.updateGift).toHaveBeenCalledWith({id: '3'});
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.state('gifts')).toEqual([SAVED_GIFT]);
        expect(wrapper.find('[type="submit"]')).toBeDisabled();
        done();
      });
    });
  });

  describe('loading data', () => {
    it('should load list gifts on mounting', done => {
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'}/>);
      setImmediate(() => {
        wrapper.update();
        expect(GiftService.getListGifts).toHaveBeenCalledWith('1');
        expect(wrapper.find('WithStyles(GiftDetail)').length).toBe(2);
        done();
      });
    });

    it('should add temp gift if none exist', done => {
      GiftService.getListGifts.mockReturnValue(Promise.resolve([]));
      const wrapper = shallow(<GiftList userId={'1'} listId={'1'}/>);
      setImmediate(() => {
        wrapper.update();
        expect(GiftService.getListGifts).toHaveBeenCalledWith('1');
        expect(wrapper.find('WithStyles(GiftDetail)').length).toBe(1);
        done();
      });
    });
  });
});
