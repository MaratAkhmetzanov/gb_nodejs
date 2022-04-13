import moment from 'moment';
import EventEmitter from 'events';

//Timers list
const requestTimers = [
  {
    name: 'Timer 1',
    payload: '16-04-13-04-2022'
  },
  {
    name: 'Timer 2',
    payload: '16-05-13-04-2022'
  },
  {
    name: 'Timer 2',
    payload: '16-06-13-04-2022'
  }
];

/**
 * Returns the duration in seconds until a specified date or 0
 * @param {String} timerDateTime datetime format hh-mm-DD-MM-YYYY
 * @returns {Integer} duration in seconds
 */
const getTimerDuration = (timerDateTime) => {
  const endTime = moment(timerDateTime, 'hh-mm-DD-MM-YYYY');
  const now = moment();
  if (endTime > now) {
    return Math.floor(moment.duration(moment(timerDateTime, 'hh-mm-DD-MM-YYYY').diff(moment())).as('seconds'));
  }
  else return 0;
}

/**
 * Recurcive function, generate event "timer" every second
 * @param {String} name timers names
 * @param {Integer} timeLeft time left in seconds
 */
const runTimer = (name, timeLeft) => {
  if (timeLeft > 0) {
    emitter.emit('timer', name, timeLeft);
    setTimeout(() => {
      runTimer(name, --timeLeft);
    }, 1000);
  }
  else console.log(`${name}: Time is up`);
}

const emitter = new EventEmitter();

//Subscribe to the event 'timer'
emitter.on('timer', (name, timeLeft) => {
  console.log(`${name}: `, timeLeft);
}
);

//Subscribe to the event 'error'
emitter.on('error', () => console.log('Error'));


//Start all timers in requestTimers array
requestTimers.forEach(el => {
  runTimer(el.name, getTimerDuration(el.payload));
});