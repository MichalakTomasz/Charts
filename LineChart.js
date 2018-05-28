/*
created by Tomasz Michalak

-----------------------------------------------chart series example---------------------------------------------

var chartNO3 = [["07.02.2017", 10], ["14.03.2017", 2], ["20.03.2017", 15], ["03.01.2017", 15], ["07.05.2017", 10], ["02.06.2017", 1], ["04.07.2017", 13], ["14.08.2017", 15], ["05.09.2017", 2]];
var chartK = [["04.02.2017", 15], ["03.03.2017", 20], ["02.04.2017", 10], ["03.05.2017", 5]];
var chartA = [["04.01.2017", 17], ["06.02.2017", 1], ["02.03.2017", 10], ["01.04.2017", 5], ["01.05.2017", 3], ["05.06.2017", 22], ["01.07.2017", 15], ["03.08.2017", 15], ["07.09.2017", 10], ["02.10.2017", 8], ["02.11.2017", 6], ["02.12.2017", 15], ["01.01.2018", 19]];

var series = [chartNO3, chartK, chartA];

-----------------------------------------------chart settings example-------------------------------------------



var chartSettings = {
        chartId: "myChart",
        width: 1000,
        caption: "chart demo",
        xName: "Date",
        yName: "NO3",
        showXName: true,
        showYName: true,
        showCaption: true,
        series: [{ legend: "NO2", color: "blue" }, { legend: "K", color: "red" }, { legend: "P", color: "green" }]
    };




*/

