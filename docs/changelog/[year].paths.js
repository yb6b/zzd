import { LOGS_GROUP_YEAR, LOGS } from "./readLog";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function formatContentInOneYear(logsInOneYear) {
  const recordInDay = logsInOneYear.map(
    (v) => `## ${v.year}年${v.month}月${v.day}日
${formatContent(v.content)}

`
  );

  return `# ${logsInOneYear[0].year}年更新纪录
共有 ${logsInOneYear.length} 次更新
   ${recordInDay.join("\n")}
   `;
}

function formatContent(content) {
  const encodeEachline = (line) =>
    line
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(" ", "&ensp;")
      .replaceAll(">", "&gt;");
  return `<article>
${content.map(encodeEachline).join("<br>\n").trimEnd()}
</article>`;
}

function writeIndexMd() {
  const { year, month, day, content } = LOGS[0];
  const data = `
# 更新历史

哲豆音形保持着高强度的更新频率，加词、调整重码等等。2018 年以前的资料或有缺失。

*****

最近一次更新在 **${year}年${month}月${day}日**：

${formatContent(content)}

`;
  writeFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), "./index.md"),
    data
  );
}

writeIndexMd();

export default {
  paths: () =>
    LOGS_GROUP_YEAR.map((v) => ({
      params: {
        year: v[0].year,
      },
      content: formatContentInOneYear(v),
    })),
};
