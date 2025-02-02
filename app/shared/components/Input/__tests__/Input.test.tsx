import React from 'react';
import { render } from '@testing-library/react-native';
import Input from '../Input';

describe('Input 컴포넌트 테스트', () => {
  it('입력 필드가 올바르게 렌더링된다.', () => {
    const { getByPlaceholderText } = render(<Input placeholder="이메일" />);
    expect(getByPlaceholderText('이메일')).toBeTruthy();
  });

  it('라벨이 올바르게 렌더링된다.', () => {
    const { getByText } = render(<Input label="이메일" placeholder="이메일" />);
    expect(getByText('이메일')).toBeTruthy();
  });
});
