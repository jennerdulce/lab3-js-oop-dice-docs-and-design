import { describe, it } from 'node:test';
import assert from 'node:assert';
import { DiceRoller } from '../../src/application/DiceRoller.js';
import { TextRenderer } from '../../src/application/TextRenderer.js';
describe('DiceRoller', () => {
describe('constructor', () => {
it('should require a renderer', () => {
assert.throws(
() => new DiceRoller(),
/Renderer must have a render method/
);
});
it('should require renderer with render method', () => {
assert.throws(
() => new DiceRoller({}),
/Renderer must have a render method/
);
});
it('should accept valid renderer', () => {
const renderer = new TextRenderer();
const roller = new DiceRoller(renderer);
assert(roller instanceof DiceRoller);
});
});

describe('roll', () => {
it('should roll dice and return rendered result', () => {
const renderer = new TextRenderer();
const roller = new DiceRoller(renderer);
const result = roller.roll('3d6');
assert(typeof result === 'string');
assert(result.includes('Total:'));
});
it('should handle invalid notation', () => {
const renderer = new TextRenderer();
const roller = new DiceRoller(renderer);
const result = roller.roll('invalid');
assert(result.startsWith('Error:'));
});
});

describe('rollMultiple', () => {
it('should roll multiple times', () => {
const renderer = new TextRenderer();
const roller = new DiceRoller(renderer);
const result = roller.rollMultiple('1d6', 5);
assert(result.includes('Statistics for 1d6:'));
assert(result.includes('Rolls: 5'));
});
it('should reject invalid roll counts', () => {
const renderer = new TextRenderer();
const roller = new DiceRoller(renderer);
let result = roller.rollMultiple('1d6', 0);
assert(result.includes('Error:'));
result = roller.rollMultiple('1d6', 1001);
assert(result.includes('Error:'));
});
});

});