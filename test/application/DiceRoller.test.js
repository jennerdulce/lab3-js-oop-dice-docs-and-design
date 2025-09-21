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