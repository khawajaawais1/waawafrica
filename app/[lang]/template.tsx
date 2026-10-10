/** Re-mounts on every navigation → light page-enter motion + tricolour progress sweep. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className="page-bar" />
      <div className="page-enter">{children}</div>
    </>
  );
}
