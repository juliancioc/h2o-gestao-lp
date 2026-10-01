import { useId } from "react";
import {
  curvaLucro,
  escalaY,
  formatEixo,
  formatInteiro,
  formatMoeda,
  maxXGrafico,
  modelo,
  passoBonito,
  type Premissas,
} from "@/lib/simuladorDistribuidora";

interface GraficoLucroProps {
  premissas: Premissas;
  /** Ponto de equilíbrio em galões por dia (Infinity se não existe). */
  peDia: number;
}

const LARGURA = 560;
const ALTURA = 230;
const MARGEM = { topo: 24, direita: 14, base: 44, esquerda: 56 };
const AREA_X = LARGURA - MARGEM.esquerda - MARGEM.direita;
const AREA_Y = ALTURA - MARGEM.topo - MARGEM.base;

/**
 * Lucro mensal conforme o volume diário, desenhado à mão para não puxar
 * biblioteca de gráfico. Todas as cores saem dos tokens (classes fill-/stroke-),
 * então acompanham o tema.
 */
const GraficoLucro = ({ premissas, peDia }: GraficoLucroProps) => {
  const idTitulo = useId();
  const maxX = maxXGrafico(premissas.dia, peDia);
  const curva = curvaLucro(premissas, maxX);
  const escala = escalaY(curva.map((ponto) => ponto.y));

  const px = (x: number) => MARGEM.esquerda + (x / maxX) * AREA_X;
  const py = (y: number) =>
    MARGEM.topo + ((escala.max - y) / (escala.max - escala.min)) * AREA_Y;

  const zeroY = py(0);
  const linha = curva
    .map((ponto, i) => `${i === 0 ? "M" : "L"}${px(ponto.x).toFixed(1)},${py(ponto.y).toFixed(1)}`)
    .join(" ");
  const area = `${linha} L${px(maxX).toFixed(1)},${zeroY.toFixed(1)} L${px(0).toFixed(1)},${zeroY.toFixed(1)} Z`;

  const passoX = passoBonito(maxX / 6);
  const ticksX: number[] = [];
  for (let x = 0; x <= maxX + 1e-9; x += passoX) ticksX.push(x);

  const temEmpate = Number.isFinite(peDia) && peDia > 0 && peDia <= maxX;
  const empateX = temEmpate ? px(peDia) : 0;
  // Rótulo do empate do lado em que cabe.
  const rotuloEmpateADireita = empateX < LARGURA - 140;

  const lucroAtual = modelo(premissas).lucro;
  const atualX = px(Math.min(premissas.dia, maxX));
  const atualY = py(lucroAtual);

  const descricao = `Lucro mensal de ${formatMoeda(curva[0].y)} com 0 galões por dia até ${formatMoeda(
    curva[curva.length - 1].y,
  )} com ${formatInteiro(maxX)} galões por dia.${
    temEmpate ? ` Empate em ${formatInteiro(Math.ceil(peDia))} galões por dia.` : ""
  } Hoje: ${formatMoeda(lucroAtual)} com ${formatInteiro(premissas.dia)} galões por dia.`;

  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      className="block w-full h-auto"
      role="img"
      aria-labelledby={idTitulo}
    >
      <title id={idTitulo}>{descricao}</title>

      {/* Grade e eixo Y */}
      {escala.ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={MARGEM.esquerda}
            x2={LARGURA - MARGEM.direita}
            y1={py(tick)}
            y2={py(tick)}
            className={tick === 0 ? "stroke-muted-foreground" : "stroke-border"}
            strokeWidth={tick === 0 ? 1.5 : 1}
          />
          <text
            x={MARGEM.esquerda - 8}
            y={py(tick)}
            dy="0.35em"
            textAnchor="end"
            className="fill-muted-foreground tabular-nums"
            fontSize={14}
          >
            {formatEixo(tick)}
          </text>
        </g>
      ))}

      {/* Eixo X */}
      {ticksX.map((tick) => (
        <text
          key={tick}
          x={px(tick)}
          y={ALTURA - MARGEM.base + 20}
          textAnchor="middle"
          className="fill-muted-foreground tabular-nums"
          fontSize={14}
        >
          {formatInteiro(tick)}
        </text>
      ))}
      <text
        x={LARGURA - MARGEM.direita}
        y={ALTURA - 4}
        textAnchor="end"
        className="fill-muted-foreground"
        fontSize={14}
      >
        galões por dia →
      </text>

      {/* Curva */}
      <path d={area} className="fill-primary/15" stroke="none" />
      <path
        d={linha}
        fill="none"
        className="stroke-primary"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Ponto de equilíbrio */}
      {temEmpate && (
        <g>
          <line
            x1={empateX}
            x2={empateX}
            y1={MARGEM.topo}
            y2={ALTURA - MARGEM.base}
            className="stroke-warning"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
          <text
            x={empateX + (rotuloEmpateADireita ? 6 : -6)}
            y={MARGEM.topo - 8}
            textAnchor={rotuloEmpateADireita ? "start" : "end"}
            className="fill-foreground font-medium"
            fontSize={14}
          >
            empate: {formatInteiro(Math.ceil(peDia))}/dia
          </text>
        </g>
      )}

      {/* Volume atual */}
      <circle
        cx={atualX}
        cy={atualY}
        r={5.5}
        className="fill-primary stroke-card"
        strokeWidth={2}
      />
    </svg>
  );
};

export default GraficoLucro;
