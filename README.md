# Charts
JavaScript Charts on HTML Canvas element. Easy in use.

INSTALATION

- add link to the SlideShow.js script in Head element:

  <script type="text/javascript" src="LineChart.js"></script>
  
- create chart element in <body>:
  
    <div id="myChart"></div>
  
- next create series arrays in <script> element:
  
  var chartNO3 = [["07.02.2017", 10], ["14.03.2017", 2], ["20.03.2017", 15], ["03.01.2017", 15], 
    ["07.05.2017", 10], ["02.06.2017", 1], ["04.07.2017", 13], ["14.08.2017", 15], ["05.09.2017", 2]];
  var chartK = [["04.02.2017", 15], ["03.03.2017", 20], ["02.04.2017", 10], ["03.05.2017", 5]];
  
  var series = [chartNO3, chart];
  
- add chart settings object in <script> elemant:
  
  var chartSettings = {
            chartId: "myChart",
            width: 1000,
            caption: "próbny wykres",
            xName: "Date",
            yName: "NO3",
            showXName: true,
            showYName: true,
            showCaption: true,
            series: [{ legend: "NO2", color: "blue" }, { legend: "K", color: "red" }, { legend: "P", color: "green" }]
        };
  
  - then create LineChart object in <script> element:
  
    var chart = new LineChart(series, chartSettings);
    
    
    
    
   Example:
   
<!DOCTYPE html>
<html lang="pl" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Charts</title>
    <script type="text/javascript" src="LineChart.js"></script>
</head>
<body>
    <div id="myChart"></div>

    <script>
        var chartNO3 = [["07.02.2017", 10], ["14.03.2017", 2], ["20.03.2017", 15], ["03.01.2017", 15], ["07.05.2017", 10], ["02.06.2017", 1], ["04.07.2017", 13], ["14.08.2017", 15], ["05.09.2017", 2]];
        var chartK = [["04.02.2017", 15], ["03.03.2017", 20], ["02.04.2017", 10], ["03.05.2017", 5]];
        var chartA = [["04.01.2017", 17], ["06.02.2017", 1], ["02.03.2017", 10], ["01.04.2017", 5], ["01.05.2017", 3], ["05.06.2017", 22], ["01.07.2017", 15], ["03.08.2017", 15], ["07.09.2017", 10], ["02.10.2017", 8], ["02.11.2017", 6], ["02.12.2017", 15], ["01.01.2018", 19]];

        var series = [chartNO3, chartK, chartA];

        var chartSettings = {
            chartId: "myChart",
            width: 1000,
            caption: "próbny wykres",
            xName: "Date",
            yName: "NO3",
            showXName: true,
            showYName: true,
            showCaption: true,
            series: [{ legend: "NO2", color: "blue" }, { legend: "K", color: "red" }, { legend: "P", color: "green" }]
        };

        var chart = new LineChart(series, chartSettings);
    </script>
</body>
</html>
    
  
  
