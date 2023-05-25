import { readLog } from './readLog'
import { writeFileSync } from 'node:fs'

const flatData = []
const LOG = readLog()
LOG.forEach(v => v[1].forEach(v2 => flatData.push(v2)))

for (const e of flatData) {
    writeFileSync(`${e.year}-${e.month}-${e.day}.md`, `---
aside:false
---
# ${e.year}年${e.month}月${e.day}日 更新内容
<div>
${e.content.join('\n')}
</div>`,
        { encoding: 'utf-8' })
}