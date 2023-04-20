import json
result = {}
with open('rawDictUnderE.txt', 'r', -1, 'U8') as f:
    while line := f.readline():
        line = line.strip()
        if len(line) == 0:
            continue
        [words, codes] = line.split('\t')
        prefix = codes[:-1]
        prefix2 = codes[:-2]
        last = codes[-1]


        if prefix not in result:
            result[prefix] = ['',{last:[words,]}]
        elif last not in result[prefix][1]:
            result[prefix][1][last] = [words,]
        else:
            result[prefix][1][last].append(words)

# 补齐所有前缀码
for i in result.copy():
    prefix = i[:-1]
    if prefix not in result:
        result[prefix] = ['',{}]


json.dump(result, open('result.json', 'w', -1, 'U8'),
          ensure_ascii=False, sort_keys=True, indent=2)
