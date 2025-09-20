import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Die } from '../../src/domain/Die.js';

describe('Die', () => {
  describe('constructor', () => {
    it('should create a die with default 6 sides', () => {
      const die = new Die();
      assert.strictEqual(die.getSides(), 6)
    });

    it('should create a die with a specified number of sides', () => {
      const die = new Die(20);
      assert.strictEqual(die.getSides(), 20)
    });

    it('should throw error for less than 2 sides', () => {
      assert.throws(() => new Die(1));
      assert.throws(() => new Die(0))
      assert.throws(() => new Die(-1))
    });

  })
})