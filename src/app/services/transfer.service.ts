import { Injectable } from '@angular/core';
const Web3 = require('web3');
declare let require: any;
declare let window: any;
const tokenAbi =
  require('../../../truffle/build/contracts/Transfer.json');
@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private account: any = null;
  private readonly web3: any;
  private enable: any;

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else { 
        this.web3 = new
          Web3.providers.HttpProvider('http://localhost:7545');
      }
      console.log('transfer.service :: constructor ::window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err: any, retAccount: any) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function (err: any, balance: any) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          };
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({ account: 'error', balance: 0 });
        }
      });
    }) as Promise<any>;
  }

  transferEther(value: any) {
    const that = this;
    // console.log('transfer.service :: transferEther to: ' +
    //   value.transferAddress + ', from: ' + that.account + ', amount: '
    //   + value.amount);
    return new Promise((resolve, reject) => {
      // console.log('transfer.service :: transferEther :: tokenAbi');
      // console.log(JSON.stringify(tokenAbi));

      const contract = require('@truffle/contract');
      const transferContract = contract(tokenAbi);
      transferContract.setProvider(that.web3);
      // console.log('transfer.service :: transferEther :: transferContract');
      // console.log(transferContract);
      transferContract.deployed().then(function (instance: any) {
        return instance.pay(
          value.transferAddress,
          {
            from: that.account,
            value: value.amount
          });
      }).then(function (status: any) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error: any) {
        console.log(error);
        return reject('transfer.service error');
      });
    });
  }

  getAllItems(){
    console.log('all items ser');
    const that = this;
    // return new Promise((resolve, reject) => {

    //   const contract = require('@truffle/contract');
    //   const transferContract = contract(tokenAbi);
    //   transferContract.setProvider(that.web3);
      
    //   transferContract.deployed().then(function (instance: any) {
    //     return instance.getAllItems();
    //   }).then(function (status: any) {
    //     if (status) {
    //       console.log("tra ser status : " + status);
    //       return resolve({ status: true });
    //     }
    //   }).catch(function (error: any) {
    //     console.log(error);
    //     return reject('transfer.service error');
    //   });
    // });
    
      const contract = require('@truffle/contract');
      const transferContract = contract(tokenAbi);
    
    const result = transferContract.methods.someViewMethod().call();
    console.log(result);
    return result;
  }

}  