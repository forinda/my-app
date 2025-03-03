import { css } from 'styled-system/css';
import { Icon } from '@iconify/react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

type DataType = {
  value: string;
  label: string;
  icon: string;
  progress: {
    value: number;
    label: string;
  };
};

// const data: DataType[] = [
//   {
//     value: '2,390',
//     label: 'Total Orders',
//     icon: 'flat-color-icons:line-chart',
//     progress: {
//       value: 75,
//       label: '↑ 3.2%',
//     },
//   },
//   {
//     value: '98%',
//     label: 'Satisfaction Score',
//     icon: 'uiw:like-o',
//     progress: {
//       value: 98,
//       label: '↑ 0.5%',
//     },
//   },
//   {
//     value: '$1,250',
//     label: 'Total Revenue',
//     icon: 'pepicons-pencil:dollar-circle',
//     progress: {
//       value: 60,
//       label: '↓ 1.5%',
//     },
//   },
//   {
//     value: '1,250',
//     label: 'New Customers',
//     icon: 'bi:people',
//     progress: {
//       value: 40,
//       label: '↑ 4.0%',
//     },
//   },
// ];

export default function BeautifulDashboardCards() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: {
          // base: 'grid-template-columns: 1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 4,
        p: 4,
      })}
    >
      {Array.from({ length: 4 }).map((item, index) => (
        <div
          key={index}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            p: '25px',
            bg: 'bg.default',
            borderRadius: 'lg',
            boxShadow: 'md',
            color: 'fg.default',
            gap: 3,
            border: '1px solid',
            borderColor: 'border.default',
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <div
              className={css({ display: 'flex', alignItems: 'center', gap: 2 })}
            >
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: '#E9ECEF',
                  borderRadius: 'full',
                  width: '50px',
                  height: '50px',
                  shadow: 'md',
                  border: '1px solid',
                  borderColor: 'border.default',
                })}
              >
                <Icon
                  icon={'healthicons:chart-line-outline'}
                  width="32"
                  height="32"
                  color="#6B7885"
                />
              </div>
              <div>
                <div className={css({ fontSize: 'xl', fontWeight: 'bold' })}>
                  46%
                </div>
                <div
                  className={css({
                    fontSize: 'sm',
                    color: 'gray.12',
                    fontWeight: 'bold',
                  })}
                >
                  Conversion rate
                </div>
              </div>
            </div>
            <Button variant={'ghost'}>
              <Icon icon={'la:ellipsis-v'} width="24" height="24" />
            </Button>
          </div>

          <div
            className={css({
              fontSize: 'sm',

              spaceY: 2,
            })}
          >
            <div
              className={css({
                fontSize: 'sm',
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <span>Conversion rate</span>
              <span>$2,000 (46%)</span>
            </div>
            <Progress value={46} />
          </div>
        </div>
      ))}
    </div>
  );
}
