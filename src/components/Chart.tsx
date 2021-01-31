import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

type Props = {
  data: any[]
}

function Chart({ data }: Props) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { zoomType: 'x' },
        title: { text: 'Measurement Chart' },
        xAxis: { type: 'datetime' },
        yAxis: { title: { text: 'Value' } },
        legend: { enabled: true },
        plotOptions: {
          area: {
            threshold: null,
            lineWidth: 1,
            states: { hover: { lineWidth: 1 } },
            marker: { radius: 2 },
          },
          series: { lineWidth: 1, marker: { enabled: false } },
        },
        series: data,
      }}
    />
  )
}

export default Chart
