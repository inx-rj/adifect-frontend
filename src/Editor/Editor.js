import ExampleTheme from "./theme/theme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import "../assets/css/components/editor.css";
import CommentPlugin from "./plugins/CommentPlugin/CommentPlugin.js";
import { createWebsocketProvider } from "./collaboration";
import { MarkNode } from "@lexical/mark";
import { useSettings } from "./context/SettingsContext";
import LinkPlugin from "./plugins/LinkPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter comment here...</div>;
}

const jsonString = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

export default function Editor({
  isEditable = true,
  initialValue,
  onChange,
  commentCacheStore,
  setCommentCacheStore,
  isCommentOn = true,
  isToolbar = true,
}) {
  const {
    settings: { isCollab },
  } = useSettings();

  const editorConfig = {
    editable: isEditable,
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    editorState: initialValue ? initialValue : jsonString,
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      MarkNode,
    ],
  };

  return (
    <div className="editor">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container  border border-gray-400">
          {isToolbar && <ToolbarPlugin />}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <LexicalClickableLinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            {isCommentOn && (
              <CommentPlugin
                providerFactory={isCollab ? createWebsocketProvider : undefined}
                commentCacheStore={commentCacheStore}
                setCommentCacheStore={setCommentCacheStore}
              />
            )}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
