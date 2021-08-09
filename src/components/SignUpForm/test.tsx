import { render, screen } from '@testing-library/react';

import { SignUpForm } from '.';

describe('<SignUpForm />', () => {
  it('should render the heading', () => {
    const { container } = render(<SignUpForm />);

    expect(
      screen.getByRole('heading', { name: /SignUpForm/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
