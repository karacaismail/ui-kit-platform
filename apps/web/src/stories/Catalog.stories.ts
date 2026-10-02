import type { Meta, StoryObj } from '@storybook/html-vite';
import { element } from './helpers';

const meta = {
  title: 'Documentation/Catalog controls',
  tags: ['autodocs'],
  render: () => {
    const root = element(`
      <section class="story-section">
        <div class="filterbar">
          <div class="segments" aria-label="Tier">
            <button aria-pressed="true">All</button><button aria-pressed="false">Free</button><button aria-pressed="false">Pro</button>
          </div>
          <label class="toggle-label"><input type="checkbox"> Include experimental</label>
          <button class="outline" type="button">Sort: curated</button>
        </div>
        <div class="catalog">
          <a class="component-card" href="#button"><div class="miniature"><span class="mini-button">Save changes</span></div><div class="card-body"><div class="card-title"><h3>Button</h3><span class="badge free">FREE</span></div><p>A clear next step with predictable feedback.</p></div></a>
          <a class="component-card" href="#command"><div class="miniature"><span class="mini-input">Search commands</span></div><div class="card-body"><div class="card-title"><h3>Command menu</h3><span class="badge pro">PRO</span></div><p>A keyboard-first route to actions and destinations.</p></div></a>
        </div>
      </section>`);
    root.querySelectorAll('.segments button').forEach(button => button.addEventListener('click', () => {
      root.querySelectorAll('.segments button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    return root;
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiltersAndCards: Story = {};
