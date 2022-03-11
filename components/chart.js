import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart() {

    useLayoutEffect(() => {

    am4core.addLicense("ch-custom-attribution")

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // ... chart code goes here ...
        chart.data = [{
          "date": new Date(2022, 0),
          "value": 0,
          "value2": 10,
          "value3": 699
        }, {
          "date": new Date(2022, 1),
          "value": 100,
          "value2": 100,
          "value3": 841
        }, {
          "date": new Date(2022, 2),
          "value": 200,
          "value2": 1000,
          "value3": 699
        }, {
          "date": new Date(2022, 3),
          "value": 300,
          "value2": 1100,
          "value3": 500
        }, {
          "date": new Date(2022, 4),
          "value": 400,
          "value2": 1200,
          "value3": 369
        }, {
          "date": new Date(2022, 5),
          "value": 500,
          "value2": 1200,
          "value3": 250
        }, {
          "date": new Date(2022, 6),
          "value": 1100,
          "value2": 1200,
          "value3": 600
        }];

        // Create axes
var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
categoryAxis.renderer.grid.template.location = 0;
//categoryAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
function createSeries(field, name) {
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.name = name;
  series.strokeWidth = 3;
  
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.stroke = am4core.color("#fff");
  bullet.circle.strokeWidth = 2;
  
  var segment = series.segments.template;
  segment.interactionsEnabled = true;
  
  var hs = segment.states.create("hover");
  hs.properties.strokeWidth = 10;
  
  return series;
}

var series1 = createSeries("value", "MyIvy #1 Height");
var series1 = createSeries("value2", "MyIvy #2 Height");


chart.legend = new am4charts.Legend();

        return () => {
            chart.dispose();
        };
    }, []); 
    
    return (
      <div className="mt-5">
        <div id="chartdiv" style={{ height: '250px' }}></div>
      </div>
    )
}

export default Chart;