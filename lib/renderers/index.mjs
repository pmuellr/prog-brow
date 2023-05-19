import { config as configMarkdown, render as renderMarkdown } from './markdown.mjs';
import { config as configPrism,    render as renderPrism    } from './prism.mjs';

export const BuiltInRenderers = [
  { config: configMarkdown, render: renderMarkdown },
  { config: configPrism,    render: renderPrism },
]