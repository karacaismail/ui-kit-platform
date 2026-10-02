import type { Meta, StoryObj } from '@storybook/html-vite';
import { element } from './helpers';

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  render: () => element(`
    <section class="story-section">
      <p class="eyebrow">Semantic foundations</p>
      <h1>Clear space. Data sense.</h1>
      <p class="muted">The documentation shell is square and neutral. Technical surfaces use a distinct Solarized-inspired code surface.</p>
      <div class="token-grid" aria-label="Color tokens">
        ${['canvas','surface','raised','code','ink','muted','accent','focus','error'].map(name => `<div><span style="background:var(--${name})"></span><code>--${name}</code></div>`).join('')}
      </div>
    </section>`)
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticColors: Story = {};
