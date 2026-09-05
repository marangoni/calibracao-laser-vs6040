"use strict";

const APP_VERSION = "0.5.1";

const MACHINE = {
  model: "VISUTEC VS6040",
  maxCutSpeed: 20,
  experimentalVectorSpeedLimit: 50,
  identificationSpeed: 20
};

const OPERATIONS = {
  cut: {
    label: "Corte",
    slug: "corte",
    description: "Quadrados de contorno para avaliar corte completo, qualidade da borda e carbonização.",
    speedLimit: MACHINE.maxCutSpeed,
    parameterStatus: "vs6040",
    speeds: {
      quick: [5, 12, 20],
      standard: [5, 8, 12, 16, 20],
      detailed: [5, 7, 10, 12, 15, 17, 20]
    }
  },

  engrave: {
    label: "Gravação",
    slug: "gravacao",
    description: "Gravação vetorial com linhas horizontais, verticais e diagonais para comparar definição e intensidade.",
    speedLimit: MACHINE.experimentalVectorSpeedLimit,
    parameterStatus: "experimental",
    speeds: {
      quick: [10, 30, 50],
      standard: [10, 20, 30, 40, 50],
      detailed: [10, 15, 20, 25, 30, 40, 50]
    }
  },

  fill: {
    label: "Preenchimento",
    slug: "preenchimento",
    description: "Preenchimento por hachura vetorial para avaliar tonalidade, uniformidade e profundidade.",
    speedLimit: MACHINE.experimentalVectorSpeedLimit,
    parameterStatus: "experimental",
    speeds: {
      quick: [10, 30, 50],
      standard: [10, 20, 30, 40, 50],
      detailed: [10, 15, 20, 25, 30, 40, 50]
    }
  }
};

const PATTERN_LABELS = {
  quick: "Rápido",
  standard: "Padrão",
  detailed: "Detalhado",
  custom: "Personalizado"
};

const MATERIALS = {
  eva: {
    label: "EVA",
    powers: {
      cut: {
        quick: [2, 10, 20],
        standard: [2, 5, 10, 15, 20],
        detailed: [2, 5, 8, 10, 12, 15, 20]
      },
      engrave: {
        quick: [2, 6, 10],
        standard: [2, 4, 6, 8, 10],
        detailed: [2, 3, 4, 5, 6, 8, 10]
      },
      fill: {
        quick: [2, 6, 10],
        standard: [2, 4, 6, 8, 10],
        detailed: [2, 3, 4, 5, 6, 8, 10]
      }
    }
  },

  mdf_claro: {
    label: "MDF claro",
    powers: {
      cut: {
        quick: [10, 30, 60],
        standard: [10, 20, 30, 45, 60],
        detailed: [10, 20, 30, 40, 45, 50, 60]
      },
      engrave: {
        quick: [5, 15, 25],
        standard: [5, 10, 15, 20, 25],
        detailed: [5, 8, 10, 12, 15, 20, 25]
      },
      fill: {
        quick: [5, 15, 25],
        standard: [5, 10, 15, 20, 25],
        detailed: [5, 8, 10, 12, 15, 20, 25]
      }
    }
  },

  mdf_escuro: {
    label: "MDF escuro",
    powers: {
      cut: {
        quick: [10, 40, 80],
        standard: [10, 25, 40, 60, 80],
        detailed: [10, 20, 30, 40, 50, 60, 80]
      },
      engrave: {
        quick: [5, 15, 30],
        standard: [5, 10, 15, 20, 30],
        detailed: [5, 8, 10, 15, 20, 25, 30]
      },
      fill: {
        quick: [5, 15, 30],
        standard: [5, 10, 15, 20, 30],
        detailed: [5, 8, 10, 15, 20, 25, 30]
      }
    }
  },

  papelao: {
    label: "Papelão",
    powers: {
      cut: {
        quick: [5, 15, 30],
        standard: [5, 10, 15, 20, 30],
        detailed: [5, 8, 10, 15, 20, 25, 30]
      },
      engrave: {
        quick: [2, 6, 10],
        standard: [2, 4, 6, 8, 10],
        detailed: [2, 3, 4, 5, 6, 8, 10]
      },
      fill: {
        quick: [2, 6, 10],
        standard: [2, 4, 6, 8, 10],
        detailed: [2, 3, 4, 5, 6, 8, 10]
      }
    }
  }
};

const GEOMETRY = {
  cell: 15,
  gap: 4,
  margin: 5,
  leftArea: 22,
  headerArea: 39,
  footerArea: 8,
  stroke: 0.18,
  anchorLength: 0.1,
  hatchSpacing: 0.8
};

const CUT_COLOR = "#ff0000";
const ENGRAVE_COLOR = "#0000ff";

