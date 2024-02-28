type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return <span className="border px-2 rounded py-1 bg-muted text-muted-foreground text-sm font-medium">{children}</span>;
}
