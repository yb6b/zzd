import type { ShallowReactive } from "vue";
import { withBase } from "vitepress";

export interface CodeInfo {
  code: string;
  dupl: number;
  isMofast: boolean;
}
export type InvertedMap = Map<string, CodeInfo[]>;
let MbCache: string[][];
let InvertedMapCache: InvertedMap;
const MbUrl = withBase("/assist.txt");

export async function fetchMb(p: ShallowReactive<IProgress>) {
  if (MbCache) {
    return MbCache;
  }
  const database = await fetchJson(p);
  return database;
}

interface IProgress {
  max: number;
  current: number;
}


/**
 * 发起一个异步请求获取JSON数据，并支持进度监听
 * @param p - 一个ShallowReactive类型的IProgress对象，用于追踪下载进度
 * @returns 返回一个Promise，解析为Db类型的数据
 */
function fetchJson(p: ShallowReactive<IProgress>) {
  return new Promise<string[][]>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // 初始化GET请求，异步方式
    xhr.open("GET", MbUrl, true);
    xhr.responseType = "text";
    xhr.onprogress = (e) => {
      // 检查进度是否可计算
      if (e.lengthComputable) {
        p.max = e.total;
        p.current = e.loaded;
      }
    }
    // 监听请求完成事件
    xhr.onload = () => {
      // 检查响应状态码是否为200
      if (xhr.status === 200) {
        const result = parseTsv(xhr.responseText);
        MbCache = result;
        resolve(result);
      } else {
        // 如果请求失败，拒绝Promise并返回状态文本
        reject(xhr.statusText);
      }
    }
    // 监听请求错误事件
    xhr.onerror = () => {
      reject(xhr.statusText);
    }
    // 发送请求
    xhr.send();
  })
}


function parseTsv(str: string) {
  return str.trim().split("\n").map((line) => trimEnd(line).split("\t"));
}

function trimEnd(str: string) {
  return str.replace(/^[\r\t ]+$/g, "");
}


export function invertMabiao(mb: string[][]) {
  if (InvertedMapCache) {
    return InvertedMapCache;
  }
  const result: InvertedMap = new Map();
  let lastCode = "";
  let lastDupl = 1
  for (let [code, words] of mb) {
    let isMofast = false;
    if (code.startsWith("#") || code.startsWith("*")) {
      isMofast = true;
      code = code.slice(1);
    }
    if (code === lastCode) {
      // 由于码表是按字母顺序排列的，所以重复的码一定是相邻的
      lastDupl++;
    } else {
      lastDupl = 1;
      lastCode = code
    }
    const thisCodeInfo: CodeInfo = {
      code,
      dupl: lastDupl,
      isMofast
    }
    if (!result.has(words)) {
      result.set(words, [thisCodeInfo]);
    } else {
      result.get(words)?.push(thisCodeInfo)
    }
  }
  InvertedMapCache = result;
  return result;
}