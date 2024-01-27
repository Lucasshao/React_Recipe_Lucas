export function classNameStyled(className, styles, pre_style_list = []) {
  const classList = className ? className.split(' ') : []
  const classListStyled = classList.map((item) => { return styles[item] })
  pre_style_list.forEach((item) => { classListStyled.unshift(styles[item]) })
  return classListStyled.join(' ')
}
