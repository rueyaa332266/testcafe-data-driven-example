import { Selector } from 'testcafe';

const dataSet = require('./sample_data.json');

fixture `Data-Driven Tests`

dataSet.forEach(data => {
    test(`Testing for '${data.url}'`, async t => {
            await t
                .navigateTo(data.url)
                .expect(Selector('title').textContent).eql(data.expected_title);
    });
});