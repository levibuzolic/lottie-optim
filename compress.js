// @flow

const traverse = require('traverse');

const REMOVE = ['nm', 'mn', 'ix', 'np', 'cix'];
const REMOVE_K = ['o', 'r', 's'];

function compress(input) {
  let nodesDeleted = 0;

  if (typeof input === 'string') input = JSON.parse(input);

  const inputBytes = JSON.stringify(input).length;

  const outputObject = traverse(example).forEach(function (node) {
    if (this.key === 'hd' && node === false) {
      nodesDeleted++;
      return this.delete();
    }

    if (REMOVE.includes(this.key)) {
      nodesDeleted++;
      return this.delete();
    }

    if (this.parent != null && this.parent.key === 'k' && REMOVE_K.includes(this.key)) {
      nodesDeleted++;
      return this.delete();
    }
  });

  const output = JSON.stringify(outputObject);
  const outputBytes = output.length;

  return {output, inputBytes, outputBytes, nodesDeleted};
}
