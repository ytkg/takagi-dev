import { describe, it, expect } from 'vitest'
import { parseJsonl } from './bookmarks'

describe('parseJsonl', () => {
  it('parses JSONL and normalizes tags', () => {
    const raw = [
      { url: 'https://a.example', title: 'A', tags: ['x', ' y ', ''] },
      { url: 'https://b.example', title: 'B', tags: [] },
      { url: 'https://c.example', title: 'C' },
      // invalid entry: missing title
      { url: 'https://invalid.example', tags: ['z'] },
    ]
      .map((o) => JSON.stringify(o))
      .join('\n')
      .concat('\nnot json')

    const list = parseJsonl(raw)
    expect(list.map((b) => b.title)).toEqual(['A', 'B', 'C'])
    expect(list[0].tags).toEqual(['x', 'y'])
    expect(list[1].tags).toEqual(['other'])
    expect(list[2].tags).toEqual(['other'])
  })
})

