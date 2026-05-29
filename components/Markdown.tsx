/**
 * Minimal, dependency-free Markdown renderer for lesson bodies.
 * Supports: ## / ### headings, **bold**, `code`, - bullet lists,
 * 1. ordered lists, and paragraphs. Lesson content is trusted (authored in
 * this repo), so we don't need a sanitizer.
 */
import React from "react";

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on **bold** and `code` while keeping delimiters.
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={`${keyBase}-b-${i}`}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(<code key={`${keyBase}-c-${i}`}>{part.slice(1, -1)}</code>);
    } else {
      nodes.push(<React.Fragment key={`${keyBase}-t-${i}`}>{part}</React.Fragment>);
    }
  });
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\\\$/g, "$").split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  const flushList = () => {
    if (!listType || listBuffer.length === 0) return;
    const items = listBuffer.map((item, i) => (
      <li key={`li-${key}-${i}`}>{renderInline(item, `li-${key}-${i}`)}</li>
    ));
    blocks.push(
      listType === "ul" ? (
        <ul key={`list-${key++}`}>{items}</ul>
      ) : (
        <ol key={`list-${key++}`}>{items}</ol>
      ),
    );
    listBuffer = [];
    listType = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(<h3 key={`h3-${key++}`}>{renderInline(line.slice(4), `h3-${key}`)}</h3>);
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(<h2 key={`h2-${key++}`}>{renderInline(line.slice(3), `h2-${key}`)}</h2>);
    } else if (/^[-*]\s+/.test(line)) {
      if (listType === "ol") flushList();
      listType = "ul";
      listBuffer.push(line.replace(/^[-*]\s+/, ""));
    } else if (/^\d+\.\s+/.test(line)) {
      if (listType === "ul") flushList();
      listType = "ol";
      listBuffer.push(line.replace(/^\d+\.\s+/, ""));
    } else {
      flushList();
      blocks.push(<p key={`p-${key++}`}>{renderInline(line, `p-${key}`)}</p>);
    }
  }
  flushList();

  return <div className="prose-aif">{blocks}</div>;
}
