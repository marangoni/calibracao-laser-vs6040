"use strict";


/* ========================================================== */
/* VERSÃO                                                     */
/* ========================================================== */

const APP_VERSION = "0.4.1";


/* ========================================================== */
/* MÁQUINA                                                    */
/* ========================================================== */

const MACHINE = {

  model: "VISUTEC VS6040",

  maxCutSpeed: 20,

  maxEngraveSpeed: 400,

  identificationSpeed: 20

};


/* ========================================================== */
/* MATERIAIS                                                  */
/* ========================================================== */

const MATERIALS = {

  eva: {

    label: "EVA",

    powerMin: 2,

    powerMax: 20,

    powers: {

      quick: [
        2,
        10,
        20
      ],

      standard: [
        2,
        5,
        10,
        15,
        20
      ],

      detailed: [
        2,
        5,
        8,
        10,
        12,
        15,
        20
      ]

    }

  },


  mdf_claro: {

    label: "MDF claro",

    powerMin: 10,

    powerMax: 60,

    powers: {

      quick: [
        10,
        30,
        60
      ],

      standard: [
        10,
        20,
        30,
        45,
        60
      ],

      detailed: [
        10,
        20,
        30,
        40,
        45,
        50,
        60
      ]

    }

  },


  mdf_escuro: {

    label: "MDF escuro",

    powerMin: 10,

    powerMax: 80,

    powers: {

      quick: [
        10,
        40,
        80
      ],

      standard: [
        10,
        25,
        40,
        60,
        80
      ],

      detailed: [
        10,
        20,
        30,
        40,
        50,
        60,
        80
      ]

    }

  },


  papelao: {

    label: "Papelão",

    powerMin: 5,

    powerMax: 30,

    powers: {

      quick: [
        5,
        15,
        30
      ],

      standard: [
        5,
        10,
        15,
        20,
        30
      ],

      detailed: [
        5,
        8,
        10,
        15,
        20,
        25,
        30
      ]

    }

  }

};


/* ========================================================== */
/* PADRÕES DE VELOCIDADE                                      */
/* ========================================================== */

const PATTERNS = {

  quick: {

    label: "Rápido",

    speeds: [
      5,
      12,
      20
    ]

  },


  standard: {

    label: "Padrão",

    speeds: [
      5,
      8,
      12,
      16,
      20
    ]

  },


  detailed: {

    label: "Detalhado",

    speeds: [
      5,
      7,
      10,
      12,
      15,
      17,
      20
    ]

  }

};


/* ========================================================== */
/* GEOMETRIA                                                  */
/* ========================================================== */

const GEOMETRY = {

  cell: 15,

  gap: 4,

  margin: 5,

  leftArea: 22,

  headerArea: 35,

  footerArea: 8,

  cutStroke: 0.18,

  engraveStroke: 0.18,

  anchorLength: 0.1

};


const CUT_COLOR = "#ff0000";

const ENGRAVE_COLOR = "#0000ff";


/* ========================================================== */
/* FONTE 5 × 7                                                */
/* ========================================================== */

