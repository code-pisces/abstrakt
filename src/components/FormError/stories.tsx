import { Story, Meta } from '@storybook/react/types-6-0';
import { FormError } from '.';

export default {
  title: 'FormError',
  component: FormError
} as Meta;

export const Default: Story = () => (
  <FormError isEmpty={false}>
    <div />
  </FormError>
);
