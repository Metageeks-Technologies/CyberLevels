import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ text }: { text: string }) => {
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
  const [editorContent, setEditorContent] = useState(dynamicContent);

  const handleEditorChange = (content: string, editor: any) => {
    setEditorContent(content);
    console.log(content);
  };

  return (
    <div>
      <Editor
        onEditorChange={handleEditorChange}
        apiKey="5ck4fbg67tr2aopfaf7zp04pl5d1z2xfvv15qu0uunww5ss5"
        initialValue={dynamicContent} // Use the initial value prop to set the initial content
      />
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h2>Preview:</h2>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            minHeight: "100px",
          }}
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