const FONT = {

  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000"
  ],

  "A": [
    "01110",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
    "10001"
  ],

  "B": [
    "11110",
    "10001",
    "10001",
    "11110",
    "10001",
    "10001",
    "11110"
  ],

  "C": [
    "01111",
    "10000",
    "10000",
    "10000",
    "10000",
    "10000",
    "01111"
  ],

  "D": [
    "11110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "11110"
  ],

  "E": [
    "11111",
    "10000",
    "10000",
    "11110",
    "10000",
    "10000",
    "11111"
  ],

  "F": [
    "11111",
    "10000",
    "10000",
    "11110",
    "10000",
    "10000",
    "10000"
  ],

  "G": [
    "01111",
    "10000",
    "10000",
    "10111",
    "10001",
    "10001",
    "01111"
  ],

  "H": [
    "10001",
    "10001",
    "10001",
    "11111",
    "10001",
    "10001",
    "10001"
  ],

  "I": [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "11111"
  ],

  "J": [
    "00111",
    "00010",
    "00010",
    "00010",
    "10010",
    "10010",
    "01100"
  ],

  "K": [
    "10001",
    "10010",
    "10100",
    "11000",
    "10100",
    "10010",
    "10001"
  ],

  "L": [
    "10000",
    "10000",
    "10000",
    "10000",
    "10000",
    "10000",
    "11111"
  ],

  "M": [
    "10001",
    "11011",
    "10101",
    "10101",
    "10001",
    "10001",
    "10001"
  ],

  "N": [
    "10001",
    "11001",
    "10101",
    "10011",
    "10001",
    "10001",
    "10001"
  ],

  "O": [
    "01110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110"
  ],

  "P": [
    "11110",
    "10001",
    "10001",
    "11110",
    "10000",
    "10000",
    "10000"
  ],

  "Q": [
    "01110",
    "10001",
    "10001",
    "10001",
    "10101",
    "10010",
    "01101"
  ],

  "R": [
    "11110",
    "10001",
    "10001",
    "11110",
    "10100",
    "10010",
    "10001"
  ],

  "S": [
    "01111",
    "10000",
    "10000",
    "01110",
    "00001",
    "00001",
    "11110"
  ],

  "T": [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100"
  ],

  "U": [
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110"
  ],

  "V": [
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01010",
    "00100"
  ],

  "W": [
    "10001",
    "10001",
    "10001",
    "10101",
    "10101",
    "10101",
    "01010"
  ],

  "X": [
    "10001",
    "10001",
    "01010",
    "00100",
    "01010",
    "10001",
    "10001"
  ],

  "Y": [
    "10001",
    "10001",
    "01010",
    "00100",
    "00100",
    "00100",
    "00100"
  ],

  "Z": [
    "11111",
    "00001",
    "00010",
    "00100",
    "01000",
    "10000",
    "11111"
  ],

  "0": [
    "01110",
    "10001",
    "10011",
    "10101",
    "11001",
    "10001",
    "01110"
  ],

  "1": [
    "00100",
    "01100",
    "00100",
    "00100",
    "00100",
    "00100",
    "01110"
  ],

  "2": [
    "01110",
    "10001",
    "00001",
    "00010",
    "00100",
    "01000",
    "11111"
  ],

  "3": [
    "11110",
    "00001",
    "00001",
    "01110",
    "00001",
    "00001",
    "11110"
  ],

  "4": [
    "00010",
    "00110",
    "01010",
    "10010",
    "11111",
    "00010",
    "00010"
  ],

  "5": [
    "11111",
    "10000",
    "10000",
    "11110",
    "00001",
    "00001",
    "11110"
  ],

  "6": [
    "01110",
    "10000",
    "10000",
    "11110",
    "10001",
    "10001",
    "01110"
  ],

  "7": [
    "11111",
    "00001",
    "00010",
    "00100",
    "01000",
    "01000",
    "01000"
  ],

  "8": [
    "01110",
    "10001",
    "10001",
    "01110",
    "10001",
    "10001",
    "01110"
  ],

  "9": [
    "01110",
    "10001",
    "10001",
    "01111",
    "00001",
    "00001",
    "01110"
  ],

  "%": [
    "11001",
    "11010",
    "00100",
    "01000",
    "10110",
    "00110",
    "00000"
  ],

  "/": [
    "00001",
    "00010",
    "00010",
    "00100",
    "01000",
    "01000",
    "10000"
  ],

  "-": [
    "00000",
    "00000",
    "00000",
    "11111",
    "00000",
    "00000",
    "00000"
  ],

  ".": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "01100",
    "01100"
  ],

  ":": [
    "00000",
    "01100",
    "01100",
    "00000",
    "01100",
    "01100",
    "00000"
  ]

};


/* ========================================================== */
/* ELEMENTOS                                                  */
/* ========================================================== */

const materialSelect =
  document.getElementById("material");

const thicknessInput =
  document.getElementById("thickness");

const patternSelect =
  document.getElementById("pattern");

const customPanel =
  document.getElementById("customPanel");

const customPowersInput =
  document.getElementById("customPowers");

const customSpeedsInput =
  document.getElementById("customSpeeds");

const powerRange =
  document.getElementById("powerRange");

const matrixSize =
  document.getElementById("matrixSize");

const powerValues =
  document.getElementById("powerValues");

const speedValues =
  document.getElementById("speedValues");

const previewDescription =
  document.getElementById("previewDescription");

const preview =
  document.getElementById("preview");

const procedureSteps =
  document.getElementById("procedureSteps");

const individualDownloads =
  document.getElementById("individualDownloads");

const downloadPackageButton =
  document.getElementById("downloadPackageButton");

const downloadSvgButton =
  document.getElementById("downloadSvgButton");

const message =
  document.getElementById("message");

const appVersion =
  document.getElementById("appVersion");


/* ========================================================== */
/* ESTADO                                                     */
/* ========================================================== */

let currentData = null;

let currentThickness = 0;

let currentSvg = "";

let customInitialized = false;


/* ========================================================== */
/* UTILIDADES                                                 */
/* ========================================================== */

