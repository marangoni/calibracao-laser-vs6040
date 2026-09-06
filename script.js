"use strict";

const APP_VERSION = "0.7.0";

const MACHINE = {
  model: "VISUTEC VS6040",
  maxCutSpeed: 20,
  experimentalVectorSpeedLimit: 50,
  experimentalRasterSpeedLimit: 250,
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
    label: "Gravação vetorial",
    slug: "gravacao_vetorial",
    description: "Gravação vetorial com linhas horizontais, verticais e diagonais para comparar definição e intensidade.",
    speedLimit: MACHINE.experimentalVectorSpeedLimit,
    parameterStatus: "experimental",
    speeds: {
      quick: [10, 30, 50],
      standard: [10, 20, 30, 40, 50],
      detailed: [10, 15, 20, 25, 30, 40, 50]
    }
  },
  raster: {
    label: "Gravação raster",
    slug: "gravacao_raster",
    description: "Áreas preenchidas em preto para execução pelo Raster Engrave nativo do K40 Whisperer. Cada combinação de potência e velocidade é gerada em um SVG separado.",
    speedLimit: MACHINE.experimentalRasterSpeedLimit,
    parameterStatus: "experimental",
    speeds: {
      quick: [100, 180, 240],
      standard: [80, 120, 160, 200, 240],
      detailed: [60, 90, 120, 150, 180, 210, 240]
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
      raster: {
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
      raster: {
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
      raster: {
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
      raster: {
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

const SUMMARY_GEOMETRY = {
  width: 210,
  height: 148,
  margin: 8,
  gridLeft: 70,
  gridRight: 202,
  cell: 13,
  gap: 3,
  stroke: 0.18,
  anchorLength: 0.1,
  sectionY: {
    engrave: 43,
    raster: 81,
    cut: 119
  }
};

const CUT_COLOR = "#ff0000";
const ENGRAVE_COLOR = "#0000ff";
const RASTER_COLOR = "#000000";

const FONT = {
  " ":["00000","00000","00000","00000","00000","00000","00000"],
  "A":["01110","10001","10001","11111","10001","10001","10001"],
  "B":["11110","10001","10001","11110","10001","10001","11110"],
  "C":["01111","10000","10000","10000","10000","10000","01111"],
  "D":["11110","10001","10001","10001","10001","10001","11110"],
  "E":["11111","10000","10000","11110","10000","10000","11111"],
  "F":["11111","10000","10000","11110","10000","10000","10000"],
  "G":["01111","10000","10000","10111","10001","10001","01111"],
  "H":["10001","10001","10001","11111","10001","10001","10001"],
  "I":["11111","00100","00100","00100","00100","00100","11111"],
  "J":["00111","00010","00010","00010","10010","10010","01100"],
  "K":["10001","10010","10100","11000","10100","10010","10001"],
  "L":["10000","10000","10000","10000","10000","10000","11111"],
  "M":["10001","11011","10101","10101","10001","10001","10001"],
  "N":["10001","11001","10101","10011","10001","10001","10001"],
  "O":["01110","10001","10001","10001","10001","10001","01110"],
  "P":["11110","10001","10001","11110","10000","10000","10000"],
  "Q":["01110","10001","10001","10001","10101","10010","01101"],
  "R":["11110","10001","10001","11110","10100","10010","10001"],
  "S":["01111","10000","10000","01110","00001","00001","11110"],
  "T":["11111","00100","00100","00100","00100","00100","00100"],
  "U":["10001","10001","10001","10001","10001","10001","01110"],
  "V":["10001","10001","10001","10001","10001","01010","00100"],
  "W":["10001","10001","10001","10101","10101","10101","01010"],
  "X":["10001","10001","01010","00100","01010","10001","10001"],
  "Y":["10001","10001","01010","00100","00100","00100","00100"],
  "Z":["11111","00001","00010","00100","01000","10000","11111"],
  "0":["01110","10001","10011","10101","11001","10001","01110"],
  "1":["00100","01100","00100","00100","00100","00100","01110"],
  "2":["01110","10001","00001","00010","00100","01000","11111"],
  "3":["11110","00001","00001","01110","00001","00001","11110"],
  "4":["00010","00110","01010","10010","11111","00010","00010"],
  "5":["11111","10000","10000","11110","00001","00001","11110"],
  "6":["01110","10000","10000","11110","10001","10001","01110"],
  "7":["11111","00001","00010","00100","01000","01000","01000"],
  "8":["01110","10001","10001","01110","10001","10001","01110"],
  "9":["01110","10001","10001","01111","00001","00001","01110"],
  "%":["11001","11010","00100","01000","10110","00110","00000"],
  "/":["00001","00010","00010","00100","01000","01000","10000"],
  "-":["00000","00000","00000","11111","00000","00000","00000"],
  ".":["00000","00000","00000","00000","00000","01100","01100"],
  ",":["00000","00000","00000","00000","00000","01100","00100"],
  ":":["00000","01100","01100","00000","01100","01100","00000"]
};

const $ = id => document.getElementById(id);
const ui = {
  format: $("format"),
  operation: $("operation"), material: $("material"), thickness: $("thickness"), pattern: $("pattern"),
  matrixControls: $("matrixControls"), summaryControls: $("summaryControls"),
  customPanel: $("customPanel"), customPowers: $("customPowers"), customSpeeds: $("customSpeeds"),
  customSpeedHelp: $("customSpeedHelp"), machineLimitText: $("machineLimitText"), operationInfo: $("operationInfo"),
  parameterStatus: $("parameterStatus"),
  summaryPreset: $("summaryPreset"),
  summaryEngravePower: $("summaryEngravePower"), summaryEngraveSpeeds: $("summaryEngraveSpeeds"),
  summaryRasterSpeed: $("summaryRasterSpeed"), summaryRasterPowers: $("summaryRasterPowers"),
  summaryCutPower: $("summaryCutPower"), summaryCutSpeeds: $("summaryCutSpeeds"),
  powerRangeLabel: $("powerRangeLabel"), matrixSizeLabel: $("matrixSizeLabel"),
  powerRange: $("powerRange"), matrixSize: $("matrixSize"), powerValues: $("powerValues"), speedValues: $("speedValues"),
  previewTitle: $("previewTitle"), previewDescription: $("previewDescription"), testSwatch: $("testSwatch"),
  testLegend: $("testLegend"), matrixLegend: $("matrixLegend"), summaryLegend: $("summaryLegend"),
  preview: $("preview"), procedureSteps: $("procedureSteps"),
  individualDownloads: $("individualDownloads"), packageButton: $("downloadPackageButton"), svgButton: $("downloadSvgButton"),
  message: $("message"), appVersion: $("appVersion")
};

let currentData = null;
let currentThickness = 0;
let currentSvg = "";
let customInitialized = false;
let summaryInitialized = false;

function normalizeAscii(text) {
  return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function safeFilePart(text) {
  return normalizeAscii(text).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function formatNumber(value) {
  return Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function formatThickness(value) {
  return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

function thicknessForFilename(value) {
  const number = Number(value);
  return Number.isInteger(number) ? `${number}mm` : `${String(number).replace(".", "p")}mm`;
}

function gNumber(value) {
  return Number(value).toFixed(3);
}

function parseNumberList(text, min, max, label) {
  const values = text.trim().split(/[;,\s]+/).filter(Boolean).map(Number);
  if (!values.length || values.some(value => !Number.isFinite(value))) {
    throw new Error(`Informe valores válidos de ${label}.`);
  }
  if (values.some(value => value < min || value > max)) {
    throw new Error(`Os valores de ${label} devem ficar entre ${min} e ${max}.`);
  }
  const unique = [...new Set(values)];
  if (unique.length > 10) throw new Error(`Use no máximo 10 valores de ${label}.`);
  return unique;
}

function getDateStamp() {
  const now = new Date();
  const months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  return `${String(now.getDate()).padStart(2, "0")}_${months[now.getMonth()]}_${now.getFullYear()}`;
}

function getPresetData() {
  const operationKey = ui.operation.value;
  const operation = OPERATIONS[operationKey];
  const material = MATERIALS[ui.material.value];
  const patternKey = ui.pattern.value;

  if (patternKey === "custom") {
    return {
      format: "matrix",
      operationKey, operation, material, patternKey,
      patternLabel: PATTERN_LABELS.custom,
      powers: parseNumberList(ui.customPowers.value, 1, 100, "potência"),
      speeds: parseNumberList(ui.customSpeeds.value, 0.1, operation.speedLimit, "velocidade")
    };
  }

  return {
    format: "matrix",
    operationKey, operation, material, patternKey,
    patternLabel: PATTERN_LABELS[patternKey],
    powers: material.powers[operationKey][patternKey],
    speeds: operation.speeds[patternKey]
  };
}

function getLayout(data) {
  const pitch = GEOMETRY.cell + GEOMETRY.gap;
  const gridWidth = data.speeds.length * GEOMETRY.cell + Math.max(0, data.speeds.length - 1) * GEOMETRY.gap;
  const gridHeight = data.powers.length * GEOMETRY.cell + Math.max(0, data.powers.length - 1) * GEOMETRY.gap;
  const gridX = GEOMETRY.margin + GEOMETRY.leftArea;
  const gridY = GEOMETRY.headerArea;
  return {
    pitch, gridWidth, gridHeight, gridX, gridY,
    width: Math.max(123, gridX + gridWidth + GEOMETRY.margin),
    height: gridY + gridHeight + GEOMETRY.footerArea
  };
}

function measureText(text, height) {
  const normalized = normalizeAscii(text);
  const unit = height / 7;
  return normalized.length ? normalized.length * unit * 5 + (normalized.length - 1) * unit * 1.5 : 0;
}

function textSegments(text, x, y, height, align = "left") {
  const normalized = normalizeAscii(text);
  const unit = height / 7;
  const charWidth = unit * 5;
  const spacing = unit * 1.5;
  const totalWidth = measureText(normalized, height);
  let cursorX = align === "center" ? x - totalWidth / 2 : align === "right" ? x - totalWidth : x;
  const segments = [];

  for (const character of normalized) {
    const glyph = FONT[character] || FONT[" "];
    for (let row = 0; row < 7; row += 1) {
      let runStart = null;
      for (let col = 0; col <= 5; col += 1) {
        const active = col < 5 && glyph[row][col] === "1";
        if (active && runStart === null) runStart = col;
        if (!active && runStart !== null) {
          segments.push({
            x1: cursorX + runStart * unit,
            y1: y + (row + 0.5) * unit,
            x2: cursorX + (col - 0.18) * unit,
            y2: y + (row + 0.5) * unit
          });
          runStart = null;
        }
      }
    }
    cursorX += charWidth + spacing;
  }
  return segments;
}

function buildIdentificationSegments(data, thickness) {
  const layout = getLayout(data);
  const segments = [];
  const addText = (text, x, y, height, align = "left") => segments.push(...textSegments(text, x, y, height, align));

  addText(`CALIBRACAO DE ${data.operation.label}`, GEOMETRY.margin, 4, 3.7);
  addText(MACHINE.model, GEOMETRY.margin, 9, 1.9);
  addText(`MATERIAL: ${data.material.label}`, GEOMETRY.margin, 13, 2.0);
  addText(`ESPESSURA: ${formatThickness(thickness)}MM`, GEOMETRY.margin, 17, 2.0);
  addText(`PADRAO: ${data.patternLabel}`, GEOMETRY.margin, 21, 2.0);
  addText("VELOCIDADE MM/S", layout.gridX + layout.gridWidth / 2, 26, 2.6, "center");

  data.speeds.forEach((speed, column) => {
    const centerX = layout.gridX + column * layout.pitch + GEOMETRY.cell / 2;
    addText(String(speed), centerX, 31, 2.3, "center");
  });

  addText("POT %", GEOMETRY.margin, 31, 2.3);
  data.powers.forEach((power, row) => {
    const h = 2.5;
    const y = layout.gridY + row * layout.pitch + (GEOMETRY.cell - h) / 2;
    addText(`${power}%`, layout.gridX - 3, y, h, "right");
  });
  return segments;
}

function buildEngraveCellSegments(x, y) {
  const m = 2;
  const left = x + m;
  const right = x + GEOMETRY.cell - m;
  const top = y + m;
  const bottom = y + GEOMETRY.cell - m;
  const center = y + GEOMETRY.cell / 2;
  return [
    { x1: left, y1: top, x2: right, y2: top },
    { x1: left, y1: center, x2: right, y2: center },
    { x1: left, y1: bottom, x2: right, y2: top },
    { x1: left, y1: top, x2: left, y2: bottom }
  ];
}

function buildRasterCellRect(x, y, size = GEOMETRY.cell) {
  const margin = 1.5;
  return {
    x: x + margin,
    y: y + margin,
    width: size - margin * 2,
    height: size - margin * 2
  };
}

function buildTestSvg(data, layout) {
  const elements = [];

  data.powers.forEach((power, row) => {
    data.speeds.forEach((speed, column) => {
      const x = layout.gridX + column * layout.pitch;
      const y = layout.gridY + row * layout.pitch;

      if (data.operationKey === "cut") {
        elements.push(`<rect x="${x}" y="${y}" width="${GEOMETRY.cell}" height="${GEOMETRY.cell}" fill="none" stroke="${CUT_COLOR}" stroke-width="${GEOMETRY.stroke}" data-power="${power}" data-speed="${speed}"/>`);
        return;
      }

      if (data.operationKey === "engrave") {
        for (const segment of buildEngraveCellSegments(x, y)) {
          elements.push(`<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${GEOMETRY.stroke}" stroke-linecap="round" data-power="${power}" data-speed="${speed}"/>`);
        }
        return;
      }

      const rect = buildRasterCellRect(x, y);
      elements.push(`<rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${RASTER_COLOR}" stroke="none" data-operation="raster" data-power="${power}" data-speed="${speed}"/>`);
    });
  });

  return elements.join("\n");
}

function buildSvg(data, thickness) {
  const layout = getLayout(data);
  const blueLines = buildIdentificationSegments(data, thickness)
    .map(s => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${GEOMETRY.stroke}" stroke-linecap="round"/>`)
    .join("\n");

  const desc = data.operationKey === "raster"
    ? "Referencia visual da matriz. As areas pretas sao Raster Engrave nativo do K40 Whisperer; cada combinacao e executada a partir de um SVG individual. Uso exclusivo VISUTEC VS6040."
    : "Gerado exclusivamente para VISUTEC VS6040. Parametros de gravacao vetorial sao experimentais nesta versao.";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${layout.width}mm" height="${layout.height}mm" viewBox="0 0 ${layout.width} ${layout.height}">
  <title>Calibracao ${data.operation.label} - ${data.material.label}</title>
  <desc>${desc}</desc>
  <g id="identificacao">${blueLines}</g>
  <g id="teste">${buildTestSvg(data, layout)}</g>
</svg>`;
}

function buildRasterCellSvg(data, thickness, powerIndex, speedIndex) {
  const layout = getLayout(data);
  const power = data.powers[powerIndex];
  const speed = data.speeds[speedIndex];
  const x = layout.gridX + speedIndex * layout.pitch;
  const y = layout.gridY + powerIndex * layout.pitch;
  const rect = buildRasterCellRect(x, y);

  const blueLines = buildIdentificationSegments(data, thickness)
    .map(segment => `<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${GEOMETRY.stroke}" stroke-linecap="round"/>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${layout.width}mm" height="${layout.height}mm" viewBox="0 0 ${layout.width} ${layout.height}">
  <title>Raster ${power}% - ${speed} mm/s - ${data.material.label}</title>
  <desc>VISUTEC VS6040. Ajustar painel para ${power}% e velocidade Raster Engrave para ${speed} mm/s. Halftone e Invert Raster Color devem permanecer desligados para este teste.</desc>
  <g id="referencia-vetorial">${blueLines}</g>
  <g id="raster">
    <rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${RASTER_COLOR}" stroke="none"/>
  </g>
</svg>`;
}

function toGcodePoint(x, y, layout) {
  return { x, y: layout.height - y };
}

function ngcHeader(data, thickness, description) {
  const warnings = [
    `(ATENCAO: ARQUIVO EXCLUSIVO PARA ${MACHINE.model})`,
    `(NAO UTILIZAR EM OUTRA MAQUINA SEM REVISAO DOS PARAMETROS)`
  ];

  if (data.operationKey === "cut") {
    warnings.push(`(CORTE: LIMITE ADOTADO PARA ESTA VS6040 = ${MACHINE.maxCutSpeed} mm/s)`);
  } else if (data.operationKey === "engrave") {
    warnings.push("(PARAMETROS DE GRAVACAO VETORIAL SAO EXPERIMENTAIS)");
    warnings.push(`(LIMITE DE ${data.operation.speedLimit} mm/s E UM LIMITE DO GERADOR, NAO UM LIMITE VALIDADO DA MAQUINA)`);
  } else if (data.operationKey === "raster") {
    warnings.push("(ESTE NGC CONTEM APENAS A IDENTIFICACAO DA MATRIZ RASTER)");
    warnings.push("(AS CELULAS RASTER SAO EXECUTADAS PELOS ARQUIVOS SVG COM RASTER ENGRAVE)");
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
    "", "G21", "G90", "G17", "S0", ""
  ];
}

function addReferenceAnchors(lines, layout) {
  const feed = Math.min(MACHINE.identificationSpeed, MACHINE.maxCutSpeed) * 60;
  lines.push("(Reference anchors - laser OFF)", "S0", "G0 X0.000 Y0.000");
  lines.push(`G1 X${gNumber(GEOMETRY.anchorLength)} Y0.000 F${feed}`);
  lines.push(`G0 X${gNumber(layout.width)} Y${gNumber(layout.height)}`);
  lines.push(`G1 X${gNumber(layout.width - GEOMETRY.anchorLength)} Y${gNumber(layout.height)} F${feed}`, "");
}

function addSegmentGcode(lines, segment, layout, feed) {
  const start = toGcodePoint(segment.x1, segment.y1, layout);
  const end = toGcodePoint(segment.x2, segment.y2, layout);
  lines.push("S0", `G0 X${gNumber(start.x)} Y${gNumber(start.y)}`, "S1");
  lines.push(`G1 X${gNumber(end.x)} Y${gNumber(end.y)} F${feed}`, "S0");
}

function buildIdentificationNgc(data, thickness) {
  const layout = getLayout(data);
  const lines = ngcHeader(data, thickness, "IDENTIFICACAO - AJUSTAR POTENCIA BAIXA NO PAINEL");
  const feed = Math.round(MACHINE.identificationSpeed * 60);
  addReferenceAnchors(lines, layout);
  lines.push(`(Velocidade de identificacao: ${MACHINE.identificationSpeed} mm/s)`, "");
  for (const segment of buildIdentificationSegments(data, thickness)) addSegmentGcode(lines, segment, layout, feed);
  lines.push("", "S0", "M2", "");
  return lines.join("\n");
}

function addCutCellGcode(lines, x, y, layout, feed) {
  const path = [
    [x, y], [x + GEOMETRY.cell, y], [x + GEOMETRY.cell, y + GEOMETRY.cell],
    [x, y + GEOMETRY.cell], [x, y]
  ].map(([px, py]) => toGcodePoint(px, py, layout));

  lines.push("S0", `G0 X${gNumber(path[0].x)} Y${gNumber(path[0].y)}`, "S1");
  for (let i = 1; i < path.length; i += 1) {
    const p = path[i];
    lines.push(i === 1
      ? `G1 X${gNumber(p.x)} Y${gNumber(p.y)} F${feed}`
      : `G1 X${gNumber(p.x)} Y${gNumber(p.y)}`
    );
  }
  lines.push("S0");
}

function buildPowerNgc(data, thickness, powerIndex) {
  if (data.operationKey === "raster") {
    throw new Error("Gravação raster nativa é executada por arquivos SVG no Raster Engrave do K40 Whisperer.");
  }

  const layout = getLayout(data);
  const power = data.powers[powerIndex];
  const lines = ngcHeader(data, thickness, `POTENCIA ${power}% - AJUSTAR NO PAINEL`);
  addReferenceAnchors(lines, layout);

  data.speeds.forEach((speed, column) => {
    if (speed > data.operation.speedLimit) throw new Error(`Velocidade de ${speed} mm/s excede o limite do modo ${data.operation.label}.`);
    const x = layout.gridX + column * layout.pitch;
    const y = layout.gridY + powerIndex * layout.pitch;
    const feed = Math.round(speed * 60);
    lines.push(`(Power ${power}% - Speed ${speed} mm/s)`);

    if (data.operationKey === "cut") {
      addCutCellGcode(lines, x, y, layout, feed);
    } else {
      for (const segment of buildEngraveCellSegments(x, y)) addSegmentGcode(lines, segment, layout, feed);
    }
    lines.push("");
  });

  lines.push("S0", "M2", "");
  return lines.join("\n");
}

function getPackageName(data, thickness) {
  return [
    "calibracao", "vs6040", safeFilePart(data.material.label), thicknessForFilename(thickness),
    data.operation.slug, safeFilePart(data.patternLabel), getDateStamp()
  ].join("_");
}

function powerFilePart(power) {
  const number = Number(power);
  return Number.isInteger(number) ? String(number).padStart(2, "0") : String(number).replace(".", "p");
}

function speedFilePart(speed) {
  const number = Number(speed);
  return Number.isInteger(number) ? String(number).padStart(3, "0") : String(number).replace(".", "p");
}

function buildReadme(data, thickness) {
  const lines = [
    "CALIBRACAO LASER",
    "",
    "============================================================",
    `ATENCAO - USO EXCLUSIVO: ${MACHINE.model}`,
    "============================================================",
    "",
    "Este pacote foi gerado especificamente para a VISUTEC VS6040",
    "utilizada no laboratorio. Nao utilize estes arquivos em outra",
    "maquina sem revisar velocidades, potencias, area util, origem",
    "e comportamento da controladora.",
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

  if (data.operationKey === "cut") {
    lines.push(
      `Limite de corte adotado para esta VS6040: ${MACHINE.maxCutSpeed} mm/s`,
      "",
      "STATUS DOS PARAMETROS",
      "",
      "O modo Corte utiliza a faixa definida especificamente para a VS6040.",
      "O resultado depende do material, espessura, foco, estado do tubo,",
      "lente, espelhos e demais condicoes da maquina."
    );
  } else if (data.operationKey === "engrave") {
    lines.push(
      `Limite experimental adotado pelo gerador: ${data.operation.speedLimit} mm/s`,
      "",
      "STATUS DOS PARAMETROS - EXPERIMENTAL",
      "",
      "Os presets de gravacao vetorial ainda precisam ser validados fisicamente",
      "na VS6040 antes de uso rotineiro."
    );
  } else {
    lines.push(
      `Limite experimental adotado pelo gerador para Raster Engrave: ${data.operation.speedLimit} mm/s`,
      "",
      "GRAVACAO RASTER NATIVA DO K40 WHISPERER",
      "",
      "As areas pretas dos SVGs sao processadas pelo botao Raster Engrave.",
      "A velocidade de raster e global no K40 Whisperer e a potencia e manual",
      "no painel da maquina. Por isso cada combinacao possui um SVG proprio.",
      "Mantenha Halftone (Dither) desligado para estes retangulos pretos solidos.",
      "Mantenha Invert Raster Color desligado.",
      "Mantenha o mesmo Scanline Step em todos os ensaios e registre esse valor.",
      "Nao use Vector Engrave ou Vector Cut nos SVGs das celulas raster."
    );
  }

  lines.push("", "ORDEM DE EXECUCAO", "", "1. Abra 00-identificacao.ngc.",
    "   Ajuste uma potencia baixa de gravacao no painel.",
    `   O arquivo de identificacao utiliza ${MACHINE.identificationSpeed} mm/s.`
  );

  if (data.operationKey === "raster") {
    let step = 2;
    data.powers.forEach((power, powerIndex) => {
      lines.push("", `${step}. Ajuste a potencia do painel para ${power}%.`);
      data.speeds.forEach((speed, speedIndex) => {
        const filename = `${String(powerIndex * data.speeds.length + speedIndex + 1).padStart(2, "0")}-pot-${powerFilePart(power)}-vel-${speedFilePart(speed)}mms.svg`;
        lines.push(`   Abra raster/${filename}, ajuste Raster Engrave para ${speed} mm/s e execute Raster Engrave.`);
      });
      step += 1;
    });
  } else {
    data.powers.forEach((power, index) => {
      const sequence = String(index + 1).padStart(2, "0");
      lines.push("", `${index + 2}. Ajuste a potencia do painel para ${power}%.`, `   Execute ${sequence}-pot-${powerFilePart(power)}.ngc.`);
    });
  }

  lines.push(
    "",
    "IMPORTANTE",
    "",
    "- Nao mova o material entre as etapas.",
    "- Nao altere a origem da maquina entre as etapas.",
    "- A potencia e ajustada manualmente no painel da cortadora.",
    data.operationKey === "raster" ? "- A velocidade raster deve ser ajustada no K40 Whisperer antes de cada SVG." : "- Os arquivos NGC controlam automaticamente as velocidades.",
    "- Nunca use este pacote em outra maquina sem revisar os parametros.",
    "- Os presets devem ser confirmados por ensaio no laboratorio.",
    "- Utilize apenas materiais adequados para processamento a laser.",
    "",
    `Gerador UbuntuMaker v${APP_VERSION}`,
    `Data: ${getDateStamp().replaceAll("_", " ")}`,
    ""
  );

  return lines.join("\n");
}

function middleValue(values) {
  return values[Math.floor(values.length / 2)];
}

function parseSummaryList(text, min, max, label) {
  const values = parseNumberList(text, min, max, label);
  if (values.length > 8) {
    throw new Error(`Use no máximo 8 valores de ${label} na folha A5.`);
  }
  return values;
}

function getSummaryPresetDefaults(materialKey, presetKey) {
  const material = MATERIALS[materialKey];
  const engravePowers = material.powers.engrave[presetKey];
  const rasterPowers = material.powers.raster[presetKey];
  const cutPowers = material.powers.cut[presetKey];
  const engraveSpeeds = OPERATIONS.engrave.speeds[presetKey];
  const cutSpeeds = OPERATIONS.cut.speeds[presetKey];

  return {
    engravePower: middleValue(engravePowers),
    engraveSpeeds,
    rasterSpeed: 180,
    rasterPowers,
    cutPower: Math.max(...cutPowers),
    cutSpeeds
  };
}

function initializeSummaryFields() {
  const defaults = getSummaryPresetDefaults(ui.material.value, ui.summaryPreset.value);
  ui.summaryEngravePower.value = defaults.engravePower;
  ui.summaryEngraveSpeeds.value = defaults.engraveSpeeds.join(", ");
  ui.summaryRasterSpeed.value = defaults.rasterSpeed;
  ui.summaryRasterPowers.value = defaults.rasterPowers.join(", ");
  ui.summaryCutPower.value = defaults.cutPower;
  ui.summaryCutSpeeds.value = defaults.cutSpeeds.join(", ");
  summaryInitialized = true;
}

function getSummaryData() {
  const material = MATERIALS[ui.material.value];
  const presetKey = ui.summaryPreset.value;
  const engravePower = Number(ui.summaryEngravePower.value);
  const rasterSpeed = Number(ui.summaryRasterSpeed.value);
  const cutPower = Number(ui.summaryCutPower.value);

  if (!Number.isFinite(engravePower) || engravePower < 1 || engravePower > 100) {
    throw new Error("A potência fixa de gravação vetorial deve ficar entre 1 e 100%.");
  }
  if (!Number.isFinite(rasterSpeed) || rasterSpeed < 0.1 || rasterSpeed > MACHINE.experimentalRasterSpeedLimit) {
    throw new Error(`A velocidade fixa de gravação raster deve ficar entre 0,1 e ${MACHINE.experimentalRasterSpeedLimit} mm/s.`);
  }
  if (!Number.isFinite(cutPower) || cutPower < 1 || cutPower > 100) {
    throw new Error("A potência fixa de corte deve ficar entre 1 e 100%.");
  }

  const engraveSpeeds = parseSummaryList(
    ui.summaryEngraveSpeeds.value,
    0.1,
    MACHINE.experimentalVectorSpeedLimit,
    "velocidade de gravação vetorial"
  );

  const rasterPowers = parseSummaryList(
    ui.summaryRasterPowers.value,
    1,
    100,
    "potência de gravação raster"
  );

  const cutSpeeds = parseSummaryList(
    ui.summaryCutSpeeds.value,
    0.1,
    MACHINE.maxCutSpeed,
    "velocidade de corte"
  );

  return {
    format: "summary",
    material,
    presetKey,
    patternLabel: PATTERN_LABELS[presetKey],
    engrave: {
      power: engravePower,
      speeds: engraveSpeeds
    },
    raster: {
      speed: rasterSpeed,
      powers: rasterPowers
    },
    cut: {
      power: cutPower,
      speeds: cutSpeeds
    }
  };
}

function getSummaryLayout() {
  return {
    width: SUMMARY_GEOMETRY.width,
    height: SUMMARY_GEOMETRY.height
  };
}

function getSummaryRowGeometry(operationKey, count) {
  const cell = SUMMARY_GEOMETRY.cell;
  const gap = SUMMARY_GEOMETRY.gap;
  const available = SUMMARY_GEOMETRY.gridRight - SUMMARY_GEOMETRY.gridLeft;
  const totalWidth = count * cell + Math.max(0, count - 1) * gap;
  const startX = SUMMARY_GEOMETRY.gridLeft + Math.max(0, (available - totalWidth) / 2);

  return {
    cell,
    gap,
    startX,
    y: SUMMARY_GEOMETRY.sectionY[operationKey]
  };
}

function buildSummaryIdentificationSegments(data, thickness) {
  const segments = [];
  const addText = (text, x, y, height, align = "left") => {
    segments.push(...textSegments(text, x, y, height, align));
  };

  addText("CALIBRACAO - VISUTEC VS6040", SUMMARY_GEOMETRY.margin, 5, 4.0);
  addText("FOLHA RESUMO A5", SUMMARY_GEOMETRY.margin, 11, 2.2);
  addText(`MATERIAL: ${data.material.label}`, SUMMARY_GEOMETRY.margin, 16, 2.2);
  addText(`ESPESSURA: ${formatThickness(thickness)}MM`, 112, 16, 2.2);
  addText(`PADRAO: ${data.patternLabel}`, SUMMARY_GEOMETRY.margin, 21, 2.0);

  const engraveRow = getSummaryRowGeometry("engrave", data.engrave.speeds.length);
  addText("GRAVACAO VETORIAL", SUMMARY_GEOMETRY.margin, 29, 2.8);
  addText(`POT ${formatNumber(data.engrave.power)}%`, SUMMARY_GEOMETRY.margin, 36, 2.1);
  addText("VEL MM/S", 53, 36, 1.8, "right");
  data.engrave.speeds.forEach((speed, index) => {
    const cx = engraveRow.startX + index * (engraveRow.cell + engraveRow.gap) + engraveRow.cell / 2;
    addText(formatNumber(speed), cx, 37, 1.8, "center");
  });

  const rasterRow = getSummaryRowGeometry("raster", data.raster.powers.length);
  addText("GRAVACAO RASTER", SUMMARY_GEOMETRY.margin, 67, 2.8);
  addText(`VEL ${formatNumber(data.raster.speed)}MM/S`, SUMMARY_GEOMETRY.margin, 74, 2.1);
  addText("POT %", 53, 74, 1.8, "right");
  data.raster.powers.forEach((power, index) => {
    const cx = rasterRow.startX + index * (rasterRow.cell + rasterRow.gap) + rasterRow.cell / 2;
    addText(formatNumber(power), cx, 75, 1.8, "center");
  });

  const cutRow = getSummaryRowGeometry("cut", data.cut.speeds.length);
  addText("CORTE", SUMMARY_GEOMETRY.margin, 105, 2.8);
  addText(`POT ${formatNumber(data.cut.power)}%`, SUMMARY_GEOMETRY.margin, 112, 2.1);
  addText("VEL MM/S", 53, 112, 1.8, "right");
  data.cut.speeds.forEach((speed, index) => {
    const cx = cutRow.startX + index * (cutRow.cell + cutRow.gap) + cutRow.cell / 2;
    addText(formatNumber(speed), cx, 113, 1.8, "center");
  });

  addText("GRAVACAO VETORIAL E RASTER: PARAMETROS EXPERIMENTAIS", SUMMARY_GEOMETRY.margin, 139, 1.45);

  return segments;
}

function buildSummaryEngraveCellSegments(x, y, size) {
  const m = Math.max(1.5, size * 0.14);
  const left = x + m;
  const right = x + size - m;
  const top = y + m;
  const bottom = y + size - m;
  const center = y + size / 2;

  return [
    { x1: left, y1: top, x2: right, y2: top },
    { x1: left, y1: center, x2: right, y2: center },
    { x1: left, y1: bottom, x2: right, y2: top },
    { x1: left, y1: top, x2: left, y2: bottom }
  ];
}

function buildSummaryRasterCellRect(x, y, size) {
  const margin = 1.3;
  return {
    x: x + margin,
    y: y + margin,
    width: size - margin * 2,
    height: size - margin * 2
  };
}

function buildSummaryTestSvg(data) {
  const parts = [];

  const engraveRow = getSummaryRowGeometry("engrave", data.engrave.speeds.length);
  data.engrave.speeds.forEach((speed, index) => {
    const x = engraveRow.startX + index * (engraveRow.cell + engraveRow.gap);
    const y = engraveRow.y;
    for (const segment of buildSummaryEngraveCellSegments(x, y, engraveRow.cell)) {
      parts.push(`<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${SUMMARY_GEOMETRY.stroke}" stroke-linecap="round" data-operation="engrave" data-power="${data.engrave.power}" data-speed="${speed}"/>`);
    }
  });

  const rasterRow = getSummaryRowGeometry("raster", data.raster.powers.length);
  data.raster.powers.forEach((power, index) => {
    const x = rasterRow.startX + index * (rasterRow.cell + rasterRow.gap);
    const rect = buildSummaryRasterCellRect(x, rasterRow.y, rasterRow.cell);
    parts.push(`<rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${RASTER_COLOR}" stroke="none" data-operation="raster" data-power="${power}" data-speed="${data.raster.speed}"/>`);
  });

  const cutRow = getSummaryRowGeometry("cut", data.cut.speeds.length);
  data.cut.speeds.forEach((speed, index) => {
    const x = cutRow.startX + index * (cutRow.cell + cutRow.gap);
    const y = cutRow.y;
    parts.push(`<rect x="${x}" y="${y}" width="${cutRow.cell}" height="${cutRow.cell}" fill="none" stroke="${CUT_COLOR}" stroke-width="${SUMMARY_GEOMETRY.stroke}" data-operation="cut" data-power="${data.cut.power}" data-speed="${speed}"/>`);
  });

  return parts.join("\n");
}

function buildSummarySvg(data, thickness) {
  const blueLines = buildSummaryIdentificationSegments(data, thickness)
    .map(segment => `<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${SUMMARY_GEOMETRY.stroke}" stroke-linecap="round"/>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
     width="${SUMMARY_GEOMETRY.width}mm"
     height="${SUMMARY_GEOMETRY.height}mm"
     viewBox="0 0 ${SUMMARY_GEOMETRY.width} ${SUMMARY_GEOMETRY.height}"
     data-format="summary">
  <title>Folha resumo A5 - ${data.material.label} - ${formatThickness(thickness)} mm</title>
  <desc>Folha A5 reunindo gravacao vetorial, gravacao raster nativa do K40 Whisperer e corte. Uso exclusivo VISUTEC VS6040.</desc>
  <g id="identificacao">${blueLines}</g>
  <g id="testes">${buildSummaryTestSvg(data)}</g>
</svg>`;
}

function buildSummaryRasterSvg(data, thickness, powerIndex) {
  const rasterRow = getSummaryRowGeometry("raster", data.raster.powers.length);
  const power = data.raster.powers[powerIndex];
  const x = rasterRow.startX + powerIndex * (rasterRow.cell + rasterRow.gap);
  const rect = buildSummaryRasterCellRect(x, rasterRow.y, rasterRow.cell);
  const blueLines = buildSummaryIdentificationSegments(data, thickness)
    .map(segment => `<line x1="${segment.x1}" y1="${segment.y1}" x2="${segment.x2}" y2="${segment.y2}" stroke="${ENGRAVE_COLOR}" stroke-width="${SUMMARY_GEOMETRY.stroke}" stroke-linecap="round"/>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${SUMMARY_GEOMETRY.width}mm" height="${SUMMARY_GEOMETRY.height}mm" viewBox="0 0 ${SUMMARY_GEOMETRY.width} ${SUMMARY_GEOMETRY.height}">
  <title>Resumo A5 Raster ${power}% - ${data.raster.speed} mm/s</title>
  <desc>VISUTEC VS6040. Ajustar painel para ${power}% e Raster Engrave para ${data.raster.speed} mm/s. Halftone e Invert Raster Color desligados.</desc>
  <g id="referencia-vetorial">${blueLines}</g>
  <g id="raster"><rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${RASTER_COLOR}" stroke="none"/></g>
</svg>`;
}

function summaryNgcHeader(data, thickness, description) {
  return [
    "(UbuntuMaker - Calibracao Laser - Folha Resumo A5)",
    `(Gerador versao ${APP_VERSION})`,
    `(ATENCAO: ARQUIVO EXCLUSIVO PARA ${MACHINE.model})`,
    "(NAO UTILIZAR EM OUTRA MAQUINA SEM REVISAO DOS PARAMETROS)",
    "(FOLHA A5: 210 x 148 mm)",
    "(GRAVACAO VETORIAL E RASTER: PARAMETROS EXPERIMENTAIS)",
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

function addSummaryReferenceAnchors(lines) {
  const layout = getSummaryLayout();
  const feed = Math.round(Math.min(MACHINE.identificationSpeed, MACHINE.maxCutSpeed) * 60);
  lines.push("(Reference anchors A5 - laser OFF)", "S0", "G0 X0.000 Y0.000");
  lines.push(`G1 X${gNumber(SUMMARY_GEOMETRY.anchorLength)} Y0.000 F${feed}`);
  lines.push(`G0 X${gNumber(layout.width)} Y${gNumber(layout.height)}`);
  lines.push(`G1 X${gNumber(layout.width - SUMMARY_GEOMETRY.anchorLength)} Y${gNumber(layout.height)} F${feed}`, "");
}

function addCutBoxGcode(lines, x, y, size, layout, feed) {
  const path = [
    [x, y],
    [x + size, y],
    [x + size, y + size],
    [x, y + size],
    [x, y]
  ].map(([px, py]) => toGcodePoint(px, py, layout));

  lines.push("S0", `G0 X${gNumber(path[0].x)} Y${gNumber(path[0].y)}`, "S1");
  for (let i = 1; i < path.length; i += 1) {
    const point = path[i];
    lines.push(i === 1
      ? `G1 X${gNumber(point.x)} Y${gNumber(point.y)} F${feed}`
      : `G1 X${gNumber(point.x)} Y${gNumber(point.y)}`
    );
  }
  lines.push("S0");
}

function buildSummaryIdentificationNgc(data, thickness) {
  const layout = getSummaryLayout();
  const lines = summaryNgcHeader(data, thickness, "IDENTIFICACAO - AJUSTAR POTENCIA BAIXA NO PAINEL");
  const feed = Math.round(MACHINE.identificationSpeed * 60);

  addSummaryReferenceAnchors(lines);
  lines.push(`(Velocidade de identificacao: ${MACHINE.identificationSpeed} mm/s)`, "");

  for (const segment of buildSummaryIdentificationSegments(data, thickness)) {
    addSegmentGcode(lines, segment, layout, feed);
  }

  lines.push("", "S0", "M2", "");
  return lines.join("\n");
}

function buildSummaryEngraveNgc(data, thickness) {
  const layout = getSummaryLayout();
  const row = getSummaryRowGeometry("engrave", data.engrave.speeds.length);
  const lines = summaryNgcHeader(
    data,
    thickness,
    `GRAVACAO VETORIAL - POTENCIA ${data.engrave.power}% - AJUSTAR NO PAINEL`
  );

  addSummaryReferenceAnchors(lines);

  data.engrave.speeds.forEach((speed, index) => {
    const x = row.startX + index * (row.cell + row.gap);
    const feed = Math.round(speed * 60);
    lines.push(`(Gravacao - Power ${data.engrave.power}% - Speed ${speed} mm/s)`);
    for (const segment of buildSummaryEngraveCellSegments(x, row.y, row.cell)) {
      addSegmentGcode(lines, segment, layout, feed);
    }
    lines.push("");
  });

  lines.push("S0", "M2", "");
  return lines.join("\n");
}

function buildSummaryRasterNotice() {
  throw new Error("A gravação raster da folha A5 é executada por SVG no Raster Engrave do K40 Whisperer.");
}

function buildSummaryCutNgc(data, thickness) {
  const layout = getSummaryLayout();
  const row = getSummaryRowGeometry("cut", data.cut.speeds.length);
  const lines = summaryNgcHeader(
    data,
    thickness,
    `CORTE - POTENCIA ${data.cut.power}% - AJUSTAR NO PAINEL`
  );

  addSummaryReferenceAnchors(lines);

  data.cut.speeds.forEach((speed, index) => {
    const x = row.startX + index * (row.cell + row.gap);
    const feed = Math.round(speed * 60);
    lines.push(`(Corte - Power ${data.cut.power}% - Speed ${speed} mm/s)`);
    addCutBoxGcode(lines, x, row.y, row.cell, layout, feed);
    lines.push("");
  });

  lines.push("S0", "M2", "");
  return lines.join("\n");
}

function getSummaryPackageName(data, thickness) {
  return [
    "calibracao",
    "vs6040",
    safeFilePart(data.material.label),
    thicknessForFilename(thickness),
    "resumo_a5",
    safeFilePart(data.patternLabel),
    getDateStamp()
  ].join("_");
}

function buildSummaryReadme(data, thickness) {
  const lines = [
    "CALIBRACAO LASER - FOLHA RESUMO A5",
    "",
    "============================================================",
    `ATENCAO - USO EXCLUSIVO: ${MACHINE.model}`,
    "============================================================",
    "",
    "Esta folha A5 deve ser usada depois dos ensaios detalhados, como",
    "registro consolidado dos parametros escolhidos para o material.",
    "O pacote produz uma unica referencia fisica A5 (210 x 148 mm)",
    "com gravacao vetorial, gravacao raster nativa e corte.",
    "",
    "IMPORTANTE: a potencia e ajustada manualmente no painel.",
    "A velocidade raster e ajustada no K40 Whisperer antes de Raster Engrave.",
    "Todos os arquivos usam a mesma area A5 e a mesma origem.",
    "",
    `Maquina: ${MACHINE.model}`,
    `Material: ${data.material.label}`,
    `Espessura: ${formatThickness(thickness)} mm`,
    `Padrao: ${data.patternLabel}`,
    "",
    "GRAVACAO VETORIAL",
    `Potencia fixa: ${data.engrave.power}%`,
    `Velocidades: ${data.engrave.speeds.join(", ")} mm/s`,
    "",
    "GRAVACAO RASTER - K40 WHISPERER",
    `Velocidade fixa: ${data.raster.speed} mm/s`,
    `Potencias: ${data.raster.powers.join(", ")}%`,
    "Cada potencia possui um SVG com apenas a celula preta correspondente.",
    "No K40: Halftone (Dither) OFF; Invert Raster Color OFF.",
    "Mantenha o mesmo Scanline Step em todas as celulas e registre o valor.",
    "",
    "CORTE",
    `Potencia fixa: ${data.cut.power}%`,
    `Velocidades: ${data.cut.speeds.join(", ")} mm/s`,
    `Limite de corte adotado pelo gerador: ${MACHINE.maxCutSpeed} mm/s`,
    "",
    "ORDEM DE EXECUCAO",
    "",
    "1. Ajuste potencia baixa e execute 00-identificacao.ngc.",
    `2. Ajuste o painel para ${data.engrave.power}% e execute 01-gravacao-pot-${powerFilePart(data.engrave.power)}.ngc.`
  ];

  let sequence = 2;
  data.raster.powers.forEach(power => {
    const fileNumber = String(sequence).padStart(2, "0");
    lines.push(`${sequence + 1}. Ajuste o painel para ${power}%, abra ${fileNumber}-raster-pot-${powerFilePart(power)}-vel-${speedFilePart(data.raster.speed)}mms.svg, ajuste Raster Engrave para ${data.raster.speed} mm/s e execute Raster Engrave.`);
    sequence += 1;
  });

  const cutFileNumber = String(sequence).padStart(2, "0");
  lines.push(
    `${sequence + 1}. Ajuste o painel para ${data.cut.power}% e execute ${cutFileNumber}-corte-pot-${powerFilePart(data.cut.power)}.ngc.`,
    "",
    "IMPORTANTE",
    "",
    "- Nao mova o material entre os arquivos.",
    "- Nao altere a origem da maquina entre os arquivos.",
    "- Confirme potencia e velocidade antes de cada etapa.",
    "- Nos SVGs raster, clique Raster Engrave; nao Vector Engrave/Vector Cut.",
    "- Mantenha exaustao e demais condicoes de seguranca apropriadas ao material.",
    "- Nunca use este pacote em outra maquina sem revisar os parametros.",
    "",
    `Gerador UbuntuMaker v${APP_VERSION}`,
    `Data: ${getDateStamp().replaceAll("_", " ")}`,
    ""
  );

  return lines.join("\n");
}

function buildSummaryPackageFiles(data, thickness) {
  const packageName = getSummaryPackageName(data, thickness);
  const folder = `${packageName}/`;
  const files = [
    {
      name: `${folder}00-identificacao.ngc`,
      data: buildSummaryIdentificationNgc(data, thickness)
    },
    {
      name: `${folder}01-gravacao-pot-${powerFilePart(data.engrave.power)}.ngc`,
      data: buildSummaryEngraveNgc(data, thickness)
    }
  ];

  let sequence = 2;
  data.raster.powers.forEach((power, index) => {
    const fileNumber = String(sequence).padStart(2, "0");
    files.push({
      name: `${folder}${fileNumber}-raster-pot-${powerFilePart(power)}-vel-${speedFilePart(data.raster.speed)}mms.svg`,
      data: buildSummaryRasterSvg(data, thickness, index)
    });
    sequence += 1;
  });

  const cutFileNumber = String(sequence).padStart(2, "0");
  files.push({
    name: `${folder}${cutFileNumber}-corte-pot-${powerFilePart(data.cut.power)}.ngc`,
    data: buildSummaryCutNgc(data, thickness)
  });

  files.push({
    name: `${folder}resumo-A5.svg`,
    data: buildSummarySvg(data, thickness)
  });

  files.push({
    name: `${folder}LEIA-ME.txt`,
    data: buildSummaryReadme(data, thickness)
  });

  return { packageName, files };
}

function renderSummaryProcedure(data) {
  ui.procedureSteps.innerHTML = "";

  const steps = [
    {
      title: "Identificação",
      detail: `Ajuste uma potência baixa no painel e execute 00-identificacao.ngc a ${MACHINE.identificationSpeed} mm/s.`
    },
    {
      title: `Gravação vetorial — potência ${data.engrave.power}%`,
      detail: `Execute a série de velocidades ${data.engrave.speeds.join(" / ")} mm/s pelo arquivo NGC.`
    }
  ];

  data.raster.powers.forEach(power => {
    steps.push({
      title: `Raster Engrave — potência ${power}%`,
      detail: `Abra o SVG correspondente, ajuste a velocidade raster para ${data.raster.speed} mm/s e clique Raster Engrave. Halftone e Invert Raster Color desligados.`
    });
  });

  steps.push({
    title: `Corte — potência ${data.cut.power}%`,
    detail: `Execute a série de velocidades ${data.cut.speeds.join(" / ")} mm/s pelo arquivo NGC, por último.`
  });

  steps.forEach((step, index) => {
    const element = document.createElement("div");
    element.className = "procedure-step";
    element.innerHTML = `<div class="step-number">${index}</div><div><strong>${step.title}</strong><small>${step.detail}</small></div>`;
    ui.procedureSteps.appendChild(element);
  });
}

function renderSummaryIndividualDownloads(data) {
  ui.individualDownloads.innerHTML = "";

  const addButton = (filename, label, builder, type = "text/plain") => {
    const button = document.createElement("button");
    button.className = "file-button";
    button.innerHTML = `<strong>${filename}</strong><small>${label}</small>`;
    button.addEventListener("click", () => downloadText(builder(), filename, type));
    ui.individualDownloads.appendChild(button);
  };

  addButton(
    "00-identificacao.ngc",
    `identificação • ${MACHINE.identificationSpeed} mm/s`,
    () => buildSummaryIdentificationNgc(currentData, currentThickness)
  );

  addButton(
    `01-gravacao-pot-${powerFilePart(data.engrave.power)}.ngc`,
    `gravação vetorial • painel em ${data.engrave.power}%`,
    () => buildSummaryEngraveNgc(currentData, currentThickness)
  );

  let sequence = 2;
  data.raster.powers.forEach((power, index) => {
    const filename = `${String(sequence).padStart(2, "0")}-raster-pot-${powerFilePart(power)}-vel-${speedFilePart(data.raster.speed)}mms.svg`;
    addButton(
      filename,
      `Raster Engrave • ${data.raster.speed} mm/s • painel em ${power}%`,
      () => buildSummaryRasterSvg(currentData, currentThickness, index),
      "image/svg+xml"
    );
    sequence += 1;
  });

  addButton(
    `${String(sequence).padStart(2, "0")}-corte-pot-${powerFilePart(data.cut.power)}.ngc`,
    `corte • painel em ${data.cut.power}%`,
    () => buildSummaryCutNgc(currentData, currentThickness)
  );
}

function updateSummaryUi(data) {
  ui.machineLimitText.textContent =
    `Folha-resumo A5: corte até ${MACHINE.maxCutSpeed} mm/s; vetorial até ${MACHINE.experimentalVectorSpeedLimit} mm/s; raster experimental até ${MACHINE.experimentalRasterSpeedLimit} mm/s.`;

  ui.parameterStatus.className = "parameter-status experimental";
  ui.parameterStatus.innerHTML = `
    <strong>Folha-resumo A5 • 210 × 148 mm</strong>
    Reúne gravação vetorial, Raster Engrave nativo do K40 Whisperer e corte em uma única peça. A folha é um resumo pós-calibração; potência raster é manual no painel e velocidade é ajustada no K40.
  `;

  ui.powerRangeLabel.textContent = "Operações";
  ui.matrixSizeLabel.textContent = "Formato";
  ui.powerRange.textContent = "3";
  ui.matrixSize.textContent = "A5 • 210 × 148 mm";

  ui.powerValues.innerHTML =
    `<strong>Potências:</strong> vetorial ${formatNumber(data.engrave.power)}% • raster ${data.raster.powers.map(formatNumber).join(" / ")}% • corte ${formatNumber(data.cut.power)}%`;

  ui.speedValues.innerHTML =
    `<strong>Velocidades:</strong> vetorial ${data.engrave.speeds.map(formatNumber).join(" / ")} • raster ${formatNumber(data.raster.speed)} • corte ${data.cut.speeds.map(formatNumber).join(" / ")} mm/s`;

  ui.previewTitle.textContent = "Folha-resumo A5";
  ui.previewDescription.textContent =
    `Uma única referência física • ${data.material.label} • ${formatThickness(currentThickness)} mm • padrão ${data.patternLabel}`;

  ui.matrixLegend.hidden = true;
  ui.summaryLegend.hidden = false;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function downloadText(text, filename, type = "text/plain") {
  downloadBlob(new Blob([text], { type: `${type};charset=utf-8` }), filename);
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let j = 0; j < 8; j += 1) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pushUint16(array, value) {
  array.push(value & 0xFF, (value >>> 8) & 0xFF);
}

function pushUint32(array, value) {
  array.push(value & 0xFF, (value >>> 8) & 0xFF, (value >>> 16) & 0xFF, (value >>> 24) & 0xFF);
}

function getDosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  return {
    dosTime: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    dosDate: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

function concatBytes(arrays) {
  const result = new Uint8Array(arrays.reduce((sum, array) => sum + array.length, 0));
  let offset = 0;
  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }
  return result;
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;
  const { dosTime, dosDate } = getDosDateTime(new Date());

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const dataBytes = file.data instanceof Uint8Array ? file.data : encoder.encode(file.data);
    const crc = crc32(dataBytes);
    const localHeader = [];

    pushUint32(localHeader, 0x04034B50);
    pushUint16(localHeader, 20); pushUint16(localHeader, 0x0800); pushUint16(localHeader, 0);
    pushUint16(localHeader, dosTime); pushUint16(localHeader, dosDate);
    pushUint32(localHeader, crc); pushUint32(localHeader, dataBytes.length); pushUint32(localHeader, dataBytes.length);
    pushUint16(localHeader, nameBytes.length); pushUint16(localHeader, 0);

    const localHeaderBytes = new Uint8Array(localHeader);
    localParts.push(localHeaderBytes, nameBytes, dataBytes);

    const centralHeader = [];
    pushUint32(centralHeader, 0x02014B50);
    pushUint16(centralHeader, 20); pushUint16(centralHeader, 20); pushUint16(centralHeader, 0x0800); pushUint16(centralHeader, 0);
    pushUint16(centralHeader, dosTime); pushUint16(centralHeader, dosDate);
    pushUint32(centralHeader, crc); pushUint32(centralHeader, dataBytes.length); pushUint32(centralHeader, dataBytes.length);
    pushUint16(centralHeader, nameBytes.length); pushUint16(centralHeader, 0); pushUint16(centralHeader, 0);
    pushUint16(centralHeader, 0); pushUint16(centralHeader, 0); pushUint32(centralHeader, 0); pushUint32(centralHeader, localOffset);

    centralParts.push(new Uint8Array(centralHeader), nameBytes);
    localOffset += localHeaderBytes.length + nameBytes.length + dataBytes.length;
  }

  const localData = concatBytes(localParts);
  const centralData = concatBytes(centralParts);
  const end = [];
  pushUint32(end, 0x06054B50);
  pushUint16(end, 0); pushUint16(end, 0); pushUint16(end, files.length); pushUint16(end, files.length);
  pushUint32(end, centralData.length); pushUint32(end, localData.length); pushUint16(end, 0);
  return concatBytes([localData, centralData, new Uint8Array(end)]);
}

function buildPackageFiles(data, thickness) {
  const packageName = getPackageName(data, thickness);
  const folder = `${packageName}/`;
  const files = [{ name: `${folder}00-identificacao.ngc`, data: buildIdentificationNgc(data, thickness) }];

  if (data.operationKey === "raster") {
    let sequence = 1;
    data.powers.forEach((power, powerIndex) => {
      data.speeds.forEach((speed, speedIndex) => {
        const filename = `${String(sequence).padStart(2, "0")}-pot-${powerFilePart(power)}-vel-${speedFilePart(speed)}mms.svg`;
        files.push({
          name: `${folder}raster/${filename}`,
          data: buildRasterCellSvg(data, thickness, powerIndex, speedIndex)
        });
        sequence += 1;
      });
    });
  } else {
    data.powers.forEach((power, index) => {
      const sequence = String(index + 1).padStart(2, "0");
      files.push({
        name: `${folder}${sequence}-pot-${powerFilePart(power)}.ngc`,
        data: buildPowerNgc(data, thickness, index)
      });
    });
  }

  files.push({ name: `${folder}referencia.svg`, data: buildSvg(data, thickness) });
  files.push({ name: `${folder}LEIA-ME.txt`, data: buildReadme(data, thickness) });
  return { packageName, files };
}

function downloadPackage() {
  if (!currentData) return;

  const packageData = currentData.format === "summary"
    ? buildSummaryPackageFiles(currentData, currentThickness)
    : buildPackageFiles(currentData, currentThickness);

  downloadBlob(
    new Blob([createZip(packageData.files)], { type: "application/zip" }),
    `${packageData.packageName}.zip`
  );
}

function renderProcedure(data) {
  ui.procedureSteps.innerHTML = "";
  const identification = document.createElement("div");
  identification.className = "procedure-step";
  identification.innerHTML = `<div class="step-number">0</div><div><strong>Identificação</strong><small>Ajuste uma potência baixa no painel e execute 00-identificacao.ngc a ${MACHINE.identificationSpeed} mm/s.</small></div>`;
  ui.procedureSteps.appendChild(identification);

  if (data.operationKey === "raster") {
    data.powers.forEach((power, index) => {
      const element = document.createElement("div");
      element.className = "procedure-step";
      element.innerHTML = `<div class="step-number">${index + 1}</div><div><strong>Raster Engrave — potência ${power}%</strong><small>Mantenha o painel em ${power}%. Para cada velocidade (${data.speeds.join(" / ")} mm/s), abra o SVG correspondente, ajuste a velocidade no K40 Whisperer e clique Raster Engrave. Halftone e Invert Raster Color desligados.</small></div>`;
      ui.procedureSteps.appendChild(element);
    });
    return;
  }

  data.powers.forEach((power, index) => {
    const element = document.createElement("div");
    element.className = "procedure-step";
    element.innerHTML = `<div class="step-number">${index + 1}</div><div><strong>${data.operation.label} — potência ${power}%</strong><small>Ajuste o painel para ${power}% e execute velocidades ${data.speeds.join(" / ")} mm/s.</small></div>`;
    ui.procedureSteps.appendChild(element);
  });
}

function renderIndividualDownloads(data) {
  ui.individualDownloads.innerHTML = "";
  const idButton = document.createElement("button");
  idButton.className = "file-button";
  idButton.innerHTML = `<strong>00-identificacao.ngc</strong><small>identificação a ${MACHINE.identificationSpeed} mm/s</small>`;
  idButton.addEventListener("click", () => downloadText(buildIdentificationNgc(currentData, currentThickness), "00-identificacao.ngc"));
  ui.individualDownloads.appendChild(idButton);

  if (data.operationKey === "raster") {
    let sequence = 1;
    data.powers.forEach((power, powerIndex) => {
      data.speeds.forEach((speed, speedIndex) => {
        const filename = `${String(sequence).padStart(2, "0")}-pot-${powerFilePart(power)}-vel-${speedFilePart(speed)}mms.svg`;
        const button = document.createElement("button");
        button.className = "file-button";
        button.innerHTML = `<strong>${filename}</strong><small>Raster Engrave • ${speed} mm/s • painel em ${power}%</small>`;
        button.addEventListener("click", () => downloadText(buildRasterCellSvg(currentData, currentThickness, powerIndex, speedIndex), filename, "image/svg+xml"));
        ui.individualDownloads.appendChild(button);
        sequence += 1;
      });
    });
    return;
  }

  data.powers.forEach((power, index) => {
    const sequence = String(index + 1).padStart(2, "0");
    const filename = `${sequence}-pot-${powerFilePart(power)}.ngc`;
    const button = document.createElement("button");
    button.className = "file-button";
    button.innerHTML = `<strong>${filename}</strong><small>${data.operation.label.toLowerCase()} • painel em ${power}%</small>`;
    button.addEventListener("click", () => downloadText(buildPowerNgc(currentData, currentThickness, index), filename));
    ui.individualDownloads.appendChild(button);
  });
}

function initializeCustom() {
  const operationKey = ui.operation.value;
  const material = MATERIALS[ui.material.value];
  ui.customPowers.value = material.powers[operationKey].standard.join(", ");
  ui.customSpeeds.value = OPERATIONS[operationKey].speeds.standard.join(", ");
  customInitialized = true;
}

function updateOperationUi(operation) {
  const operationKey = ui.operation.value;
  const isCut = operationKey === "cut";
  const isRaster = operationKey === "raster";

  ui.powerRangeLabel.textContent = "Faixa de potência";
  ui.matrixSizeLabel.textContent = "Matriz";
  ui.matrixLegend.hidden = false;
  ui.summaryLegend.hidden = true;

  if (isCut) {
    ui.machineLimitText.textContent = `Corte: limite adotado para esta VS6040 = ${operation.speedLimit} mm/s.`;
  } else if (isRaster) {
    ui.machineLimitText.textContent = `Raster Engrave: faixa experimental do gerador = até ${operation.speedLimit} mm/s. A velocidade é ajustada no K40 Whisperer.`;
  } else {
    ui.machineLimitText.textContent = `Gravação vetorial: faixa experimental do gerador = até ${operation.speedLimit} mm/s.`;
  }

  ui.operationInfo.innerHTML = `<strong>${operation.label}</strong><span>${operation.description}</span>`;

  if (isCut) {
    ui.parameterStatus.className = "parameter-status validated";
    ui.parameterStatus.innerHTML = `<strong>Configuração específica para VS6040</strong>O gerador limita os arquivos de corte a ${operation.speedLimit} mm/s.`;
  } else if (isRaster) {
    ui.parameterStatus.className = "parameter-status experimental";
    ui.parameterStatus.innerHTML = `<strong>Raster Engrave nativo • parâmetros experimentais</strong>As células pretas são SVGs raster. Cada combinação potência × velocidade gera um arquivo separado porque a potência é manual no painel e a velocidade raster é global no K40 Whisperer.`;
  } else {
    ui.parameterStatus.className = "parameter-status experimental";
    ui.parameterStatus.innerHTML = `<strong>Parâmetros experimentais</strong>Os presets de gravação vetorial ainda precisam ser validados fisicamente na VS6040.`;
  }

  ui.customSpeedHelp.textContent = isCut
    ? `Valores entre 0,1 e ${operation.speedLimit} mm/s. Limite aplicado pelo gerador para corte na VS6040.`
    : isRaster
      ? `Valores entre 0,1 e ${operation.speedLimit} mm/s. Cada velocidade exigirá um Raster Engrave separado.`
      : `Valores entre 0,1 e ${operation.speedLimit} mm/s. Faixa experimental desta versão.`;

  ui.previewTitle.textContent = `Padrão de ${operation.label.toLowerCase()}`;
  ui.testLegend.textContent = operation.label;
  ui.testSwatch.classList.toggle("cut", isCut);
  ui.testSwatch.classList.toggle("engrave", !isCut && !isRaster);
  ui.testSwatch.classList.toggle("raster", isRaster);
}

function clearInvalidState(text) {
  currentData = null;
  currentSvg = "";
  ui.preview.innerHTML = "";
  ui.procedureSteps.innerHTML = "";
  ui.individualDownloads.innerHTML = "";
  ui.message.textContent = text;
  ui.powerRange.textContent = "—";
  ui.matrixSize.textContent = "—";
  ui.powerValues.innerHTML = "";
  ui.speedValues.innerHTML = "";
  ui.packageButton.disabled = true;
  ui.svgButton.disabled = true;
}

function updateInterface() {
  const isSummary = ui.format.value === "summary";

  ui.matrixControls.hidden = isSummary;
  ui.summaryControls.hidden = !isSummary;

  const thickness = Number(ui.thickness.value);
  if (!Number.isFinite(thickness) || thickness <= 0) {
    clearInvalidState("Informe uma espessura válida.");
    return;
  }

  currentThickness = thickness;

  if (isSummary) {
    try {
      if (!summaryInitialized) {
        initializeSummaryFields();
      }

      const data = getSummaryData();
      currentData = data;

      updateSummaryUi(data);
      currentSvg = buildSummarySvg(data, thickness);
      ui.preview.innerHTML = currentSvg.replace(/^<\?xml[^>]*>\s*/i, "");
      renderSummaryProcedure(data);
      renderSummaryIndividualDownloads(data);

      ui.message.textContent = "";
      ui.packageButton.disabled = false;
      ui.svgButton.disabled = false;
      return;
    } catch (error) {
      clearInvalidState(error.message);
      ui.matrixControls.hidden = true;
      ui.summaryControls.hidden = false;
      return;
    }
  }

  const operation = OPERATIONS[ui.operation.value];
  updateOperationUi(operation);

  const custom = ui.pattern.value === "custom";
  ui.customPanel.hidden = !custom;

  if (custom && !customInitialized) {
    initializeCustom();
  }

  try {
    const data = getPresetData();

    if (data.speeds.some(speed => speed > data.operation.speedLimit)) {
      throw new Error(`Velocidade máxima permitida no modo ${data.operation.label}: ${data.operation.speedLimit} mm/s.`);
    }

    currentData = data;
    const combinations = data.powers.length * data.speeds.length;

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

    currentSvg = buildSvg(data, thickness);
    ui.preview.innerHTML = currentSvg.replace(/^<\?xml[^>]*>\s*/i, "");

    renderProcedure(data);
    renderIndividualDownloads(data);

    ui.message.textContent = "";
    ui.packageButton.disabled = false;
    ui.svgButton.disabled = false;
  } catch (error) {
    clearInvalidState(error.message);
    ui.matrixControls.hidden = false;
    ui.summaryControls.hidden = true;
  }
}

ui.format.addEventListener("change", updateInterface);

ui.operation.addEventListener("change", () => {
  customInitialized = false;
  updateInterface();
});

ui.material.addEventListener("change", () => {
  if (ui.pattern.value === "custom") {
    customInitialized = false;
  }
  summaryInitialized = false;
  updateInterface();
});

ui.thickness.addEventListener("input", updateInterface);

ui.pattern.addEventListener("change", () => {
  if (ui.pattern.value === "custom") {
    customInitialized = false;
  }
  updateInterface();
});

ui.customPowers.addEventListener("input", updateInterface);
ui.customSpeeds.addEventListener("input", updateInterface);

ui.summaryPreset.addEventListener("change", () => {
  summaryInitialized = false;
  updateInterface();
});

[
  ui.summaryEngravePower,
  ui.summaryEngraveSpeeds,
  ui.summaryRasterSpeed,
  ui.summaryRasterPowers,
  ui.summaryCutPower,
  ui.summaryCutSpeeds
].forEach(control => {
  control.addEventListener("input", updateInterface);
});

ui.packageButton.addEventListener("click", downloadPackage);

ui.svgButton.addEventListener("click", () => {
  if (!currentData) return;

  const filename = currentData.format === "summary"
    ? `${getSummaryPackageName(currentData, currentThickness)}_resumo-A5.svg`
    : `${getPackageName(currentData, currentThickness)}_referencia.svg`;

  downloadText(currentSvg, filename, "image/svg+xml");
});

ui.appVersion.textContent = `v${APP_VERSION}`;
updateInterface();
