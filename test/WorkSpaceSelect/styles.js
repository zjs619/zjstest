import styled from 'styled-components'

export const StyledSelect = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 3em;
  height: 28px;
  font-size: 12px;
  color: #5b6b73;
  cursor: pointer;

  button {
    display: block;
    height: 100%;
    color: #1f292e;
    text-align: start;
    cursor: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .caret {
    padding: 0 0.5em;
    color: #7d8694;
    height: 100%;
    display: inline-flex;
    align-items: center;

    svg {
      width: 10px;
      height: 10px;
      fill: currentColor;
      transition: transform 0.2s ease-out;
    }
  }

  & {
    padding-left: 5px;
    border: 1px solid transparent;
    border-radius: 2px;
  }

  &.is-open {
    border-color: #1e98ea;

    .caret {
      margin-left: auto;
      visibility: visible;

      svg {
        transform: rotate(180deg);
      }
    }
  }

  &:not(.is-disabled):not(.readonly):hover {
    border-color: #ededed;

    .caret {
      margin-left: auto;
      visibility: visible;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.readonly {
    cursor: default;
  }
`

export const StyledSelectMenu = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1100;

  .WorkspaceSelectMenu {
    position: absolute;
    padding: 0;
    display: block;
    max-width: 20em;
    min-width: 100%;
    min-height: 30px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    border-radius: 2px;
    background-color: #1f292e;
    pointer-events: all;
    /* transition: 0.2s ease-out; */
    transition-property: transform, opacity;
    transform-origin: 50% 0;
    margin: 0;

    &::-webkit-scrollbar {
      display: block;
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #DEDEE4;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(#fff, 0.5);
    }

    &.is-empty {
      width: fit-content;
    }

    &:not(.is-open) {
      opacity: 0;
      transform: scale(0.8);
    }

    &.is-downward {
      top: 100%;
      bottom: initial;
    }

    &.is-upward {
      transform-origin: 50% 100%;
      top: initial;
      bottom: 100%;
    }

    &.is-open {
      opacity: 1;
      pointer-events: initial;
    }

    .SelectOption {
      display: flex;
      align-items: center;
      height: 28px;
      line-height: 28px;
      cursor: pointer;

      & > .Ellipsis {
        padding: 0 16px;
      }

      &.is-disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &.is-active {
        background-color: #415058;
        color: #fff;
      }

      &:not(.empty-msg):not(.is-disabled):not(.is-active):hover {
        background-color: #298df8;
        color: #fff;
      }

      &.empty-msg {
        padding: 0 0.5em;
        color: #8d9ea6;
        cursor: not-allowed;
      }
    }

    &.cant-select .SelectOption {
      cursor: default;
    }

    .SelectGroup {
      .divider {
        height: 1px;
        margin: 4px 16px;
        background: #7d8694;
      }

      & > .title {
        font-size: 12px;
        padding: 0 8px 0 16px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #8d9ea7;

        span {
          display: block;
        }
      }

      & > ul {
        margin: 0;
        padding: 0;
      }
    }
  }

  .font-select-menu-tip {
    position: absolute;
    margin-top: -1px;
    padding: 8px 16px;
    font-size: 10px;
    box-shadow: 0 2px 10px 0 rgba(39, 54, 78, 0.08), 4px 12px 40px 0 rgba(39, 54, 78, 0.1);
    color: #fff;
    background-color: #1f292e;
    border-radius: 0 0 2px 2px;
    pointer-events: auto;
    transition: opacity 0.2s ease-in;
    /* transition-property: transform, opacity;
    transform-origin: 50% 0; */

    .font-link {
      color: #fff;
      margin-left: 10px;
      text-decoration: underline;
    }

    &:not(.is-show) {
      opacity: 0;
    }

    &.is-show {
      opacity: 1;
      color: rgba(255, 255, 255, 1);
    }
  }
`
