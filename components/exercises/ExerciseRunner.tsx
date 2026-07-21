"use client";
// components/exercises/ExerciseRunner.tsx
// Loop genérico de "una secuencia de ejercicios" — alimenta tanto la lección
// normal (LessonRunner) como el modo Repaso del día (ReviewRunner).
//
// El runner es agnóstico al kind: maneja el flujo (idle → correct/wrong →
// continue), pero la INPUT (cómo elige el niño la respuesta) y la EVALUACIÓN
// (si la respuesta está bien) están separadas por kind.
//
// Cada subcomponente de input dispara onAnswer({ value, correct }) cuando
// el niño termina de responder. evaluateAttempt() en lib/evaluate.ts decide
// la corrección.

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lumi } from "@/components/Lumi";
import { ExerciseVisual } from "@/components/exercises/ExerciseVisual";
import { OptionsGrid } from "@/components/exercises/OptionsGrid";
import { HintPanel } from "@/components/exercises/HintPanel";
import { TraceCanvas } from "@/components/exercises/TraceCanvas";
import { SpeakerButton } from "@/components/exercises/SpeakerButton";
import { ConceptIntro } from "@/components/exercises/ConceptIntro";
import { MatchInput } from "@/components/exercises/inputs/MatchInput";
import { OrderInput } from "@/components/exercises/inputs/OrderInput";
import { NumericKeypadInput } from "@/components/exercises/inputs/NumericKeypadInput";
import { DragInput } from "@/components/exercises/inputs/DragInput";
import { TakeAwayInput } from "@/components/exercises/inputs/TakeAwayInput";
import { CountTapInput } from "@/components/exercises/inputs/CountTapInput";
import { DivisionGroupsGame } from "@/components/exercises/inputs/DivisionGroupsGame";
import { MultiplicationBuildGame } from "@/components/exercises/inputs/MultiplicationBuildGame";
import { ParityHammerGame } from "@/components/exercises/inputs/ParityHammerGame";
import { PlaceValueMarketGame } from "@/components/exercises/inputs/PlaceValueMarketGame";
import { PlaceValueDigitGame } from "@/components/exercises/inputs/PlaceValueDigitGame";
import { ColumnAdditionGame } from "@/components/exercises/inputs/ColumnAdditionGame";
import { ColumnSubtractionGame } from "@/components/exercises/inputs/ColumnSubtractionGame";
import { MentalCalcGame } from "@/components/exercises/inputs/MentalCalcGame";
import { ArrayPackerGame } from "@/components/exercises/inputs/ArrayPackerGame";
import { FlashCardMultGame } from "@/components/exercises/inputs/FlashCardMultGame";
import { PieSliceGame } from "@/components/exercises/inputs/PieSliceGame";
import { FractionBarsGame } from "@/components/exercises/inputs/FractionBarsGame";
import { FruitFractionGame } from "@/components/exercises/inputs/FruitFractionGame";
import { FractionTileGame } from "@/components/exercises/inputs/FractionTileGame";
import { MoneyCountGame } from "@/components/exercises/inputs/MoneyCountGame";
import { ChangeMakingGame } from "@/components/exercises/inputs/ChangeMakingGame";
import { MoneyCompareGame } from "@/components/exercises/inputs/MoneyCompareGame";
import { UnitTapGame } from "@/components/exercises/inputs/UnitTapGame";
import { MeasureCompareGame } from "@/components/exercises/inputs/MeasureCompareGame";
import { UnitBlockGame } from "@/components/exercises/inputs/UnitBlockGame";
import { ClockSetGame } from "@/components/exercises/inputs/ClockSetGame";
import { ClockReadGame } from "@/components/exercises/inputs/ClockReadGame";
import { OrdinalTapGame } from "@/components/exercises/inputs/OrdinalTapGame";
import { ShapeCountGame } from "@/components/exercises/inputs/ShapeCountGame";
import { PatternContinueGame } from "@/components/exercises/inputs/PatternContinueGame";
import { PictogramReadGame } from "@/components/exercises/inputs/PictogramReadGame";
import { TapShapesGame } from "@/components/exercises/inputs/TapShapesGame";
import type { ShapeItem } from "@/components/exercises/inputs/TapShapesGame";
import { ShapeComposeGame } from "@/components/exercises/inputs/ShapeComposeGame";
import { ShapeDecomposeGame } from "@/components/exercises/inputs/ShapeDecomposeGame";
import { GridTraceGame } from "@/components/exercises/inputs/GridTraceGame";
import { BarGraphGame } from "@/components/exercises/inputs/BarGraphGame";
import { AreaGridGame } from "@/components/exercises/inputs/AreaGridGame";
import { AngleTapGame } from "@/components/exercises/inputs/AngleTapGame";
import { RoundingGame } from "@/components/exercises/inputs/RoundingGame";
import { FactorTapGame } from "@/components/exercises/inputs/FactorTapGame";
import { DecimalBarGame } from "@/components/exercises/inputs/DecimalBarGame";
import { SymmetryGridGame } from "@/components/exercises/inputs/SymmetryGridGame";
import { NetMatchGame } from "@/components/exercises/inputs/NetMatchGame";
import type { NetType } from "@/components/exercises/inputs/NetMatchGame";
import { LineGraphGame } from "@/components/exercises/inputs/LineGraphGame";
import { PieChartGame } from "@/components/exercises/inputs/PieChartGame";
import { PercentGridGame } from "@/components/exercises/inputs/PercentGridGame";
import { VolumeBuildGame } from "@/components/exercises/inputs/VolumeBuildGame";
import { RatioBuildGame } from "@/components/exercises/inputs/RatioBuildGame";
import { AlgebraScaleGame } from "@/components/exercises/inputs/AlgebraScaleGame";
import { CirclePartsGame } from "@/components/exercises/inputs/CirclePartsGame";
import type { CirclePart } from "@/components/exercises/inputs/CirclePartsGame";
import { AverageLevelGame } from "@/components/exercises/inputs/AverageLevelGame";
import { ChoiceButtonsInput } from "@/components/exercises/inputs/ChoiceButtonsInput";
import { ObjectOrderInput } from "@/components/exercises/inputs/ObjectOrderInput";
import { PartWholeInput } from "@/components/exercises/inputs/PartWholeInput";
import { SameMatchInput } from "@/components/exercises/inputs/SameMatchInput";
import { SortAttributeInput } from "@/components/exercises/inputs/SortAttributeInput";
import { CompareAttributeInput } from "@/components/exercises/inputs/CompareAttributeInput";
import { CompareGroupsInput } from "@/components/exercises/inputs/CompareGroupsInput";
import { ConservationInput } from "@/components/exercises/inputs/ConservationInput";
import { PatternNextInput } from "@/components/exercises/inputs/PatternNextInput";
import { SubitiseInput } from "@/components/exercises/inputs/SubitiseInput";
import { BaseTenInput } from "@/components/exercises/inputs/BaseTenInput";
import { NumberLineInput } from "@/components/exercises/inputs/NumberLineInput";
import { MoneyInput } from "@/components/exercises/inputs/MoneyInput";
import type { ExerciseDTO, TeachContent } from "@/components/exercises/types";
import { nextHintLevel, shouldAdvanceAfterWrong, pickHint } from "@/lib/learning/hints";
import { postOrQueue } from "@/lib/offline-queue";
import { evaluateAttempt } from "@/lib/learning/evaluate";
import { gradedCount, parseTeach, precedingTeach } from "@/lib/learning/teach";
import { playCorrect, playWrong, playTap } from "@/lib/gamification/audio";
// matchesDigit ya no se usa: el scoring de trazo lo hace TraceCanvas vía
// lib/learning/trace-scoring (cobertura de máscara).

