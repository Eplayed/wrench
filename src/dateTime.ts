/**
 * 它需要一个时间戳并返回一个格式化的日期或时间字符串
 * @param val - 要格式化的值
 * @param [date=time] - 要格式化的日期。
 * @returns 一个字符串
 */
const formatDateOrTime = (val, date = "time") => {
  if (!val || val == "--" || val == 0) return val;
  const time = new Date(val * 1);
  const Y = time.getFullYear();
  const M = (time.getMonth() + 1).toString().padStart(2, "0");
  const D = time.getDate().toString().padStart(2, "0");
  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");
  if (date === "time") {
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  }
  if (date === "date") {
    return `${Y}-${M}-${D}`;
  }
};

/**
 * 它需要一个时间戳并返回一个格式化的日期字符串。
 * @param time - 要格式化的时间，可以是时间戳、日期对象或字符串。
 * @param cFormat - 要返回的时间格式。
 * @returns 正在返回 time_str。
 */
const parseTime = (time, cFormat) => {
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
};

/**
 * 它接受一个时间戳并返回一个字符串，该字符串表示时间戳与当前时间之间的时间差
 * @param time - 要格式化的时间，可以是时间戳或日期对象。
 * @param option - 时间的格式，如：yyyy-MM-dd hh:mm:ss
 * @returns 返回 时间字符串。
 */
const formatTimeToString = (time, option) => {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d: any = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
};
export { formatDateOrTime, formatTimeToString };
