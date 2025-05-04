import { XMLParser } from 'fast-xml-parser';
import { FeedXmlDocument, feedXmlDocumentShape, productsDataShape } from './model';

export const parseFeedFile = async (fileUrl: string, clientId: string) => {
    const textFile = await fetch(fileUrl);
    const parser = new XMLParser({ removeNSPrefix: true, trimValues: true });
    const jsonObj = parser.parse(await textFile.text()) as FeedXmlDocument;

    console.log('data', jsonObj);

    const validationResult = feedXmlDocumentShape.safeParse(jsonObj);
    if (!validationResult.success) {
        console.error('Document is not well formed.')
        return;
    }

    const productValidationResult = productsDataShape.safeParse(jsonObj.rss.channel.item);

    console.log('productValidationResult', productValidationResult);
}