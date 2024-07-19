export const getSeconds = (hms: string) => {
    const [hours, minutes, seconds] = hms.split(":");
    const totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
    return totalSeconds;
  };
  