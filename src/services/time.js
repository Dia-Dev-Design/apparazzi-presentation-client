import { DateTime } from "luxon";

export const returnReadableTime = (time) => {
  return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_FULL);
};

export const returnReadableTimeShort = (time) => {
  return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_SHORT);
};

export const returnRelativeTime = (time) => {
  return DateTime.fromISO(time).toRelative({
    base: DateTime.now(),
    string: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"],
  });
};

export const returnMapTime = () => {
  let offset = new Date().getTimezoneOffset() / 60;
  let useableOffset;
  switch (true) {
    case offset < 10 && offset >= 0:
      useableOffset = `-0${offset}:00`;
      break;
    case offset >= 10:
      useableOffset = `-${offset}`;
      break;
    case offset < 0 && offset > -10:
      useableOffset = `+$0${offset}`;
      break;
    case offset < 0 && offset >= -10:
      useableOffset = `+$${offset}`;
  }

  let now = `${DateTime.fromISO(DateTime.now()).toFormat("yyyy-MM-dd'T'hh:mm:ss")}${useableOffset}`;

  return DateTime.fromISO(now).toFormat("yyyy':'MM':'dd hh:mm:ss");
};
