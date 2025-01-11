import { Bell, User } from 'lucide-react';
import { Input } from '../ui/input';

export default function DashboardHeader() {
  return (
    <div className="p-2 flex items-center border-b shadow">
      {/* Search */}
      <section className='w-full'>
        <Input type="text" placeholder='Search anything....' />
      </section>
      {/* Profile and notification */}
      <section className="flex justify-end items-center w-full">
        <Bell />
        <User />
      </section>
    </div>
  );
}
