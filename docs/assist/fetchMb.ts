import { withBase } from 'vitepress';
interface DbItem {
    code: string
    duplicated: number
}
export type Db = Map<string, DbItem[]>

let cache: Db;
export async function fetchMb() {
    if (cache) {
        return cache
    }
    const dict: Db = new Map()
    handleEachline(await fetchYong(), (line) => parseEachLine(line, dict))
    dict.delete('')
    cache = dict
    return dict
}

async function fetchYong() {
    const f = await fetch(withBase('/zzdperfect.txt' as string))
    if (f.ok) {
        return await f.text()
    }
    throw Error('无法下载码表文件')
}

export function handleEachline(src: string, handler: (line: string) => void) {
    const search = /\r?\n|\r/g
    let match = search.exec(src)
    let last = 0
    while (match) {
        handler(src.slice(last, match.index).trimEnd())
        last = match.index + match[0].length
        match = search.exec(src)
    }
    handler(src.slice(last))
}

function parseEachLine(line: string, db: Db): void {
    if (line.length === 0) return
    const [code, ...words] = line.split(' ')
    words.forEach((w, i) => {
        w = w.replace('$_', ' ').replace('$$', '$') // 小小的转义
        const codesInDb = db.get(w)
        const item = { code, duplicated: i + 1 }
        if (codesInDb)
            codesInDb.push(item)
        else
            db.set(w, [item,])

    })
}
