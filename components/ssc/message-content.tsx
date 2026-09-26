"use client";

import Link from "next/link";

type Props = {
  content: string;
};

export default function MessageContent({
  content,
}: Props) {
  const parts = content.split(
    /(https?:\/\/[^\s]+|[\w.-]+@[\w.-]+\.\w+)/g
  );

  return (
    <>
      {parts.map((part, index) => {
        if (
          part.startsWith("http://") ||
          part.startsWith("https://")
        ) {
          return (
            <Link
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#147DE1] underline break-all"
            >
              {part}
            </Link>
          );
        }

        if (
          /^[\w.-]+@[\w.-]+\.\w+$/.test(part)
        ) {
          return (
            <a
              key={index}
              href={`mailto:${part}`}
              className="text-[#147DE1] underline break-all"
            >
              {part}
            </a>
          );
        }

        return (
          <span key={index}>
            {part}
          </span>
        );
      })}
    </>
  );
}