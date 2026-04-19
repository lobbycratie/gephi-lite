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
  function computeCoords(i, r, nb, xoffset, yoffset, a, b) {
    var tau = Math.PI * 2;
    var x = a * r * Math.cos((i * tau) / nb) + xoffset;
    var y = b * r * Math.sin((i * tau) / nb) + yoffset;
    return { x: x, y: y };
  }

  function initStaticVars(instance, graph) {
    instance.staticVars = { index1: 0, index2: 0, nodesCount1: 0, nodesCount2: 0 };
    var nodes = [...graph._nodes];
    instance.staticVars.nodesCount1 = nodes.filter(([k, v]) => v.attributes.Type == "Pathologie").length + 12;
    instance.staticVars.nodesCount2 = nodes.filter(([k, v]) => v.attributes.Type == "Victime").length;
  }

  // Parameters :
  var a = 1;
  var b = 1;
  var cx = 0;
  var cy = 0;
  var rayon1 = 400; /* rayon du cercle des Pathologies */
  var rayon2 = 600; /* rayon du cercle des Victimes */
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

  if (attributes.Type == "Pathologie") {
    rayon = rayon1;
    nb = this.staticVars.nodesCount1;
    this.staticVars.index1++;
    if (this.staticVars.index1 == 17) {
      this.staticVars.index1 = 23;
    } else if (this.staticVars.index1 == 55) {
      this.staticVars.index1 = 61;
    }
    i = this.staticVars.index1;
    a = 1;  // a = 0.7 for ellipse
  } else {
    rayon = rayon2;
    nb = this.staticVars.nodesCount2;
    this.staticVars.index2++;
    i = this.staticVars.index2;
  }

  return computeCoords(i, rayon, nb, cx, cy, a, b);
}
