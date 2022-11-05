import QuickChart from 'quickchart-js'

export const generateChart = ( dataSaved, types ) => {
  const chart = new QuickChart();
  const min = Math.trunc(Math.min(...[...dataSaved.luna.slice(-250), ...dataSaved.institutos.slice(-250)]) * 100) / 100
  const max = Math.max(...[...dataSaved.luna.slice(-250), ...dataSaved.institutos.slice(-250)])

  chart.setWidth(500)
  chart.setHeight(300);

  chart.setConfig({
    type: 'line',
    data: {
      labels: dataSaved.dates.slice(-250),
      datasets: types.map(type => ({
          label: type,
          display: false,
          data: dataSaved[type].slice(-250),
          fill: true,
        }),
      ),

    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
              min,
              max,
            },
          }],
      }
    },
  });


  console.log('graph: ', chart.getUrl())

  return chart.getUrl()
}
