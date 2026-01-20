/**
 * Function that return coordinates for the specified node.
 *
 * @param {string} id The ID of the node
 * @param {Object.<string, number | string | boolean | undefined | null>} attributes Attributes of the node
 * @param {number} index The index position of the node in the graph
 * @param {Graph} graph The graphology instance (documentation: https://graphology.github.io/ )
 * @returns {x: number, y: number} The computed coordinates of the node
 */
function nodeCoordinates(id, attributes, index, graph) {
  // / Your code goes here
  function computeCoords(i, r, nb, xoffset, yoffset) {
    var tau = Math.PI * 2;
    var x = r * Math.cos((i * tau) / nb) + xoffset;
    var y = r * Math.sin((i * tau) / nb) + yoffset;
    return { x: x, y: y };
  }

  function initStaticVars(instance, graph) {
    instance.staticVars = { index1: 0, index2: 0, nodesCount1: 0, nodesCount2: 0 };
    var nodes = [...graph._nodes];
    instance.staticVars.nodesCount1 = nodes.filter(([k, v]) => v.attributes.type == "Pathologie").length;
    instance.staticVars.nodesCount2 = nodes.filter(([k, v]) => v.attributes.type == "Victime").length;
  }

  // Parameters :
  var cx = 0;
  var cy = 0;
  var rayon1 = 500; /* rayon du cercle des Pathologies */
  var rayon2 = 800; /* rayon du cercle des Victimes */
  var centerNodeId = "A0";

  if (index == 0) {
    initStaticVars(this, graph);
  }

  if (id == centerNodeId) {
    return { x: cx, y: cy };
  }

  // init some vars
  var i = 0;
  var rayon = 0;
  var nb = 0;

  if (attributes.type == "Pathologie") {
    rayon = rayon1;
    nb = this.staticVars.nodesCount1;
    this.staticVars.index1++;
    i = this.staticVars.index1;
  } else {
    rayon = rayon2;
    nb = this.staticVars.nodesCount2;
    this.staticVars.index2++;
    i = this.staticVars.index2;
  }

  return computeCoords(i, rayon, nb, cx, cy);

}
