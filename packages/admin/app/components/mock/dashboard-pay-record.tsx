import { css } from 'styled-system/css';
import useRenderMode from '~/hooks/use-render-mode';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Icon } from '@iconify/react';
import { Progress } from '../ui/progress';
export default function DashboardPayRecord() {
  const data1 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      name: 'Dec/2021',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Dec/2022',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Dec/2023',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Dec/2024',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: {
          lg: '2fr 1fr',
        },
        gap: 4,
        p: 4,
      })}
    >
      {/* Pay record */}
      <div
        className={css({
          width: '100%',
          borderRadius: 'lg',
          boxShadow: 'md',
          border: '1px solid',
          borderColor: 'border.default',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            p: 4,
            width: '100%',
            bg: 'bg.default',
            justifyContent: 'space-between',
          })}
        >
          <Heading as="h2">Pay Record</Heading>
          <div>
            <Button variant={'ghost'}>
              <Icon icon={'fe:elipsis-v'} width="20" height="20" />
            </Button>
          </div>
        </div>
        <hr />
        {/* Chart section */}
        <div
          className={css({
            height: '300px',
          })}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={data2}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" allowReorder="yes" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Area
                type="monotone"
                dataKey="amt"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Bar dataKey="uv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              <Scatter dataKey="cnt" fill="red" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* Cards */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: {
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
            p: 4,
          })}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={css({
                p: 4,
                borderStyle: 'dotted',
                borderWidth: '1px',
                borderColor: 'border.default',
                borderRadius: 'md',
              })}
            >
              <Text as="small">Revenue</Text>
              <Heading as="h2">$1,200.00</Heading>
              <Progress value={60} />
            </div>
          ))}
        </div>
      </div>
      {/* Sales */}
      <div
        className={css({
          shadow: 'sm',
          // border: '.4px gray solid',
          // borderRadius: 'lg',
        })}
      >
        {/* Sales 1 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            bg: '#3454D1',
            borderTopLeftRadius: 'lg',
            borderTopRightRadius: 'lg',
            boxShadow: 'md',
            color: 'var(--light-color)',
            gap: 3,
            border: '1px solid',
            borderColor: 'border.default',
          })}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              p: '25px',
            })}
          >
            <div>
              <h3
                className={css({
                  fontSize: 'xl',
                  fontWeight: 'bold',
                })}
              >
                $1,200.00
              </h3>
              <p>
                <span className={css({})}>Total Earnings</span>
              </p>
            </div>
            <div>
              <Badge
                variant={'solid'}
                className={css({
                  p: 2,
                  color: 'var(--primary-color)',
                  bg: 'var(--light-color)',
                })}
              >
                12%
              </Badge>
            </div>
          </div>
          <ResponsiveContainer
            width="100%"
            height={100}
            className={css({
              // bg: '#5A76E3',
            })}
          >
            <LineChart width={300} height={100} data={data1}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#93A9FF"
                strokeWidth={2}
                className={css({
                  stroke: 'var(--primary-color)',
                  strokeWidth: 2,
                })}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Projects */}
        <div>
          <div
            className={css({
              p: 4,
            })}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 4,
                  borderBottom: '1px solid',
                  borderColor: 'border.default',

                  '&:last-child': {
                    border: 'none',
                  },
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: 4,
                  })}
                >
                  <div
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'md',
                      width: '50px',
                      height: '50px',
                      shadow: 'md',
                      border: '1px solid',
                      borderColor: 'border.default',
                    })}
                  >
                    <Icon
                      icon={'devicon:figma'}
                      width="32"
                      height="32"
                      color="#6B7885"
                      className={css({})}
                    />
                  </div>
                  <div>
                    <Heading as="h2">Figma Dashboard Design</Heading>
                    <Text as="small">Development</Text>
                  </div>
                </div>
                <div>
                  <Heading as="h2">$1,200.00</Heading>
                  <Text as="small">3 projects</Text>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div
            className={css({
              borderColor: 'border.default',
              p: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Button
              variant={'ghost'}
              className={css({
                textAlign: 'left',
                p: 4,
              })}
            >
              Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
