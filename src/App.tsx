// import React, { Component } from 'react';
// import './App.scss';

// function getRandomName(): string {
//   const value = Date.now().toString().slice(-4);

//   return `Clock-${value}`;
// }

// interface ClockProps {
//   name: string;
// }

// interface ClockState {
//   time: string;
// }

// class Clock extends Component<ClockProps, ClockState> {
//   state: ClockState = {
//     time: new Date().toUTCString().slice(-12, -4),
//   };

//   private timerId?: number;

//   componentDidMount() {
//     this.timerId = window.setInterval(() => {
//       const newTime = new Date().toUTCString().slice(-12, -4);

//       // eslint-disable-next-line no-console
//       console.log(newTime);
//       this.setState({ time: newTime });
//     }, 1000);
//   }

//   componentDidUpdate(prevProps: ClockProps) {
//     if (prevProps.name !== this.props.name) {
//       // eslint-disable-next-line no-console
//       console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
//     }
//   }

//   componentWillUnmount() {
//     if (this.timerId) {
//       window.clearInterval(this.timerId);
//     }
//   }

//   render() {
//     return (
//       <div className="Clock">
//         <strong className="Clock__name">{this.props.name}</strong>
//         {' time is '}
//         <span className="Clock__time">{this.state.time}</span>
//       </div>
//     );
//   }
// }

// interface AppState {
//   hasClock: boolean;
//   clockName: string;
// }

// export class App extends Component<{}, AppState> {
//   state: AppState = {
//     hasClock: true,
//     clockName: 'Clock-0',
//   };

//   private nameUpdateTimerId?: number;

//   componentDidMount() {
//     this.nameUpdateTimerId = window.setInterval(() => {
//       const newClockName = getRandomName();

//       this.setState({
//         clockName: newClockName,
//       });
//     }, 3300);

//     document.addEventListener('click', this.handleShowClock);
//     document.addEventListener('contextmenu', this.handleHideClock);
//   }

//   componentWillUnmount() {
//     if (this.nameUpdateTimerId) {
//       window.clearInterval(this.nameUpdateTimerId);
//     }

//     document.removeEventListener('click', this.handleShowClock);
//     document.removeEventListener('contextmenu', this.handleHideClock);
//   }

//   handleShowClock = () => {
//     this.setState({ hasClock: true });
//   };

//   handleHideClock = (event: MouseEvent) => {
//     event.preventDefault();
//     this.setState({ hasClock: false });
//   };

//   render() {
//     const { hasClock, clockName } = this.state;

//     return (
//       <div className="App">
//         <h1>React Clock</h1>
//         {hasClock && <Clock name={clockName} />}
//       </div>
//     );
//   }
// }

import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface ClockProps {
  name: string;
}

const Clock: React.FC<ClockProps> = ({ name }) => {
  const [time, setTime] = useState(new Date().toUTCString().slice(-12, -4));
  const [prevName, setPrevName] = useState(name);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newTime = new Date().toUTCString().slice(-12, -4);

      // eslint-disable-next-line no-console
      console.log(newTime);
      setTime(newTime);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (prevName !== name) {
      // eslint-disable-next-line no-console
      console.warn(`Clock renamed from ${prevName} to ${name}`);
      setPrevName(name);
    }
  }, [name, prevName]);

  return (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong>
      {' time is '}
      <span className="Clock__time">{time}</span>
    </div>
  );
};

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  useEffect(() => {
    const nameUpdateTimerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    const handleShowClock = () => setHasClock(true);
    const handleHideClock = (event: MouseEvent) => {
      event.preventDefault();
      setHasClock(false);
    };

    document.addEventListener('click', handleShowClock);
    document.addEventListener('contextmenu', handleHideClock);

    return () => {
      window.clearInterval(nameUpdateTimerId);
      document.removeEventListener('click', handleShowClock);
      document.removeEventListener('contextmenu', handleHideClock);
    };
  }, []);

  return (
    <div className="App">
      <h1>React Clock</h1>
      {hasClock && <Clock name={clockName} />}
    </div>
  );
};
