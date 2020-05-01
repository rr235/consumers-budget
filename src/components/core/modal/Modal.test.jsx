import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  let component;
  const clickHandlerMock = jest.fn();
  const ModalContent = () => <div>Some Content</div>;

  beforeEach(() => {
    component = shallow(
      <Modal onClose={clickHandlerMock}>
        <ModalContent />
      </Modal>
    );
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Modal onClose={clickHandlerMock}>
          <ModalContent />
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain close button', () => {
    expect(component.find('button.closeButton')).toHaveLength(1);
  });

  it('should how correct contents', () => {
    expect(component.contains(<ModalContent />)).toBe(true);
  });

  it('should call onClose callback on close', () => {
    const closeButton = component.find('button.closeButton');
    closeButton.simulate('click');
    expect(clickHandlerMock).toHaveBeenCalled();
  });
});

describe('Modal - Functionality', () => {
  it('should add no-scroll to the body on mount', () => {
    // mounts component to trigger componentDidMount event
    mount(
      <Modal onClose={jest.fn()}>
        <div>Some Content</div>
      </Modal>
    );
    expect(document.body.className).toBe('noScroll');
  });

  it('should remove no-scroll to the body on unmount', () => {
    // mounts component to trigger componentDidMount event
    const component = mount(
      <Modal onClose={jest.fn()}>
        <div>Some Content</div>
      </Modal>
    );
    expect(document.body.className).toBe('noScroll');

    // unmounts component to trigger componentWillUnmount event
    component.unmount();
    expect(document.body.className).toBe('');
  });

  it('should close dialog when clicked outside the modal content', () => {
    const clickHandlerMock = jest.fn();
    const component = mount(
      <Modal onClose={clickHandlerMock}>
        <div>Some Content</div>
      </Modal>
    );

    const dialog = component.find('div[role="dialog"]');

    // simulate click on the outer element of Modal
    dialog.props().onClick({
      target: dialog.getDOMNode(),
    });
    expect(clickHandlerMock).toHaveBeenCalled();
  });

  it('should  not close dialog when clicked inside the modal content', () => {
    const ModalContent = () => <div>Some Content</div>;
    const clickHandlerMock = jest.fn();
    const component = mount(
      <Modal onClose={clickHandlerMock}>
        <ModalContent />
      </Modal>
    );

    const modal = component.find(ModalContent);
    const dialog = component.find('div[role="dialog"]');

    // simulate click on Modal Content
    dialog.props().onClick({
      target: modal.getDOMNode(),
    });
    expect(clickHandlerMock).not.toHaveBeenCalled();
  });
});
