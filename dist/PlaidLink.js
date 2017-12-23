"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLoadScript = require("react-load-script");

var _reactLoadScript2 = _interopRequireDefault(_reactLoadScript);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaidLink = function (_Component) {
  _inherits(PlaidLink, _Component);

  function PlaidLink(props) {
    _classCallCheck(this, PlaidLink);

    var _this = _possibleConstructorReturn(this, (PlaidLink.__proto__ || Object.getPrototypeOf(PlaidLink)).call(this, props));

    _this.onScriptError = function () {
      console.error("There was an issue loading the link-initialize.js script");
    };

    _this.onScriptLoaded = function () {
      window.linkHandler = window.Plaid.create({
        clientName: _this.props.clientName,
        env: _this.props.env,
        key: _this.props.publicKey,
        apiVersion: _this.props.apiVersion,
        onExit: _this.props.onExit,
        onLoad: _this.handleLinkOnLoad,
        onSuccess: _this.props.onSuccess,
        product: _this.props.product,
        selectAccount: _this.props.selectAccount,
        token: _this.props.token,
        webhook: _this.props.webhook
      });

      _this.setState({ disabledButton: false });
    };

    _this.handleLinkOnLoad = function () {
      _this.props.onLoad && _this.props.onLoad();
      _this.setState({ linkLoaded: true });
    };

    _this.handleOnClick = function () {
      _this.props.onClick && _this.props.onClick();
      var institution = _this.props.institution || null;
      if (window.linkHandler) {
        window.linkHandler.open(institution);
      }
    };

    _this.exit = function (configurationObject) {
      if (window.linkHandler) {
        window.linkHandler.exit(configurationObject);
      }
    };

    _this.state = {
      disabledButton: true,
      linkLoaded: false,
      initializeURL: "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
    };
    return _this;
  }

  _createClass(PlaidLink, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "button",
          {
            onClick: this.handleOnClick,
            disabled: this.state.disabledButton,
            style: this.props.style,
            className: this.props.className
          },
          _react2.default.createElement(
            "span",
            null,
            this.props.buttonText
          )
        ),
        _react2.default.createElement(_reactLoadScript2.default, {
          url: this.state.initializeURL,
          onError: this.onScriptError,
          onLoad: this.onScriptLoaded
        })
      );
    }
  }]);

  return PlaidLink;
}(_react.Component);

PlaidLink.defaultProps = {
  institution: null,
  selectAccount: false,
  buttonText: "Open Link",
  style: {
    padding: "6px 4px",
    outline: "none",
    background: "#FFFFFF",
    border: "2px solid #F1F1F1",
    borderRadius: "4px"
  }
};
PlaidLink.propTypes = {
  // Displayed once a user has successfully linked their account
  clientName: _propTypes2.default.string.isRequired,

  // The Plaid API environment on which to create user accounts.
  // For development and testing, use tartan. For production, use production
  env: _propTypes2.default.oneOf(["tartan", "sandbox", "development", "production"]).isRequired,

  // Open link to a specific institution, for a more custom solution
  institution: _propTypes2.default.string,

  // The public_key associated with your account; available from
  // the Plaid dashboard (https://dashboard.plaid.com)
  publicKey: _propTypes2.default.string.isRequired,

  // The Plaid products you wish to use, an array containing some of connect,
  // auth, identity, income, transactions
  product: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(["connect", "auth", "identity", "income", "transactions"])).isRequired,

  // Specify an existing user's public token to launch Link in update mode.
  // This will cause Link to open directly to the authentication step for
  // that user's institution.
  token: _propTypes2.default.string,

  // Set to true to launch Link with the 'Select Account' pane enabled.
  // Allows users to select an individual account once they've authenticated
  selectAccount: _propTypes2.default.bool,

  // Specify a webhook to associate with a user.
  webhook: _propTypes2.default.string,

  // A function that is called when a user has successfully onboarded their
  // account. The function should expect two arguments, the public_key and a
  // metadata object
  onSuccess: _propTypes2.default.func.isRequired,

  // A function that is called when a user has specifically exited Link flow
  onExit: _propTypes2.default.func,

  // A function that is called when the Link module has finished loading.
  // Calls to plaidLinkHandler.open() prior to the onLoad callback will be
  // delayed until the module is fully loaded.
  onLoad: _propTypes2.default.func,

  // Text to display in the button
  buttonText: _propTypes2.default.string,

  // Button Styles as an Object
  style: _propTypes2.default.object,

  // Button Class names as a String
  className: _propTypes2.default.string,

  // ApiVersion flag to use new version of Plaid API
  apiVersion: _propTypes2.default.string
};
exports.default = PlaidLink;