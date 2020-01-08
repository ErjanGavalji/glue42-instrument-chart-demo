import React from "react";
import PropTypes from "prop-types";
import { Chart, Sparkline, StockChart } from "@progress/kendo-react-charts";
import '@progress/kendo-theme-material/dist/all.css';

class InstrumentChartKendo extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    return <div>Chart will be rendered here</div>;
  }
}

export default InstrumentChartKendo;