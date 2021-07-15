import { isValidElement } from 'react'
import { $ } from '@ibot/ibot/lib/util'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

const MARGIN = 9

/**
 * Position menu according to where its opener is and return
 * corresponding information.
 *
 * @param {Object}
 *  @prop {Element} $opener
 *  @prop {Element} $menuBase
 *  @prop {Object} [menuBaseStyle={}]
 *  @prop {String} [inflexible=false]
 *  @prop {Boolean} [shouldSetMaxHeight=false]
 *  @prop {Number [decidingPoint]
 *@return {Object}
 *  @prop {Object} style
 *  @prop {Boolean} isDownward
 */
export function positionMenu ({
  $opener,
  $menuBase,

  menuBaseStyle = {},

  inflexible = false,
  shouldSetMaxHeight = false,
  $menuContainer,
  $fontTip,
  isRightAlign = false
}) {
  if (!$opener || !$menuBase) return

  const $menu = $menuBase.querySelector('*')

  const $current = $('li[role=option].is-active', $menu) || $('li[role=option]', $menu) || $('li[role=empty-msg]', $menu)

  const $activeItemRect = $current.getBoundingClientRect()
  const $menuRect = $menu.getBoundingClientRect()

  const result = { styleFor$menuBase: {}, styleFor$menu: {}, styleFor$menuContainer: {}, styleFor$fontTip: { } }
  const setStyleFor$menuBase = style => Object.assign(result.styleFor$menuBase, style)
  const setStyleFor$menu = style => Object.assign(result.styleFor$menu, style)
  const setStyleFor$menuContainer = style => Object.assign(result.styleFor$menuContainer, style)
  const setStyleFor$fontTip = style => Object.assign(result.styleFor$fontTip, style)

  const { offsetWidth: wOf$menu, offsetHeight: hOf$menu } = $menu
  const wOf$opener = menuBaseStyle.width || $opener.offsetWidth
  const hOf$opener = menuBaseStyle.height || $opener.offsetHeight

  const rect = $opener.getBoundingClientRect()

  const { top, right, bottom, left } = Object.assign(
    {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    },
    menuBaseStyle
  )

  // Copy positioning info of $opener to $menuBase:
  setStyleFor$menuBase({
    top: `${top}px`,
    left: `${left}px`,
    width: `${wOf$opener}px`,
    height: `${hOf$opener}px`
  })

  const { innerHeight: hOf$win } = window

  const minY = 10
  const maxY = hOf$win - 10

  const bottomOf$opener = top + hOf$opener

  let adjustMenuTop = 0
  let scroolMove = 0

  const moveValue = ($activeItemRect.top - $menuRect.top) / 0.8

  if (checkActiveTargetVisible($menuRect, $activeItemRect)) {
    adjustMenuTop = -moveValue
  } else {
    scroolMove = $activeItemRect.bottom / 0.8 - $menuRect.bottom / 0.8
    adjustMenuTop = -moveValue + scroolMove
  }

  let $fontTipHeight = 0

  if ($fontTip) {
    $fontTipHeight = $fontTip.getBoundingClientRect().height
  }

  isRightAlign && setStyleFor$menuContainer({ right: 0 })

  // Slide downward:
  if ((bottomOf$opener + hOf$menu + MARGIN + adjustMenuTop + $fontTipHeight) < hOf$win
  ) {
    result.isDownward = true
    if (checkActiveTargetVisible($menuRect, $activeItemRect)) {
      setStyleFor$menuContainer({
        top: `${adjustMenuTop}px`
      })

      if ($fontTip) {
        setStyleFor$fontTip({
          top: `${adjustMenuTop + $menuRect.height / 0.8}px`,
          width: `${$menuRect.width / 0.8}px`
        })
      }
    } else {
      setStyleFor$menuContainer({
        top: `${adjustMenuTop}px`
      })

      $menuContainer.scrollTop = scroolMove

      if ($fontTip) {
        setStyleFor$fontTip({
          top: `${adjustMenuTop + $menuRect.height / 0.8}px`,
          width: `${$menuRect.width / 0.8}px`
        })
      }
    }

    // If the height of the menu is taller than that of space downward:
    if (shouldSetMaxHeight && bottom + hOf$menu > maxY) {
      setStyleFor$menu({ maxHeight: `${maxY - bottom}px` })
    }

  // Slide upward:
  } else {
    result.isDownward = false

    // If the height of the menu is taller than that of space upward:
    if (shouldSetMaxHeight && top - hOf$menu < minY) {
      setStyleFor$menu({ maxHeight: `${top - minY}px` })
    }
  }

  Object.assign($menuBase.style, result.styleFor$menuBase)
  Object.assign($menu.style, result.styleFor$menu)
  Object.assign($menuContainer.style, result.styleFor$menuContainer)

  if ($fontTip) {
    Object.assign($fontTip.style, result.styleFor$fontTip)
  }

  return result
}

export function getOptionLabel (it) {
  return (
    isString(it) || isNumber(it) || isValidElement(it)
      ? it
      : it.label || it.value
        ? it.label || it.value
        : undefined
  )
}

export function getOptionValue (it) {
  return (
    isString(it) || isNumber(it)
      ? String(it)
      : it.value || it.label
        ? String(it.value || it.label)
        : undefined
  )
}

export function checkOptionByValue (it, value) {
  return !!value && getOptionValue(it) === String(value)
}

export const INPUT_ARROW = `<svg width="10" height="10" ><path d="M5 5.255l1.87-2.043a.623.623 0 0 1 .936 0 .77.77 0 0 1 0 1.022L5.468 6.788a.623.623 0 0 1-.936 0L2.194 4.234a.77.77 0 0 1 0-1.022.623.623 0 0 1 .935 0L5 5.255z" /></svg>`

function checkActiveTargetVisible ($menuRect, $activeItemRect) {
  return $activeItemRect.top / 0.8 >= $menuRect.top / 0.8 && $activeItemRect.bottom / 0.8 <= $menuRect.bottom / 0.8
}
