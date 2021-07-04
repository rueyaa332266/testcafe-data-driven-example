import { Selector } from 'testcafe';

const fs = require('fs');
const dataSet = require('./data.json');

fixture `Data-Driven Tests`
    .page `https://devexpress.github.io/testcafe/example/`
    .after( async t => {
        fs.writeFileSync('./data.json', JSON.stringify(dataSet,null, 2));
    });

dataSet.forEach(data => {
    test(`Enter '${data.name}'`, async t => {
        if(!data.passed){
            await t
                .typeText('#developer-name', data.name)
                .click('#tried-test-cafe')
                .typeText('#comments', data.comment)
                .click('#submit-button')
                .expect(Selector('#article-header').textContent).eql(data.resultText);
            data.passed=true;
        } else {
            console.log(`Case '${data.name}' already passed`);
        }
    });
});