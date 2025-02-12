import {
  Warning,
  CheckCircle,
  Info,
  VisibilityOffOutlined,
} from "@mui/icons-material";

export function Alert({
  type,
  children,
  className,
}: {
  type: "warning" | "success" | "info" | "blind";
  className?: string;
  children: JSX.Element;
}) {
  return (
    <div
      className={`alert ${type} flex-row align-start g-75 w100${
        className ? ` ${className}` : ""
      }`}
    >
      {type === "warning" && <Warning />}
      {type === "success" && <CheckCircle />}
      {type === "info" && <Info />}
      {type === "blind" && <VisibilityOffOutlined />}
      {children}
    </div>
  );
}
