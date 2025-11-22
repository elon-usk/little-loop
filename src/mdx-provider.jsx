import React from "react";
import { MDXProvider } from "@mdx-js/react";
import CustomCTA from "./components/CustomCTA.jsx";

const components = {
  h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold mt-8 mb-3" {...props} />,
  p:  (props) => <p className="mb-4 leading-relaxed" {...props} />,
  img: (props) => <img className="rounded-xl my-6" {...props} />,

  // 👉 Register your CTA component
  CustomCTA,
};

export default function MDXWrapper({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
