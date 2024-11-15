import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, DollarSign, Users, CheckSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PayrollPro</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Simplify Your Payroll and Employee Management
            </h2>
            <p className="text-xl mb-8">
              All-in-one solution for payroll, task management, and employee
              oversight
            </p>
            <Button size="lg">Get Started</Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2" />
                    Payroll Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Automate your payroll process, handle taxes, and ensure
                    timely payments to your employees.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckSquare className="mr-2" />
                    Task Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Assign, track, and manage tasks efficiently to boost
                    productivity across your organization.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" />
                    Employee Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Maintain employee records, track time off, and manage
                    performance all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Starter', 'Professional', 'Enterprise'].map((plan, index) => (
                <Card
                  key={plan}
                  className={index === 1 ? 'border-primary' : ''}
                >
                  <CardHeader>
                    <CardTitle>{plan}</CardTitle>
                    <CardDescription>
                      {index === 0
                        ? 'For small businesses'
                        : index === 1
                          ? 'For growing companies'
                          : 'For large organizations'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold mb-4">
                      ${index === 0 ? '29' : index === 1 ? '99' : '299'}
                      <span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Payroll Processing',
                        'Task Management',
                        'Employee Profiles',
                      ].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle
                            className="mr-2 text-green-500"
                            size={16}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6"
                      variant={index === 1 ? 'default' : 'outline'}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to learn how PayrollPro can streamline your
              business operations.
            </p>
            <Button size="lg">Contact Sales</Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PayrollPro</h3>
              <p>
                Simplifying payroll and employee management for businesses of
                all sizes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p>Email: info@payrollpro.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 PayrollPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
