import {
  forEachEntry,
  keysToObject,
  mapKeys,
  mapValues,
  valuesToObject,
} from "./object.js";

test.each([
  [{}, () => null, {}],
  [{ a: 1 }, (value: number) => value * 2, { a: 2 }],
  [{ a: 1, b: 2 }, (value: number) => value * 2, { a: 2, b: 4 }],
  [
    { a: 1, b: 2 },
    (value: number, key: string) => `${key}-${value}`,
    { a: "a-1", b: "b-2" },
  ],
  [{ a: 1, b: 2 }, (_a: number, _b: string, index: number) => index, { a: 0, b: 1 }],
])(
  "mapValues returns correct result (object = %s, callback = %s, expected = %s)",
  (object, callback, expected) => {
    expect(mapValues(object, callback as any)).toEqual(expected);
  }
);

test.each([
  [{}, () => null, {}],
  [{ a: 1 }, (key: string) => `${key}${key}`, { aa: 1 }],
  [
    { a: 1, b: 2 },
    (key: string, value: number, index: number) => `${key}-${value}-${index}`,
    { "a-1-0": 1, "b-2-1": 2 },
  ],
])(
  "mapKeys returns correct result (object = %s, callback = %s, expected = %s)",
  (object, callback, expected) => {
    expect(mapKeys(object, callback as any)).toEqual(expected);
  }
);

describe("forEachEntry works correctly", () => {
  test("on empty object", () => {
    const mockCallback = jest.fn();
    forEachEntry({}, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test("on object with one entry", () => {
    const mockCallback = jest.fn();
    forEachEntry({ a: 1 }, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0]).toEqual([1, "a", 0]);
  });

  test("on object with many entries", () => {
    const mockCallback = jest.fn();
    forEachEntry({ a: 1, b: "asd", c: null }, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(3);

    expect(mockCallback.mock.calls[0]).toEqual([1, "a", 0]);
    expect(mockCallback.mock.calls[1]).toEqual(["asd", "b", 1]);
    expect(mockCallback.mock.calls[2]).toEqual([null, "c", 2]);
  });
});

test.each([
  [[], () => null, {}],
  [["a"], () => null, { a: null }],
  [["a", "b"], (key: string) => `${key}${key}`, { a: "aa", b: "bb" }],
  [["a", "b"], (key: string, index: number) => `${key}${index}`, { a: "a0", b: "b1" }],
  [
    ["a", "b"],
    (key: string, index: number) => [index, `${key}${index}`],
    { 0: "a0", 1: "b1" },
  ],
])(
  "keysToObject returns correct result (keys = %s, callback = %s, expected = %s)",
  (keys, callback, expected) => {
    expect(keysToObject(keys, callback as any)).toEqual(expected);
  }
);

test.each([
  [[], () => null, {}],
  [[1], (value: number) => `${value}`, { 1: 1 }],
  [[1], (value: number) => [`${value}`, value * 2], { 1: 2 }],
  [
    [1, "asd"],
    (value: number, index: number) => [`${value}-${index}`, value],
    { "1-0": 1, "asd-1": "asd" },
  ],
])(
  "valuesToObject returns correct result (values = %s, callback = %s, expected = %s)",
  (values, callback, expected) => {
    expect(valuesToObject(values, callback as any)).toEqual(expected);
  }
);
