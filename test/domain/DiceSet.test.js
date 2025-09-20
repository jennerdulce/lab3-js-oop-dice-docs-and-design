import { describe, it } from 'node:test';
import assert from 'node:assert';
import { DiceSet } from '../../src/domain/DiceSet.js';

describe('DiceSet', () => {
  describe('constructor', () => {
    it('should create a set with default 1 die of 6 sides', () => {
      const set = new DiceSet();
      assert.strictEqual(set.getCount(), 1);
      assert.strictEqual(set.getSides(), 6);
    });
    it('should create a set with specified count and sides', () => {
      const set = new DiceSet(3, 20);
      assert.strictEqual(set.getCount(), 3);
      assert.strictEqual(set.getSides(), 20);
    });
      it('should throw error for count less than 1', () => {
      assert.throws(() => new DiceSet(0), /DiceSet must contain at least 1 die/);
      assert.throws(() => new DiceSet(-1), /DiceSet must contain at least 1 die/);
    });
  });
});