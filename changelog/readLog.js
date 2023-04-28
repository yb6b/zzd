import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let logData = readFileSync(resolve(__dirname, './log.txt'), { encoding: 'utf-8' })


export const readLog = () => {
    const titlePattern = /^(\d{4})年0*(\d{1,2})月0*(\d{1,2})日更新$/
    let r = []

    for (let line of logData.split('\n')) {
        line = line.trimEnd()
        if (line.length === 0) continue
        const match = titlePattern.exec(line)

        if (match) { // 是标题行
            const t = {
                year: match[1],
                month: formatNumber(match[2]),
                day: formatNumber(match[3]),
                content: [],
            }
            if (r.at(-1)?.[0] === match[1]) { // 相同的年份
                r.at(-1)[1].push(t)
            } else {
                r.push([match[1], [t,]])
            }
        } else {
            r.at(-1)[1].at(-1).content.push(handleEachline(line))
        }
    }

    return r
};

export const latestUpdate = () => {
    const titlePattern = /(\d{4})年0*(\d{1,2})月0*(\d{1,2})日更新/
    const match = titlePattern.exec(logData)
    if (match) {
        return {
            year: match[1],
            month: formatNumber(match[2]),
            day: formatNumber(match[3]),
        }
    }
    throw new Error('找不到最新的版本')
};


function handleEachline(line) {
    return line.replaceAll('<', '&lt;')
}

function formatNumber(n) {
    return n.length < 2 ? '0' + n : n
}