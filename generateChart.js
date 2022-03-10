import QuickChart from 'quickchart-js'

export const generateChart = ( dataSaved, types ) => {
  const chart = new QuickChart();

  chart.setWidth(500)
  chart.setHeight(300);

  chart.setConfig({
    type: 'line',
    data: {
      labels: dataSaved.dates,
      datasets: types.map(type => (
        {
          label: type,
          display: false,
          steppedLine: true,
          data: dataSaved[type],
          borderColor: 'rgb(255, 99, 132)',
          fill: true,
        },
      )),
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [
            {
              ticks: {
                min: Math.trunc(Math.min(...dataSaved[type]) * 100) / 100,
                max: Math.max(...dataSaved[type]),
                callback: (val) => {
                  return val.toLocaleString() + '€';
                },
              },
            },
        ],
    }
    },
  });

  return chart.getUrl()
}
