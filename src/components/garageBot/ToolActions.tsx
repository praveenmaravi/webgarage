import { useGarageBot } from "./useGarageBot";
import { Sparkles, FileCode, Clipboard } from "lucide-react";

interface ToolActionsProps {
  latestMessage?: string;
  onApply?: (content: string) => void; // Optional callback to insert into builder
}

export default function ToolActions({ latestMessage, onApply }: ToolActionsProps) {
  const { sendMessage } = useGarageBot();

  const handleExplain = () => {
    if (latestMessage) {
      sendMessage(`Explain this: ${latestMessage}`);
    }
  };

  const handleCopy = () => {
    if (latestMessage) {
      navigator.clipboard.writeText(latestMessage);
    }
  };

  const handleApply = () => {
    if (onApply && latestMessage) {
      onApply(latestMessage); // Inject to builder or canvas
    }
  };

  return (
    <div className="flex gap-3 mt-3">
      <button
        onClick={handleExplain}
        className="flex items-center gap-1 bg-zinc-800 text-white text-xs px-3 py-1 rounded hover:bg-zinc-700"
      >
        <Sparkles size={16} />
        Explain
      </button>

      <button
        onClick={handleApply}
        className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
      >
        <FileCode size={16} />
        Apply
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
      >
        <Clipboard size={16} />
        Copy
      </button>
    </div>
  );
}
