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
      const newName = getRandomName();

      setClockName(prevName => {
        if (prevName !== newName) {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${prevName} to ${newName}`);
        }

        return newName;
      });
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
