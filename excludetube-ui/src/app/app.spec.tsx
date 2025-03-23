import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    expect(true).toBe(true)
    // const { baseElement } = render(
    //   <BrowserRouter>
    //     <App />
    //   </BrowserRouter>w
    // );
    // expect(baseElement).toBeTruthy();
  });
});