function normalizeAscii(text) {

  return String(text)

    .normalize("NFD")

    .replace(
      /[\u0300-\u036f]/g,
      ""
    )

    .toUpperCase();

}


/* ---------------------------------------------------------- */

function safeFilePart(text) {

  return normalizeAscii(text)

    .toLowerCase()

    .replace(
      /[^a-z0-9]+/g,
      "_"
    )

    .replace(
      /^_+|_+$/g,
      ""
    );

}


/* ---------------------------------------------------------- */

function formatNumber(value) {

  return Number(value)

    .toLocaleString(
      "pt-BR",
      {
        maximumFractionDigits: 2
      }
    );

}


/* ---------------------------------------------------------- */

function formatThickness(value) {

  return Number(value)

    .toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
      }
    );

}


/* ---------------------------------------------------------- */

function thicknessForFilename(value) {

  const number =
    Number(value);

  if (
    Number.isInteger(number)
  ) {

    return `${number}mm`;

  }

  return `${String(number).replace(".", "p")}mm`;

}


/* ---------------------------------------------------------- */

function gNumber(value) {

  return Number(value)
    .toFixed(3);

}


/* ---------------------------------------------------------- */

function parseNumberList(
  text,
  min,
  max,
  label
) {

  const values =
    text

      .trim()

      .split(
        /[;,\s]+/
      )

      .filter(Boolean)

      .map(Number);


  if (
    values.length === 0 ||
    values.some(
      value =>
        !Number.isFinite(value)
    )
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


  const unique =
    [
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


/* ========================================================== */
/* DATA                                                       */
/* ========================================================== */

function getDateStamp() {

  const now =
    new Date();


  const months =
    [
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


  const day =
    String(
      now.getDate()
    )
      .padStart(
        2,
        "0"
      );


  const month =
    months[
      now.getMonth()
    ];


  const year =
    now.getFullYear();


  return `${day}_${month}_${year}`;

}


/* ========================================================== */
/* PRESET                                                     */
/* ========================================================== */

function getPresetData() {

  const material =
    MATERIALS[
      materialSelect.value
    ];


  const patternKey =
    patternSelect.value;


  if (
    patternKey === "custom"
  ) {

    return {

      material,

      patternKey,

      patternLabel:
        "Personalizado",

      powers:
        parseNumberList(
          customPowersInput.value,
          1,
          100,
          "potência"
        ),

      speeds:
        parseNumberList(
          customSpeedsInput.value,
          0.1,
          MACHINE.maxCutSpeed,
          "velocidade de corte"
        )

    };

  }


  return {

    material,

    patternKey,

    patternLabel:
      PATTERNS[
        patternKey
      ].label,

    powers:
      material
        .powers[
          patternKey
        ],

    speeds:
      PATTERNS[
        patternKey
      ].speeds

  };

}


/* ========================================================== */
/* LAYOUT                                                     */
/* ========================================================== */

function getLayout(data) {

  const pitch =
    GEOMETRY.cell +
    GEOMETRY.gap;


  const gridWidth =

    data.speeds.length *
      GEOMETRY.cell

    +

    Math.max(
      0,
      data.speeds.length - 1
    ) *
      GEOMETRY.gap;


  const gridHeight =

    data.powers.length *
      GEOMETRY.cell

    +

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


  const width =

    gridX +
    gridWidth +
    GEOMETRY.margin;


  const height =

    gridY +
    gridHeight +
    GEOMETRY.footerArea;


  return {

    pitch,

    gridWidth,

    gridHeight,

    gridX,

    gridY,

    width,

    height

  };

}


/* ========================================================== */
/* FONTE VETORIAL                                             */
/* ========================================================== */

function measureText(
  text,
  height
) {

  const normalized =
    normalizeAscii(text);


  const unit =
    height / 7;


  const charWidth =
    unit * 5;


  const spacing =
    unit * 1.5;


  if (
    normalized.length === 0
  ) {

    return 0;

  }


  return (

    normalized.length *
      charWidth

    +

    (
      normalized.length - 1
    ) *
      spacing

  );

}


/* ---------------------------------------------------------- */

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


  let startX =
    x;


  if (
    align === "center"
  ) {

    startX =
      x -
      totalWidth / 2;

  }


  if (
    align === "right"
  ) {

    startX =
      x -
      totalWidth;

  }


  const segments =
    [];


  let cursorX =
    startX;


  for (
    const character
    of normalized
  ) {

    const glyph =
      FONT[
        character
      ]
      ||
      FONT[" "];


    for (
      let row = 0;
      row < 7;
      row += 1
    ) {

      let runStart =
        null;


      for (
        let col = 0;
        col <= 5;
        col += 1
      ) {

        const active =

          col < 5

          &&
          glyph[row][col] === "1";


        if (
          active &&
          runStart === null
        ) {

          runStart =
            col;

        }


        if (
          !active &&
          runStart !== null
        ) {

          const runEnd =
            col;


          segments.push(
            {
              x1:
                cursorX +
                runStart * unit,

              y1:
                y +
                (
                  row + 0.5
                ) * unit,

              x2:
                cursorX +
                (
                  runEnd -
                  0.18
                ) * unit,

              y2:
                y +
                (
                  row + 0.5
                ) * unit
            }
          );


          runStart =
            null;

        }

      }

    }


    cursorX +=
      charWidth +
      spacing;

  }


  return segments;

}


/* ========================================================== */
/* IDENTIFICAÇÃO                                              */
/* ========================================================== */

function buildIdentificationSegments(
  data,
  thickness
) {

  const layout =
    getLayout(data);


  const segments =
    [];


  function addText(
    text,
    x,
    y,
    height,
    align = "left"
  ) {

    segments.push(
      ...textSegments(
        text,
        x,
        y,
        height,
        align
      )
    );

  }


  addText(
    "CALIBRACAO DE CORTE LASER",
    GEOMETRY.margin,
    4,
    4.0
  );


  addText(
    MACHINE.model,
    GEOMETRY.margin,
    9,
    2.0
  );


  addText(
    `MATERIAL: ${data.material.label}`,
    GEOMETRY.margin,
    13,
    2.1
  );


  addText(
    `ESPESSURA: ${formatThickness(thickness)}MM`,
    GEOMETRY.margin,
    17,
    2.1
  );


  addText(
    `PADRAO: ${data.patternLabel}`,
    GEOMETRY.margin,
    21,
    2.1
  );


  addText(
    "VELOCIDADE MM/S",
    layout.gridX +
      layout.gridWidth / 2,
    25,
    2.7,
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
          layout.pitch

        +

        GEOMETRY.cell /
          2;


      addText(
        String(speed),
        centerX,
        30,
        2.4,
        "center"
      );

    }
  );


  addText(
    "POT %",
    GEOMETRY.margin,
    30,
    2.4
  );


  data.powers.forEach(
    (
      power,
      row
    ) => {

      const labelHeight =
        2.5;


      const y =

        layout.gridY +

        row *
          layout.pitch

        +

        (
          GEOMETRY.cell -
          labelHeight
        ) /
          2;


      addText(
        `${power}%`,
        layout.gridX -
          3,
        y,
        labelHeight,
        "right"
      );

    }
  );


  return segments;

}


/* ========================================================== */
/* SVG                                                        */
/* ========================================================== */

function buildSvg(
  data,
  thickness
) {

  const layout =
    getLayout(data);


  const identification =
    buildIdentificationSegments(
      data,
      thickness
    );


  const blueLines =

    identification

      .map(
        segment => `

<line
  x1="${segment.x1}"
  y1="${segment.y1}"
  x2="${segment.x2}"
  y2="${segment.y2}"
  stroke="${ENGRAVE_COLOR}"
  stroke-width="${GEOMETRY.engraveStroke}"
  stroke-linecap="round"
/>`

      )

      .join("\n");


  const redSquares =
    [];


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


          redSquares.push(
`

<rect
  x="${x}"
  y="${y}"
  width="${GEOMETRY.cell}"
  height="${GEOMETRY.cell}"
  fill="none"
  stroke="${CUT_COLOR}"
  stroke-width="${GEOMETRY.cutStroke}"
  data-power="${power}"
  data-speed="${speed}"
/>`
          );

        }
      );

    }
  );


  return `<?xml version="1.0" encoding="UTF-8"?>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${layout.width}mm"
  height="${layout.height}mm"
  viewBox="0 0 ${layout.width} ${layout.height}"
>

  <title>
    Calibracao Laser - ${data.material.label}
  </title>

  <g id="identificacao">
    ${blueLines}
  </g>

  <g id="cortes">
    ${redSquares.join("\n")}
  </g>

</svg>`;

}


