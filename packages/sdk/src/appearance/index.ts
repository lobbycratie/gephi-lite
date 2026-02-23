import { gephiLiteParse, gephiLiteStringify } from "../utils";
import { type AppearanceState } from "./types";
import { type CustomAppearanceState } from "./types";

export * from "./types";

export const DEFAULT_NODE_COLOR = "#999999";
export const DEFAULT_EDGE_COLOR = "#cccccc";
export const DEFAULT_HOVERED_EDGE_COLOR = "#363434";
export const DEFAULT_HOVERED_EDGE_SIZE_COEF = 1.3;
export const DEFAULT_NODE_SIZE = 20;
export const DEFAULT_EDGE_SIZE = 6;
export const DEFAULT_NODE_LABEL_SIZE = 14;
export const DEFAULT_EDGE_LABEL_SIZE = 14;
export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF00";
export const DEFAULT_LAYOUT_GRID_COLOR = "#666666";
export const DEFAULT_SHADING_COLOR = "#ffffff";

// Custom appearance default values
const DEFAULT_NODE_LABEL_SIZE_ZOOM_CORRELATION = 0.8;
const DEFAULT_NODE_LABEL_SIZE_DENSITY = 10;
const DEFAULT_HIDDEN_PANELS = "none";
const DEFAULT_RESTRICTED_NAVIGATION = false;
const DEFAULT_RIGHT_PANEL_WIDTH = "25rem";
const DEFAULT_HIDE_ATTRIBUTES = true;
const DEFAULT_HIDDEN_NODE_ATTRIBUTES = [ "ID", "name", "size", "image", "color", "x", "y", "label", "nodesize" ];
const DEFAULT_HIDDEN_EDGE_ATTRIBUTES = [ "ID", "weight", "selfLoop", "directed" ];

const URL_PARAM_HIDE_PANELS = "hp";
const URL_PARAM_RESTRICTED_NAVIGATION = "rn";
const URL_PARAM_RIGHT_PANEL_WIDTH = "rpw";


export function getEmptyAppearanceState(): AppearanceState {
  return {
    showEdges: {
      value: true,
    },
    nodesSize: {
      type: "fixed",
      value: DEFAULT_NODE_SIZE,
    },
    edgesSize: {
      type: "fixed",
      value: DEFAULT_EDGE_SIZE,
    },
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    layoutGridColor: DEFAULT_LAYOUT_GRID_COLOR,
    nodesColor: {
      type: "fixed",
      value: DEFAULT_NODE_COLOR,
    },
    edgesColor: {
      type: "fixed",
      value: DEFAULT_EDGE_COLOR,
    },
    nodesLabel: {
      type: "none",
    },
    edgesLabel: {
      type: "none",
    },
    nodesLabelSize: {
      type: "fixed",
      value: DEFAULT_NODE_LABEL_SIZE,
      zoomCorrelation: DEFAULT_NODE_LABEL_SIZE_ZOOM_CORRELATION,
      density: DEFAULT_NODE_LABEL_SIZE_DENSITY,
    },
    edgesLabelSize: {
      type: "fixed",
      value: DEFAULT_EDGE_LABEL_SIZE,
      zoomCorrelation: 0,
      density: 1,
    },
    nodesLabelEllipsis: {
      type: "ellipsis",
      enabled: false,
      maxLength: 25,
    },
    edgesLabelEllipsis: {
      type: "ellipsis",
      enabled: false,
      maxLength: 25,
    },
    nodesImage: {
      type: "none",
    },
    edgesZIndex: {
      type: "none",
    },
  };
}


export function getCustomAppearanceState(): CustomAppearanceState {

  let hidePanels: string | null = DEFAULT_HIDDEN_PANELS;
  let restrictedNavigation: boolean = DEFAULT_RESTRICTED_NAVIGATION;
  let rightPanelWidth: string = DEFAULT_RIGHT_PANEL_WIDTH;

  const url = new URL(window.location.href);
  if (url.searchParams.has(URL_PARAM_HIDE_PANELS)) {
    hidePanels = url.searchParams.get(URL_PARAM_HIDE_PANELS);
  }
  if (url.searchParams.has(URL_PARAM_RESTRICTED_NAVIGATION)) {
    restrictedNavigation = url.searchParams.get(URL_PARAM_RESTRICTED_NAVIGATION) == "true";
  }
  if (url.searchParams.has(URL_PARAM_RIGHT_PANEL_WIDTH)) {
    rightPanelWidth = (url.searchParams.get(URL_PARAM_RIGHT_PANEL_WIDTH) || rightPanelWidth).toString();
  }
  return {
    restrictedNavigation: restrictedNavigation,
    hideTopPanel: hidePanels == "top" || hidePanels == "all" ? true : false,
    hideLeftPanel: hidePanels == "left" || hidePanels == "all" ? true : false,
    rightPanelWidth: rightPanelWidth,
    hideItemAttributes: DEFAULT_HIDE_ATTRIBUTES,
    hiddenNodeAttributes: DEFAULT_HIDDEN_NODE_ATTRIBUTES,
    hiddenEdgeAttributes: DEFAULT_HIDDEN_EDGE_ATTRIBUTES,
  };
}



/**
 * Appearance lifecycle helpers (state serialization / deserialization):
 */
export function serializeAppearanceState(appearance: AppearanceState): string {
  return gephiLiteStringify(appearance);
}
export function parseAppearanceState(rawAppearance: string): AppearanceState | null {
  try {
    // TODO:
    // Validate the actual data
    return { ...getEmptyAppearanceState(), ...gephiLiteParse(rawAppearance) };
  } catch (_e) {
    return null;
  }
}

/**
 * Custom Appearance lifecycle helpers (state serialization / deserialization):
 */
export function serializeCustomAppearanceState(appearance: CustomAppearanceState): string {
  return gephiLiteStringify(appearance);
}
export function parseCustomAppearanceState(rawAppearance: string): CustomAppearanceState | null {
  try {
    // TODO:
    // Validate the actual data
    return { ...getCustomAppearanceState(), ...gephiLiteParse(rawAppearance) };
  } catch (_e) {
    return null;
  }
}
