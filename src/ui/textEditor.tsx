import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ text }: { text: string }) => {
  console.log("form the", text);
  let dynamicContent = "<div>";
  const sections = text.split("\n\n");
  sections.map((section, index) => {
    const paragraphs = section.split("\n");
    dynamicContent = `${dynamicContent} ${
      paragraphs[0].length < 30
        ? `<h4 >${paragraphs[0]}</h4>`
        : `<p >${paragraphs[0]}</p>`
    }   <ul>`;
    paragraphs.slice(1).map((paragraph, i) => {
      dynamicContent = `${dynamicContent} <li>${paragraph}</li>`;
    });
    dynamicContent += "</ul></div>";
  });
  //   auto type

  return (
    <div>
      <Editor
        apiKey="5ck4fbg67tr2aopfaf7zp04pl5d1z2xfvv15qu0uunww5ss5"
        initialValue={dynamicContent}
      />
    </div>
  );
};

export default TextEditor;