/* ========================================================== */
/* SVG -> COORDENADAS G-CODE                                  */
/* ========================================================== */

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


/* ========================================================== */
/* CABEÇALHO G-CODE                                           */
/* ========================================================== */

function ngcHeader(
  data,
  thickness,
  description
) {

  return [

    `(UbuntuMaker - Calibracao Laser)`,

    `(Gerador versao ${APP_VERSION})`,

    `(Maquina: ${MACHINE.model})`,

    `(Velocidade maxima de corte: ${MACHINE.maxCutSpeed} mm/s)`,

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


/* ========================================================== */
/* ÂNCORAS                                                    */
/* ========================================================== */

function addReferenceAnchors(
  lines,
  layout
) {

  const feed =
    MACHINE.maxCutSpeed *
    60;


  lines.push(
    "(Reference anchors - laser OFF)"
  );


  lines.push(
    "S0"
  );


  lines.push(
    "G0 X0.000 Y0.000"
  );


  lines.push(
    `G1 X${gNumber(GEOMETRY.anchorLength)} Y0.000 F${feed}`
  );


  lines.push(
    `G0 X${gNumber(layout.width)} Y${gNumber(layout.height)}`
  );


  lines.push(
    `G1 X${gNumber(layout.width - GEOMETRY.anchorLength)} Y${gNumber(layout.height)} F${feed}`
  );


  lines.push(
    ""
  );

}


/* ========================================================== */
/* 00 - IDENTIFICAÇÃO                                         */
/* ========================================================== */

function buildIdentificationNgc(
  data,
  thickness
) {

  const layout =
    getLayout(data);


  const segments =
    buildIdentificationSegments(
      data,
      thickness
    );


  const lines =
    ngcHeader(
      data,
      thickness,
      "IDENTIFICACAO - AJUSTAR POTENCIA BAIXA NO PAINEL"
    );


  addReferenceAnchors(
    lines,
    layout
  );


  const feed =

    Math.round(
      MACHINE.identificationSpeed *
      60
    );


  lines.push(
    `(Velocidade de identificacao: ${MACHINE.identificationSpeed} mm/s)`
  );


  lines.push(
    ""
  );


  segments.forEach(
    segment => {

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
        "S0"
      );


      lines.push(
        `G0 X${gNumber(start.x)} Y${gNumber(start.y)}`
      );


      lines.push(
        "S1"
      );


      lines.push(
        `G1 X${gNumber(end.x)} Y${gNumber(end.y)} F${feed}`
      );


      lines.push(
        "S0"
      );

    }
  );


  lines.push(
    ""
  );


  lines.push(
    "S0"
  );


  lines.push(
    "M2"
  );


  lines.push(
    ""
  );


  return lines.join(
    "\n"
  );

}


/* ========================================================== */
/* NGC POR POTÊNCIA                                           */
/* ========================================================== */

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
        MACHINE.maxCutSpeed
      ) {

        throw new Error(
          `Velocidade de ${speed} mm/s excede o limite de corte de ${MACHINE.maxCutSpeed} mm/s da ${MACHINE.model}.`
        );

      }


      const svgX =

        layout.gridX +

        column *
          layout.pitch;


      const svgY =

        layout.gridY +

        powerIndex *
          layout.pitch;


      const path =
        [

          [
            svgX,
            svgY
          ],

          [
            svgX +
              GEOMETRY.cell,
            svgY
          ],

          [
            svgX +
              GEOMETRY.cell,
            svgY +
              GEOMETRY.cell
          ],

          [
            svgX,
            svgY +
              GEOMETRY.cell
          ],

          [
            svgX,
            svgY
          ]

        ];


      const points =

        path.map(
          point =>
            toGcodePoint(
              point[0],
              point[1],
              layout
            )
        );


      const feed =

        Math.round(
          speed *
          60
        );


      lines.push(
        `(Power ${power}% - Speed ${speed} mm/s)`
      );


      lines.push(
        "S0"
      );


      lines.push(
        `G0 X${gNumber(points[0].x)} Y${gNumber(points[0].y)}`
      );


      lines.push(
        "S1"
      );


      for (
        let i = 1;
        i < points.length;
        i += 1
      ) {

        const point =
          points[i];


        if (
          i === 1
        ) {

          lines.push(
            `G1 X${gNumber(point.x)} Y${gNumber(point.y)} F${feed}`
          );

        }
        else {

          lines.push(
            `G1 X${gNumber(point.x)} Y${gNumber(point.y)}`
          );

        }

      }


      lines.push(
        "S0"
      );


      lines.push(
        ""
      );

    }
  );


  lines.push(
    "S0"
  );


  lines.push(
    "M2"
  );


  lines.push(
    ""
  );


  return lines.join(
    "\n"
  );

}


