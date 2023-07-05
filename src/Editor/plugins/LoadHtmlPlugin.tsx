import { $generateNodesFromDOM, } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

export default function LoadHtmlPlugin({ initialValue }) {
    const [editor] = useLexicalComposerContext();
    editor.update(() => {
      let nodes = [];
      const html = initialValue;
      // Parse html
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      nodes = $generateNodesFromDOM(editor, dom);
      // Set content
      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });
  
    return null;
  }