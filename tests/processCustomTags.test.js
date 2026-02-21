const test = require('node:test');
const assert = require('node:assert');
const { processCustomTags } = require('../js/utils.js');

test('should replace [youtube:ID] with iframe', () => {
    const input = 'Check out this video: [youtube:dQw4w9WgXcQ]';
    const output = processCustomTags(input);
    assert.ok(output.includes('https://www.youtube.com/embed/dQw4w9WgXcQ'), 'Should contain the correct embed URL');
    assert.ok(output.includes('<div class="youtube-video-container">'), 'Should contain the container div');
});

test('should replace multiple [youtube:ID] tags', () => {
    const input = '[youtube:vid1] and [youtube:vid2]';
    const output = processCustomTags(input);
    assert.ok(output.includes('https://www.youtube.com/embed/vid1'));
    assert.ok(output.includes('https://www.youtube.com/embed/vid2'));
    const containerCount = (output.match(/youtube-video-container/g) || []).length;
    assert.strictEqual(containerCount, 2, 'Should have 2 containers for 2 tags');
});

test('should handle IDs with special characters', () => {
    const input = '[youtube:abc-123_XYZ]';
    const output = processCustomTags(input);
    assert.ok(output.includes('https://www.youtube.com/embed/abc-123_XYZ'));
});

test('should return original string if no tags present', () => {
    const input = 'Just some text';
    const output = processCustomTags(input);
    assert.strictEqual(output, 'Just some text');
});

test('should handle empty ID', () => {
    const input = '[youtube:]';
    const output = processCustomTags(input);
    assert.ok(output.includes('https://www.youtube.com/embed/'));
});

test('should be case sensitive for the tag name', () => {
    const input = '[YOUTUBE:dQw4w9WgXcQ]';
    const output = processCustomTags(input);
    assert.strictEqual(output, '[YOUTUBE:dQw4w9WgXcQ]', 'Should not replace uppercase YOUTUBE');
});

test('should handle tags with spaces in ID', () => {
    const input = '[youtube:videoId with space]';
    const output = processCustomTags(input);
    assert.ok(output.includes('https://www.youtube.com/embed/videoId with space'));
});
