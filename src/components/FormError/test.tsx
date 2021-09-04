import { render, screen } from '@testing-library/react';

import { FormError } from '.';

describe('<FormError />', () => {
  it('should render the heading', () => {
    const { container } = render(<FormError />);

    expect(
      screen.getByRole('heading', { name: /FormError/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
