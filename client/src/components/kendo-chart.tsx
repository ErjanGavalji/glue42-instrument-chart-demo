import React from "react";
import PropTypes from "prop-types";
import {
    StockChart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartNavigator,
    ChartNavigatorSelect,
    ChartNavigatorSeries,
    ChartNavigatorSeriesItem
} from "@progress/kendo-react-charts";
import { IntlService } from '@progress/kendo-react-intl';
import 'hammerjs';
import '@progress/kendo-theme-material/dist/all.css';

const intl = new IntlService('en');

interface KendoChartProps {
  data: Array<any>;
}
const from = new Date('2009/02/05');
const to = new Date('2011/10/07');

class InstrumentChartKendo extends React.Component<KendoChartProps, { seriesData: Array<any>, navigatorData: Array<any> }> {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props: KendoChartProps) {
    super(props);
    console.log(props.data);
    this.state = {
      seriesData: props.data,
      navigatorData: props.data,
    };
  }

  onNavigatorChange = (event: any) => {
    const filters = {
      logic: "and",
      filters: [
        {
          field: "Date",
          operator: "gte",
          value: event.from
        },
        {
          field: "Date",
          operator: "lt",
          value: event.to
        }
      ]
    };

//    this.setState(prevState => ({
//      seriesData: this.state.seriesData.filter(prevState.navigatorData, filters)
//    }));
  };

  render() {
    const { seriesData, navigatorData } = this.state;
    return (
      <StockChart
        onNavigatorFilter={this.onNavigatorChange}
        partialRedraw={true}
      >
        <ChartTitle text="The Boeing Company NYSE:BA" />
        <ChartSeries>
          <ChartSeriesItem
            data={seriesData}
            type="candlestick"
            openField="open"
            closeField="close"
            lowField="low"
            highField="high"
            categoryField="date"
          />
        </ChartSeries>
        <ChartNavigator>
          <ChartNavigatorSelect from={from} to={to} />
          <ChartNavigatorSeries>
            <ChartNavigatorSeriesItem
              data={navigatorData}
              type="area"
              field="close"
              categoryField="date"
            />
          </ChartNavigatorSeries>
        </ChartNavigator>
      </StockChart>


    );
  }
}

export default InstrumentChartKendo;