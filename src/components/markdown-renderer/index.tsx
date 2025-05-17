import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className="markdown-body max-w-3xl mx-auto">
      <article className={`prose prose-lg mx-auto ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml={false}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
