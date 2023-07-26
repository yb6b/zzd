import type { ShallowReactive } from "vue";
interface DbItem {
  code: string;
}
export type Db = Map<string, DbItem[]>;

let cache: Db;
export async function fetchMb(p: ShallowReactive<IProgress>) {
  if (cache) {
    return cache;
  }
  const dict: Db = new Map();
  handleEachline(await fetchYong(p), (line) => parseEachLine(line, dict));
  dict.delete("");
  cache = dict;
  return dict;
}

interface IProgress {
  max: number;
  current: number;
}

async function fetchYong(p: ShallowReactive<IProgress>) {
  const f = await fetch("/zzd/zzdperfect.txt");
  if (f.ok) {
    const contentLength = Number(f.headers.get("Content-Length"));
    p.max = contentLength;
    let received = 0;
    p.current = received;
    let chunks: Uint8Array[] = [];
    const reader = f.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      p.current = received;
    }
    let chunksAll = new Uint8Array(received);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
    let result = new TextDecoder("utf-8").decode(chunksAll);
    return result;
  }
  throw Error("无法下载码表文件");
}

export function handleEachline(src: string, handler: (line: string) => void) {
  const search = /\r?\n|\r/g;
  let match = search.exec(src);
  let last = 0;
  while (match) {
    handler(src.slice(last, match.index).trimEnd());
    last = match.index + match[0].length;
    match = search.exec(src);
  }
  handler(src.slice(last));
}

function parseEachLine(line: string, db: Db): void {
  if (line.length === 0) return;
  const [code, ...words] = line.split(" ");
  words.forEach((w, i) => {
    w = w.replace("$_", " ").replace("$$", "$"); // 小小的转义
    const codesInDb = db.get(w);
    const item = { code, duplicated: i + 1 };
    if (codesInDb) codesInDb.push(item);
    else db.set(w, [item]);
  });
}
