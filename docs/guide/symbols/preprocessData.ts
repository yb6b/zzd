import { handleEachline } from '../../assist/fetchMb';
import {writeFileSync,readFileSync} from 'node:fs';

interface EachWord {
    content: string
    detail?: string
    fly?: boolean
}
interface Words {
    title: string
    description: string
    words: EachWord[]
    isLongest: boolean
}

interface SymbolData {
    [code:string]:Words
}
export const Alphabet = 'abcdefghijklmnopqrstuvwxyz'

export function parseRawTsv(src: string): SymbolData {
    const result: SymbolData = {}
    handleEachline(src, (line) => {
        const s = line.trimEnd()
        if (s.length === 0) return;

        // 分割列
        const a = s.split('\t')
        const code = a[0]
        const title = a[1] ?? ''
        const description = a[2] ?? ''
        const words = a.slice(3).map(parseWords)
        result[code]={
            title,
            description,
            words,
            isLongest: true
        }

        // 判断是不是最长的编码
        const prefix = code.slice(0, -1)
        if (prefix.length === 0) return
        const t = result[prefix]
        if (t)
            t.isLongest = false
    })
    // 补全空白的标题
    for (const c in result) {
        fixTitle(result, c)
    }
    return result
}

function parseWords(raw: string): EachWord {
    const i = raw.indexOf('##')
    if (i === -1) return { content: raw }
    return {
        content: raw.slice(0, i),
        detail: raw.slice(i + 2)
    }
}


function fixTitle(src: SymbolData, code: string) {
    const t = src[code]
    if (!t) return
    if (t.title || t.isLongest) return

    const collector: string[] = []
    for (const c of Alphabet) {
        const l = src[code + c]
        if(!l) continue
        const l2 = l.words?.[0]?.content
        if (l2) collector.push(l2)
    }

    let result = [...new Set(collector)]
    const rl = result.length;
    if (rl > 4) {
        const base = Math.floor(rl / 3);
        result = result.filter((_, i) => i % base === 1);
    }

    t.title = result.join(' ')
}

const a= readFileSync('./symbolsData.txt',{encoding:'utf-8'})
const b = parseRawTsv(a)

writeFileSync('./ESymbols.json',JSON.stringify(b),{encoding:'utf-8'})