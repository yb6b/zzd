import { readLog } from './readLog';

const flatData = []
const LOG = readLog()
LOG.forEach(v => v[1].forEach(v2 => flatData.push(v2)))

export default {
    paths: () => {
        return flatData.map((v) => ({
            params: {
                year: v.year,
                month: v.month,
                day: v.day,
            },
            content: getContent(v),
        }))
    }
}

function getContent(v) {
    return `---
aside: false
---
# ${v.year}年${v.month}月${v.day}日 更新内容

<div>
${v.content.join('\n')}
</div>
`
}