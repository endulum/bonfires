import { Air } from "@mui/icons-material";

export function NoResultsSpacer({ children }: { children: React.ReactNode }) {
  return (
    <div className="spacer">
      <Air />
      {children}
    </div>
  );
}
