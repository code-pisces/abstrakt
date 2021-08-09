import { Story, Meta } from '@storybook/react/types-6-0';
import { SignUpForm } from '.';

export default {
  title: 'SignUpForm',
  component: SignUpForm
} as Meta;

export const Default: Story = () => <SignUpForm />;
