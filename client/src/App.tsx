import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'tick42-bootstrap/dist/t42bootstrap.bundle.css';
import Config, { SymbolMap } from './config';
import { DisplayEntry, DefaultDisplayEntry } from './lib/displayEntry';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InstrumentChart from './components/demo-chart';

class App extends Component<{}, {title: string, security: string, data: any, midPrice: number}> {

  constructor(props: any) {
    super(props);
    this.state = { title: this.getTitlePerRic(Config.SymbolsMap[Config.DefaultSymbol]), security: Config.DefaultSymbol, data: [], midPrice: 0};
  }

  getTitlePerRic(ric:SymbolMap | null) {
    return 'Instrument Chart';
  }

  componentDidMount() {
    const historicDataUrl = `${Config.DataUrlBase}${Config.SymbolsMap[Config.DefaultSymbol].yf}`;
    fetch(historicDataUrl).then((result) => {
      return result.json();
    }).then((data) => {
			const mdata = data.records.map((entry:any) => {
				const {date, ...rest} = entry;
				const dateAsObj = new Date(parseInt(`${date}000`));
				return {date: dateAsObj, ...rest};
			})
			this.setState({data: mdata});
    })
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light justify-content-center mb-4">
          <img src={logo} height="50" className="d-inline-block align-top mr-3" alt="Instrument Chart Logo" />
          <span className="display-1">{this.state.title}</span>
        </nav>
          <Container className="instrument-chart-container">
            <Row>
              <Col>
                { (this.state.data && this.state.data.length > 0) ? <InstrumentChart type="hybrid" data={this.state.data} midPrice={this.state.midPrice} symbol={this.state.security.ric} /> : "Loading..." }
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default App; 
