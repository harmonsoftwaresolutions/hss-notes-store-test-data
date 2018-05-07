const AWS = require('aws-sdk');
const fs = require('fs');

const createNote = require('./src/create-note');

// Get AWS assumeRole to access sandbox account
require('./src/assume-role-from-cli.js');
AWS.config.update({region: 'us-west-2'});

function inputParams(table, obj) {
  const params = {
    TableName: table,
    Item: {
      ID: { S: obj.ID },
      Author: { S: obj.Author },
      Title: { S: obj.Title },
      Text: { S: obj.Text }
    }
  };
  return params;
}

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
function putNote(params) {
  return new Promise((resolve, reject) => {
    if (!params) return reject('Invalid Params');

    ddb.putItem(params, (err, data) => {
      if (err) return reject(err);

      // empty data without error is a success
      resolve(data);
    });
  });
}

function populateNotes(cnt = 0) {
    if (cnt >= 100) {
      throw new Error('Create record count must be less than 100');
    }

    for (let i = 0; i < cnt; i += 1) {
      const note = createNote();
      const table = 'Note';
      const params = inputParams(table, note);
      if (params) {
        putNote(params)
          .then(res => {
            console.log('success', res);
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    }

}
populateNotes(1);
