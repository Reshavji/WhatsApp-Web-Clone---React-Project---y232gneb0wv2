import moment from 'moment';

export const timeFromNow = (timestamp) => {
  const now = moment(); // Get the current time
  const sentTime = moment(timestamp?.toDate()); // Convert the timestamp to a moment object

  const timeDifferenceInSeconds = now.diff(sentTime, 'seconds');

  if (timeDifferenceInSeconds < 1) {
    return 'just now';
  } else if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} ${timeDifferenceInSeconds === 1 ? 'second' : 'seconds'} ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return sentTime.fromNow();
  }
};
