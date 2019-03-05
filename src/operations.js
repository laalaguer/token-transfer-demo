/**
 * Get token amount of holder from a contract.
 * @param {String} addressContract 0x started address.
 * @param {String} addressHolder 0x started address.
 */
async function getTokenBalance (addressContract, addressHolder) {
    const balanceOfABI = {
        'constant': true,
        'inputs': [
        {
            'name': '_owner',
            'type': 'address'
        }
        ],
        'name': 'balanceOf',
        'outputs': [
        {
            'name': 'balance',
            'type': 'uint256'
        }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    }
    // eslint-disable-next-line
    const balanceOfMethod = connex.thor.account(addressContract).method(balanceOfABI)
    const balanceInfo = await balanceOfMethod.call(addressHolder)
    return balanceInfo
}

/**
 * Transfer token from one to another.
 * @param {String} addressContract Contract address.
 * @param {String} signerAddress Enforce who signs the transaction.
 * @param {String} toAddress Receiver of transfer.
 * @param {String} amountEVM Big number in string.
 * @param {Number} amountHuman Normal number in Javascript.
 * @param {String} symbol Symbol of token.
 */
async function transferToken (addressContract, signerAddress, toAddress, amountEVM, amountHuman, symbol) {
    const transferABI = {
      'constant': false,
      'inputs': [
        {
          'name': '_to',
          'type': 'address'
        },
        {
          'name': '_value',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    }
    // eslint-disable-next-line
    const transferMethod = connex.thor.account(addressContract).method(transferABI)
    const transferClause = transferMethod.asClause(toAddress, amountEVM)
    // eslint-disable-next-line
    const signingService = connex.vendor.sign('tx')
    signingService
      .signer(signerAddress) // Enforce signer
      .comment('Token transfer: ' + amountHuman.toString() + ' ' + symbol)
  
    let transactionInfo = await signingService.request([
      {
        comment: 'Hello! Transfer Demo!',
        ...transferClause
      }
    ])
    return transactionInfo
  }

  export {
    getTokenBalance,
    transferToken
  }