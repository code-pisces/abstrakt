import { render, screen } from '@testing-library/react';

import { Input } from '.';

describe('<Input />', () => {
  it('should render the heading', () => {
    const { container } = render(<Input name="example" />);

    expect(screen.getByRole('heading', { name: /Input/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
