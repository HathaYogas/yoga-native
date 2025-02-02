import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Fallback from '../Fallback';

describe('Fallback 컴포넌트 테스트', () => {
  it('에러 메시지가 올바르게 렌더링된다.', () => {
    const mockError = new Error('테스트 에러');
    const { getByText } = render(
      <Fallback error={mockError} resetError={() => {}} />
    );
    expect(getByText('무언가 잘못되었습니다.')).toBeTruthy();
    expect(getByText('테스트 에러')).toBeTruthy();
  });

  it('재시도 버튼이 클릭 가능하다.', () => {
    const mockResetError = jest.fn();
    const mockError = new Error('테스트 에러');
    const { getByText } = render(
      <Fallback error={mockError} resetError={mockResetError} />
    );

    fireEvent.press(getByText('재시도'));
    expect(mockResetError).toHaveBeenCalled(); // 재시도 버튼 클릭 시 resetError가 호출되는지 확인
  });
});
