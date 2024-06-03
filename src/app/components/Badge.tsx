type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="border px-2 text-center rounded-md py-1 text-card bg-card-foreground text-sm font-medium">
      {children}
    </span>
  );
}
