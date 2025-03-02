import { ChipInput } from '~/components/Chip';
import { TagInput } from '~/components/Tag';

export default function dashboard() {
  return (
    <div>
      <div style={{ padding: '24px' }}>
        <h1>Tag Input Example</h1>
        <TagInput />
      </div>
      <div>
        <ChipInput />
      </div>
    </div>
  );
}
