import json
result = {}
with open('rawDictUnderE.txt', 'r', -1, 'U8') as f:
    while line := f.readline():
        line = line.strip()
        if len(line) == 0:
            continue
        [words, codes] = line.split('\t')
        prefix = codes[:-1]
        last = codes[-1]

        if prefix not in result:
            result[prefix] = ['',{last:[words,]}]
        elif last not in result[prefix][1]:
            result[prefix][1][last] = [words,]
        else:
            result[prefix][1][last].append(words)

json.dump(result, open('result.json', 'w', -1, 'U8'),
          ensure_ascii=False, sort_keys=True, indent=2)
