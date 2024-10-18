import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import esprima from "esprima";
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
    checkForErrors();
  }, [code]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    syncScroll();
  };

  const syncScroll = () => {
    const textarea = textareaRef.current;
    const pre = preRef.current;
    if (textarea && pre) {
      pre.scrollTop = textarea.scrollTop;
      pre.scrollLeft = textarea.scrollLeft;
    }
  };

  
  const checkForErrors = () => {
    try {
      esprima.parseScript(code); 
      setError(""); 
    } catch (e) {
      setError(e.message); 
    }
  };

  return (
    <div style={containerStyles}>
      <pre ref={preRef} style={preStyles}>
        <code className="language-javascript">{code}</code>
      </pre>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        onScroll={syncScroll}
        style={textareaStyles}
        placeholder="Write your code here..."
      />
      {error && <div style={errorStyles}>{error}</div>} 
    </div>
  );
};

const containerStyles = {
  position: "relative",
  width: "100%",
  height: "400px",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#282C34",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const preStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 0,
  padding: "1rem",
  width: "100%",
  height: "100%",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  backgroundColor: "#282C34",
  color: "#ffffff",
  pointerEvents: "none",
  zIndex: 0,
  overflow: "auto",
};

const textareaStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: "1rem",
  background: "transparent",
  color: "rgba(255, 255, 255, 0.05)",
  caretColor: "#ffffff",
  zIndex: 1,
  border: "none",
  outline: "none",
  resize: "none",
  fontSize: "16px",
  fontFamily: "monospace",
  lineHeight: "1.5",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  opacity: 1,
};

const errorStyles = {
  color: "#FF6B6B",
  marginTop: "8px",
  fontSize: "14px",
  fontFamily: "monospace",
};

export default CodeEditor;