/* ========================================================== */
/* NOMES                                                      */
/* ========================================================== */

function getPackageName(
  data,
  thickness
) {

  return [

    "calibracao",

    safeFilePart(
      data.material.label
    ),

    thicknessForFilename(
      thickness
    ),

    safeFilePart(
      data.patternLabel
    ),

    getDateStamp()

  ].join(
    "_"
  );

}


/* ---------------------------------------------------------- */

function powerFilePart(
  power
) {

  const number =
    Number(power);


  if (
    Number.isInteger(number)
  ) {

    return String(number)
      .padStart(
        2,
        "0"
      );

  }


  return String(number)
    .replace(
      ".",
      "p"
    );

}


/* ========================================================== */
/* LEIA-ME                                                    */
/* ========================================================== */

function buildReadme(
  data,
  thickness
) {

  const lines =
    [];


  lines.push(
    "CALIBRACAO DE CORTE LASER"
  );


  lines.push(
    ""
  );


  lines.push(
    `Maquina: ${MACHINE.model}`
  );


  lines.push(
    `Velocidade maxima de corte adotada: ${MACHINE.maxCutSpeed} mm/s`
  );


  lines.push(
    `Velocidade da identificacao vetorial: ${MACHINE.identificationSpeed} mm/s`
  );


  lines.push(
    ""
  );


  lines.push(
    `Material: ${data.material.label}`
  );


  lines.push(
    `Espessura: ${formatThickness(thickness)} mm`
  );


  lines.push(
    `Padrao: ${data.patternLabel}`
  );


  lines.push(
    ""
  );


  lines.push(
    `Potencias: ${data.powers.join(", ")} %`
  );


  lines.push(
    `Velocidades de corte: ${data.speeds.join(", ")} mm/s`
  );


  lines.push(
    ""
  );


  lines.push(
    "ORDEM DE EXECUCAO"
  );


  lines.push(
    ""
  );


  lines.push(
    "1. Abra 00-identificacao.ngc."
  );


  lines.push(
    "   Ajuste uma potencia baixa de gravacao no painel."
  );


  lines.push(
    `   O arquivo utiliza ${MACHINE.identificationSpeed} mm/s.`
  );


  data.powers.forEach(
    (
      power,
      index
    ) => {

      const sequence =
        String(
          index + 1
        )
          .padStart(
            2,
            "0"
          );


      lines.push(
        ""
      );


      lines.push(
        `${index + 2}. Ajuste a potencia do painel para ${power}%.`
      );


      lines.push(
        `   Execute ${sequence}-pot-${powerFilePart(power)}.ngc.`
      );

    }
  );


  lines.push(
    ""
  );


  lines.push(
    "IMPORTANTE"
  );


  lines.push(
    ""
  );


  lines.push(
    "- Nao mova o material entre as etapas."
  );


  lines.push(
    "- Nao altere a origem da maquina entre as etapas."
  );


  lines.push(
    "- A potencia do laser e ajustada manualmente no painel."
  );


  lines.push(
    "- Os arquivos NGC controlam automaticamente as velocidades."
  );


  lines.push(
    `- O gerador nao permite velocidades de corte acima de ${MACHINE.maxCutSpeed} mm/s.`
  );


  lines.push(
    ""
  );


  lines.push(
    `Gerador UbuntuMaker v${APP_VERSION}`
  );


  lines.push(
    `Data: ${getDateStamp().replaceAll("_", " ")}`
  );


  lines.push(
    ""
  );


  return lines.join(
    "\n"
  );

}


