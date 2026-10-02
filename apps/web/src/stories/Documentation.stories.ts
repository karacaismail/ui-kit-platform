import type { Meta, StoryObj } from '@storybook/html-vite';
import { element, escapeHtml, icon } from './helpers';

const meta = {
  title: 'Documentation/Technical example',
  tags: ['autodocs'],
  args: { title: 'Switch labels', appearance: 'dark' },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['dark', 'light', 'accessibility'] }
  },
  render: ({ title, appearance }) => {
    const safeAppearance = ['dark', 'light', 'accessibility'].includes(appearance) ? appearance : 'dark';
    const root = element(`
      <article class="example story-example">
        <header class="example-top"><strong>${escapeHtml(title)}</strong><span>HTML · CSS · JavaScript</span></header>
        <div class="story-preview" data-appearance="${safeAppearance}">
          <label class="setting"><span>Label</span><input type="checkbox" role="switch" checked></label>
          <label class="setting"><span>Required</span><input type="checkbox" role="switch"></label>
          <label class="setting muted"><span>Disabled</span><input type="checkbox" role="switch" disabled></label>
        </div>
        <div class="example-actions">
          <div class="segments" aria-label="Preview appearance">
            ${['dark','light','accessibility'].map(mode => `<button type="button" data-theme="${mode}" aria-pressed="${mode === safeAppearance}">${mode}</button>`).join('')}
          </div>
          <div class="od-cluster">
            <button class="outline" type="button">Expand code</button>
            <button class="icon-button" type="button" aria-label="Copy code">${icon('<rect x="8" y="8" width="12" height="12"></rect><path d="M16 8V4H4v12h4"></path>')}</button>
          </div>
        </div>
        <pre class="story-code"><code>&lt;label&gt;&lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt; Label&lt;/label&gt;</code></pre>
      </article>`);
    root.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
      const mode = (button as HTMLElement).dataset.theme ?? 'dark';
      root.querySelector('.story-preview')?.setAttribute('data-appearance', mode);
      root.querySelectorAll('[data-theme]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    return root;
  }
} satisfies Meta<{ title: string; appearance: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreviewActionsCode: Story = {};
