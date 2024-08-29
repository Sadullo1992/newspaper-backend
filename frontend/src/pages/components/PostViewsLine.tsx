import { Line } from '@ant-design/plots';

export const PostViewsLine = () => {
  const data = [
    { month: 'Jan. ', visitors: 30 },
    { month: 'Feb. ', visitors: 45 },
    { month: 'Mar. ', visitors: 40 },
    { month: 'Apr. ', visitors: 55 },
    { month: 'May', visitors: 60 },
    { month: 'Jun. ', visitors: 55 },
    { month: 'Jul. ', visitors: 70 },
    { month: 'Aug. ', visitors: 90 },
    { month: 'Sep. ', visitors: 95 },
  ];
  const config = {
    data,
    xField: 'month',
    yField: 'visitors',
    point: {
      shapeField: 'circle',
      sizeField: 2,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 1,
    },
  };

  return <Line {...config} />;
};
