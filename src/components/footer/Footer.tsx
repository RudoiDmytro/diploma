export default function Footer() {
  return (
    <footer className="fixed bottom-0">
      <div className="flex max-w-7xl p-4 space-y-3">
        {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
