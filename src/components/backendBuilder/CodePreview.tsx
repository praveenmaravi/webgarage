import { useContext } from 'react';
import { FlowContext } from './FlowContext';
import { generateBackendCode } from './utils/generateCode'; // Helper function to generate code

type CodePreviewProps = {
  flowState: {
    nodes: any[];
    generateCode: (flowState: any) => string;
  };
};

const CodePreview = ({ flowState }: CodePreviewProps) => {
  // Call the code generation logic with the current flow state
  const generatedCode = generateBackendCode(flowState);

  return (
    <div className="code-preview p-4 bg-gray-50 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Generated Backend Code Preview</h3>
      <pre className="whitespace-pre-wrap break-words bg-gray-800 text-white p-4 rounded-md">
        {generatedCode || "Start building your flow to see the generated code here!"}
      </pre>
    </div>
  );
};

export default CodePreview;
