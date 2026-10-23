"use client";

import { useId, useState } from "react";

// Original teaching geometry. The control-to-picture pattern is documented in
// docs/audits/starter-guide.md; no third-party drawing or renderer is copied.
export function CADPartModel() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [thickness, setThickness] = useState(3);
  const [diameter, setDiameter] = useState(4.5);
  const [topView, setTopView] = useState(false);
  const height = step === 0 ? 0 : thickness;
  const holes = step === 2;
  const radius = diameter / 2;
  const project = (x: number, y: number, z: number) =>
    topView
      ? `${120 + 6 * x},${290 - 5 * y}`
      : `${110 + 4 * x + 2 * y},${230 + 1.15 * x - 1.9 * y - 6 * z}`;
  const face = (points: number[][]) =>
    points.map(([x, y, z]) => project(x, y, z)).join(" ");
  const transform = topView
    ? "matrix(6 0 0 -5 120 290)"
    : `matrix(4 1.15 2 -1.9 110 ${230 - 6 * height})`;
  const holePath = (x: number) =>
    `M ${x - radius} 20 a ${radius} ${radius} 0 1 0 ${diameter} 0 a ${radius} ${radius} 0 1 0 ${-diameter} 0`;
  const description =
    step === 0
      ? "A flat 60 by 40 millimetre rectangle. It has no thickness yet."
      : `A 60 by 40 millimetre plate, ${thickness} ${thickness === 1 ? "millimetre" : "millimetres"} thick${holes ? `, with two ${diameter} millimetre through-holes. Their centres are 40 millimetres apart` : ""}.`;

  return (
    <figure className="cad-model not-prose" aria-labelledby={`${id}-title`}>
      <div className="cad-model-heading">
        <strong id={`${id}-title`}>From sketch to part</strong>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setThickness(3);
            setDiameter(4.5);
            setTopView(false);
          }}
        >
          Reset
        </button>
      </div>
      <div className="cad-model-steps" role="group" aria-label="CAD operation">
        {["1. Sketch", "2. Add thickness", "3. Make holes"].map(
          (label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={step === index}
              onClick={() => setStep(index)}
            >
              {label}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 600 360"
        role="img"
        aria-labelledby={`${id}-drawing-title ${id}-drawing-description`}
      >
        <title id={`${id}-drawing-title`}>
          {`Mounting plate, ${step === 0 ? "sketch" : holes ? "with holes" : "extruded"}`}
        </title>
        <desc id={`${id}-drawing-description`}>
          {description} {topView ? "Top view." : "Angled view."} Dimensions are
          in millimetres.
        </desc>
        {height > 0 && !topView && (
          <g stroke="var(--cad-edge)" strokeWidth="1.5" strokeLinejoin="round">
            <polygon
              points={face([
                [0, 0, 0],
                [60, 0, 0],
                [60, 0, height],
                [0, 0, height],
              ])}
              fill="var(--cad-side)"
            />
            <polygon
              points={face([
                [60, 0, 0],
                [60, 40, 0],
                [60, 40, height],
                [60, 0, height],
              ])}
              fill="var(--cad-end)"
            />
          </g>
        )}
        <g transform={transform}>
          {holes &&
            [10, 50].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="20"
                r={radius}
                fill="var(--cad-hole)"
              />
            ))}
          <path
            d={`M 0 0 H 60 V 40 H 0 Z ${holes ? holePath(10) + " " + holePath(50) : ""}`}
            fill={step === 0 ? "var(--cad-sketch)" : "var(--cad-top)"}
            fillRule="evenodd"
            stroke="var(--cad-edge)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {holes &&
            [10, 50].map((x) => (
              <g
                key={x}
                stroke="var(--cad-edge)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              >
                <path
                  d={`M ${x - 1.5} 20 h 3 M ${x} 18.5 v 3`}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </g>
        {topView ? (
          <g className="cad-dimensions">
            <path d="M120 308v18m360-18v18M120 318H480M94 90h16m-16 200h16M102 90V290" />
            <text x="300" y="344" textAnchor="middle">
              60 mm
            </text>
            <text x="82" y="196" textAnchor="end">
              40 mm
            </text>
          </g>
        ) : (
          <g className="cad-dimensions">
            <path d="M110 243v14m240 55v14M110 250L350 319M100 224l-18-10m98-66l-18-10M90 211L170 135" />
            <text x="224" y="314" textAnchor="middle">
              60 mm
            </text>
            <text x="90" y="157" textAnchor="end">
              40 mm
            </text>
          </g>
        )}
      </svg>
      <div className="cad-model-views" role="group" aria-label="Drawing view">
        <button
          type="button"
          aria-pressed={!topView}
          onClick={() => setTopView(false)}
        >
          Angled view
        </button>
        <button
          type="button"
          aria-pressed={topView}
          onClick={() => setTopView(true)}
        >
          Top view
        </button>
      </div>
      <div className="cad-model-controls">
        <label htmlFor={`${id}-thickness`}>
          <span>
            Thickness{" "}
            <output htmlFor={`${id}-thickness`}>{thickness} mm</output>
          </span>
          <input
            id={`${id}-thickness`}
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={thickness}
            disabled={step === 0}
            onChange={(event) => setThickness(Number(event.target.value))}
          />
        </label>
        <label htmlFor={`${id}-diameter`}>
          <span>
            Hole diameter{" "}
            <output htmlFor={`${id}-diameter`}>{diameter} mm</output>
          </span>
          <input
            id={`${id}-diameter`}
            type="range"
            min="3"
            max="8"
            step="0.5"
            value={diameter}
            disabled={!holes}
            onChange={(event) => setDiameter(Number(event.target.value))}
          />
        </label>
      </div>
      <figcaption aria-live="polite">
        {description}{" "}
        {step === 0
          ? "Choose Add thickness to make a solid."
          : !holes
            ? "Choose Make holes to remove material."
            : "Change the hole diameter. The centres stay in the same places."}
      </figcaption>
    </figure>
  );
}