/* ========================================================== */
/* DOWNLOAD SIMPLES                                           */
/* ========================================================== */

function downloadBlob(
  blob,
  filename
) {

  const url =
    URL.createObjectURL(
      blob
    );


  const anchor =
    document.createElement(
      "a"
    );


  anchor.href =
    url;


  anchor.download =
    filename;


  document.body.appendChild(
    anchor
  );


  anchor.click();


  anchor.remove();


  setTimeout(
    () => {

      URL.revokeObjectURL(
        url
      );

    },
    100
  );

}


/* ---------------------------------------------------------- */

function downloadText(
  text,
  filename,
  type = "text/plain"
) {

  const blob =
    new Blob(
      [
        text
      ],
      {
        type:
          `${type};charset=utf-8`
      }
    );


  downloadBlob(
    blob,
    filename
  );

}


/* ========================================================== */
/* CRC32                                                      */
/* ========================================================== */

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

      let c =
        i;


      for (
        let j = 0;
        j < 8;
        j += 1
      ) {

        c =

          (
            c & 1
          )

          ?

            (
              0xEDB88320 ^
              (
                c >>> 1
              )
            )

          :

            (
              c >>> 1
            );

      }


      table[i] =
        c >>> 0;

    }


    return table;

  })();


/* ---------------------------------------------------------- */

