import React, { Component } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface ClockProps {
  name: string;
}

interface ClockState {
  time: string;
}

class Clock extends Component<ClockProps, ClockState> {
  private timerId?: number;

  constructor(props: ClockProps) {
    super(props);

    this.state = {
      time: new Date().toUTCString().slice(-12, -4),
    };
  }

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      const newTime = new Date().toUTCString().slice(-12, -4);

      // eslint-disable-next-line no-console
      console.log(newTime);

      this.setState({ time: newTime });
    }, 1000);
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.time}</span>
      </div>
    );
  }
}

interface AppState {
  hasClock: boolean;
  clockName: string;
}

export class App extends Component<{}, AppState> {
  private nameUpdateTimerId?: number;

  constructor(props: {}) {
    super(props);

    this.state = {
      hasClock: true,
      clockName: 'Clock-0',
    };
  }

  componentDidMount() {
    this.nameUpdateTimerId = window.setInterval(() => {
      const newClockName = getRandomName();

      this.setState(prevState => ({
        clockName: newClockName,
      }));
    }, 3300);

    document.addEventListener('click', this.handleShowClock);
    document.addEventListener('contextmenu', this.handleHideClock);
  }

  componentWillUnmount() {
    if (this.nameUpdateTimerId) {
      window.clearInterval(this.nameUpdateTimerId);
    }

    document.removeEventListener('click', this.handleShowClock);
    document.removeEventListener('contextmenu', this.handleHideClock);
  }

  handleShowClock = () => {
    this.setState({ hasClock: true });
  };

  handleHideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React Clock</h1>
        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