const FONT = {
  " ": ["00000","00000","00000","00000","00000","00000","00000"],
  "A": ["01110","10001","10001","11111","10001","10001","10001"],
  "B": ["11110","10001","10001","11110","10001","10001","11110"],
  "C": ["01111","10000","10000","10000","10000","10000","01111"],
  "D": ["11110","10001","10001","10001","10001","10001","11110"],
  "E": ["11111","10000","10000","11110","10000","10000","11111"],
  "F": ["11111","10000","10000","11110","10000","10000","10000"],
  "G": ["01111","10000","10000","10111","10001","10001","01111"],
  "H": ["10001","10001","10001","11111","10001","10001","10001"],
  "I": ["11111","00100","00100","00100","00100","00100","11111"],
  "J": ["00111","00010","00010","00010","10010","10010","01100"],
  "K": ["10001","10010","10100","11000","10100","10010","10001"],
  "L": ["10000","10000","10000","10000","10000","10000","11111"],
  "M": ["10001","11011","10101","10101","10001","10001","10001"],
  "N": ["10001","11001","10101","10011","10001","10001","10001"],
  "O": ["01110","10001","10001","10001","10001","10001","01110"],
  "P": ["11110","10001","10001","11110","10000","10000","10000"],
  "Q": ["01110","10001","10001","10001","10101","10010","01101"],
  "R": ["11110","10001","10001","11110","10100","10010","10001"],
  "S": ["01111","10000","10000","01110","00001","00001","11110"],
  "T": ["11111","00100","00100","00100","00100","00100","00100"],
  "U": ["10001","10001","10001","10001","10001","10001","01110"],
  "V": ["10001","10001","10001","10001","10001","01010","00100"],
  "W": ["10001","10001","10001","10101","10101","10101","01010"],
  "X": ["10001","10001","01010","00100","01010","10001","10001"],
  "Y": ["10001","10001","01010","00100","00100","00100","00100"],
  "Z": ["11111","00001","00010","00100","01000","10000","11111"],

  "0": ["01110","10001","10011","10101","11001","10001","01110"],
  "1": ["00100","01100","00100","00100","00100","00100","01110"],
  "2": ["01110","10001","00001","00010","00100","01000","11111"],
  "3": ["11110","00001","00001","01110","00001","00001","11110"],
  "4": ["00010","00110","01010","10010","11111","00010","00010"],
  "5": ["11111","10000","10000","11110","00001","00001","11110"],
  "6": ["01110","10000","10000","11110","10001","10001","01110"],
  "7": ["11111","00001","00010","00100","01000","01000","01000"],
  "8": ["01110","10001","10001","01110","10001","10001","01110"],
  "9": ["01110","10001","10001","01111","00001","00001","01110"],

  "%": ["11001","11010","00100","01000","10110","00110","00000"],
  "/": ["00001","00010","00010","00100","01000","01000","10000"],
  "-": ["00000","00000","00000","11111","00000","00000","00000"],
  ".": ["00000","00000","00000","00000","00000","01100","01100"],
  ",": ["00000","00000","00000","00000","00000","01100","00100"],
  ":": ["00000","01100","01100","00000","01100","01100","00000"]
};

const $ = id => document.getElementById(id);

const ui = {
  operation: $("operation"),
  material: $("material"),
  thickness: $("thickness"),
  pattern: $("pattern"),
  customPanel: $("customPanel"),
  customPowers: $("customPowers"),
  customSpeeds: $("customSpeeds"),
  customSpeedHelp: $("customSpeedHelp"),
  machineLimitText: $("machineLimitText"),
  operationInfo: $("operationInfo"),
  parameterStatus: $("parameterStatus"),
  powerRange: $("powerRange"),
  matrixSize: $("matrixSize"),
  powerValues: $("powerValues"),
  speedValues: $("speedValues"),
  previewTitle: $("previewTitle"),
  previewDescription: $("previewDescription"),
  testSwatch: $("testSwatch"),
  testLegend: $("testLegend"),
  preview: $("preview"),
  procedureSteps: $("procedureSteps"),
  individualDownloads: $("individualDownloads"),
  packageButton: $("downloadPackageButton"),
  svgButton: $("downloadSvgButton"),
  message: $("message"),
  appVersion: $("appVersion")
};

let currentData = null;
let currentThickness = 0;
let currentSvg = "";
let customInitialized = false;

function normalizeAscii(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function safeFilePart(text) {
  return normalizeAscii(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatNumber(value) {
  return Number(value).toLocaleString(
    "pt-BR",
    {
      maximumFractionDigits: 2
    }
  );
}

function formatThickness(value) {
  return Number(value).toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }
  );
}

function thicknessForFilename(value) {
  const number = Number(value);

  return Number.isInteger(number)
    ? `${number}mm`
    : `${String(number).replace(".", "p")}mm`;
}

function gNumber(value) {
  return Number(value).toFixed(3);
}

function parseNumberList(
  text,
  min,
  max,
  label
) {
  const values = text
    .trim()
    .split(/[;,\s]+/)
    .filter(Boolean)
    .map(Number);

  if (
    !values.length ||
    values.some(value => !Number.isFinite(value))
  ) {
    throw new Error(
      `Informe valores válidos de ${label}.`
    );
  }

  if (
    values.some(
      value =>
        value < min ||
        value > max
    )
  ) {
    throw new Error(
      `Os valores de ${label} devem ficar entre ${min} e ${max}.`
    );
  }

  const unique = [
    ...new Set(values)
  ];

  if (
    unique.length > 10
  ) {
    throw new Error(
      `Use no máximo 10 valores de ${label}.`
    );
  }

  return unique;
}

function getDateStamp() {
  const now = new Date();

  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ"
  ];

  return `${String(now.getDate()).padStart(2, "0")}_${months[now.getMonth()]}_${now.getFullYear()}`;
}

function getPresetData() {
  const operationKey =
    ui.operation.value;

  const operation =
    OPERATIONS[operationKey];

  const material =
    MATERIALS[ui.material.value];

  const patternKey =
    ui.pattern.value;

  if (
    patternKey === "custom"
  ) {
    return {
      operationKey,
      operation,
      material,
      patternKey,
      patternLabel: PATTERN_LABELS.custom,
      powers: parseNumberList(
        ui.customPowers.value,
        1,
        100,
        "potência"
      ),
      speeds: parseNumberList(
        ui.customSpeeds.value,
        0.1,
        operation.speedLimit,
        "velocidade"
      )
    };
  }

  return {
    operationKey,
    operation,
    material,
    patternKey,
    patternLabel:
      PATTERN_LABELS[patternKey],
    powers:
      material.powers[operationKey][patternKey],
    speeds:
      operation.speeds[patternKey]
  };
}