function crc32(bytes) {

  let crc =
    0xFFFFFFFF;


  for (
    const byte
    of bytes
  ) {

    crc =

      CRC_TABLE[
        (
          crc ^
          byte
        ) &
        0xFF
      ]

      ^

      (
        crc >>>
        8
      );

  }


  return (
    crc ^
    0xFFFFFFFF
  ) >>> 0;

}


/* ========================================================== */
/* ZIP                                                        */
/* ========================================================== */

function pushUint16(
  array,
  value
) {

  array.push(
    value &
      0xFF,

    (
      value >>>
      8
    ) &
      0xFF
  );

}


/* ---------------------------------------------------------- */

function pushUint32(
  array,
  value
) {

  array.push(
    value &
      0xFF,

    (
      value >>>
      8
    ) &
      0xFF,

    (
      value >>>
      16
    ) &
      0xFF,

    (
      value >>>
      24
    ) &
      0xFF
  );

}


/* ---------------------------------------------------------- */

function getDosDateTime(date) {

  const year =
    Math.max(
      1980,
      date.getFullYear()
    );


  const dosTime =

    (
      date.getHours()
      <<
      11
    )

    |

    (
      date.getMinutes()
      <<
      5
    )

    |

    Math.floor(
      date.getSeconds() /
      2
    );


  const dosDate =

    (
      (
        year -
        1980
      )
      <<
      9
    )

    |

    (
      (
        date.getMonth() +
        1
      )
      <<
      5
    )

    |

    date.getDate();


  return {

    dosTime,

    dosDate

  };

}


/* ---------------------------------------------------------- */

function concatBytes(arrays) {

  const total =

    arrays.reduce(
      (
        sum,
        array
      ) =>
        sum +
        array.length,
      0
    );


  const result =
    new Uint8Array(
      total
    );


  let offset =
    0;


  arrays.forEach(
    array => {

      result.set(
        array,
        offset
      );


      offset +=
        array.length;

    }
  );


  return result;

}


/* ---------------------------------------------------------- */

