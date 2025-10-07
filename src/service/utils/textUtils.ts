export const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) {
    return text;
  }
  return text;
};

export const filterByName = (items: any[], query: string): any[] => {
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

