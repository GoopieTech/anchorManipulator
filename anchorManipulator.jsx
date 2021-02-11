/**
 * AlexeyGfi, 2021
 * email: alexeygfi@gmail.com
 * email: info@goopie.pro
 * website: goopie.pro
 */

// Build map of anchor points
function buildAnchorGrid (selectedLayer) {
  var rectangle = selectedLayer.sourceRectAtTime(app.project.activeItem.time, false);

  var left = rectangle.left;
  var right = left + rectangle.width;

  var top = rectangle.top;
  var bottom = top + rectangle.height;

  var centerV = left + rectangle.width / 2;
  var centerH = top + rectangle.height / 2;

  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom,
    centerH: centerH,
    centerV: centerV,
  };
}

// Shift position and shift anchor point
// ...regarding scale in layer transform
function shiftAnchor (selectedLayer, direction) {

  var anchorMap = buildAnchorGrid(selectedLayer);

  var position = selectedLayer.transform.position.value;
  var ancorCurrent = selectedLayer.transform.anchorPoint.value;
  var scale = selectedLayer.transform.scale.value;

  var
    newAncorX = 0,
    newAncorY = 0,
    positionXCompensator,
    positionYCompensator;

  var skipPosition = direction.match(/_al/);

  switch (direction.charAt(0)) {
    case 'L' :
      newAncorX = anchorMap['left'];
      break;

    case 'C' :
      newAncorX = anchorMap['centerV'];
      break;

    case 'R' :
      newAncorX = anchorMap['right'];
      break;
  }

  switch (direction.charAt(1)) {
    case 'T' :
      newAncorY = anchorMap['top'];
      break;

    case 'C' :
      newAncorY = anchorMap['centerH'];
      break;

    case 'B' :
      newAncorY = anchorMap['bottom'];
      break;
  }

  if (!skipPosition) {
    app.beginUndoGroup('Anchor Manipulator (anchor to object)');

    positionXCompensator = (ancorCurrent[0] - newAncorX) / 100 * scale[0];
    position[0] -= positionXCompensator;

    positionYCompensator = (ancorCurrent[1] - newAncorY) / 100 * scale[1];
    position[1] -= positionYCompensator;

    selectedLayer.transform.position.setValue(position);
  } else {
    app.beginUndoGroup('Anchor Manipulator (object to anchor)');
  }

  ancorCurrent[0] = newAncorX;
  ancorCurrent[1] = newAncorY;
  selectedLayer.transform.anchorPoint.setValue(ancorCurrent);

  app.endUndoGroup();
}

function recognizedKey (key) {
  var map = {
    1: 'LB',
    2: 'CB',
    3: 'RB',
    4: 'LC',
    5: 'CC',
    6: 'RC',
    7: 'LT',
    8: 'CT',
    9: 'RT',
    'End': 'LB',
    // 2: 'CB',
    'PageDown': 'RB',
    // 4: 'LC',
    'Clear': 'CC',
    // 6: 'RC',
    'Home': 'LT',
    // 8: 'CT',
    'PageUp': 'RT',
    // Special case anchor centering (!)
    // ...look at https://github.com/GoopieTech/anchorManipulator
    'Multiply': '00',
  };

  return map[key];
}

function parseDirection () {
  /**
   * Directions (direction argument):
   *
   *  LC = left center
   *  LT = left top
   *  LB = left bottom
   *
   *  RC = right center
   *  RT = right top
   *  RB = right bottom
   *
   *  CT = center top
   *  CB = center bottom
   */

  var direction = null;

  try {
    var keyboardHandler = ScriptUI.environment.keyboardState;

    var key = keyboardHandler.keyName;
    var alt = keyboardHandler.altKey;
    var ctrl = keyboardHandler.ctrlKey;

    // !!!
    // shiftKey always false!
    // =( =( =( =( =( =( =( =( =(
    // var shift = keyboardHandler.shiftKey;

    if (recognizedKey(key) && (alt || ctrl)) {
      direction = recognizedKey(key);
      if (alt) {
        direction += '_align';
      }
    }

  } catch (e) {
    alert(e);
  }

  return direction;
}

function main () {

  var activeItem = app.project.activeItem;
  var selectedLayer = activeItem.selectedLayers[0];

  if (
    !selectedLayer
    // || (selectedLayer.matchName != 'ADBE Vector Layer' && selectedLayer.matchName != 'ADBE Text Layer')
  ) {
    alert('Please select a layer');
    return;
  }

  try {
    var direction = parseDirection();
    if (direction) {
      shiftAnchor(selectedLayer, direction);
    }
  } catch (e) {
    alert(e);
    alert('Something Wrong. You should select path group in target layer before script start');
  }
}

main();