import { Pie, PieConfig } from '@ant-design/plots';

export const PostsStatisticsPie = () => {

    const config: PieConfig = {
      data: [
        { type: 'Jamiyat', posts: 27 },
        { type: 'Adabiyot', posts: 25 },
        { type: 'Turizm va sport', posts: 18 },
        { type: 'Iqtisodiyot', posts: 15 },
        { type: 'Tanqid va tahlil', posts: 10 },
        { type: 'Huquq', posts: 5 },
      ],
      angleField: 'posts',
      colorField: 'type',
      innerRadius: 0.6,
      label: {
        text: 'posts',
        // position: 'outside',
        style: {
          fontWeight: 'bold',
        },
      },
      legend: {
        color: {
          title: true,
          position: 'right',
          rowPadding: 5,
        },
      },
      annotations: [
        {
          type: 'text',
          style: {
            text: 'Total posts: 56',
            x: '50%',
            y: '50%',
            textAlign: 'center',
            fontSize: 16,
          },
        },
      ],
    };

    return <Pie{...config}/>
}