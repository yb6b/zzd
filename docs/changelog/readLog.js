import logSrc from "../public/log.txt?raw";

/**
 * @typedef {{
 *   year: string;
 *   month: string;
 *   day: string;
 *   date: Date;
 *   content: string[];
 * }} EachLog
 */

const titlePattern = /^(\d{4})年0*(\d{1,2})月0*(\d{1,2})日更新$/;

/**
 * 读取更新日志文件
 */
function readLog() {
  /** @type {EachLog[]} */
  let result = [];
  for (const line of generateEachLine(logSrc)) {
    if (!result.length) {
      beforeFirstDateTitle(line);
      continue;
    }
    handleLines(line);
  }
  return result;

  function beforeFirstDateTitle(line) {
    if (!line.trim()) return; // empty lines
    const m = titlePattern.exec(line);
    if (!m) return; // not DateTitle lines
    result.push(createLogFromReMatch(m));
  }

  function handleLines(line) {
    const m = titlePattern.exec(line);
    if (m) {
      // date title line
      result.push(createLogFromReMatch(m));
    } else {
      // content lines
      const lastIndex = result.length - 1;
      result[lastIndex].content.push(line);
    }
  }
}

/** 生成器，读取字符串的每一行
 * @param {string} src
 */
function* generateEachLine(src) {
  const linePattern = /\r?\n|\r/g;
  let match = linePattern.exec(src);
  let last = 0;
  while (match) {
    yield src.slice(last, match.index);
    last = match.index + match[0].length;
    match = linePattern.exec(src);
  }
  yield src.slice(last);
}

/**
 * @param {RegExpExecArray} m
 * @return {EachLog}
 */
function createLogFromReMatch(m) {
  const formatNumber = (n) => (n.length < 2 ? `0${n}` : n);
  const year = m[1];
  const month = formatNumber(m[2]);
  const day = formatNumber(m[3]);
  const date = new Date(`${year}-${month}-${day}`);
  return { year, month, day, date, content: [] };
}

/**
 * @param {EachLog[]} logs
 *
 */
function groupByYear(logs) {
  const result = new Map();
  for (const i of logs) {
    const c = result.get(i.year);
    if (c) {
      c.push(i);
    } else {
      result.set(i.year, [i]);
    }
  }
  return [...result.values()];
}

export const LOGS = readLog();

export const LOGS_GROUP_YEAR = groupByYear(LOGS);