function getLayout(data) {
  const pitch =
    GEOMETRY.cell +
    GEOMETRY.gap;

  const gridWidth =
    data.speeds.length *
      GEOMETRY.cell +
    Math.max(
      0,
      data.speeds.length - 1
    ) *
      GEOMETRY.gap;

  const gridHeight =
    data.powers.length *
      GEOMETRY.cell +
    Math.max(
      0,
      data.powers.length - 1
    ) *
      GEOMETRY.gap;

  const gridX =
    GEOMETRY.margin +
    GEOMETRY.leftArea;

  const gridY =
    GEOMETRY.headerArea;

  return {
    pitch,
    gridWidth,
    gridHeight,
    gridX,
    gridY,
    width:
      gridX +
      gridWidth +
      GEOMETRY.margin,
    height:
      gridY +
      gridHeight +
      GEOMETRY.footerArea
  };
}

function measureText(
  text,
  height
) {
  const normalized =
    normalizeAscii(text);

  const unit =
    height / 7;

  return normalized.length
    ? normalized.length *
        unit *
        5 +
        (normalized.length - 1) *
          unit *
          1.5
    : 0;
}

function textSegments(
  text,
  x,
  y,
  height,
  align = "left"
) {
  const normalized =
    normalizeAscii(text);

  const unit =
    height / 7;

  const charWidth =
    unit * 5;

  const spacing =
    unit * 1.5;

  const totalWidth =
    measureText(
      normalized,
      height
    );

  let cursorX =
    align === "center"
      ? x - totalWidth / 2
      : align === "right"
        ? x - totalWidth
        : x;

  const segments = [];

  for (
    const character
    of normalized
  ) {
    const glyph =
      FONT[character] ||
      FONT[" "];

    for (
      let row = 0;
      row < 7;
      row += 1
    ) {
      let runStart = null;

      for (
        let col = 0;
        col <= 5;
        col += 1
      ) {
        const active =
          col < 5 &&
          glyph[row][col] === "1";

        if (
          active &&
          runStart === null
        ) {
          runStart = col;
        }

        if (
          !active &&
          runStart !== null
        ) {
          segments.push(
            {
              x1:
                cursorX +
                runStart *
                  unit,

              y1:
                y +
                (row + 0.5) *
                  unit,

              x2:
                cursorX +
                (col - 0.18) *
                  unit,

              y2:
                y +
                (row + 0.5) *
                  unit
            }
          );

          runStart = null;
        }
      }
    }

    cursorX +=
      charWidth +
      spacing;
  }

  return segments;
}

function buildIdentificationSegments(
  data,
  thickness
) {
  const layout =
    getLayout(data);

  const segments = [];

  const addText =
    (
      text,
      x,
      y,
      height,
      align = "left"
    ) =>
      segments.push(
        ...textSegments(
          text,
          x,
          y,
          height,
          align
        )
      );

  addText(
    `CALIBRACAO DE ${data.operation.label}`,
    GEOMETRY.margin,
    4,
    3.7
  );

  addText(
    MACHINE.model,
    GEOMETRY.margin,
    9,
    1.9
  );

  addText(
    `MATERIAL: ${data.material.label}`,
    GEOMETRY.margin,
    13,
    2.0
  );

  addText(
    `ESPESSURA: ${formatThickness(thickness)}MM`,
    GEOMETRY.margin,
    17,
    2.0
  );

  addText(
    `PADRAO: ${data.patternLabel}`,
    GEOMETRY.margin,
    21,
    2.0
  );

  addText(
    "VELOCIDADE MM/S",
    layout.gridX +
      layout.gridWidth / 2,
    26,
    2.6,
    "center"
  );

  data.speeds.forEach(
    (
      speed,
      column
    ) => {
      const centerX =
        layout.gridX +
        column *
          layout.pitch +
        GEOMETRY.cell /
          2;

      addText(
        String(speed),
        centerX,
        31,
        2.3,
        "center"
      );
    }
  );

  addText(
    "POT %",
    GEOMETRY.margin,
    31,
    2.3
  );

  data.powers.forEach(
    (
      power,
      row
    ) => {
      const h = 2.5;

      const y =
        layout.gridY +
        row *
          layout.pitch +
        (GEOMETRY.cell - h) /
          2;

      addText(
        `${power}%`,
        layout.gridX - 3,
        y,
        h,
        "right"
      );
    }
  );

  return segments;
}

function buildEngraveCellSegments(
  x,
  y
) {
  const m = 2;

  const left =
    x + m;

  const right =
    x +
    GEOMETRY.cell -
    m;

  const top =
    y + m;

  const bottom =
    y +
    GEOMETRY.cell -
    m;

  const center =
    y +
    GEOMETRY.cell / 2;

  return [
    {
      x1: left,
      y1: top,
      x2: right,
      y2: top
    },

    {
      x1: left,
      y1: center,
      x2: right,
      y2: center
    },

    {
      x1: left,
      y1: bottom,
      x2: right,
      y2: top
    },

    {
      x1: left,
      y1: top,
      x2: left,
      y2: bottom
    }
  ];
}

function buildFillCellSegments(
  x,
  y
) {
  const margin = 1.5;

  const left =
    x + margin;

  const right =
    x +
    GEOMETRY.cell -
    margin;

  const top =
    y + margin;

  const bottom =
    y +
    GEOMETRY.cell -
    margin;

  const segments = [];

  let reverse =
    false;

  for (
    let yy = top;
    yy <= bottom + 0.0001;
    yy += GEOMETRY.hatchSpacing
  ) {
    segments.push(
      reverse
        ? {
            x1: right,
            y1: yy,
            x2: left,
            y2: yy
          }
        : {
            x1: left,
            y1: yy,
            x2: right,
            y2: yy
          }
    );

    reverse =
      !reverse;
  }

  return segments;
}

