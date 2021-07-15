import styled from 'styled-components'

/**
 * chrome bug: 此处textarea调用focus会导致整个页面错乱,
 * 需要使用一系列hack定位来避免此异常, 很不稳定
 * 解决: 不focus 直接select必须使用left和top对该元素进行定位, 否则将在focus时使页面错乱
 */
// TODO: 代码优化
export const StyledEditableSpan = styled.div`
  width: 100%;
  height: 24px;
  line-height: 22px;
  overflow: hidden;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  &.is-editing {
    width: 100%;
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid #f55d54;

    textarea {
      resize: none;
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      background: transparent;
      color: #525e71;
      white-space: nowrap;
      overflow: hidden;

      &::selection {
        background: color(#f55d54 a(0.2));
      }
    }
  }
`
