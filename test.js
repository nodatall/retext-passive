'use strict';

var test = require('tape');
var retext = require('retext');
var passive = require('./');

test('passive', function (t) {
  t.plan(2);

  retext()
    .use(passive)
    .process([
      'He was withheld while we were being fed.',
      'Fed.',
      'The fed.'
    ].join('\n'), function (err, file) {
      t.ifError(err, 'should not fail');

      t.deepEqual(
        file.messages.map(String),
        [
          '1:8-1:16: Don’t use the passive voice',
          '1:37-1:40: Don’t use the passive voice'
        ]
      );
    });
});
