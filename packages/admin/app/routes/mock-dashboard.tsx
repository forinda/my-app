import DashboardPayRecord from '~/components/mock/dashboard-pay-record';
import MockDashboardCards from '~/components/mock/mock-dashboard-cards';

export default function dashboard() {
  return (
    <div>
      <MockDashboardCards />
      <DashboardPayRecord />
    </div>
  );
}
