import React from 'react';
import { mount } from 'enzyme';
import InputForm from './InputForm';

describe('InputForm', () => {
  let component;
  beforeAll(() => {
    component = mount(<InputForm label="foo" id="bar" value={100} />);
  });

  it('should contain label', () => {
    expect(component.find('label')).toHaveLength(1);
  });

  it('should contain input field', () => {
    expect(component.find('input[type="number"]')).toHaveLength(1);
  });

  it('should show correct value set', () => {
    expect(component.find('input[type="number"]').prop('value')).toBe(100);
  });

  it('should contain submit button', () => {
    expect(component.find('button[type="submit"]')).toHaveLength(1);
  });

  it('should show correct label', () => {
    expect(component.find('label').text()).toBe('foo');
  });

  it('should not show error', () => {
    expect(component.find('.error').text()).toBe('');
  });

  it('button should be enabled', () => {
    expect(component.find('button[type="submit"]').prop('disabled')).toBe(false);
  });
});

describe('InputForm - error handling', () => {
  let component;
  beforeAll(() => {
    component = mount(<InputForm label="foo" id="bar" value={100} errorMessage="error" />);
  });

  it('should show correct error', () => {
    expect(component.find('.error').text()).toBe('error');
  });

  it('button should be disabled', () => {
    expect(component.find('button[type="submit"]').prop('disabled')).toBe(true);
  });
});
