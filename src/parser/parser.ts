import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import { feedXmlDataShape } from './model';

const parseFeedFile = async (fileUrl: string, clientId: string) => {
    // const response = await fetch(fileUrl)
    // const textFile = await response.text();
    const textFile = fs.readFileSync(fileUrl, 'utf8')
    const parser = new XMLParser();
    const jsonObj = parser.parse(textFile);

    console.log('data', JSON.stringify(jsonObj, null, 2));

    const validationResult = feedXmlDataShape.safeParse(jsonObj);
    console.log('validationResult', validationResult);
}

(async () => {
    console.log('start')
    await parseFeedFile('merchantExample.txt', 'fakeId')
    console.log('end')
})()