export type RunnerLabels = {
  step: string;
  idle: string;
};

type RunnerState = "idle" | "selected" | "correct" | "wrong";

type Verdict = {
  correct: boolean;
  /** Sólo para kinds con score parcial (hoy: DRAW/trace). 0-3. */
  stars?: 0 | 1 | 2 | 3;
};

export function ExerciseRunner({
  childId,
  hearts,
  exercises,
  closeHref = "/home",
  xpPerExercise = 0,
  reviewMode = false,
  labels = { step: "EJERCICIO", idle: "¡Tú puedes! Elige tu respuesta." },
  onComplete,
}: {
  childId: string;
  hearts: number;
  exercises: ExerciseDTO[];
  closeHref?: string;
  xpPerExercise?: number;
  reviewMode?: boolean;
  labels?: RunnerLabels;
  onComplete: (result: { correctCount: number; total: number }) => void | Promise<void>;
}) {
  const router = useRouter();
  const [i, setI] = useState(0);
  // selection = lo que el niño eligió/armó, AÚN NO evaluado.
  // verdict   = resultado, sólo tras tocar "Comprobar" (o "Terminé" en trace).
  const [selection, setSelection] = useState<{ value: unknown } | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [exerciseStartedAt, setExerciseStartedAt] = useState(Date.now());
  const [correctCount, setCorrectCount] = useState(0);
  // resetSignal cambia cada vez que volvemos a idle desde wrong, para que
  // los inputs internos (canvas, match, order) limpien su estado local.
  const [resetSignal, setResetSignal] = useState(0);
  // Re-enseñar al trabarse: cuando el niño agota los intentos, mostramos de
  // nuevo el Momento Lumi previo antes de avanzar (null = no estamos en eso).
  const [reteach, setReteach] = useState<TeachContent | null>(null);

  const ex = exercises[i];
  // Los pasos TEACH no se califican: el denominador de estrellas/XP cuenta
  // solo los ejercicios reales.
  const gradedTotal = useMemo(
    () => gradedCount(exercises.map((e) => e.kind)),
    [exercises],
  );
  const teach = ex.kind === "TEACH" ? parseTeach(ex.payload) : null;
  // 4 estados: idle (nada) · selected (eligió, sin chequear) · correct · wrong.
  const state: RunnerState =
    verdict === null
      ? selection === null ? "idle" : "selected"
      : verdict.correct ? "correct" : "wrong";
  const hintLevel = nextHintLevel(wrongCount);
  const mustAdvance = shouldAdvanceAfterWrong(wrongCount);

  // Sonido + haptic + animación cuando el state cambia desde idle hacia
  // correct/wrong. Ref guarda el último estado para detectar la transición
  // y no disparar en cada re-render. animClass se limpia en onAnimationEnd
  // para que la próxima transición pueda re-disparar la misma animación.
  const prevStateRef = useRef(state);
  const [animClass, setAnimClass] = useState("");
  useEffect(() => {
    const prev = prevStateRef.current;
    // El veredicto aparece al "Comprobar"/"Terminé": disparamos sonido y
    // animación en la transición selected→correct/wrong (o idle→… en trace).
    if (prev !== "correct" && state === "correct") {
      playCorrect();
      setAnimClass("animate-correct-pop");
    }
    if (prev !== "wrong" && state === "wrong") {
      playWrong();
      setAnimClass("animate-wrong-shake");
    }
    prevStateRef.current = state;
  }, [state]);

  // Un TEACH con payload mal formado no debe trabar la lección: se saltea.
  useEffect(() => {
    if (ex.kind === "TEACH" && !teach) void advance(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // Texto/valor de "respuesta" para el HintPanel.
  const solutionAnswer = ex.solution.answer ?? null;

  // Opciones aleatorias sólo para los kinds que las usan (MULTIPLE_CHOICE
  // con visuales numéricos). Si la answer no es numérica (compare/parity)
  // usamos 0 — esos visuales no muestran OptionsGrid igual.
  const numericAnswer = typeof ex.solution.answer === "number" ? ex.solution.answer : 0;
  const options = useMemo(() => genOptions(numericAnswer), [ex.id, numericAnswer]);

  // El niño elige/arma una respuesta — todavía NO se evalúa.
  function select(value: unknown) {
    if (verdict !== null) return; // ya chequeado, no permitir re-seleccionar
    setSelection({ value });
  }

  // "Comprobar": ahora sí evaluamos la selección. Disparado por el botón
  // del footer (nunca automático al elegir).
  function comprobar() {
    if (selection === null || verdict !== null) return;
    const correct = evaluateAttempt(ex.kind, ex.solution, selection.value);
    setVerdict({ correct });
  }

  // Juegos visuales que auto-validan internamente llaman esto en vez de
  // onSelectNumeric: salta el paso de Comprobar y va directo al veredicto.
  function selectAndVerify(value: number) {
    if (verdict !== null) return;
    const correct = evaluateAttempt(ex.kind, ex.solution, value);
    setSelection({ value });
    setVerdict({ correct });
  }

  function selectAndVerifyString(value: string) {
    if (verdict !== null) return;
    const correct = evaluateAttempt(ex.kind, ex.solution, value);
    setSelection({ value });
    setVerdict({ correct });
  }

  // TRACE evalúa al tocar "Terminé" dentro del TraceCanvas (su propia acción
  // explícita de chequeo). El canvas ya computó el score por cobertura.
  function onTraceResult(r: { correct: boolean; stars: 0 | 1 | 2 | 3 }) {
    if (verdict !== null) return;
    const correct = evaluateAttempt(ex.kind, ex.solution, r.correct);
    setSelection({ value: r.correct });
    setVerdict({ correct, stars: r.stars });
  }

  async function recordAttempt(
    correct: boolean,
    response: unknown,
    srs: { final: boolean; priorWrongs: number; solutionShown: boolean },
  ) {
    await postOrQueue("/api/attempts", {
      childId, exerciseId: ex.id, correct, response,
      timeMs: Date.now() - exerciseStartedAt,
      reviewMode,
      ...srs,
    });
  }

  async function advance(scoreCorrect: boolean) {
    const nextCount = correctCount + (scoreCorrect ? 1 : 0);
    setCorrectCount(nextCount);

    if (i + 1 >= exercises.length) {
      await onComplete({ correctCount: nextCount, total: gradedTotal });
      return;
    }

    setI(i + 1);
    setSelection(null);
    setVerdict(null);
    setWrongCount(0);
    setExerciseStartedAt(Date.now());
    setResetSignal((s) => s + 1);
  }

  async function onContinue() {
    if (state === "correct") {
      await recordAttempt(true, selection?.value, {
        final: true, priorWrongs: wrongCount, solutionShown: false,
      });
      await advance(true);
      return;
    }

    const next = wrongCount + 1;
    setWrongCount(next);

    if (shouldAdvanceAfterWrong(next)) {
      // Cierre del ejercicio con solución revelada — único intento que
      // descuenta corazón en el server (ver /api/attempts).
      await recordAttempt(false, selection?.value, {
        final: true, priorWrongs: wrongCount, solutionShown: true,
      });
      return;
    }

    // Wrong intermedio: NO es final, server lo registra para analytics
    // pero no descuenta corazón. Limpiamos selección+veredicto para que el
    // niño vuelva a intentar (y los inputs internos se remontan).
    await recordAttempt(false, selection?.value, {
      final: false, priorWrongs: wrongCount, solutionShown: false,
    });
    setSelection(null);
    setVerdict(null);
    setResetSignal((s) => s + 1);
  }

  async function onAcknowledgeSolution() {
    // Si este ejercicio venía precedido de un Momento Lumi, lo re-enseñamos
    // antes de seguir. En unidades sin TEACH precedingTeach() devuelve null
    // y el flujo es el de siempre.
    const rt = precedingTeach(exercises, i);
    if (rt) {
      setReteach(rt);
      return;
    }
    await advance(false);
  }

  const progress = ((i + (state === "correct" ? 1 : 0)) / exercises.length) * 100;

  // Re-enseñanza tras trabarse: reusa el mismo Momento Lumi con copys
  // más suaves. Al terminar avanza al siguiente ejercicio.
  if (reteach) {
    return (
      <ConceptIntro
        content={reteach}
        variant="reteach"
        onDone={() => {
          setReteach(null);
          void advance(false);
        }}
      />
    );
  }

  // Momento Lumi: enseñanza no calificada. Toma la pantalla completa con su
  // propia narración/footer; al terminar avanza al siguiente paso.
  if (ex.kind === "TEACH") {
    if (!teach) return null; // el effect de arriba ya lo está salteando
    return <ConceptIntro content={teach} onDone={() => void advance(false)} />;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header className="sticky top-0 z-20 bg-white border-b border-ink/5">
        <div className="max-w-4xl mx-auto flex items-center gap-4 px-4 md:px-6 h-14">
          <button
            onClick={() => router.push(closeHref)}
            className="w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink text-2xl"
            aria-label="Cerrar"
          >×</button>

          <div className="flex-1 h-2.5 bg-cream rounded-full overflow-hidden">
            <div className="h-full bg-mint rounded-full transition-all duration-500" style={{ width: `${progress}%` }}/>
          </div>

          {reviewMode ? (
            <div className="flex items-center gap-1 text-sm font-black text-lilac" aria-label="Modo repaso">
              <span aria-hidden>🔁</span><span>Repaso</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm font-black text-pink" aria-label={`${hearts} corazones`}>
              <span aria-hidden>❤️</span><span>{hearts}</span>
            </div>
          )}
        </div>
      </header>

      {/* my-auto en el child centra verticalmente cuando hay espacio sobrante,
          y permite scroll del body cuando el contenido excede el viewport
          (clave para mobile chico + DragInput / teclado numérico). */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 py-6 md:py-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center my-auto">
          <div className="text-[10px] md:text-xs font-black text-ink-mute tracking-widest mb-2">
            {labels.step} {i + 1} / {exercises.length}
          </div>
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
            <h2 className="font-fredoka text-xl md:text-3xl font-bold text-ink text-center text-balance">
              {ex.prompt}
            </h2>
            <SpeakerButton text={ex.prompt} audioUrl={ex.audioUrl} autoPlayKey={ex.id} />
          </div>

          <div
            className={`w-full flex flex-col items-center ${animClass}`}
            onAnimationEnd={() => setAnimClass("")}
          >
            <KindBody
              ex={ex}
              state={state}
              selectedValue={selection?.value ?? null}
              options={options}
              // Los inputs se bloquean recién cuando hay veredicto, NO al
              // elegir — el niño puede cambiar la respuesta antes de Comprobar.
              disabled={verdict !== null}
              resetSignal={resetSignal}
              showSolution={
                ex.kind === "DRAW"
                  ? state === "correct" || hintLevel === "solution"
                  : hintLevel === "solution"
              }
              onSelectNumeric={(n) => select(n)}
              onSelectAuto={(n) => selectAndVerify(n)}
              onSelectString={(s) => select(s)}
              onSelectStringAuto={(s) => selectAndVerifyString(s)}
              onSelectStructured={(value) => select(value)}
              onTraceResult={onTraceResult}
              onMatchComplete={(pairs) => select(pairs)}
              onOrderComplete={(seq) => select(seq)}
            />
          </div>

          {hintLevel !== "none" && (
            <div className="w-full mt-6 flex justify-center">
              <HintPanel
                level={hintLevel}
                hint={pickHint(hintLevel, ex.hints ?? null)}
                explanation={ex.explanation ?? null}
                answer={solutionAnswer}
              />
            </div>
          )}
        </div>
      </main>

      <Footer
        state={state}
        mustAdvance={mustAdvance}
        xpPerExercise={xpPerExercise}
        idleMessage={labels.idle}
        isTrace={ex.kind === "DRAW"}
        traceStars={verdict?.stars}
        onComprobar={comprobar}
        onContinue={onContinue}
        onAcknowledgeSolution={onAcknowledgeSolution}
      />
    </div>
  );
}

function KindBody({
  ex, state, selectedValue, options, disabled, resetSignal, showSolution,
  onSelectNumeric, onSelectAuto, onSelectString, onSelectStringAuto, onSelectStructured, onTraceResult, onMatchComplete, onOrderComplete,
}: {
  ex: ExerciseDTO;
  state: RunnerState;
  selectedValue: unknown;
  options: number[];
  disabled: boolean;
  resetSignal: number;
  showSolution: boolean;
  onSelectNumeric: (n: number) => void;
  onSelectAuto: (n: number) => void;
  onSelectString: (s: string) => void;
  onSelectStringAuto: (s: string) => void;
  onSelectStructured: (value: unknown) => void;
  onTraceResult: (r: { correct: boolean; stars: 0 | 1 | 2 | 3 }) => void;
  onMatchComplete: (pairs: number[][]) => void;
  onOrderComplete: (seq: (number | string)[]) => void;
}) {
  const numericPicked = typeof selectedValue === "number" ? selectedValue : null;
  const stringPicked = typeof selectedValue === "string" ? selectedValue : null;
  const visual = typeof ex.payload.visual === "string" ? ex.payload.visual : null;

  // El kind es la INTERACCIÓN (cómo responde el niño). El visual previo lo
  // decide payload.visual y lo dibuja <ExerciseVisual>.
  if (ex.kind === "DRAW") {
    // Para DRAW el "visual" y el "input" son el mismo canvas.
    const digit = typeof ex.payload.digit === "number" ? (ex.payload.digit as number) : undefined;
    const letter = typeof ex.payload.letter === "string" ? (ex.payload.letter as string) : undefined;
    return (
      <div className="w-full flex justify-center mb-4 md:mb-8">
        <TraceCanvas
          key={resetSignal}
          digit={digit}
          letter={letter}
          onResult={onTraceResult}
          disabled={disabled}
          showSolution={showSolution}
          size={typeof window !== "undefined" && window.innerWidth < 380 ? 240 : 280}
        />
      </div>
    );
  }

  if (ex.kind === "MATCH") {
    if (visual === "same-match") {
      const payload = ex.payload as {
        left?: { id: string; emoji: string; label?: string }[];
        right?: { id: string; emoji: string; label?: string }[];
      };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-8">
          <SameMatchInput
            key={resetSignal}
            left={Array.isArray(payload.left) ? payload.left : []}
            right={Array.isArray(payload.right) ? payload.right : []}
            disabled={disabled}
            onComplete={onMatchComplete}
          />
        </div>
      );
    }

    const payload = ex.payload as { groups?: { item: string; count: number }[]; options?: number[] };
    const groups = Array.isArray(payload.groups) ? payload.groups : [];
    const opts = Array.isArray(payload.options) ? payload.options : [];
    return (
      <div className="w-full flex justify-center mb-4 md:mb-8">
        <MatchInput
          key={resetSignal}
          groups={groups}
          options={opts}
          disabled={disabled}
          onComplete={onMatchComplete}
        />
      </div>
    );
  }

  if (ex.kind === "SORT") {
    if (visual === "order-objects") {
      const payload = ex.payload as {
        attribute?: string;
        objects?: { id: string; emoji: string; label?: string; size?: number }[];
      };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-8">
          <ObjectOrderInput
            key={resetSignal}
            attribute={typeof payload.attribute === "string" ? payload.attribute : undefined}
            objects={Array.isArray(payload.objects) ? payload.objects : []}
            disabled={disabled}
            onComplete={onOrderComplete}
          />
        </div>
      );
    }

    const payload = ex.payload as { numbers?: number[] };
    const numbers = Array.isArray(payload.numbers) ? payload.numbers : [];
    return (
      <div className="w-full flex justify-center mb-4 md:mb-8">
        <OrderInput
          key={resetSignal}
          numbers={numbers}
          disabled={disabled}
          onComplete={onOrderComplete}
        />
      </div>
    );
  }

  if (ex.kind === "DRAG_DROP") {
    if (visual === "base-ten-build") {
      const payload = ex.payload as { target?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <BaseTenInput
            key={resetSignal}
            target={payload.target ?? 0}
            disabled={disabled}
            onSubmit={onSelectNumeric}
          />
        </div>
      );
    }

    if (visual === "number-line-input") {
      const payload = ex.payload as {
        sequence?: Array<number | null>;
        choices?: number[];
      };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <NumberLineInput
            key={resetSignal}
            sequence={Array.isArray(payload.sequence) ? payload.sequence : []}
            choices={Array.isArray(payload.choices) ? payload.choices : []}
            disabled={disabled}
            onSubmit={onSelectNumeric}
          />
        </div>
      );
    }

    if (visual === "money-build") {
      const payload = ex.payload as { target?: number; coinOptions?: number[] };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MoneyInput
            key={resetSignal}
            target={payload.target ?? 0}
            coinOptions={Array.isArray(payload.coinOptions) ? payload.coinOptions : [1, 2, 5]}
            disabled={disabled}
            onSubmit={onSelectNumeric}
          />
        </div>
      );
    }

    if (visual === "sort-attribute") {
      const payload = ex.payload as {
        items?: { id: string; emoji: string; label?: string }[];
        categories?: { id: string; label: string; emoji?: string }[];
      };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <SortAttributeInput
            key={resetSignal}
            items={Array.isArray(payload.items) ? payload.items : []}
            categories={Array.isArray(payload.categories) ? payload.categories : []}
            disabled={disabled}
            onComplete={onSelectStructured}
          />
        </div>
      );
    }

    if (visual === "part-whole") {
      const payload = ex.payload as { total?: number; item?: string; parts?: number[] };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PartWholeInput
            key={resetSignal}
            total={payload.total ?? 0}
            item={payload.item ?? "⭐"}
            parts={Array.isArray(payload.parts) ? payload.parts : []}
            disabled={disabled}
            onComplete={onSelectStructured}
          />
        </div>
      );
    }

    // Drag real con canasta. El ExerciseVisual no se monta — los items son
    // el visual.
    const payload = ex.payload as { a?: number; b?: number; item?: string };
    return (
      <div className="w-full flex justify-center mb-4 md:mb-6">
        <DragInput
          key={resetSignal}
          a={payload.a ?? 0}
          b={payload.b ?? 0}
          item={payload.item ?? "⭐"}
          disabled={disabled}
          verified={state === "correct"}
          onSubmit={onSelectNumeric}
        />
      </div>
    );
  }

  if (ex.kind === "INPUT") {
    // Tipear la respuesta con un teclado numérico. Para textos largos
    // (cuando lleguemos a Reading) usaríamos un input de texto distinto.
    return (
      <>
        <div className="w-full flex justify-center mb-6 md:mb-8">
          <ExerciseVisual ex={ex}/>
        </div>
        <div className="w-full flex justify-center">
          <NumericKeypadInput
            key={resetSignal}
            max={20}
            disabled={disabled}
            onSubmit={onSelectNumeric}
          />
        </div>
      </>
    );
  }

  if (ex.kind === "MULTIPLE_CHOICE") {
    // 0a) Contar tocando: correspondencia uno-a-uno en vez de elegir un
    //     número. Es la base del conteo a los 4-6.
    if (visual === "count") {
      const p = ex.payload as { count?: number; item?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <CountTapInput
            key={resetSignal}
            count={p.count ?? 0}
            item={p.item ?? "⭐"}
            disabled={disabled}
            verified={state === "correct"}
            onSubmit={onSelectAuto}
          />
        </div>
      );
    }

    // 0a-bis) División agrupando (estilo Synthesis): puntos dispersos que el
    //    niño junta en grupos de `groups`. La cantidad de grupos formados es
    //    la respuesta. El ExerciseVisual no se monta — el juego ES el visual.
    if (visual === "division-groups") {
      const p = ex.payload as { total?: number; groups?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <DivisionGroupsGame
            key={resetSignal}
            total={p.total ?? 0}
            groupSize={p.groups ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // 0a-bis-1a) Resta en columnas: igual que suma pero con "pedir prestado".
    if (visual === "column-subtraction") {
      const p = ex.payload as { a?: number; b?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ColumnSubtractionGame
            key={resetSignal}
            a={p.a ?? 0}
            b={p.b ?? 0}
            disabled={disabled}
            onSelect={onSelectNumeric}
          />
        </div>
      );
    }

    // 0a-bis-1) Suma en columnas: el niño completa el resultado dígito a dígito
    //    (U→T→H). El componente valida cada dígito y llama onSelect(a+b)
    //    solo cuando los tres están correctos.
    if (visual === "column-addition") {
      const p = ex.payload as { a?: number; b?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ColumnAdditionGame
            key={resetSignal}
            a={p.a ?? 0}
            b={p.b ?? 0}
            disabled={disabled}
            onSelect={onSelectNumeric}
          />
        </div>
      );
    }

    // 0a-bis-2) Valor posicional — dígito: muestra el número con colores por
    //    posición, resalta un dígito y el niño elige cuánto VALE ese dígito.
    if (visual === "place-value-digit") {
      const p = ex.payload as { number?: number; askIndex?: number; choices?: number[] };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PlaceValueDigitGame
            key={resetSignal}
            number={p.number ?? 0}
            askIndex={p.askIndex ?? 0}
            choices={Array.isArray(p.choices) ? p.choices : []}
            disabled={disabled}
            selected={numericPicked}
            onPick={onSelectNumeric}
          />
        </div>
      );
    }

    // 0a-ter) Mercado de Frutas — valor posicional: el niño toca columnas de
    //    Centenas/Decenas/Unidades para construir el número target. El total
    //    armado es la respuesta. Las columnas se muestran según el target.
    if (visual === "place-value-market") {
      const p = ex.payload as { target?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PlaceValueMarketGame
            key={resetSignal}
            target={p.target ?? 0}
            disabled={disabled}
            onSelect={onSelectNumeric}
          />
        </div>
      );
    }

    // Cálculo mental: muestra un número de inicio + operación (+/-) y el niño
    // teclea el resultado. El hopper del tren salta al número correcto.
    if (visual === "mental-calc") {
      const p = ex.payload as { start?: number; op?: string; amount?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MentalCalcGame
            key={resetSignal}
            start={p.start ?? 0}
            op={(p.op as "+" | "-") ?? "+"}
            amount={p.amount ?? 0}
            disabled={disabled}
            onSelect={onSelectNumeric}
          />
        </div>
      );
    }

    // Empaquetador de arreglos: el niño empaqueta fila por fila y ve cómo
    //    se llena la caja. Al completar revela Filas × Columnas = total.
    if (visual === "array-packer") {
      const p = ex.payload as { rows?: number; cols?: number; icon?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ArrayPackerGame
            key={resetSignal}
            rows={p.rows ?? 2}
            cols={p.cols ?? 3}
            icon={p.icon ?? "⭐"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Flashcard de multiplicación: carta 3D que voltea al acertar.
    //    El niño teclea el resultado — valida automáticamente sin Comprobar.
    if (visual === "flash-card-mult") {
      const p = ex.payload as { a?: number; b?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <FlashCardMultGame
            key={resetSignal}
            a={p.a ?? 2}
            b={p.b ?? 5}
            disabled={disabled}
            onSelect={onSelectNumeric}
          />
        </div>
      );
    }

    // Pastel en gajos: el niño toca los gajos del SVG para colorear N/D.
    if (visual === "fraction-pie") {
      const p = ex.payload as { slices?: number; target?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PieSliceGame
            key={resetSignal}
            slices={p.slices ?? 4}
            target={p.target ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Barras de fracciones: el niño toca la barra más grande (auto-valida).
    if (visual === "fraction-bars") {
      const p = ex.payload as { n1?: number; d1?: number; n2?: number; d2?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <FractionBarsGame
            key={resetSignal}
            n1={p.n1 ?? 1} d1={p.d1 ?? 2}
            n2={p.n2 ?? 1} d2={p.d2 ?? 4}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Canasta de frutas: el niño ajusta el numerador con ▲/▼.
    if (visual === "fruit-fraction") {
      const p = ex.payload as { total?: number; target?: number; targetIcon?: string; otherIcon?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <FruitFractionGame
            key={resetSignal}
            total={p.total ?? 6}
            target={p.target ?? 3}
            targetIcon={typeof p.targetIcon === "string" ? p.targetIcon : "🍎"}
            otherIcon={typeof p.otherIcon === "string" ? p.otherIcon : "🟡"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Reloj interactivo: el niño arrastra el minutero hasta el punto dorado.
    if (visual === "clock-set") {
      const p = ex.payload as { hour?: number; minute?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ClockSetGame
            key={resetSignal}
            hour={p.hour ?? 12}
            minute={p.minute ?? 0}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Reloj lectura: el niño identifica la hora entre tres opciones de reloj.
    if (visual === "clock-read") {
      const p = ex.payload as { hour?: number; minute?: number; options?: unknown; correctIdx?: number };
      const opts = Array.isArray(p.options)
        ? (p.options as { hour: number; minute: number }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ClockReadGame
            key={resetSignal}
            hour={p.hour ?? 12}
            minute={p.minute ?? 0}
            options={opts}
            correctIdx={p.correctIdx ?? 0}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Ordinales: el niño toca el elemento en la posición indicada (1.º, 2.º...).
    if (visual === "ordinal-tap") {
      const p = ex.payload as { items?: unknown; targetPos?: number };
      const items = Array.isArray(p.items) ? (p.items as string[]) : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <OrdinalTapGame
            key={resetSignal}
            items={items}
            targetPos={p.targetPos ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Gráfico de barras: el niño toca la barra que responde la pregunta.
    if (visual === "bar-graph") {
      const p = ex.payload as { bars?: unknown; answerLabel?: string; scale?: number };
      const bars = Array.isArray(p.bars)
        ? (p.bars as { label: string; value: number; color: string }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <BarGraphGame
            key={resetSignal}
            bars={bars}
            question={ex.prompt}
            answerLabel={p.answerLabel ?? ""}
            scale={p.scale ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Cuadrícula de área: el niño toca cada casilla para contar el área.
    if (visual === "area-grid") {
      const p = ex.payload as { rows?: number; cols?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <AreaGridGame
            key={resetSignal}
            rows={p.rows ?? 3}
            cols={p.cols ?? 4}
            prompt={ex.prompt}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Ángulos: el niño toca el ángulo del tipo pedido (recto, agudo, obtuso).
    if (visual === "angle-tap") {
      const p = ex.payload as { angles?: unknown; targetType?: string };
      const angles = Array.isArray(p.angles)
        ? (p.angles as { degrees: number; id: number }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <AngleTapGame
            key={resetSignal}
            angles={angles}
            targetType={(p.targetType ?? "right") as "right" | "acute" | "obtuse"}
            prompt={ex.prompt}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Redondeo: el niño toca la decena/centena/millar más cercana en la recta.
    if (visual === "rounding") {
      const p = ex.payload as { value?: number; roundTo?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <RoundingGame
            key={resetSignal}
            value={p.value ?? 0}
            roundTo={p.roundTo ?? 10}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Factores/múltiplos: el niño toca todos los factores o múltiplos del número.
    if (visual === "factor-tap") {
      const p = ex.payload as { target?: number; candidates?: unknown; mode?: string };
      const candidates = Array.isArray(p.candidates) ? (p.candidates as number[]) : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <FactorTapGame
            key={resetSignal}
            target={p.target ?? 1}
            candidates={candidates}
            mode={(p.mode ?? "factor") as "factor" | "multiple"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Decimales: el niño colorea décimos en una barra para construir el decimal.
    if (visual === "decimal-bar") {
      const p = ex.payload as { tenths?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <DecimalBarGame
            key={resetSignal}
            tenths={p.tenths ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Simetría: el niño completa el reflejo tocando las casillas del lado derecho.
    if (visual === "symmetry-grid") {
      const p = ex.payload as { rows?: number; cols?: number; leftCells?: unknown };
      const leftCells = Array.isArray(p.leftCells)
        ? (p.leftCells as [number, number][])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <SymmetryGridGame
            key={resetSignal}
            rows={p.rows ?? 4}
            cols={p.cols ?? 6}
            leftCells={leftCells}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Redes (nets): el niño toca la plantilla que forma el sólido mostrado.
    if (visual === "net-match") {
      const p = ex.payload as {
        solidName?: string; solidEmoji?: string; nets?: unknown; correctType?: string;
      };
      const nets = Array.isArray(p.nets)
        ? (p.nets as { id: number; type: NetType }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <NetMatchGame
            key={resetSignal}
            solidName={p.solidName ?? "cubo"}
            solidEmoji={p.solidEmoji ?? "🧊"}
            nets={nets}
            correctType={(p.correctType ?? "cube") as NetType}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Gráfico de líneas: el niño toca el punto que responde la pregunta.
    if (visual === "line-graph") {
      const p = ex.payload as { points?: unknown; answerLabel?: string; scale?: number };
      const points = Array.isArray(p.points)
        ? (p.points as { label: string; value: number }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <LineGraphGame
            key={resetSignal}
            points={points}
            question={ex.prompt}
            answerLabel={p.answerLabel ?? ""}
            scale={p.scale ?? 1}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Gráfico circular: el niño toca la porción correcta del pastel.
    if (visual === "pie-chart") {
      const p = ex.payload as { slices?: unknown; answerLabel?: string };
      const slices = Array.isArray(p.slices)
        ? (p.slices as { label: string; value: number; color: string }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PieChartGame
            key={resetSignal}
            slices={slices}
            question={ex.prompt}
            answerLabel={p.answerLabel ?? ""}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Porcentaje: el niño colorea filas de una cuadrícula de 100 para llegar al %.
    if (visual === "percent-grid") {
      const p = ex.payload as { percent?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PercentGridGame
            key={resetSignal}
            percent={p.percent ?? 10}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Volumen: el niño construye un cuboide tocando cubos unitarios capa por capa.
    if (visual === "volume-build") {
      const p = ex.payload as { length?: number; width?: number; height?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <VolumeBuildGame
            key={resetSignal}
            length={p.length ?? 2}
            width={p.width ?? 2}
            height={p.height ?? 2}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Razón: el niño llena canastas para construir la razón indicada.
    if (visual === "ratio-build") {
      const p = ex.payload as { groups?: unknown };
      const groups = Array.isArray(p.groups)
        ? (p.groups as { label: string; target: number; emoji: string }[])
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <RatioBuildGame
            key={resetSignal}
            groups={groups}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Álgebra: el niño equilibra la balanza para resolver x + b = c.
    if (visual === "algebra-scale") {
      const p = ex.payload as { known?: number; total?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <AlgebraScaleGame
            key={resetSignal}
            known={p.known ?? 0}
            total={p.total ?? 0}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Círculo: el niño toca la parte del círculo (centro, radio, diámetro, borde).
    if (visual === "circle-parts") {
      const p = ex.payload as { targetPart?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <CirclePartsGame
            key={resetSignal}
            targetPart={(p.targetPart ?? "radius") as CirclePart}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Promedio: el niño empareja las torres para hallar el promedio.
    if (visual === "average-level") {
      const p = ex.payload as { values?: unknown; labels?: unknown };
      const values = Array.isArray(p.values) ? (p.values as number[]) : [];
      const labels = Array.isArray(p.labels) ? (p.labels as string[]) : undefined;
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <AverageLevelGame
            key={resetSignal}
            values={values}
            labels={labels}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Bloques de conversión: toca N bloques de la unidad fuente → acumula en unidad destino.
    if (visual === "unit-block") {
      const p = ex.payload as { n?: number; sourceLabel?: string; targetFactor?: number; targetUnit?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <UnitBlockGame
            key={resetSignal}
            n={p.n ?? 1}
            sourceLabel={typeof p.sourceLabel === "string" ? p.sourceLabel : "1 m"}
            targetFactor={p.targetFactor ?? 100}
            targetUnit={typeof p.targetUnit === "string" ? p.targetUnit : "cm"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "pictogram-read") {
      const p = ex.payload as { symbol?: string; scale?: number; scaleUnit?: string; rows?: unknown; targetLabel?: string; answer?: number };
      const rows = Array.isArray(p.rows) ? (p.rows as { label: string; count: number }[]) : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PictogramReadGame
            key={resetSignal}
            symbol={typeof p.symbol === "string" ? p.symbol : "🍎"}
            scale={typeof p.scale === "number" ? p.scale : 5}
            scaleUnit={typeof p.scaleUnit === "string" ? p.scaleUnit : "items"}
            rows={rows}
            targetLabel={typeof p.targetLabel === "string" ? p.targetLabel : ""}
            answer={typeof p.answer === "number" ? p.answer : 0}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "tap-shapes") {
      const p = ex.payload as { shapes?: unknown; target?: string };
      const shapes = Array.isArray(p.shapes) ? (p.shapes as ShapeItem[]) : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <TapShapesGame
            key={resetSignal}
            shapes={shapes}
            target={typeof p.target === "string" ? p.target : "triangle"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "shape-compose") {
      const p = ex.payload as { figureName?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ShapeComposeGame
            key={resetSignal}
            figureName={typeof p.figureName === "string" ? p.figureName : "casa"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "shape-decompose") {
      const p = ex.payload as { figureName?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ShapeDecomposeGame
            key={resetSignal}
            figureName={typeof p.figureName === "string" ? p.figureName : "casa"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "grid-trace") {
      const p = ex.payload as { vertices?: unknown; shapeLabel?: string };
      const vertices = Array.isArray(p.vertices) ? (p.vertices as number[]) : [0, 4, 24, 20, 0];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <GridTraceGame
            key={resetSignal}
            vertices={vertices}
            shapeLabel={typeof p.shapeLabel === "string" ? p.shapeLabel : "la figura"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "shape-count") {
      const p = ex.payload as { total?: number; feature?: string; noun?: string; solidEmoji?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ShapeCountGame
            key={resetSignal}
            total={p.total ?? 1}
            feature={typeof p.feature === "string" ? p.feature : "cara"}
            noun={typeof p.noun === "string" ? p.noun : "caras"}
            solidEmoji={typeof p.solidEmoji === "string" ? p.solidEmoji : "🧊"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Toca la unidad de medida correcta (metros / kg / litros) para el objeto mostrado.
    if (visual === "unit-tap") {
      const p = ex.payload as { emoji?: string; units?: unknown; correctIdx?: number };
      const units = Array.isArray(p.units) ? (p.units as string[]) : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <UnitTapGame
            key={resetSignal}
            emoji={typeof p.emoji === "string" ? p.emoji : "❓"}
            units={units}
            correctIdx={p.correctIdx ?? 0}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Barras de medición: toca la medida mayor/menor (genérico, con etiquetas de texto).
    if (visual === "measure-compare") {
      const p = ex.payload as { aValue?: number; aLabel?: string; bValue?: number; bLabel?: string; askLarger?: boolean };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MeasureCompareGame
            key={resetSignal}
            aValue={p.aValue ?? 1000}
            aLabel={typeof p.aLabel === "string" ? p.aLabel : "A"}
            bValue={p.bValue ?? 500}
            bLabel={typeof p.bLabel === "string" ? p.bLabel : "B"}
            askLarger={p.askLarger !== false}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Dar cambio: toca monedas/billetes disponibles para construir el cambio exacto.
    if (visual === "change-making") {
      const p = ex.payload as { price?: number; payment?: number };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ChangeMakingGame
            key={resetSignal}
            price={p.price ?? 0}
            payment={p.payment ?? 1000}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Comparar montos: dos barras de precio proporcionales, toca la mayor/menor.
    if (visual === "money-compare") {
      const p = ex.payload as { a?: number; b?: number; askLarger?: boolean };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MoneyCompareGame
            key={resetSignal}
            a={p.a ?? 500}
            b={p.b ?? 300}
            askLarger={p.askLarger !== false}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Contar dinero: toca billetes y monedas → total vuela a billetera.
    if (visual === "money-count") {
      const p = ex.payload as { items?: { label: string; value: number; type: string }[] };
      const items = (p.items ?? []).map(it => ({
        label: it.label,
        value: it.value,
        type: (it.type === "coin" ? "coin" : "bill") as "bill" | "coin",
      }));
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MoneyCountGame
            key={resetSignal}
            items={items}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // Casillas de fracción: sumar/restar fracciones con igual denominador tocando tiles.
    if (visual === "fraction-tile") {
      const p = ex.payload as { a?: number; b?: number; d?: number; op?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <FractionTileGame
            key={resetSignal}
            a={p.a ?? 1}
            b={p.b ?? 1}
            d={p.d ?? 4}
            op={(p.op === "-" ? "-" : "+") as "+" | "-"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // 0a-ter) Multiplicación construyendo: el niño arma el arreglo fila por
    //    fila y ve el conteo saltado acumulado. El total construido es la
    //    respuesta. El ExerciseVisual no se monta — el juego ES el visual.
    if (visual === "mult-array-build") {
      const p = ex.payload as { rows?: number; cols?: number; item?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <MultiplicationBuildGame
            key={resetSignal}
            targetRows={p.rows ?? 1}
            cols={p.cols ?? 1}
            item={typeof p.item === "string" ? p.item : "🔵"}
            disabled={disabled}
            onSelect={onSelectAuto}
          />
        </div>
      );
    }

    // 0b) Resta concreta: en vez de elegir un número, el niño SACA objetos
    //    tocándolos y cuenta los que quedan (concreto antes que abstracto).
    if (visual === "subtract") {
      const p = ex.payload as { total?: number; removed?: number; item?: string };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <TakeAwayInput
            key={resetSignal}
            total={p.total ?? 0}
            removed={p.removed ?? 0}
            item={p.item ?? "⭐"}
            disabled={disabled}
            verified={state === "correct"}
            onSubmit={onSelectAuto}
          />
        </div>
      );
    }

    if (visual === "compare-attribute") {
      const p = ex.payload as {
        left?: { emoji: string; label?: string; size?: number };
        options?: string[];
        right?: { emoji: string; label?: string; size?: number };
      };
      const compareOptions = Array.isArray(p.options)
        ? p.options.filter(
            (option): option is "izquierda" | "derecha" | "igual" =>
              option === "izquierda" ||
              option === "derecha" ||
              option === "igual",
          )
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <CompareAttributeInput
            choices={compareOptions.length ? compareOptions : ["izquierda", "derecha"]}
            disabled={disabled}
            left={p.left ?? { emoji: "⭐" }}
            right={p.right ?? { emoji: "⭐" }}
            selected={stringPicked as "izquierda" | "derecha" | "igual" | null}
            onPick={onSelectString}
          />
        </div>
      );
    }

    if (visual === "flash-quantity") {
      const p = ex.payload as {
        arrangement?: string;
        count?: number;
        durationMs?: number;
        item?: string;
        options?: number[];
      };
      const visualOptions = Array.isArray(p.options)
        ? p.options.filter((option): option is number => typeof option === "number")
        : options;
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <SubitiseInput
            arrangement={p.arrangement}
            count={p.count ?? (typeof ex.solution.answer === "number" ? ex.solution.answer : 0)}
            disabled={disabled}
            durationMs={typeof p.durationMs === "number" ? p.durationMs : 1200}
            item={p.item ?? "●"}
            options={visualOptions}
            selected={numericPicked}
            onPick={onSelectNumeric}
          />
        </div>
      );
    }

    if (visual === "pattern-continue") {
      const p = ex.payload as { sequence?: string[] };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PatternContinueGame
            key={resetSignal}
            sequence={Array.isArray(p.sequence) ? p.sequence : []}
            answer={typeof ex.solution.answer === "string" ? ex.solution.answer : ""}
            disabled={disabled}
            onSelect={onSelectStringAuto}
          />
        </div>
      );
    }

    if (visual === "pattern-next") {
      const p = ex.payload as {
        options?: string[];
        sequence?: string[];
      };
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <PatternNextInput
            answer={typeof ex.solution.answer === "string" ? ex.solution.answer : ""}
            disabled={disabled}
            options={Array.isArray(p.options) ? p.options : []}
            selected={stringPicked}
            sequence={Array.isArray(p.sequence) ? p.sequence : []}
            onPick={onSelectStringAuto}
          />
        </div>
      );
    }

    if (visual === "conservation") {
      const p = ex.payload as {
        afterLayout?: string;
        beforeLayout?: string;
        count?: number;
        item?: string;
        options?: string[];
      };
      const conservationOptions = Array.isArray(p.options)
        ? p.options.filter(
            (option): option is "más" | "menos" | "igual" =>
              option === "más" || option === "menos" || option === "igual",
          )
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <ConservationInput
            afterLayout={p.afterLayout}
            beforeLayout={p.beforeLayout}
            choices={conservationOptions.length ? conservationOptions : ["más", "menos", "igual"]}
            count={p.count ?? 0}
            disabled={disabled}
            item={p.item ?? "⭐"}
            selected={stringPicked as "más" | "menos" | "igual" | null}
            onPick={onSelectString}
          />
        </div>
      );
    }

    if (visual === "compare-groups") {
      const p = ex.payload as {
        left?: { count?: number; item?: string };
        options?: string[];
        right?: { count?: number; item?: string };
      };
      const compareOptions = Array.isArray(p.options)
        ? p.options.filter(
            (option): option is "izquierda" | "derecha" | "igual" =>
              option === "izquierda" ||
              option === "derecha" ||
              option === "igual",
          )
        : [];
      return (
        <div className="w-full flex justify-center mb-4 md:mb-6">
          <CompareGroupsInput
            choices={compareOptions.length ? compareOptions : ["izquierda", "derecha", "igual"]}
            disabled={disabled}
            left={{
              count: p.left?.count ?? 0,
              item: p.left?.item ?? "●",
            }}
            right={{
              count: p.right?.count ?? 0,
              item: p.right?.item ?? "●",
            }}
            selected={stringPicked as "izquierda" | "derecha" | "igual" | null}
            onPick={onSelectString}
          />
        </div>
      );
    }

    // 1) Visuales con choices fijas (compare/parity) — siguen hardcoded
    //    porque tienen sub-labels específicos.
    // balance-scale y fraction-compare también usan los mismos botones < = >.
    if (visual === "compare" || visual === "balance-scale" || visual === "fraction-compare") {
      return (
        <>
          <div className="w-full flex justify-center mb-6 md:mb-8">
            <ExerciseVisual ex={ex}/>
          </div>
          <ChoiceButtonsInput
            choices={[
              { value: "<", label: "<", sub: "menor" },
              { value: "=", label: "=", sub: "igual" },
              { value: ">", label: ">", sub: "mayor" },
            ]}
            disabled={disabled}
            selected={stringPicked as never}
            onPick={onSelectString}
          />
        </>
      );
    }
    // Par/impar con martillo: el niño parte el grupo en dos bandejas y ve si
    // sobra uno. El juego incluye sus propios botones Par/Impar (con los
    // values capitalizados que espera solution.answer).
    if (visual === "parity") {
      const p = ex.payload as { value?: number };
      return (
        <ParityHammerGame
          key={resetSignal}
          value={p.value ?? 0}
          disabled={disabled}
          selected={stringPicked}
          onPick={onSelectString}
        />
      );
    }

    // 2) Si el payload trae options como string[] (Reading, science, etc.),
    //    renderear con ChoiceButtonsInput dinámicos. Esto destraba el motor
    //    multi-materia sin necesidad de cases nuevos por subject.
    const payloadOptions = (ex.payload as { options?: unknown }).options;
    if (Array.isArray(payloadOptions) && payloadOptions.every((o) => typeof o === "string")) {
      return (
        <>
          <div className="w-full flex justify-center mb-6 md:mb-8">
            <ExerciseVisual ex={ex}/>
          </div>
          <ChoiceButtonsInput
            choices={(payloadOptions as string[]).map((o) => ({ value: o, label: o }))}
            disabled={disabled}
            selected={stringPicked as never}
            onPick={onSelectString}
          />
        </>
      );
    }

    // 3) Default: opciones numéricas (count, subtract, etc.) — OptionsGrid
    //    auto-genera 4 alternativas alrededor de la answer.
    return (
      <>
        <div className="w-full flex justify-center mb-8 md:mb-12">
          <ExerciseVisual ex={ex}/>
        </div>
        <OptionsGrid options={options} picked={numericPicked} state={state} onPick={onSelectNumeric}/>
      </>
    );
  }

  // AUDIO / SPEAK aún no implementados — placeholder.
  return (
    <div className="text-center text-ink-soft italic py-8">
      Ejercicio en construcción ({ex.kind})
    </div>
  );
}

function Footer({
  state, mustAdvance, xpPerExercise, idleMessage, isTrace, traceStars,
  onComprobar, onContinue, onAcknowledgeSolution,
}: {
  state: RunnerState;
  mustAdvance: boolean;
  xpPerExercise: number;
  idleMessage: string;
  isTrace: boolean;
  /** Estrellas (0-3) para feedback granular de TRACE. */
  traceStars?: 0 | 1 | 2 | 3;
  onComprobar: () => void;
  onContinue: () => void;
  onAcknowledgeSolution: () => void;
}) {
  const bgClass =
    state === "correct" ? "bg-mint-soft border-mint/40"
    : state === "wrong" ? "bg-peach-soft border-pink/40"
    : "bg-white border-ink/5";

  return (
    <footer
      className={`border-t transition-colors ${bgClass}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center gap-3 md:gap-4">
        {state === "idle" && (
          <>
            <div className="hidden md:flex items-center gap-3 flex-1">
              <Lumi size={48}/>
              <span className="text-sm font-bold text-ink-soft">
                {isTrace ? "Traza el número y toca Terminé." : idleMessage}
              </span>
            </div>
            <button disabled className="w-full md:w-auto md:min-w-50 ml-auto py-3 px-6 rounded-full bg-ink-mute/20 text-ink-mute font-black uppercase tracking-wide text-sm">
              {isTrace ? "Traza y toca Terminé" : "Elige una respuesta"}
            </button>
          </>
        )}

        {state === "selected" && (
          <>
            <div className="hidden md:flex items-center gap-3 flex-1">
              <Lumi size={48}/>
              <span className="text-sm font-bold text-ink-soft">¿Estás seguro? Toca Comprobar.</span>
            </div>
            <button
              onClick={() => { playTap(); onComprobar(); }}
              className="btn-chunky w-full md:w-auto md:min-w-50 ml-auto py-3 px-8 rounded-full bg-sky text-white font-black uppercase tracking-wide text-sm"
              style={{ boxShadow: "0 4px 0 #2C8FB8" }}
            >
              Comprobar ✓
            </button>
          </>
        )}

        {state === "correct" && (
          <>
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <span className="text-3xl md:text-4xl" aria-hidden>🎉</span>
              <div>
                <div className="font-fredoka text-base md:text-xl font-bold text-mint">
                  {traceStars === 3 ? "¡Excelente trazo!" :
                   traceStars === 2 ? "¡Muy bien!" :
                   traceStars === 1 ? "¡Casi perfecto!" :
                   "¡Correcto!"}
                </div>
                {traceStars !== undefined ? (
                  <div className="text-base" aria-label={`${traceStars} de 3 estrellas`}>
                    {"⭐".repeat(traceStars)}<span className="opacity-25">{"⭐".repeat(3 - traceStars)}</span>
                  </div>
                ) : xpPerExercise > 0 && (
                  <div className="text-xs md:text-sm font-bold text-ink-soft">+{xpPerExercise} XP</div>
                )}
              </div>
            </div>
            <button onClick={() => { playTap(); onContinue(); }}
              className="btn-chunky py-3 px-8 md:px-10 rounded-full bg-mint text-white font-black uppercase tracking-wide text-sm"
              style={{ boxShadow: "0 4px 0 #1F9E46" }}>
              Continuar
            </button>
          </>
        )}

        {state === "wrong" && (
          <>
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <span className="text-3xl md:text-4xl" aria-hidden>{mustAdvance ? "📖" : "💪"}</span>
              <div>
                <div className="font-fredoka text-base md:text-xl font-bold text-pink">
                  {mustAdvance ? "Mira la solución" : "Casi…"}
                </div>
                <div className="text-xs md:text-sm font-bold text-ink-soft">
                  {mustAdvance ? "Vamos al siguiente" : "Mira la pista"}
                </div>
              </div>
            </div>
            <button
              onClick={() => { playTap(); (mustAdvance ? onAcknowledgeSolution : onContinue)(); }}
              className="btn-chunky py-3 px-8 md:px-10 rounded-full bg-pink text-white font-black uppercase tracking-wide text-sm"
              style={{ boxShadow: "0 4px 0 #C93658" }}
            >
              {mustAdvance ? "Entendido" : "Reintentar"}
            </button>
          </>
        )}
      </div>
    </footer>
  );
}

function genOptions(answer: number): number[] {
  const candidates = [answer, answer + 1, Math.max(1, answer - 1), answer + 2, Math.max(0, answer - 2)];
  const unique: number[] = [];
  for (const c of candidates) {
    if (!unique.includes(c)) unique.push(c);
    if (unique.length === 4) break;
  }
  for (let c = 0; unique.length < 4; c++) {
    if (!unique.includes(c)) unique.push(c);
  }
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }
  return unique;
}
