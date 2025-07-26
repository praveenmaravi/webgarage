// src/utils/codeGenerator.ts

type ComponentProps = {
    id: string;
    type: string;
    text?: string;
    className?: string;
    children?: ComponentProps[];
    animation?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'none';
  };
  
  const animationMap: Record<string, string> = {
    fadeIn: 'initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}',
    slideUp: 'initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}',
    zoomIn: 'initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}',
  };
  
  const getTagName = (type: string): string => {
    switch (type) {
      case 'Button':
        return 'button';
      case 'Image':
        return 'img';
      case 'Text':
        return 'p';
      case 'Heading':
        return 'h2';
      case 'Container':
      case 'Div':
        return 'div';
      default:
        return 'div';
    }
  };
  
  const generateComponentCode = (component: ComponentProps, indent = 2): string => {
    const tag = getTagName(component.type);
    const indentSpace = ' '.repeat(indent);
    const motionTag = component.animation && component.animation !== 'none' ? `motion.${tag}` : tag;
    const animationProps = component.animation && component.animation !== 'none'
      ? ' ' + animationMap[component.animation]
      : '';
  
    const openTag = `<${motionTag} className="${component.className || ''}"${animationProps}>`;
    const closeTag = `</${motionTag}>`;
  
    const childrenCode = (component.children || [])
      .map(child => generateComponentCode(child, indent + 2))
      .join('\n');
  
    const content = component.text || '';
  
    return `${indentSpace}${openTag}
  ${childrenCode || indentSpace + '  ' + content}
  ${indentSpace}${closeTag}`;
  };
  
  export const generateReactCode = (tree: ComponentProps): string => {
    return `import React from "react";
  import { motion } from "framer-motion";
  
  const GeneratedComponent = () => {
    return (
  ${generateComponentCode(tree)}
    );
  };
  
  export default GeneratedComponent;`;
  };
  