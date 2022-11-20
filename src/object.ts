export const mapValues = <K extends string, V1, V2>(
  object: { [key in K]?: V1 },
  callback: (value: V1, key: K, index: number) => V2
) => {
  const oldPairs = Object.entries(object) as [K, V1][];
  const newPairs: [K, V2][] = oldPairs.map(([key, value], index) => [
    key,
    callback(value, key, index),
  ]);
  return Object.fromEntries(newPairs) as { [key in K]: V2 };
};

export const mapKeys = <K1 extends string, K2 extends string, V>(
  object: { [key in K1]?: V },
  callback: (key: K1, value: V, index: number) => K2
) => {
  const oldPairs = Object.entries(object) as [K1, V][];
  const newPairs: [K2, V][] = oldPairs.map(([key, value], index) => [
    callback(key, value, index),
    value,
  ]);
  return Object.fromEntries(newPairs) as { [key in K2]: V };
};

export const forEachEntry = <K extends string, V>(
  object: { [key in K]?: V },
  callback: (value: V, key: K, index: number) => void
) => {
  const pairs = Object.entries(object) as [K, V][];
  pairs.forEach(([key, value], index) => callback(value, key, index));
};

export const keysToObject = <K extends string, V>(
  keys: readonly K[],
  callback: (key: K, index: number) => [K, V] | V
) => {
  const pairs = keys.map((key, index) => {
    const value = callback(key, index);
    if (Array.isArray(value) && value.length === 2) {
      return value;
    }
    return [key, value] as [K, V];
  });
  return Object.fromEntries(pairs) as { [key in K]: V };
};

export const valuesToObject = <V>(
  values: readonly V[],
  callback: (value: V, index: number) => [string, V] | string
) => {
  const pairs = values.map((value, index) => {
    const key = callback(value, index);
    if (Array.isArray(key) && key.length === 2) {
      return key as [string, V];
    }
    return [key, value] as [string, V];
  });
  return Object.fromEntries(pairs) as { [key: string]: V };
};
