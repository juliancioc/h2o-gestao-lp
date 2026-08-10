import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Texto curto embaixo do campo explicando o que preencher. */
  hint?: string;
  /** Símbolo à esquerda, como "R$". */
  prefix?: string;
  /** Símbolo à direita, como "%" ou "un". */
  suffix?: string;
  placeholder?: string;
}

/**
 * Campo numérico das calculadoras. Abre teclado numérico no celular e aceita
 * vírgula, que é como o brasileiro digita preço.
 */
const NumberField = ({
  label,
  value,
  onChange,
  hint,
  prefix,
  suffix,
  placeholder,
}: NumberFieldProps) => {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          className={cn(
            "h-11 bg-card",
            prefix && "pl-10",
            suffix && "pr-12",
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>}
    </div>
  );
};

export default NumberField;
