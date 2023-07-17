import { $getRoot } from "lexical";

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
export default function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    console.log(root);
  });
}
