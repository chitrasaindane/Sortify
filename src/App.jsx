// # App Component #

import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import VisualizerController from './Components/Controller/Visualizer.jsx';
// # Importing Visualizer Controller
import SortingVisualizer from './Components/Visualizer/Sorting.jsx'
// # Importing Sorting Visualizer
import './App.css';  // # Importing App CSS

// # App Component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      default: {
        sortingAlgorithm: 'Bubble Sort',
        size: '15',
        speed: 'Normal',
        barColor: 'Black',
        pointerColor: 'Pink',
        sortedColor: 'Green',
        sort: false,
        randomize: true
      },
      sorted: false
    };
  }
  controllerDataHandler = (e) => {
    this.setState(
      {
        default: {
          sortingAlgorithm: e['sortingAlgorithm'],
          size: e['size'],
          speed: e['speed'],
          barColor: e['barColor'],
          pointerColor: e['pointerColor'],
          sortedColor: e['sortedColor'],
          sort: e['sort'],
          randomize: e['randomize']
        },
        sorted: false
      },
      function () {
        if (e['sort'] === true) {
          var element = document.getElementById('sortingVisualizer');
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    );
  }
  visualizerDataHandler = (e) => {
    this.setState({ sorted: e });
  }
  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row><Col><p style={{ color: 'white' }}></p></Col></Row>
          <Row xl={2} lg={2} md={2} sm={1} xs={1}>
            <Col xl={4} lg={4} md={4}>
              {/* # Visualizer Controller */}
              <VisualizerController controllerDataHandler={this.controllerDataHandler} visualizerData={this.state.sorted}>{this.state.sorted}
              </VisualizerController>
              {/* # Author Name */}
              <h6 className='mt-3' style={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'cursive',
                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
                letterSpacing: '1px',
                background: 'linear-gradient(90deg, #d35400, #c0392b, #8e44ad, #2c3e50)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                🕸️ Author: Chitra Saindane 🕸️
              </h6>

            </Col>
            {/* # Sorting Visualizer */}
            <Col id='sortingVisualizer'>
              <SortingVisualizer visualizerDataHandler={this.visualizerDataHandler} controllerData={this.state.default}>
              </SortingVisualizer>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// # Exporting App Component
export default App;