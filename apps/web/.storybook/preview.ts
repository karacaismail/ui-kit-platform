import type { Preview } from '@storybook/html-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Foundations', 'Documentation', 'Examples'] } }
  },
  globalTypes: {
    appearance: {
      description: 'Preview appearance',
      defaultValue: 'dark',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
          { value: 'accessibility', title: 'Accessibility' }
        ]
      }
    }
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.appearance = String(context.globals.appearance);
      const root = document.createElement('main');
      root.className = 'storybook-canvas';
      root.append(story());
      return root;
    }
  ]
};

export default preview;
