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
    <article className={`prose prose-lg mx-auto ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml={false}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