function buildTestSvg(
  data,
  layout
) {
  const elements = [];

  const color =
    data.operationKey === "cut"
      ? CUT_COLOR
      : ENGRAVE_COLOR;

  data.powers.forEach(
    (
      power,
      row
    ) => {
      data.speeds.forEach(
        (
          speed,
          column
        ) => {
          const x =
            layout.gridX +
            column *
              layout.pitch;

          const y =
            layout.gridY +
            row *
              layout.pitch;

          if (
            data.operationKey === "cut"
          ) {
            elements.push(
              `<rect x="${x}" y="${y}" width="${GEOMETRY.cell}" height="${GEOMETRY.cell}" fill="none" stroke="${color}" stroke-width="${GEOMETRY.stroke}" data-power="${power}" data-speed="${speed}"/>`
            );
          } else {
            const segments =
              data.operationKey === "engrave"
                ? buildEngraveCellSegments(
                    x,
                    y
                  )
                : buildFillCellSegments(
                    x,
                    y
                  );

            for (
              const s
              of segments
            ) {
              elements.push(
                `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${color}" stroke-width="${GEOMETRY.stroke}" stroke-linecap="round" data-power="${power}" data-speed="${speed}"/>`
              );
            }
          }
        }
      );
    }
  );

  return elements.join(
    "\n"
  );
}

