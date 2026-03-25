/** 
 * 根据3个手机百度用的码表（单字版、快版、圆满版）制作合并后的码表。
 * 合并后的码表每一行是“编码tab词语”，
 * 如果这个词条在快版里也有，那就在最前面加上*号
 * 如果这个词条在单字版里也有，那就在最前面加上#号
 */

import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"


function readDict(filename) {
    const abstract_filename = resolve(import.meta.dirname, filename)
    let lines = readFileSync(abstract_filename, "utf-8").split("\n")
    lines = lines.map(line => line.replace(/\r$/, ""))
    lines.sort((a, b) => a.localeCompare(b))
    if (lines[0] === "") {
        lines = lines.slice(1)
    }
    return lines
}



const single = readDict("___dict_single.txt")
const singleSet = new Set(single)
const mofast = readDict("___dict_mofast.txt")
const mofastSet = new Set(mofast)
const perfect = readDict("___dict_perfect.txt")

for (let i = 0; i < perfect.length; i++) {
    const line = perfect[i]
    if (singleSet.has(line)) {
        perfect[i] = "#" + line
        continue
    }
    if (mofastSet.has(line)) {
        perfect[i] = "*" + line
    }
}

console.log(perfect.slice(0, 100))


const outputTxtFilename = resolve(import.meta.dirname, "../docs/public/assist.txt")
writeFileSync(outputTxtFilename, perfect.join("\n"), "utf-8")