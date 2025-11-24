/**
 * Creates a radial gradient with animated position based on rotation angle
 * @param {number} rotation - Rotation angle in degrees
 * @param {number} offset - Offset angle in degrees (for layering)
 * @param {Array} colors - Array of color stops with opacity
 * @param {number} radius - Radius offset from center (percentage)
 * @returns {string} CSS radial-gradient string
 */
export const createAnimatedGradient = (rotation, offset = 0, colors, radius = 20) => {
  const angle = ((rotation + offset) * Math.PI) / 180
  const x = 50 + radius * Math.cos(angle)
  const y = 50 + radius * Math.sin(angle)
  
  const colorStops = colors.map((color, index, arr) => {
    const position = (index / (arr.length - 1)) * 100
    return `${color} ${position}%`
  }).join(', ')
  
  return `radial-gradient(circle at ${x}% ${y}%, ${colorStops})`
}

