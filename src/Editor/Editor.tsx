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
// import "../assets/css/components/editor/editor.css";
import CommentPlugin from "./plugins/CommentPlugin/CommentPlugin";
import { createWebsocketProvider } from "./collaboration";
import { MarkNode } from "@lexical/mark";
import { useSettings } from "./context/SettingsContext";
import LinkPlugin from "./plugins/LinkPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import ImagesPlugin from "./plugins/imagesPlugin";
import { ImageNode } from "./nodes/ImageNode";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { KeywordNode } from "./nodes/KeywordNode";
import { HashtagNode } from "@lexical/hashtag";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import { MentionNode } from "./nodes/MentionNode";
import MentionsPlugin from "./plugins/MentionsPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { EmojiNode } from "./nodes/EmojiNode";
import EmojisPlugin from "./plugins/EmojisPlugin";

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
    settings: { isCollab, showTreeView },
  } = useSettings();

  const editorConfig = {
    namespace: "aa",
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
      ImageNode,
      KeywordNode,
      HashtagNode,
      MentionNode,
      EmojiNode,
    ],
  };

  return (
    <div className={`editor ${showTreeView && "tree-view"}`}>
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
            <ImagesPlugin captionsEnabled={false} />
            <HashtagPlugin />
            <KeywordsPlugin />
            <MentionsPlugin />
            <EmojisPlugin />
            {showTreeView && <TreeViewPlugin />}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
