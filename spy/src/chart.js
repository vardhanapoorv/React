 
     
    function getChartSize(el) {
        let width = .9*parseInt(el.style('width'));
        let height = .7*parseInt(width*7/9);

        return  [width,height];
    }

    class AxisX extends React.Component {
      render() {
         
        var data = this.props.data;
        var margin = this.props.margin;
        var height = this.props.height - margin.top - margin.bottom;
        var width = this.props.width  - margin.left - margin.right;

        var x = d3.time.scale()
          .range([0, width]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        x.domain(d3.extent(data, function(d) { return d.date; }));

        d3.select(".x").attr("transform", "translate(0," + height + ")").call(xAxis)
          .append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .attr("x", 6)
            .attr("dx", ".71em")
            .style("text-anchor", "middle")
            .text("Date");
         return(
              <g className="x axis"></g>
            );    
        }
    };

    class AxisY extends React.Component {
        render() {
          var data = this.props.data;
          var margin = this.props.margin;
          var height = this.props.height - margin.top - margin.bottom;
          var width = this.props.width  - margin.left - margin.right;

          var y = d3.scale.linear()
            .range([height, 0]);

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          y.domain([0,d3.max(data, function(d) { return d.close; })]);

          d3.select(".y").call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price ($)");

            return(
              <g className ="y axis"></g>
            );
        }
    };

    class Line extends React.Component{
        render() {
          var data = this.props.data;
          var margin = this.props.margin;
          var height = this.props.height - margin.top - margin.bottom;
          var width = this.props.width  - margin.left - margin.right;

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

          data.forEach(function(d) {
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0,d3.max(data, function(d) { return d.close; })]);
          });

          var newline = line(data);
          console.log(newline);

          return(
            <path className="line" d={newline}></path>
          );
        }
    };

    class Chart extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
          chartWidth: 0,
          chartHeight: 0,
          x: NaN,
          y: NaN,
          data: [],
          margin: {}};
          
        } 
      componentDidMount() {
        const container = d3.select("#graphic");

        const margin = {top: 20, right: 20, bottom: 30, left: 50};

        
        let chartWidth = getChartSize(container)[0];
        let chartHeight = getChartSize(container)[1];

        const _this = this;

        let formatDate = d3.time.format("%Y-%m-%d");

        function type(d) {
          d.date = formatDate.parse(d.date);
          d.close = +d.close;
          return d;
        }

        d3.tsv("stk.tsv", type, function(error, data) {
          if (error) throw error;

          _this.setState({
            chartWidth: chartWidth,
            chartHeight: chartHeight,
            data: data,
            margin: margin
          });
        });
      }
      render() {
          var width = this.state.chartWidth;
          var height = this.state.chartHeight;
          var margin = this.state.margin;
          var data = this.state.data;
          return(
              <div id="chart">
                <svg height={height} width={width} >
                  <g transform="translate(50,20)">
                    <AxisX width={width} height={height} margin={margin} data={data}/>
                    <AxisY width={width} height={height} margin={margin} data={data}/>
                    <Line width={width} height={height} margin={margin} data={data}/>
                  </g>
                </svg>
              </div>
            
          );
      }
    };

      ReactDOM.render(
        <Chart />,
        document.getElementById('graphic')
      );
    