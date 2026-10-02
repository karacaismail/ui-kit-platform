import type { Meta, StoryObj } from '@storybook/html-vite';
import { element } from './helpers';

const meta = {
  title: 'Documentation/Production workspace',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { route: '?page=catalog' },
  argTypes: {
    route: {
      control: 'select',
      options: ['?page=home', '?page=catalog', '?page=component&component=button', '?page=guide']
    }
  },
  render: ({ route }) => {
    const allowedRoutes = ['?page=home', '?page=catalog', '?page=component&component=button', '?page=guide'];
    const safeRoute = allowedRoutes.includes(route) ? route : '?page=catalog';
    const frame = element('<iframe class="production-story" title="Production UI Kit workspace"></iframe>') as HTMLIFrameElement;
    // Relative to the Storybook folder, so the story follows the site under any base path.
    frame.src = `../${safeRoute}`;
    return frame;
  }
} satisfies Meta<{ route: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiveApplication: Story = {};
