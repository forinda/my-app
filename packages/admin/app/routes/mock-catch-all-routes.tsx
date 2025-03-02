import { Link } from 'react-router';
import { Heading } from '~/components/ui/heading';

export default function MockCatchAllRoutes() {
  return (
    <div>
      <Heading>Mock Catch All Routes</Heading>
      <Link to="/mock-dashboard">Mock Dashboard</Link>
    </div>
  );
}
