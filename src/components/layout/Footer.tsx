export default function Footer() {
    return (
      <footer className="flex items-center justify-between px-4 py-3 border-t bg-muted text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} WebGarage. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    );
  }
  