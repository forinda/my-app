import MaxWidth from './max-width';

export default function HomeBanner() {
  return (
    <div className="w-full">
      <MaxWidth className="w-full flex flex-col py-8 justify-center items-center">
        <h1 className="text-5xl font-bold max-w-3xl text-center w-full leading-snug">
          Simplify team payment with{' '}
          <span className="text-primary font-bold">easy-use Payroll,</span>
          tracking software
        </h1>
        <div className="w-full">
          <img
            src="/logo-003.svg"
            alt="home-banner"
            className="py-4 w-full max-h-80 h-full"
          />
        </div>
      </MaxWidth>
    </div>
  );
}
