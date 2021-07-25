import { Selector } from 'testcafe';

const dataSet = require('./sample_data.json');
const fs = require('fs');

fixture `Data-Driven Tests`
    .after( async t => {
        fs.writeFileSync('./sample_data.json', JSON.stringify(dataSet,null, 2));
    });

dataSet.forEach(data => {
    if(!data.passed){
        test(`Testing for '${data.url}'`, async t => {
                await t
                    .navigateTo(data.url)
                    .expect(Selector('title').textContent).eql(data.expected_title);
                data.passed=true;
        });
    }
});