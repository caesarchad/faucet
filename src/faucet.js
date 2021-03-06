import React from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup,
  Modal,
  OverlayTrigger,
  Panel,
  ProgressBar,
  Tooltip,
  Well,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import * as web3 from '@solana/web3.js';

import {Settings} from './settings';

class PostUrlInput extends React.Component {
  state = {
    value: '',
    validationState: null,
  };

  getValidationState(value) {
    const length = value.length;
    /*
    if (length <= 244){
      if (value.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$./)) {
        return 'success';
      }
      return 'warning';
    } else if(length > 244){
      return 'error';
    } else if(length > 0){
      return 'warning';
    }
    */
    if (value.match(/^[A-Za-z0-9]+$/)){
      return 'success';
    }else if (length > 144) {
      return 'error';
    }
    return null;
  }

  handleChange(e) {
    const {value} = e.target;
    const validationState = this.getValidationState(value);
    this.setState({value, validationState});
    this.props.onPostUrl(validationState === 'success' ? value : null);
  }

  render() {
    return (
      <form>
        <FormGroup validationState={this.state.validationState}>
          <ControlLabel>Social Media Post URL</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter the post address of a social media"
            onChange={e => this.handleChange(e)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}
PostUrlInput.propTypes = {
  onPostUrl: PropTypes.function,
};


class PublicKeyInput extends React.Component {
  state = {
    value: '',
    validationState: null,
  };

  getValidationState(value) {
    const length = value.length;
    if (length === 44) {
      if (value.match(/^[A-Za-z0-9]+$/)) {
        return 'success';
      }
      return 'error';
    } else if (length > 44) {
      return 'error';
    } else if (length > 0) {
      return 'warning';
    }
    return null;
  }

  handleChange(e) {
    const {value} = e.target;
    const validationState = this.getValidationState(value);
    this.setState({value, validationState});
    this.props.onPublicKey(validationState === 'success' ? value : null);
  }

  render() {
    return (
      <form>
        <FormGroup validationState={this.state.validationState}>
          <ControlLabel>Recipient&apos;s Public Key</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter the public key of the recipient"
            onChange={e => this.handleChange(e)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}
PublicKeyInput.propTypes = {
  onPublicKey: PropTypes.function,
};

class TokenInput extends React.Component {
  state = {
    value: '',
    validationState: null,
  };

  getValidationState(value) {
    if (value.length === 0) {
      return null;
    }
    if (value.match(/^\d+$/)) {
      return 'success';
    }
    return 'error';
  }

  handleChange(e) {
    const {value} = e.target;
    const validationState = this.getValidationState(value);
    this.setState({value, validationState});
    this.props.onAmount(validationState === 'success' ? value : null);
  }

  render() {
    return (
      <form>
        <FormGroup validationState={this.state.validationState}>
          <ControlLabel>Amount</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter amount to transfer"
            onChange={e => this.handleChange(e)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}
TokenInput.propTypes = {
  onAmount: PropTypes.function,
};

class SignatureInput extends React.Component {
  state = {
    value: '',
    validationState: null,
  };

  getValidationState(value) {
    const length = value.length;
    if (length === 88) {
      if (value.match(/^[A-Za-z0-9]+$/)) {
        return 'success';
      }
      return 'error';
    } else if (length > 44) {
      return 'error';
    } else if (length > 0) {
      return 'warning';
    }
    return null;
  }

  handleChange(e) {
    const {value} = e.target;
    const validationState = this.getValidationState(value);
    this.setState({value, validationState});
    this.props.onSignature(validationState === 'success' ? value : null);
  }

  render() {
    return (
      <form>
        <FormGroup validationState={this.state.validationState}>
          <ControlLabel>Signature</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter a transaction signature"
            onChange={e => this.handleChange(e)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}
SignatureInput.propTypes = {
  onSignature: PropTypes.function,
};

class DismissibleErrors extends React.Component {
  render() {
    const errs = this.props.errors.map((err, index) => {
      return (
        <Alert key={index} bsStyle="danger">
          <a href="#" onClick={() => this.props.onDismiss(index)}>
            <Glyphicon glyph="remove-sign" />
          </a>{' '}
          &nbsp;
          {err}
        </Alert>
      );
    });
    return <div>{errs}</div>;
  }
}
DismissibleErrors.propTypes = {
  errors: PropTypes.array,
  onDismiss: PropTypes.function,
};

class BusyModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="small"
        aria-labelledby="contained-modal-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-sm">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.text}
          <br />
          <br />
          <ProgressBar active now={100} />
        </Modal.Body>
      </Modal>
    );
  }
}
BusyModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

class SettingsModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Settings store={this.props.store} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
SettingsModal.propTypes = {
  onHide: PropTypes.function,
  store: PropTypes.object,
};

export class Wallet extends React.Component {
  state = {
    errors: [],
    busyModal: null,
    settingsModal: false,
    balance: 0,
    recipientPostUrl:null,
    recipientPublicKey: null,
    recipientAmount: null,
    confirmationSignature: null,
    transactionConfirmed: null,
  };

  constructor(props) {
    super(props);
    this.onStoreChange();
  }

  setConfirmationSignature(confirmationSignature) {
    this.setState({
      transactionConfirmed: null,
      confirmationSignature,
    });
  }

  setRecipientPostUrl(recipientPostUrl) {
    this.setState({recipientPostUrl});
  }


  setRecipientPublicKey(recipientPublicKey) {
    this.setState({recipientPublicKey});
  }


  setRecipientAmount(recipientAmount) {
    this.setState({recipientAmount});
  }

  dismissError(index) {
    const {errors} = this.state;
    errors.splice(index, 1);
    this.setState({errors});
  }

  addError(message) {
    const {errors} = this.state;
    errors.push(message);
    this.setState({errors});
  }

  async runModal(title, text, f) {
    this.setState({
      busyModal: {title, text},
    });

    try {
      await f();
    } catch (err) {
      console.log(err);
      this.addError(err.message);
    }

    this.setState({busyModal: null});
  }

  onStoreChange = () => {
    this.web3solAccount = new web3.Account(this.props.store.accountSecretKey);
    this.web3sol = new web3.Connection(this.props.store.networkEntryPoint);
    this.forceUpdate();
  };

  componentDidMount() {
    this.props.store.onChange(this.onStoreChange);
    this.refreshBalance();
  }

  componentWillUnmount() {
    this.props.store.removeChangeListener(this.onStoreChange);
  }

  copyPublicKey() {
    copy(this.web3solAccount.publicKey);
  }

  refreshBalance() {
    this.runModal('Updating Account Balance', 'Please wait...', async () => {
      this.setState({
        balance: await this.web3sol.getBalance(this.web3solAccount.publicKey),
      });
    });
  }

  requestAirdrop() {
    this.runModal('Requesting Airdrop', 'Please wait...', async () => {
      await this.web3sol.requestAirdrop(this.web3solAccount.publicKey, 1000);
      this.setState({
        balance: await this.web3sol.getBalance(this.web3solAccount.publicKey),
      });
    });
  }

  requestAirdropByPostUrl(){
    //request air drop by parsing the post from social media
    console.log('i am trying to request some coin');

  }
  sendTransaction() {
    this.runModal('Sending Transaction', 'Please wait...', async () => {
      const transaction = web3.SystemProgram.move(
        this.web3solAccount.publicKey,
        new web3.PublicKey(this.state.recipientPublicKey),
        this.state.recipientAmount,
      );
      const signature = await this.web3sol.sendTransaction(

        this.web3solAccount, transaction,
      
      );

      await this.web3sol.confirmTransaction(signature);
      this.setState({
        balance: await this.web3sol.getBalance(this.web3solAccount.publicKey),
      });
    });
  }

  confirmTransaction() {
    this.runModal('Confirming Transaction', 'Please wait...', async () => {
      const result = await this.web3sol.confirmTransaction(
        this.state.confirmationSignature,
      );
      this.setState({
        transactionConfirmed: result,
      });
    });
  }

  render() {
    const copyTooltip = (
      <Tooltip id="clipboard">Copy public key to clipboard</Tooltip>
    );
    const refreshBalanceTooltip = (
      <Tooltip id="refresh">Refresh account balance</Tooltip>
    );
    const airdropTooltip = <Tooltip id="airdrop">Request an airdrop</Tooltip>;

    const busyModal = this.state.busyModal ? (
      <BusyModal
        show
        title={this.state.busyModal.title}
        text={this.state.busyModal.text}
      />
    ) : null;

    const settingsModal = this.state.settingsModal ? (
      <SettingsModal
        show
        store={this.props.store}
        onHide={() => this.setState({settingsModal: false})}
      />
    ) : null;

    const sendDisabled =
      this.state.recipientPublicKey === null ||
      this.state.recipientAmount === null;
    const confirmDisabled = this.state.confirmationSignature === null;
    const airdropDisabled = this.state.balance !== 0;
    const postUrlDisabled = this.state.recipientPostUrl === null;

    return (
      <div>
        <div style={{width: '100%', textAlign: 'right'}}>
          <Button onClick={() => this.setState({settingsModal: true})}>
            <Glyphicon
              style={{backgroundColor: 'white'}}
              glyph="menu-hamburger"
            />
          </Button>
        </div>
        {busyModal}
        {settingsModal}
        <DismissibleErrors
          errors={this.state.errors}
          onDismiss={index => this.dismissError(index)}
        />
        <Well>
          Account Public Key:
          <FormGroup>
            <InputGroup>
              <FormControl
                readOnly
                type="text"
                size="21"
                value={this.web3solAccount.publicKey}
              />
              <InputGroup.Button>
                <OverlayTrigger placement="bottom" overlay={copyTooltip}>
                  <Button onClick={() => this.copyPublicKey()}>
                    <Glyphicon glyph="copy" />
                  </Button>
                </OverlayTrigger>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          <p />
          Account Balance: {this.state.balance} &nbsp;
          <OverlayTrigger placement="top" overlay={refreshBalanceTooltip}>
            <Button onClick={() => this.refreshBalance()}>
              <Glyphicon glyph="refresh" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={airdropTooltip}>
            <Button
              disabled={airdropDisabled}
              onClick={() => this.requestAirdrop()}
            >
              <Glyphicon glyph="send" />
            </Button>
          </OverlayTrigger>
        </Well>
        <p />
        <Panel>
          <Panel.Heading>Request Air Drop From Faucet</Panel.Heading>
          <Panel.Body>
            <PostUrlInput
              onPostUrl={postUrl => this.setRecipientPostUrl(postUrl)}
            />
            <div className="text-center">
              <Button
                disabled={postUrlDisabled}
                onClick={() => this.requestAirdropByPostUrl()}
              >
                Request 3 bus
              </Button>
            </div>
          </Panel.Body>
        </Panel>
        <p />
        <Panel>
          <Panel.Heading>Send Tokens</Panel.Heading>
          <Panel.Body>
            <PublicKeyInput
              onPublicKey={publicKey => this.setRecipientPublicKey(publicKey)}
            />
            <TokenInput onAmount={amount => this.setRecipientAmount(amount)} />
            <div className="text-center">
              <Button
                disabled={sendDisabled}
                onClick={() => this.sendTransaction()}
              >
                Send
              </Button>
            </div>
          </Panel.Body>
        </Panel>
        <p />
        <Panel>
          <Panel.Heading>Confirm Transaction</Panel.Heading>
          <Panel.Body>
            <SignatureInput
              onSignature={signature =>
                this.setConfirmationSignature(signature)
              }
            />
            <div className="text-center">
              <Button
                disabled={confirmDisabled}
                onClick={() => this.confirmTransaction()}
              >
                Confirm
              </Button>
            </div>
            {typeof this.state.transactionConfirmed === 'boolean' ? (
              <b>
                {this.state.transactionConfirmed
                  ? 'CONFIRMED'
                  : 'NOT CONFIRMED'}
              </b>
            ) : (
              ''
            )}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
Wallet.propTypes = {
  store: PropTypes.object,
};