function createZip(files) {

  const encoder =
    new TextEncoder();


  const localParts =
    [];


  const centralParts =
    [];


  let localOffset =
    0;


  const now =
    new Date();


  const {
    dosTime,
    dosDate
  } =
    getDosDateTime(
      now
    );


  files.forEach(
    file => {

      const nameBytes =
        encoder.encode(
          file.name
        );


      const dataBytes =

        file.data
          instanceof Uint8Array

        ?

          file.data

        :

          encoder.encode(
            file.data
          );


      const crc =
        crc32(
          dataBytes
        );


      const localHeader =
        [];


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


      const centralHeader =
        [];


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
  );


  const localData =
    concatBytes(
      localParts
    );


  const centralData =
    concatBytes(
      centralParts
    );


  const end =
    [];


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


/* ========================================================== */
/* PACOTE                                                     */
/* ========================================================== */

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


  const files =
    [];


  files.push(
    {
      name:
        `${folder}00-identificacao.ngc`,

      data:
        buildIdentificationNgc(
          data,
          thickness
        )
    }
  );


  data.powers.forEach(
    (
      power,
      index
    ) => {

      const sequence =
        String(
          index + 1
        )
          .padStart(
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


/* ========================================================== */
/* DOWNLOAD PACOTE                                            */
/* ========================================================== */

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


  const zipBytes =
    createZip(
      files
    );


  const blob =
    new Blob(
      [
        zipBytes
      ],
      {
        type:
          "application/zip"
      }
    );


  downloadBlob(
    blob,
    `${packageName}.zip`
  );

}


/* ========================================================== */
/* PROCEDIMENTO                                               */
/* ========================================================== */

function renderProcedure(data) {

  procedureSteps.innerHTML =
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


  procedureSteps.appendChild(
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
    Potência ${power}%
  </strong>

  <small>
    Ajuste o painel para ${power}% e execute a linha
    com velocidades ${data.speeds.join(" / ")} mm/s.
  </small>

</div>

`;


      procedureSteps.appendChild(
        element
      );

    }
  );

}


/* ========================================================== */
/* DOWNLOADS INDIVIDUAIS                                      */
/* ========================================================== */

function renderIndividualDownloads(data) {

  individualDownloads.innerHTML =
    "";


  const identificationButton =
    document.createElement(
      "button"
    );


  identificationButton.className =
    "file-button";


  identificationButton.innerHTML = `

<strong>
  00-identificacao.ngc
</strong>

<small>
  identificação a ${MACHINE.identificationSpeed} mm/s
</small>

`;


  identificationButton.addEventListener(
    "click",
    () => {

      downloadText(
        buildIdentificationNgc(
          currentData,
          currentThickness
        ),
        "00-identificacao.ngc"
      );

    }
  );


  individualDownloads.appendChild(
    identificationButton
  );


  data.powers.forEach(
    (
      power,
      index
    ) => {

      const sequence =
        String(
          index + 1
        )
          .padStart(
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
  painel em ${power}%
</small>

`;


      button.addEventListener(
        "click",
        () => {

          downloadText(
            buildPowerNgc(
              currentData,
              currentThickness,
              index
            ),
            filename
          );

        }
      );


      individualDownloads.appendChild(
        button
      );

    }
  );

}


/* ========================================================== */
/* PERSONALIZADO                                              */
/* ========================================================== */

function initializeCustom() {

  const material =
    MATERIALS[
      materialSelect.value
    ];


  customPowersInput.value =

    material
      .powers
      .standard
      .join(", ");


  customSpeedsInput.value =

    PATTERNS
      .standard
      .speeds
      .join(", ");


  customInitialized =
    true;

}


/* ========================================================== */
/* ATUALIZAÇÃO                                                */
/* ========================================================== */

function updateInterface() {

  const custom =
    patternSelect.value ===
    "custom";


  customPanel.hidden =
    !custom;


  if (
    custom &&
    !customInitialized
  ) {

    initializeCustom();

  }


  const material =
    MATERIALS[
      materialSelect.value
    ];


  powerRange.textContent =
    `${material.powerMin}–${material.powerMax}%`;


  const thickness =
    Number(
      thicknessInput.value
    );


  if (
    !Number.isFinite(thickness) ||
    thickness <= 0
  ) {

    message.textContent =
      "Informe uma espessura válida.";


    currentData =
      null;


    preview.innerHTML =
      "";


    downloadPackageButton.disabled =
      true;


    downloadSvgButton.disabled =
      true;


    return;

  }


  try {

    const data =
      getPresetData();


    if (
      data.speeds.some(
        speed =>
          speed >
          MACHINE.maxCutSpeed
      )
    ) {

      throw new Error(
        `Velocidade máxima de corte da ${MACHINE.model}: ${MACHINE.maxCutSpeed} mm/s.`
      );

    }


    currentData =
      data;


    currentThickness =
      thickness;


    const combinations =

      data.powers.length *
      data.speeds.length;


    matrixSize.textContent =

      `${data.powers.length} × ${data.speeds.length}`;


    powerValues.innerHTML =

      `<strong>Potências:</strong> ${data.powers.join(" • ")} %`;


    speedValues.innerHTML =

      `<strong>Velocidades:</strong> ${data.speeds.join(" • ")} mm/s`;


    previewDescription.textContent =

      `${combinations} combinações • ` +

      `${data.powers.length} potências × ` +

      `${data.speeds.length} velocidades`;


    currentSvg =
      buildSvg(
        data,
        thickness
      );


    preview.innerHTML =

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


    message.textContent =
      "";


    downloadPackageButton.disabled =
      false;


    downloadSvgButton.disabled =
      false;

  }
  catch (
    error
  ) {

    currentData =
      null;


    currentSvg =
      "";


    preview.innerHTML =
      "";


    procedureSteps.innerHTML =
      "";


    individualDownloads.innerHTML =
      "";


    message.textContent =
      error.message;


    downloadPackageButton.disabled =
      true;


    downloadSvgButton.disabled =
      true;

  }

}


/* ========================================================== */
/* EVENTOS                                                    */
/* ========================================================== */

materialSelect.addEventListener(
  "change",
  () => {

    if (
      patternSelect.value ===
      "custom"
    ) {

      customInitialized =
        false;

    }


    updateInterface();

  }
);


thicknessInput.addEventListener(
  "input",
  updateInterface
);


patternSelect.addEventListener(
  "change",
  updateInterface
);


customPowersInput.addEventListener(
  "input",
  updateInterface
);


customSpeedsInput.addEventListener(
  "input",
  updateInterface
);


downloadPackageButton.addEventListener(
  "click",
  downloadPackage
);


downloadSvgButton.addEventListener(
  "click",
  () => {

    if (
      !currentData
    ) {

      return;

    }


    downloadText(
      currentSvg,
      "referencia.svg",
      "image/svg+xml"
    );

  }
);


/* ========================================================== */
/* INICIALIZAÇÃO                                              */
/* ========================================================== */

if (
  appVersion
) {

  appVersion.textContent =
    `v${APP_VERSION}`;

}


updateInterface();
