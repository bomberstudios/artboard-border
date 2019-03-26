import sketch from 'sketch'
const Rectangle = sketch.Rectangle
const ShapePath = sketch.ShapePath
const Style = sketch.Style
const SHAPENAME = 'artboard-border'

var doc = sketch.getSelectedDocument()

export function addBorder() {
  // First, create a style for the border
  var borderStyle = new Style({
    borders: [{
      color: '#969696',
      position: Style.BorderPosition.Inside
    }]
  })

  var page = doc.selectedPage
  var artboards = page.layers.filter(layer => layer.type == 'Artboard')
  artboards.forEach(artboard => {
    var frame = artboard.frame
    var rect = new Rectangle(0, 0, frame.width, frame.height)
    new ShapePath({
      name: SHAPENAME,
      frame: rect,
      parent: artboard,
      style: borderStyle
    })
  })
}

export function removeBorder() {
  var page = doc.selectedPage
  var artboards = page.layers.filter(layer => layer.type == 'Artboard')
  artboards.forEach(artboard => {
    var borderLayers = artboard.layers.filter(layer => layer.name == SHAPENAME)
    borderLayers.forEach(border => border.remove())
  })
}
