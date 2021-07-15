import Loading from '../Loading'

import styled, { createGlobalStyle } from 'styled-components'

export const ThemeLoading = styled(Loading)`
  svg g g:first-child g path:last-child {
    stroke: rgb(237, 237, 237);
  }

  svg g g:last-child g path:last-child {
    stroke: rgb(200, 205, 208);
  }
`

export const StyledSharingMenu = styled.div`
  width: 354px;

  .header-first-line {
    font-size: 14px;
    color: #333;
    line-height: 14px;
  }

  .header-second-line {
    font-size: 12px;
    color: #999;
    line-height: 12px;
    margin: 8px 0 0 0;
  }

  .access-url {
    display: flex;
    justify-content: space-between;
    margin-top: 21px;
    position: relative;
    
    .tips {
      display: none;
    }

    &.update-tips{
      .tips {
        display: inline-block;
        position: absolute;
        bottom: 0;
        font-size: 12px;
        color: #f02e2e;
        line-height: 14px;
        
        &.zh-CN {
          bottom: 10px;
        }
      }
    }
  }

  .access-rights {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    height: 14px;
    color: #333;

    .WorkspaceSelect {
      margin-right: -10px;
      font-size: 14px;

      .btn-wp {
        justify-content: space-between;

        &:not(.is-toolbar):hover {
          background: #f3f4f5;
        }

        .caret {
          margin-left: 0;
        }

        button {
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  .pwd-input {
    display: flex;
    align-items: center;
    margin-top: 14px;

    .html-input {
      background: #f3f4f5;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      font-size: 14px;
      color: #333;
      height: 30px;
      width: 67px;
      padding: 0 8px;
    }

    .change-pwd-btn {
      font-size: 14px;
      color: #298df8;
      text-align: right;
      margin-left: 16px;
      cursor: pointer;
    }
  }

  .html-url-input {
    height: 40px;
    width: 271px;
    display: flex;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    color: #415058;
    border-radius: 4px;
    margin-bottom: 30px;

    input {
      padding: 13px 6px 13px 16px;
      width: 210px;
      color: #415058;
      white-space: nowrap;
      overflow: hidden;
      background: #f3f4f5;
    }

    &.read-only {
      margin-bottom: 0;

      input {
        width: 100%;
      }
    }

    label {
      width: 60px;
      text-align: center;
      cursor: pointer;

      button {
        border-radius: 0 4px 4px 0;
        height: 100%;
        width: 100%;
      }

      .close-button {
        font-size: 14px;
        color: #333;
      }
    }

    .html-button {
      position: relative;
      padding: 0 26px;
      height: 100%;
      font-size: 12px;
      background-color: #fcfcfc;

      .state {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: all 0.15s ease-out;
      }

      .state-1 {
        opacity: 0;
        transform: translateY(-50%);
      }

      &.is-state-1 .state-0 {
        opacity: 0;
        transform: translateY(50%);
      }

      &.is-state-1 .state-1 {
        opacity: 1;
        transform: none;
      }

      .loading {
        width: 16px;
        height: 16px;
      }
    }
  }

  .url-copy-button {
    position: relative;
    background: #298df8;
    border-radius: 4px;
    height: 40px;
    width: 60px;
    color: #fff;

    .red-dot::after {
      content: '';
      position: absolute;
      top: -3px;
      right: -3px;
      background: #f02e2e;
      border: 1px solid #fff;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }

    .state {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: all 0.15s ease-out;
    }

    .state-1 {
      opacity: 0;
      transform: translateY(-50%);
    }

    &.is-state-1 .state-0 {
      opacity: 0;
      transform: translateY(50%);
    }

    &.is-state-1 .state-1 {
      opacity: 1;
      transform: none;
    }
  }

  .url-action {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;

    .html-input {
      padding-left: 11px;
      flex: 1;
    }
  }

  .checked-icon {
    transform: scale(1.5);
  }
`

export const StyledUpdatingAppTokenConfirmationGlobalStyle = createGlobalStyle`
  #IBOT_DROPDOWN_MENU_ROOT {

    .DesignDropdownMenuBase {
      .menu-wrapper {
        padding: 24px;
      }

      header {
        border-bottom: none;
      }
    }

    .updating-app-token-confirmation {
      margin-top: 12px;

      &:not(.is-open) {
        transform: translate(-50%, 5%);
      }

      &.is-upward:not(.is-open) {
        transform: translate(-50%, -5%);
      }

      &.is-open {
        transform: translate(-50%, 0);
      }

      .content {
        padding: 16px;
        width: 245px;
        height: 80px;
        border-radius: 4px;
      }

      p {
        margin: 0;
        line-height: 18px;
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 18px;
        height: 18px;

        button {
          transition: all 0.15s ease-out;
          font-size: 12px;

          &:hover {
            color: #c8cdd1;
          }

          &:not(:last-child) {
            margin-right: 12px;
          }
        }
      }
    }
  }
`
