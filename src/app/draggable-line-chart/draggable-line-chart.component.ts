import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { DataPoints } from 'src/core/utils';


@Component({
  selector: 'app-draggable-line-chart',
  templateUrl: './draggable-line-chart.component.html',
  styleUrls: ['./draggable-line-chart.component.scss']
})
export class DraggableLineChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chartOption = {
    animationEnabled: true,
		theme: "light2",
    title: {
      text: 'Draggable Multiple Line Chart'
    },
    	axisX:{
      title: "Time",
			valueFormatString: "hh:mm:ss",
			crosshair: {
				enabled: true
			}
		},
		axisY: {
			title: "Intensity",
			crosshair: {
				enabled: true
			}
		},
    data: DataPoints
  };
  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const chartContainer = this.chartContainer.nativeElement;
  
    const chart = new CanvasJS.Chart(chartContainer, this.chartOption);

    chart.render();

    let selectedDataPoint: any = null;

    chartContainer.addEventListener('mousedown', (event: any) => {
      const rect = chartContainer.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const dataPoints = chart.options.data;
      for (let i = 0; i < dataPoints.length; i++) {
        const dataPointSet = dataPoints[i].dataPoints;
        for (let j = 0; j < dataPointSet.length; j++) {
          const dataPoint = dataPointSet[j];
          const x = chart.axisX[0].convertValueToPixel(dataPoint.x);
          const y = chart.axisY[0].convertValueToPixel(dataPoint.y);

          const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
          if (distance <= 10) {
            selectedDataPoint = { datasetIndex: i, dataIndex: j };
            break;
          }
        }
      }
    });

    chartContainer.addEventListener('mousemove', (event: any) => {
      if (selectedDataPoint !== null) {
        const rect = chartContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const dataPoint = chart.options.data[selectedDataPoint.datasetIndex].dataPoints[selectedDataPoint.dataIndex];
        const xValue = chart.axisX[0].convertPixelToValue(mouseX);
        const yValue = chart.axisY[0].convertPixelToValue(mouseY);

        dataPoint.x = xValue;
        dataPoint.y = yValue;

        chart.render();
      }
    });

    chartContainer.addEventListener('mouseup', () => {
      selectedDataPoint = null;
    });
  }
}