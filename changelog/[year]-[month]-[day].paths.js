
import data from './readLog.js';

const flatData = []
data.forEach(v => v[1].forEach(v2 => flatData.push(v2)))

export default {
    paths: () => {
        return flatData.map((v) => ({
            params: {
                year: v.year,
                month: v.month,
                day: v.day,
            },
            content: v.content.join('\r\n'),
        }))
    }
}