function buildSvg(
  data,
  thickness
) {
  const layout =
    getLayout(data);

  const blueLines =
    buildIdentificationSegments(
      data,
      thickness
    )
      .map(
        s =>
          `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${GEOMETRY.stroke}" stroke-linecap="round"/>`
      )
      .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${layout.width}mm"
  height="${layout.height}mm"
  viewBox="0 0 ${layout.width} ${layout.height}"
>
  <title>
    Calibracao ${data.operation.label} - ${data.material.label}
  </title>

  <desc>
    Gerado exclusivamente para VISUTEC VS6040. Gravacao e preenchimento usam parametros experimentais nesta versao.
  </desc>

  <g id="identificacao">
    ${blueLines}
  </g>

  <g id="teste">
    ${buildTestSvg(data, layout)}
  </g>
</svg>`;
}

function toGcodePoint(
  x,
  y,
  layout
) {
  return {
    x,
    y:
      layout.height -
      y
  };
}

function ngcHeader(
  data,
  thickness,
  description
) {
  const warnings = [
    `(ATENCAO: ARQUIVO EXCLUSIVO PARA ${MACHINE.model})`,
    `(NAO UTILIZAR EM OUTRA MAQUINA SEM REVISAO DOS PARAMETROS)`
  ];

  if (
    data.operationKey === "cut"
  ) {
    warnings.push(
      `(CORTE: LIMITE ADOTADO PARA ESTA VS6040 = ${MACHINE.maxCutSpeed} mm/s)`
    );
  } else {
    warnings.push(
      `(PARAMETROS DE ${normalizeAscii(data.operation.label)} SAO EXPERIMENTAIS)`
    );

    warnings.push(
      `(LIMITE DE ${data.operation.speedLimit} mm/s E UM LIMITE DO GERADOR, NAO UM LIMITE VALIDADO DA MAQUINA)`
    );
  }

  return [
    `(UbuntuMaker - Calibracao Laser)`,
    `(Gerador versao ${APP_VERSION})`,
    ...warnings,
    `(Maquina: ${MACHINE.model})`,
    `(Tipo: ${normalizeAscii(data.operation.label)})`,
    `(Material: ${normalizeAscii(data.material.label)})`,
    `(Espessura: ${formatThickness(thickness)} mm)`,
    `(Padrao: ${normalizeAscii(data.patternLabel)})`,
    `(${description})`,
    "",
    "G21",
    "G90",
    "G17",
    "S0",
    ""
  ];
}

function addReferenceAnchors(
  lines,
  layout
) {
  const feed =
    Math.min(
      MACHINE.identificationSpeed,
      MACHINE.maxCutSpeed
    ) * 60;

  lines.push(
    "(Reference anchors - laser OFF)",
    "S0",
    "G0 X0.000 Y0.000"
  );

  lines.push(
    `G1 X${gNumber(GEOMETRY.anchorLength)} Y0.000 F${feed}`
  );

  lines.push(
    `G0 X${gNumber(layout.width)} Y${gNumber(layout.height)}`
  );

  lines.push(
    `G1 X${gNumber(layout.width - GEOMETRY.anchorLength)} Y${gNumber(layout.height)} F${feed}`,
    ""
  );
}

function addSegmentGcode(
  lines,
  segment,
  layout,
  feed
) {
  const start =
    toGcodePoint(
      segment.x1,
      segment.y1,
      layout
    );

  const end =
    toGcodePoint(
      segment.x2,
      segment.y2,
      layout
    );

  lines.push(
    "S0",
    `G0 X${gNumber(start.x)} Y${gNumber(start.y)}`,
    "S1"
  );

  lines.push(
    `G1 X${gNumber(end.x)} Y${gNumber(end.y)} F${feed}`,
    "S0"
  );
}

function buildIdentificationNgc(
  data,
  thickness
) {
  const layout =
    getLayout(data);

  const lines =
    ngcHeader(
      data,
      thickness,
      "IDENTIFICACAO - AJUSTAR POTENCIA BAIXA NO PAINEL"
    );

  const feed =
    Math.round(
      MACHINE.identificationSpeed *
      60
    );

  addReferenceAnchors(
    lines,
    layout
  );

  lines.push(
    `(Velocidade de identificacao: ${MACHINE.identificationSpeed} mm/s)`,
    ""
  );

  for (
    const segment
    of buildIdentificationSegments(
      data,
      thickness
    )
  ) {
    addSegmentGcode(
      lines,
      segment,
      layout,
      feed
    );
  }

  lines.push(
    "",
    "S0",
    "M2",
    ""
  );

  return lines.join(
    "\n"
  );
}

function addCutCellGcode(
  lines,
  x,
  y,
  layout,
  feed
) {
  const path = [
    [
      x,
      y
    ],

    [
      x +
        GEOMETRY.cell,
      y
    ],

    [
      x +
        GEOMETRY.cell,
      y +
        GEOMETRY.cell
    ],

    [
      x,
      y +
        GEOMETRY.cell
    ],

    [
      x,
      y
    ]
  ].map(
    (
      [
        px,
        py
      ]
    ) =>
      toGcodePoint(
        px,
        py,
        layout
      )
  );

  lines.push(
    "S0",
    `G0 X${gNumber(path[0].x)} Y${gNumber(path[0].y)}`,
    "S1"
  );

  for (
    let i = 1;
    i < path.length;
    i += 1
  ) {
    const p =
      path[i];

    lines.push(
      i === 1
        ? `G1 X${gNumber(p.x)} Y${gNumber(p.y)} F${feed}`
        : `G1 X${gNumber(p.x)} Y${gNumber(p.y)}`
    );
  }

  lines.push(
    "S0"
  );
}

function buildPowerNgc(
  data,
  thickness,
  powerIndex
) {
  const layout =
    getLayout(data);

  const power =
    data.powers[
      powerIndex
    ];

  const lines =
    ngcHeader(
      data,
      thickness,
      `POTENCIA ${power}% - AJUSTAR NO PAINEL`
    );

  addReferenceAnchors(
    lines,
    layout
  );

  data.speeds.forEach(
    (
      speed,
      column
    ) => {
      if (
        speed >
        data.operation.speedLimit
      ) {
        throw new Error(
          `Velocidade de ${speed} mm/s excede o limite do modo ${data.operation.label}.`
        );
      }

      const x =
        layout.gridX +
        column *
          layout.pitch;

      const y =
        layout.gridY +
        powerIndex *
          layout.pitch;

      const feed =
        Math.round(
          speed *
          60
        );

      lines.push(
        `(Power ${power}% - Speed ${speed} mm/s)`
      );

      if (
        data.operationKey === "cut"
      ) {
        addCutCellGcode(
          lines,
          x,
          y,
          layout,
          feed
        );
      } else {
        const segments =
          data.operationKey === "engrave"
            ? buildEngraveCellSegments(
                x,
                y
              )
            : buildFillCellSegments(
                x,
                y
              );

        for (
          const segment
          of segments
        ) {
          addSegmentGcode(
            lines,
            segment,
            layout,
            feed
          );
        }
      }

      lines.push(
        ""
      );
    }
  );

  lines.push(
    "S0",
    "M2",
    ""
  );

  return lines.join(
    "\n"
  );
}

function getPackageName(
  data,
  thickness
) {
  return [
    "calibracao",
    "vs6040",
    safeFilePart(
      data.material.label
    ),
    thicknessForFilename(
      thickness
    ),
    data.operation.slug,
    safeFilePart(
      data.patternLabel
    ),
    getDateStamp()
  ].join("_");
}

function powerFilePart(
  power
) {
  const number =
    Number(power);

  return Number.isInteger(number)
    ? String(number)
        .padStart(
          2,
          "0"
        )
    : String(number)
        .replace(
          ".",
          "p"
        );
}

function buildReadme(
  data,
  thickness
) {
  const lines = [
    "CALIBRACAO LASER",
    "",
    "============================================================",
    `ATENCAO - USO EXCLUSIVO: ${MACHINE.model}`,
    "============================================================",
    "",
    "Este pacote foi gerado especificamente para a VISUTEC VS6040",
    "utilizada no laboratorio. Nao utilize estes arquivos NGC em",
    "outra maquina sem revisar velocidades, potencias, area util,",
    "origem e comportamento da controladora.",
    "",
    `Maquina: ${MACHINE.model}`,
    `Tipo: ${data.operation.label}`,
    `Material: ${data.material.label}`,
    `Espessura: ${formatThickness(thickness)} mm`,
    `Padrao: ${data.patternLabel}`,
    "",
    `Potencias: ${data.powers.join(", ")} %`,
    `Velocidades: ${data.speeds.join(", ")} mm/s`
  ];

  if (
    data.operationKey === "cut"
  ) {
    lines.push(
      `Limite de corte adotado para esta VS6040: ${MACHINE.maxCutSpeed} mm/s`,
      "",
      "STATUS DOS PARAMETROS",
      "",
      "O modo Corte utiliza a faixa definida especificamente para a VS6040.",
      "O resultado de corte ainda depende do material, espessura, foco,",
      "estado do tubo, lente, espelhos e demais condicoes da maquina."
    );
  } else {
    lines.push(
      `Limite experimental adotado pelo gerador: ${data.operation.speedLimit} mm/s`,
      "",
      "STATUS DOS PARAMETROS - EXPERIMENTAL",
      "",
      `Os presets de ${data.operation.label.toLowerCase()} desta versao ainda precisam`,
      "ser validados fisicamente na VS6040 antes de uso rotineiro.",
      `O valor de ${data.operation.speedLimit} mm/s e um limite conservador adotado`,
      "pelo gerador; nao deve ser interpretado como limite validado da maquina."
    );
  }

  if (
    data.operationKey === "fill"
  ) {
    lines.push(
      "",
      `Espacamento da hachura vetorial: ${GEOMETRY.hatchSpacing} mm`,
      "Este modo usa hachura vetorial em G-code; nao e Raster Engrave nativo."
    );
  }

  lines.push(
    "",
    "ORDEM DE EXECUCAO",
    "",
    "1. Abra 00-identificacao.ngc.",
    "   Ajuste uma potencia baixa de gravacao no painel.",
    `   O arquivo de identificacao utiliza ${MACHINE.identificationSpeed} mm/s.`
  );

  data.powers.forEach(
    (
      power,
      index
    ) => {
      const sequence =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );

      lines.push(
        "",
        `${index + 2}. Ajuste a potencia do painel para ${power}%.`,
        `   Execute ${sequence}-pot-${powerFilePart(power)}.ngc.`
      );
    }
  );

  lines.push(
    "",
    "IMPORTANTE",
    "",
    "- Nao mova o material entre as etapas.",
    "- Nao altere a origem da maquina entre as etapas.",
    "- A potencia e ajustada manualmente no painel da cortadora.",
    "- Os arquivos NGC controlam automaticamente as velocidades.",
    "- Nunca use este pacote em outra maquina sem revisar os parametros.",
    "- Os presets devem ser confirmados por ensaio no laboratorio.",
    "- Utilize apenas materiais adequados para processamento a laser.",
    "",
    `Gerador UbuntuMaker v${APP_VERSION}`,
    `Data: ${getDateStamp().replaceAll("_", " ")}`,
    ""
  );

  return lines.join(
    "\n"
  );
}

function downloadBlob(
  blob,
  filename
) {
  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href =
    url;

  a.download =
    filename;

  document.body.appendChild(
    a
  );

  a.click();

  a.remove();

  setTimeout(
    () =>
      URL.revokeObjectURL(
        url
      ),
    100
  );
}

function downloadText(
  text,
  filename,
  type = "text/plain"
) {
  downloadBlob(
    new Blob(
      [
        text
      ],
      {
        type:
          `${type};charset=utf-8`
      }
    ),
    filename
  );
}

const CRC_TABLE =
  (() => {
    const table =
      new Uint32Array(
        256
      );

    for (
      let i = 0;
      i < 256;
      i += 1
    ) {
      let c = i;

      for (
        let j = 0;
        j < 8;
        j += 1
      ) {
        c =
          (c & 1)
            ? (
                0xEDB88320 ^
                (c >>> 1)
              )
            : (
                c >>> 1
              );
      }

      table[i] =
        c >>> 0;
    }

    return table;
  })();

function crc32(
  bytes
) {
  let crc =
    0xFFFFFFFF;

  for (
    const byte
    of bytes
  ) {
    crc =
      CRC_TABLE[
        (crc ^ byte) &
        0xFF
      ] ^
      (crc >>> 8);
  }

  return (
    crc ^
    0xFFFFFFFF
  ) >>> 0;
}

function pushUint16(
  array,
  value
) {
  array.push(
    value &
      0xFF,

    (value >>> 8) &
      0xFF
  );
}

function pushUint32(
  array,
  value
) {
  array.push(
    value &
      0xFF,

    (value >>> 8) &
      0xFF,

    (value >>> 16) &
      0xFF,

    (value >>> 24) &
      0xFF
  );
}

function getDosDateTime(
  date
) {
  const year =
    Math.max(
      1980,
      date.getFullYear()
    );

  return {
    dosTime:
      (date.getHours() << 11) |
      (date.getMinutes() << 5) |
      Math.floor(
        date.getSeconds() / 2
      ),

    dosDate:
      ((year - 1980) << 9) |
      ((date.getMonth() + 1) << 5) |
      date.getDate()
  };
}

function concatBytes(
  arrays
) {
  const result =
    new Uint8Array(
      arrays.reduce(
        (
          sum,
          array
        ) =>
          sum +
          array.length,
        0
      )
    );

  let offset = 0;

  for (
    const array
    of arrays
  ) {
    result.set(
      array,
      offset
    );

    offset +=
      array.length;
  }

  return result;
}

function createZip(
  files
) {
  const encoder =
    new TextEncoder();

  const localParts = [];

  const centralParts = [];

  let localOffset = 0;

  const {
    dosTime,
    dosDate
  } =
    getDosDateTime(
      new Date()
    );

  for (
    const file
    of files
  ) {
    const nameBytes =
      encoder.encode(
        file.name
      );

    const dataBytes =
      file.data instanceof Uint8Array
        ? file.data
        : encoder.encode(
            file.data
          );

    const crc =
      crc32(
        dataBytes
      );

    const localHeader = [];

    pushUint32(
      localHeader,
      0x04034B50
    );

    pushUint16(
      localHeader,
      20
    );

    pushUint16(
      localHeader,
      0x0800
    );

    pushUint16(
      localHeader,
      0
    );

    pushUint16(
      localHeader,
      dosTime
    );

    pushUint16(
      localHeader,
      dosDate
    );

    pushUint32(
      localHeader,
      crc
    );

    pushUint32(
      localHeader,
      dataBytes.length
    );

    pushUint32(
      localHeader,
      dataBytes.length
    );

    pushUint16(
      localHeader,
      nameBytes.length
    );

    pushUint16(
      localHeader,
      0
    );

    const localHeaderBytes =
      new Uint8Array(
        localHeader
      );

    localParts.push(
      localHeaderBytes,
      nameBytes,
      dataBytes
    );

    const centralHeader = [];

    pushUint32(
      centralHeader,
      0x02014B50
    );

    pushUint16(
      centralHeader,
      20
    );

    pushUint16(
      centralHeader,
      20
    );

    pushUint16(
      centralHeader,
      0x0800
    );

    pushUint16(
      centralHeader,
      0
    );

    pushUint16(
      centralHeader,
      dosTime
    );

    pushUint16(
      centralHeader,
      dosDate
    );

    pushUint32(
      centralHeader,
      crc
    );

    pushUint32(
      centralHeader,
      dataBytes.length
    );

    pushUint32(
      centralHeader,
      dataBytes.length
    );

    pushUint16(
      centralHeader,
      nameBytes.length
    );

    pushUint16(
      centralHeader,
      0
    );

    pushUint16(
      centralHeader,
      0
    );

    pushUint16(
      centralHeader,
      0
    );

    pushUint16(
      centralHeader,
      0
    );

    pushUint32(
      centralHeader,
      0
    );

    pushUint32(
      centralHeader,
      localOffset
    );

    centralParts.push(
      new Uint8Array(
        centralHeader
      ),
      nameBytes
    );

    localOffset +=
      localHeaderBytes.length +
      nameBytes.length +
      dataBytes.length;
  }

  const localData =
    concatBytes(
      localParts
    );

  const centralData =
    concatBytes(
      centralParts
    );

  const end = [];

  pushUint32(
    end,
    0x06054B50
  );

  pushUint16(
    end,
    0
  );

  pushUint16(
    end,
    0
  );

  pushUint16(
    end,
    files.length
  );

  pushUint16(
    end,
    files.length
  );

  pushUint32(
    end,
    centralData.length
  );

  pushUint32(
    end,
    localData.length
  );

  pushUint16(
    end,
    0
  );

  return concatBytes(
    [
      localData,
      centralData,
      new Uint8Array(
        end
      )
    ]
  );
}

function buildPackageFiles(
  data,
  thickness
) {
  const packageName =
    getPackageName(
      data,
      thickness
    );

  const folder =
    `${packageName}/`;

  const files = [
    {
      name:
        `${folder}00-identificacao.ngc`,

      data:
        buildIdentificationNgc(
          data,
          thickness
        )
    }
  ];

  data.powers.forEach(
    (
      power,
      index
    ) => {
      const sequence =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );

      files.push(
        {
          name:
            `${folder}${sequence}-pot-${powerFilePart(power)}.ngc`,

          data:
            buildPowerNgc(
              data,
              thickness,
              index
            )
        }
      );
    }
  );

  files.push(
    {
      name:
        `${folder}referencia.svg`,

      data:
        buildSvg(
          data,
          thickness
        )
    }
  );

  files.push(
    {
      name:
        `${folder}LEIA-ME.txt`,

      data:
        buildReadme(
          data,
          thickness
        )
    }
  );

  return {
    packageName,
    files
  };
}

function downloadPackage() {
  if (
    !currentData
  ) {
    return;
  }

  const {
    packageName,
    files
  } =
    buildPackageFiles(
      currentData,
      currentThickness
    );

  downloadBlob(
    new Blob(
      [
        createZip(
          files
        )
      ],
      {
        type:
          "application/zip"
      }
    ),
    `${packageName}.zip`
  );
}

function renderProcedure(
  data
) {
  ui.procedureSteps.innerHTML =
    "";

  const identification =
    document.createElement(
      "div"
    );

  identification.className =
    "procedure-step";

  identification.innerHTML = `
    <div class="step-number">
      0
    </div>

    <div>
      <strong>
        Identificação
      </strong>

      <small>
        Ajuste uma potência baixa no painel e execute
        00-identificacao.ngc a ${MACHINE.identificationSpeed} mm/s.
      </small>
    </div>
  `;

  ui.procedureSteps.appendChild(
    identification
  );

  data.powers.forEach(
    (
      power,
      index
    ) => {
      const element =
        document.createElement(
          "div"
        );

      element.className =
        "procedure-step";

      element.innerHTML = `
        <div class="step-number">
          ${index + 1}
        </div>

        <div>
          <strong>
            ${data.operation.label} — potência ${power}%
          </strong>

          <small>
            Ajuste o painel para ${power}% e execute velocidades
            ${data.speeds.join(" / ")} mm/s.
          </small>
        </div>
      `;

      ui.procedureSteps.appendChild(
        element
      );
    }
  );
}

function renderIndividualDownloads(
  data
) {
  ui.individualDownloads.innerHTML =
    "";

  const idButton =
    document.createElement(
      "button"
    );

  idButton.className =
    "file-button";

  idButton.innerHTML = `
    <strong>
      00-identificacao.ngc
    </strong>

    <small>
      identificação a ${MACHINE.identificationSpeed} mm/s
    </small>
  `;

  idButton.addEventListener(
    "click",
    () =>
      downloadText(
        buildIdentificationNgc(
          currentData,
          currentThickness
        ),
        "00-identificacao.ngc"
      )
  );

  ui.individualDownloads.appendChild(
    idButton
  );

  data.powers.forEach(
    (
      power,
      index
    ) => {
      const sequence =
        String(
          index + 1
        ).padStart(
          2,
          "0"
        );

      const filename =
        `${sequence}-pot-${powerFilePart(power)}.ngc`;

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "file-button";

      button.innerHTML = `
        <strong>
          ${filename}
        </strong>

        <small>
          ${data.operation.label.toLowerCase()} • painel em ${power}%
        </small>
      `;

      button.addEventListener(
        "click",
        () =>
          downloadText(
            buildPowerNgc(
              currentData,
              currentThickness,
              index
            ),
            filename
          )
      );

      ui.individualDownloads.appendChild(
        button
      );
    }
  );
}

function initializeCustom() {
  const operationKey =
    ui.operation.value;

  const material =
    MATERIALS[
      ui.material.value
    ];

  ui.customPowers.value =
    material
      .powers[
        operationKey
      ]
      .standard
      .join(", ");

  ui.customSpeeds.value =
    OPERATIONS[
      operationKey
    ]
      .speeds
      .standard
      .join(", ");

  customInitialized =
    true;
}

function updateOperationUi(
  operation
) {
  const isCut =
    operation.slug === "corte";

  ui.machineLimitText.textContent =
    isCut
      ? `Corte: limite adotado para esta VS6040 = ${operation.speedLimit} mm/s.`
      : `${operation.label}: faixa experimental do gerador = até ${operation.speedLimit} mm/s.`;

  ui.operationInfo.innerHTML = `
    <strong>
      ${operation.label}
    </strong>

    <span>
      ${operation.description}
    </span>
  `;

  if (
    isCut
  ) {
    ui.parameterStatus.className =
      "parameter-status validated";

    ui.parameterStatus.innerHTML = `
      <strong>
        Configuração específica para VS6040
      </strong>

      O gerador limita os arquivos de corte a ${operation.speedLimit} mm/s.
    `;
  } else {
    ui.parameterStatus.className =
      "parameter-status experimental";

    ui.parameterStatus.innerHTML = `
      <strong>
        Parâmetros experimentais
      </strong>

      Os presets de ${operation.label.toLowerCase()} ainda precisam ser validados fisicamente na VS6040.
      O teto de ${operation.speedLimit} mm/s é um limite conservador do gerador, não um limite validado da máquina.
    `;
  }

  ui.customSpeedHelp.textContent =
    isCut
      ? `Valores entre 0,1 e ${operation.speedLimit} mm/s. Limite aplicado pelo gerador para corte na VS6040.`
      : `Valores entre 0,1 e ${operation.speedLimit} mm/s. Faixa experimental desta versão.`;

  ui.previewTitle.textContent =
    `Padrão de ${operation.label.toLowerCase()}`;

  ui.testLegend.textContent =
    operation.label;

  ui.testSwatch.classList.toggle(
    "cut",
    isCut
  );

  ui.testSwatch.classList.toggle(
    "engrave",
    !isCut
  );
}

function clearInvalidState(
  text
) {
  currentData =
    null;

  currentSvg =
    "";

  ui.preview.innerHTML =
    "";

  ui.procedureSteps.innerHTML =
    "";

  ui.individualDownloads.innerHTML =
    "";

  ui.message.textContent =
    text;

  ui.powerRange.textContent =
    "—";

  ui.matrixSize.textContent =
    "—";

  ui.powerValues.innerHTML =
    "";

  ui.speedValues.innerHTML =
    "";

  ui.packageButton.disabled =
    true;

  ui.svgButton.disabled =
    true;
}

function updateInterface() {
  const operation =
    OPERATIONS[
      ui.operation.value
    ];

  updateOperationUi(
    operation
  );

  const custom =
    ui.pattern.value === "custom";

  ui.customPanel.hidden =
    !custom;

  if (
    custom &&
    !customInitialized
  ) {
    initializeCustom();
  }

  const thickness =
    Number(
      ui.thickness.value
    );

  if (
    !Number.isFinite(thickness) ||
    thickness <= 0
  ) {
    clearInvalidState(
      "Informe uma espessura válida."
    );

    return;
  }

  try {
    const data =
      getPresetData();

    if (
      data.speeds.some(
        speed =>
          speed >
          data.operation.speedLimit
      )
    ) {
      throw new Error(
        `Velocidade máxima permitida no modo ${data.operation.label}: ${data.operation.speedLimit} mm/s.`
      );
    }

    currentData =
      data;

    currentThickness =
      thickness;

    const combinations =
      data.powers.length *
      data.speeds.length;

    ui.powerRange.textContent =
      `${formatNumber(Math.min(...data.powers))}–${formatNumber(Math.max(...data.powers))}%`;

    ui.matrixSize.textContent =
      `${data.powers.length} × ${data.speeds.length}`;

    ui.powerValues.innerHTML =
      `<strong>Potências:</strong> ${data.powers.map(formatNumber).join(" • ")} %`;

    ui.speedValues.innerHTML =
      `<strong>Velocidades:</strong> ${data.speeds.map(formatNumber).join(" • ")} mm/s`;

    ui.previewDescription.textContent =
      `${combinations} combinações • ${data.powers.length} potências × ${data.speeds.length} velocidades`;

    currentSvg =
      buildSvg(
        data,
        thickness
      );

    ui.preview.innerHTML =
      currentSvg.replace(
        /^<\?xml[^>]*>\s*/i,
        ""
      );

    renderProcedure(
      data
    );

    renderIndividualDownloads(
      data
    );

    ui.message.textContent =
      "";

    ui.packageButton.disabled =
      false;

    ui.svgButton.disabled =
      false;
  } catch (
    error
  ) {
    clearInvalidState(
      error.message
    );
  }
}

ui.operation.addEventListener(
  "change",
  () => {
    customInitialized =
      false;

    updateInterface();
  }
);

ui.material.addEventListener(
  "change",
  () => {
    if (
      ui.pattern.value === "custom"
    ) {
      customInitialized =
        false;
    }

    updateInterface();
  }
);

ui.thickness.addEventListener(
  "input",
  updateInterface
);

ui.pattern.addEventListener(
  "change",
  () => {
    if (
      ui.pattern.value === "custom"
    ) {
      customInitialized =
        false;
    }

    updateInterface();
  }
);

ui.customPowers.addEventListener(
  "input",
  updateInterface
);

ui.customSpeeds.addEventListener(
  "input",
  updateInterface
);

ui.packageButton.addEventListener(
  "click",
  downloadPackage
);

ui.svgButton.addEventListener(
  "click",
  () => {
    if (
      !currentData
    ) {
      return;
    }

    downloadText(
      currentSvg,
      `${getPackageName(currentData, currentThickness)}_referencia.svg`,
      "image/svg+xml"
    );
  }
);

ui.appVersion.textContent =
  `v${APP_VERSION}`;

updateInterface();
