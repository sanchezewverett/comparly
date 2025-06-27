type CategoryNode = {
  id: number;
  name: string;
  nested: CategoryNode[];
};

export function parseGoogleCategories(content: string): CategoryNode[] {
  type InternalNode = {
    id: number;
    name: string;
    children: Map<string, InternalNode>;
  };

  const createNode = (id: number, name: string): InternalNode => ({
    id,
    name,
    children: new Map(),
  });

  const toCategoryNode = (node: InternalNode): CategoryNode => ({
    id: node.id,
    name: node.name,
    nested: Array.from(node.children.values()).map(toCategoryNode),
  });

  const root = new Map<string, InternalNode>();
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (!line.includes(' - ')) continue;

    const [idPart, pathPart] = line.split(' - ');
    const id = parseInt(idPart.trim(), 10);
    if (isNaN(id)) continue;

    const names = pathPart
      .trim()
      .split('>')
      .map((s) => s.trim());

    let currentLevel = root;
    let currentNode: InternalNode | undefined;

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      if (!currentLevel.has(name)) {
        currentLevel.set(name, createNode(id, name));
      }

      currentNode = currentLevel.get(name)!;

      if (i === names.length - 1) {
        currentNode.id = id;
      }

      currentLevel = currentNode.children;
    }
  }

  return Array.from(root.values()).map(toCategoryNode);
}

export const readFromUrlAndParse = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();

  const parsedCategories = parseGoogleCategories(text);

  console.log(parsedCategories);
};
