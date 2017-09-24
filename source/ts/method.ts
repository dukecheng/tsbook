interface Document {
  createElement(tagName: "dev"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: string): HTMLElement;
}

//var name = 'Duke';
var surname = 'Cheng';
var html = htmlEscape`<h1>${name} ${surname}</h1>`;
//tag(literals: string[], ...values: any[]): string;

function htmlEscape(literals, ...placeholders) {
  let result = "";
  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i]
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  result += literals[literals.length - 1];
  return result;
}
