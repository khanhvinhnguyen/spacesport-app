export class Validate {
  static stringifyCircular(obj: any) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    }, 2);
  }

  static millisecondsToTime(duration: number | string) {
    const milliseconds = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  
    let timeString = '';

    // Format hours if greater than zero
    if (hours > 0) {
        timeString += `${hours}:`;
    }

    // Format minutes if greater than zero or if hours exist
    if (minutes > 0 || hours > 0) {
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        timeString += `${paddedMinutes}:`;
    }

    // Always format seconds
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timeString += `${paddedSeconds}`;

    return timeString;
  }
}