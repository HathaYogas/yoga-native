if (process.env.NODE_ENV !== 'test') {
    jest.mock('@testing-library/react-native', () => ({
      render: jest.fn(),
      fireEvent: jest.fn(),
    }));
  }
  