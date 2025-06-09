import { handler } from "../src/product-parser/handler";

(async () => {
  const result = await handler();
  console.log(result);
})();