function LineChart(series, chartSettings) {
    this.series = series;
    this.chartSettings = chartSettings;
    this.chartHandle = document.createElement("canvas");
    document.getElementById(chartSettings.chartId).appendChild(this.chartHandle);
    this.width = this.chartSettings.width;
    this.height = Math.ceil(this.width * 9 / 16);
    this.chartHandle.width = this.width;
    this.chartHandle.height = this.height;
    this.chartContextHandle = this.chartHandle.getContext("2d");
    for (var i = 0; i < this.series.length; i++) this.sortDate(this.series[i]);
    this.drawGridLines();
    this.drawCharts();
    this.chartContextHandle.strokeStyle = "black";
    this.chartContextHandle.lineWidth = 4;
    this.chartContextHandle.strokeRect(this.chartLeftTopX, this.chartLeftTopY, this.chartWidth, this.chartHeight);
}
LineChart.prototype = {
    get chartLeftTopX() {
        return Math.ceil(this.width * .05)
    },
    get chartLeftTopY() {
        return Math.ceil(this.height * .01)
    },
    get chartWidth() {
        if (this.HasLegend) return Math.ceil(this.width * 0.9);
        else return Math.ceil(this.width * 0.9);
    },
    get chartHeight() {
        if (this.HasLegend) return Math.ceil(this.height * 0.8);
        else return Math.ceil(this.height * 0.9);
    },
    get chartZeroAxisX() { return this.chartLeftTopX + this.chartWidth; },
    get chartZeroAxisY() { return this.chartLeftTopY + this.chartHeight; },
    get maxYAxisValue() {
        var _max = this.series[0][0][1];
        for (var i = 0; i < this.series.length; i++)
            for (var j = 0; j < this.series[i].length; j++)
                if (this.series[i][j][1] > _max) _max = this.series[i][j][1];
        return _max;
    },
    get minYAxisValue() {
        var _min = this.series[0][1][1];
        for (var i = 0; i < this.series.length; i++)
            for (var j = 0; j < this.series[i].length; j++)
                if (this.series[i][j][1] < _min) _min = this.series[i][j][1];
        return _min;
    },
    get maxXAxisValue() {
        var _max = this.series[0][0][0];
        for (var i = 0; i < this.series.length; i++)
            for (var j = 0; j < this.series[i].length; j++)
            if (this.compareDate(_max, this.series[i][j][0]) == -1)
                _max = this.series[i][j][0];
        return _max;
    },
    get minXAxisValue() {
        var _min = this.series[0][0][0];
        for (var i = 0; i < this.series.length; i++)
            for (var j = 0; j < this.series[i].length; j++)
                if (this.compareDate(_min, this.series[i][j][0]) == 1)
                    _min = this.series[i][j][0];
        return _min;
    },
    get valuesYAxisPosition() {
        return this.chartZeroAxisY + (_textSize * 1.5);
    },
    get yAxisRange() {
        return this.maxYAxisValue - this.minYAxisValue;
    },
    get xValuePerPixel() {
        return this.dateRange(this.minXAxisValue, this.maxXAxisValue) / (this.chartWidth * 0.99);
    },
    get yValuePerPixel() {
        return this.yAxisRange / (this.chartHeight * 0.94);
    }
};
LineChart.prototype.setStartPoint = function (x, y, color, lineWidth, fillColor) {
    this.chartContextHandle.strokeStyle = color;
    if (fillColor) {
        switch (color) {
            case "blue": this.chartContextHandle.fillStyle = "rgba(66, 134, 244, 0.5)";
                break;
            case "green": this.chartContextHandle.fillStyle = "rgba(137, 244, 66, 0.5)";
                break;
            case "red": this.chartContextHandle.fillStyle = "rgba(232, 37, 23, 0.5)";
                break;
            case "yellow": this.chartContextHandle.fillStyle = "rgba(255, 225, 2, 0.5)";
                break;
            case "grey": this.chartContextHandle.fillStyle = "rgba(60, 158, 144, 0.5)";
                break;
            case "black": this.chartContextHandle.fillStyle = "rgba(0, 0, 0, 0.5)";
                break;
        }
        this.chartContextHandle.fillStyle = fillColor;
    }
    else {
        this.chartContextHandle.fillStyle = "rgba(255, 255, 255, 0)";
    } 
    this.chartContextHandle.lineWidth = lineWidth;
    this.chartContextHandle.beginPath();
    this.chartContextHandle.moveTo(this.getChartXPosition(x), this.getChartYPosition(0));
    this.chartContextHandle.lineTo(this.getChartXPosition(x), this.getChartYPosition(y));
}
LineChart.prototype.setPonit = function (x, y) {
    this.chartContextHandle.lineTo(this.getChartXPosition(x), this.getChartYPosition(y));
}
LineChart.prototype.closeSplain = function (x) {
    this.chartContextHandle.stroke();
    this.chartContextHandle.lineTo(this.getChartXPosition(x), this.getChartYPosition(0));
    this.chartContextHandle.fill();
    this.chartContextHandle.closePath();
}
LineChart.prototype.horisontalLine = function (y) {
    this.setStartPoint(0, y, "black", 1);
    this.setPonit(this.chartWidth, y);
    this.closeSplain(this.chartWidth);
}
LineChart.prototype.verticalLine = function (x) {
    this.setStartPoint(x, 0, "black", 1);
    this.setPonit(x, this.chartHeight);
    this.closeSplain(x);
}
LineChart.prototype.getCanvasXPosition = function (x) {
    return x;
}
LineChart.prototype.getCanvasYPosition = function (y) {
    return this.height - y;
}
LineChart.prototype.getChartXPosition = function (x){
    return this.chartLeftTopX  + x;
}
LineChart.prototype.getChartYPosition = function (y) {
    return this.chartZeroAxisY - y;
}
LineChart.prototype.sortDate = function (chart) {
    var bufor;
    for (var i = 0; i < chart.length; i++) {
        for (var j = i + 1; j < chart.length; j++) {
            if (this.compareDate(chart[i][0], chart[j][0]) == 1){
                bufor = chart[i];
                chart[i] = chart[j];
                chart[j] = bufor;
            }
        }
    }
    return chart;
}
LineChart.prototype.compareDate = function (date1, date2) {
    if (date1.substring(6, 10) < date2.substring(6, 10)) return -1;
    else if (date1.substring(6, 10) > date2.substring(6, 10)) return 1;
    else if (date1.substring(6, 10) == date2.substring(6, 10)) {
        if (date1.substring(3, 5) < date2.substring(3, 5)) return -1;
        else if (date1.substring(3, 5) > date2.substring(3, 5)) return 1;
        else if (date1.substring(3, 5) == date2.substring(3, 5)) {
            if (date1.substring(0, 2) < date2.substring(0, 2)) return -1;
            else if (date1.substring(0, 2) > date2.substring(0, 2)) return 1;
            else if (date1.substring(0, 2) == date2.substring(0, 2)) return 0;
        }
    }
}
LineChart.prototype.isLeapYear = function (year) {
    if (Math.abs(2020 - year) % 4 == 0) return true;
    else return false;
}
LineChart.prototype.daysInYear = function (year) {
    if (this.isLeapYear(year)) return 366;
    else return 365;
}
LineChart.prototype.dayOfYear = function (date) {
    var day = parseInt(date.substring(0, 2));
    var month = parseInt(date.substring(3, 5));
    var year = parseInt(date.substring(6, 10));
    var dayOfYear = day;
    for (var i = 1; i < month; i++) {
        switch (i) {
            case 1: dayOfYear += 31;
                break;
            case 2: if (this.isLeapYear(year)) dayOfYear += 29;
            else dayOfYear += 28;
                break;
            case 3: dayOfYear += 31;
                break;
            case 4: dayOfYear += 30;
                break;
            case 5: dayOfYear += 31;
                break;
            case 6: dayOfYear += 30;
                break;
            case 7: dayOfYear += 31;
                break;
            case 8: dayOfYear += 31;
                break;
            case 9: dayOfYear += 30;
                break;
            case 10: dayOfYear += 31;
                break;
            case 11: dayOfYear += 30;
                break;
            case 12: dayOfYear += 31;
                break;
        }
    }
    return dayOfYear;
}
LineChart.prototype.daysInMonth = function (date) {
    var day = parseInt(date.substring(0, 2));
    var month = parseInt(date.substring(3, 5));
    var year = parseInt(date.substring(6, 10));
    var _days;
    switch (month) {
        case 1: _days = 31;
            break;
        case 2: if (this.isLeapYear(year)) _days = 29;
        else _days = 28;
            break;
        case 3: _days = 31;
            break;
        case 4: _days = 30;
            break;
        case 5: _days = 31;
            break;
        case 6: _days = 30;
            break;
        case 7: _days = 31;
            break;
        case 8: _days = 31;
            break;
        case 9: _days = 30;
            break;
        case 10: _days = 31;
            break;
        case 11: _days = 30;
            break;
        case 12: _days = 31;
            break;
    }
    return _days;
}
LineChart.prototype.dateRange = function(minDate, maxDate) {
    var _minDate = minDate;
    var _maxDate = maxDate;
    var _minDay = parseInt(_minDate.substring(0, 2));
    var _maxDay = parseInt(_maxDate.substring(0, 2));
    var _minMonth = parseInt(_minDate.substring(3, 5));
    var _maxMonth = parseInt(_maxDate.substring(3, 5));
    var _minYear = parseInt(_minDate.substring(6, 10));
    var _maxYear = parseInt(_maxDate.substring(6, 10));
    var _range;
    if (_minYear != _maxYear) {
        _range = (this.daysInYear(_minYear) - this.dayOfYear(_minDate)) + this.dayOfYear(_maxDate);
        var i = _minYear + 1;
        while (i < _maxYear) {
            _range += this.daysInYear(i++);
        }
    }
    else {
        if (_minMonth != _maxMonth) {
            _range = (this.daysInMonth(_minDate) - _minDay) + _maxDay;
            var i = _minMonth + 1;
            while (i < _maxMonth) {
                _range += this.daysInMonth("01." + i++ + "."+ _minYear);
            }
        }
        else {
            _range = _maxDay - _minDay;
        }
    }
    return _range;
}
LineChart.prototype.addToDate = function (date, daysToAdd) {
    var _tempDaysToAdd = daysToAdd;
    var _tempDate = date;
    var _tempYear = parseInt(date.substring(6, 10));
    if (this.daysInYear(_tempDate) <= this.dayOfYear(_tempDate) + _tempDaysToAdd) {
        _tempDaysToAdd -= (this.daysInYear(_tempDate) - this.dayOfYear(_tempDate));
        _tempYear++;
    }
    else return this.dateFromNumber(_tempDaysToAdd + this.dayOfYear(_tempDate), _tempYear);
    while (_tempDaysToAdd > this.daysInYear("01.01." + _tempYear)) {
        _tempDaysToAdd -= this.daysInYear("01.01." + _tempYear);
        _tempYear++;
    }
    return this.dateFromNumber(_tempDaysToAdd, _tempYear);
}
LineChart.prototype.dateFromNumber = function (number, year) {
    var _tempNumber = number;
    var _month = 1;
    var _tempDays = 0;
    while (_tempNumber > this.daysInMonth("01." + this.monthToString(_month) + "." + year)) {
        _tempDays = this.daysInMonth("01." + this.monthToString(_month) + "." + year)
        if (_tempDays < _tempNumber) {
            _tempNumber -= _tempDays;
            _month++;
        }
    }
    return this.dayToString(_tempNumber) + "." + this.monthToString(_month) + "." + year;
}
LineChart.prototype.monthToString = function (month) {
    if (month.toString().length == 1) return "0" + month.toString();
    else return month.toString();
}
LineChart.prototype.dayToString = function (day) {
    return this.monthToString(day);
}
LineChart.prototype.dateValueToXCoordinates = function (date) {
    var _day = this.dateRange(this.minXAxisValue, date);
    return Math.round(_day / this.xValuePerPixel);
}
LineChart.prototype.valueToYCoordinates = function (value) {
    return Math.round(value / this.yValuePerPixel);
}
LineChart.prototype.drawGridLines = function () {
    var _intervalY = Math.round(this.yAxisRange / 10);
    var _textSize = Math.ceil(this.height * 0.025);
    this.chartContextHandle.font = _textSize + "px sans-serif";
    var _maxY = this.maxYAxisValue;
    for (var i = _intervalY; i <= _maxY; i += _intervalY) {
        this.horisontalLine(this.valueToYCoordinates(i));
        this.chartContextHandle.fillStyle = "black";
        this.chartContextHandle.textAlign = "right";
        this.chartContextHandle.fillText(i, Math.ceil(this.chartWidth * 0.05), this.getChartYPosition(this.valueToYCoordinates(i)));
    }
    var _minDate = this.minXAxisValue;
    var _dateRange = this.dateRange(_minDate, this.maxXAxisValue);
    var _intervalX = Math.ceil(_dateRange / 15);
    for (var i = 0; i <= _dateRange; i += _intervalX) {
        var _dateValue = this.addToDate(_minDate, i);
        var _datePoint = this.dateValueToXCoordinates(_dateValue);
        this.verticalLine(_datePoint);
        this.chartContextHandle.fillStyle = "black";
        this.chartContextHandle.textAlign = "center";
        var _textSize = Math.ceil(this.height * 0.018);
        this.chartContextHandle.font = _textSize + "px sans-serif";
        this.chartContextHandle.fillText(_dateValue, this.getChartXPosition(_datePoint), this.getChartYPosition(0 - _textSize * 1.5));
    }
    if (this.chartSettings.showXName) this.drawXName();
    if (this.chartSettings.showYName) this.drawYName();
    
}
LineChart.prototype.drawCharts = function () {
    for (var i = 0; i < this.series.length; i++) {
        this.setStartPoint(this.dateValueToXCoordinates(this.series[i][0][0]),
                this.valueToYCoordinates(this.series[i][0][1]), this.chartSettings.series[i].color, 2, true);
        for (var j = 0; j < this.series[i].length; j++) {
            this.setPonit(this.dateValueToXCoordinates(this.series[i][j][0]),
                this.valueToYCoordinates(this.series[i][j][1]));
        }
        this.closeSplain(this.dateValueToXCoordinates(this.series[i][this.series[i].length - 1][0]));
    }
}
LineChart.prototype.drawXName = function () {
    this.chartContextHandle.fillStyle = "black";
    this.chartContextHandle.textAlign = "left";
    var _textSize = Math.ceil(this.height * 0.02);
    this.chartContextHandle.font = _textSize + "px sans-serif";
    this.chartContextHandle.fillText(chartSettings.xName, this.getCanvasXPosition(Math.ceil(this.width / 2)), this.getChartYPosition(0 - (_textSize * 2.5)));
}
LineChart.prototype.drawYName = function () {
    this.chartContextHandle.fillStyle = "black";
    this.chartContextHandle.textAlign = "left";
    var _textSize = Math.ceil(this.height * 0.02);
    this.chartContextHandle.font = _textSize + "px sans-serif";
    this.chartContextHandle.fillText(chartSettings.yName, 0, Math.ceil(this.height / 2));
}



getSerieFromDataSource = function (dataSource, xAxisValue, yAxisValue) {
    var serie = [];
    for (var i = 0; i < dataSource.length; i++) {
        serie.push([dataSource[i][xAxisValue], dataSource[i][yAxisValue]]);
    }
    return serie;
}
