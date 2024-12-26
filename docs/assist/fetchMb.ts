import type { ShallowReactive } from "vue";
import { withBase } from "vitepress";

let G_mbCache: Db;
const G_mbUrl = withBase("/assist.tsv");

export type Db = Record<string, string>;
export async function fetchMb(p: ShallowReactive<IProgress>) {
  if (G_mbCache) {
    return G_mbCache;
  }
  const database = await fetchJson(p);
  return database;
}

interface IProgress {
  max: number;
  current: number;
}

async function fetchJson(p: ShallowReactive<IProgress>) {
  const f = await fetch(G_mbUrl);
  if (f.ok && f.body) {
    p.max = 2503931;
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
    return Object.fromEntries(parseTsv(result)) as Db;
  }
  throw Error("无法下载码表文件");
}


function parseTsv(str: string) {
  return str.trim().split("\n").map((line) => trimEnd(line).split("\t"));
}

function trimEnd(str: string) {
  return str.replace(/^[\r\t ]+$/g, "");
}