import React from 'react';
import { mount } from 'enzyme';
import InputForm from './InputForm';

describe('InputForm', () => {
  let component;
  beforeAll(() => {
    component = mount(<InputForm label="foo" id="bar" value="baz" />);
  });

  it('should contain label', () => {
    expect(component.find('label')).toHaveLength(1);
  });

  it('should contain input field', () => {
    expect(component.find('input[type="text"]')).toHaveLength(1);
  });

  it('should show correct value set', () => {
    expect(component.find('input[type="text"]').prop('value')).toBe('baz');
  });

  it('should contain submit button', () => {
    expect(component.find('button[type="submit"]')).toHaveLength(1);
  });

  it('should show correct label', () => {
    expect(component.find('label').text()).toBe('foo');
  });
});
