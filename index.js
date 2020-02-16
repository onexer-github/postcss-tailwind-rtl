const postcss = require('postcss')

module.exports = postcss.plugin('postcss-tailwind-rtl', () => {
  let _properties = [
    'float',
    'margin-left',
    'margin-right',
    'padding-left',
    'padding-right'
  ]

  // Work with options here

  return function (css) {
    css.walkRules(rule => {
      let nonStandard = rule.nodes.filter(node => {
        return node.type === 'decl' && declExists(_properties, rule.nodes)
      })

      if (nonStandard.length > 0) {
        let clone = rule.cloneBefore({ selector: rule.selector })
        parseSelectors(rule, 'ltr')
        parseSelectors(clone, 'rtl')
        parseDeclarations(clone)
      }
    })
  }

  function parseSelectors (rule, dir) {
    let focuses = []
    rule.selectors.forEach(selector => {
      focuses.push('[dir=\'' + dir + '\'] ' + selector)
    })
    rule.selectors = focuses
  }

  function declExists (props, declarations) {
    for (let element of declarations) {
      if (props.includes(element.prop)) {
        return true
      }
    }
    return false
  }

  function parseDeclarations (rule) {
    rule.walkDecls(declaration => {
      if (declaration.prop === 'float' && declaration.value === 'right') {
        declaration.value = 'left'
      } else if (declaration.prop === 'float' && declaration.value === 'left') {
        declaration.value = 'right'
      } else if (declaration.prop === 'margin-left') {
        declaration.prop = 'margin-right'
      } else if (declaration.prop === 'margin-right') {
        declaration.prop = 'margin-left'
      } else if (declaration.prop === 'padding-left') {
        declaration.prop = 'padding-right'
      } else if (declaration.prop === 'padding-right') {
        declaration.prop = 'padding-left'
      }
    })
  }
})
