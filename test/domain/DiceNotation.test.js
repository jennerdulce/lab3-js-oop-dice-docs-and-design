import { describe, it } from 'node:test';
import assert from 'node:assert';
import { DiceNotation } from '../../src/domain/DiceNotation.js';

describe('DiceNotation', () => {
  describe('parse', () => {
    it('should parse simple dice notation', () => {
      const parsed = DiceNotation.parse('3d6');
      assert.strictEqual(parsed.notation, '3d6');
      assert.strictEqual(parsed.components.length, 1);
      assert.deepStrictEqual(parsed.components[0], {
        type: 'dice',
        count: 3,
        sides: 6,
        sign: 1
      });
    });
  });

  it('should parse dice with modifier', () => {
    const parsed = DiceNotation.parse('2d8+3');
    assert.strictEqual(parsed.notation, '2d8+3');
    assert.strictEqual(parsed.components.length, 2);
    assert.deepStrictEqual(parsed.components[0], {
      type: 'dice',
      count: 2,
      sides: 8,
      sign: 1
    });
    assert.deepStrictEqual(parsed.components[1], {
      type: 'modifier',
      value: 3
    });
  });

  it('should parse multiple dice sets', () => {
    const parsed = DiceNotation.parse('1d20+2d6');
    assert.strictEqual(parsed.components.length, 2);
    assert.strictEqual(parsed.components[0].type, 'dice');
    assert.strictEqual(parsed.components[0].count, 1);
    assert.strictEqual(parsed.components[0].sides, 20);
    assert.strictEqual(parsed.components[1].type, 'dice');
    assert.strictEqual(parsed.components[1].count, 2);
    assert.strictEqual(parsed.components[1].sides, 6);
  });

  it('should parse negative modifiers', () => {
    const parsed = DiceNotation.parse('1d20-2');
    assert.strictEqual(parsed.components.length, 2);
    assert.strictEqual(parsed.components[1].value, -2);
  });

  it('should parse notation with spaces', () => {
    const parsed = DiceNotation.parse(' 2d6 + 3 ');
    assert.strictEqual(parsed.notation, '2d6+3');
  });

  it('should parse notation with capital letters', () => {
    const parsed = DiceNotation.parse('2D6');
    assert.strictEqual(parsed.notation, '2d6');
  });

  it('should default to 1 die if count not specified', () => {
    const parsed = DiceNotation.parse('d20');
    assert.strictEqual(parsed.components[0].count, 1);
  });

  it('should throw error for invalid notation', () => {
    assert.throws(() => DiceNotation.parse(''), /Invalid notation/);
    assert.throws(() => DiceNotation.parse(null), /Invalid notation/);
    assert.throws(() => DiceNotation.parse('abc'), /Invalid notation/);
    assert.throws(() => DiceNotation.parse('3x6'), /Invalid notation/);
  });

  it('should throw error for invalid dice counts', () => {
    assert.throws(() => DiceNotation.parse('0d6'), /Invalid dice count/);
  });
  
  it('should throw error for invalid dice sides', () => {
    assert.throws(() => DiceNotation.parse('3d1'), /Invalid dice sides/);
    assert.throws(() => DiceNotation.parse('3d0'), /Invalid dice sides/);
  });
});