import { Chart, DoughnutController } from 'chart.js'


type DoughnutChartBackgroundPluginOptions = {
  enabled: boolean
  color: string
}

Chart.register({
  id: 'doughnutBackground',
  beforeDatasetsDraw: (chart: Chart, args, options: DoughnutChartBackgroundPluginOptions) => {
    const { ctx, width, height } = chart

    const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller as DoughnutController
    const { outerRadius } = chart.getDatasetMeta(0).controller as DoughnutController
    const radiusLength = outerRadius - innerRadius

    if (options['enabled']) {
      const x = width / 2,
        y = height / 2

      ctx.beginPath()
      ctx.arc(x, y, outerRadius - radiusLength / 2, 0, 2 * Math.PI)
      ctx.lineWidth = radiusLength
      ctx.strokeStyle = options['color']
      ctx.stroke()
    }
  }
});

// export const doughnutBackgroundPlugin = {
//     id: 'doughnutBackground',
//     beforeDatasetsDraw: (chart: Chart, args:any, options: DoughnutChartBackgroundPluginOptions) => {
//     const { ctx, width, height } = chart
//     const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller as DoughnutController
//     const { outerRadius } = chart.getDatasetMeta(0).controller as DoughnutController
//     const radiusLength = outerRadius - innerRadius

//     if (options['enabled']) {
//       const x = width / 2,
//         y = height / 2

//       ctx.beginPath()
//       ctx.arc(x, y, outerRadius - radiusLength / 2, 0, 2 * Math.PI)
//       ctx.lineWidth = radiusLength
//       ctx.strokeStyle = options['color'] || 'transparent'
//       ctx.stroke()
//     }
//   }
//   };



export const drawCirclePlugin = {
  id: 'drawCirclePlugin',
  beforeDatasetsDraw: (chart:any, args:any, options:any) => {
    var ctx = chart.ctx;
    const radius = 45;
    var x = chart.canvas.clientWidth / 2;
    var y = chart.canvas.clientHeight / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 43.875, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = options.backgroundColor || '#ddd';
    ctx.stroke();
  }
}
