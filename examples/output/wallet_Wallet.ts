import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    seqno: bigint;
    mode: bigint;
    to: Address;
    amount: bigint;
    body: Cell | null;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.mode, 8);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    let _seqno = sc_0.loadUintBig(32);
    let _mode = sc_0.loadUintBig(8);
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Transfer' as const, seqno: _seqno, mode: _mode, to: _to, amount: _amount, body: _body };
}

function loadTupleTransfer(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    let _body = source.readCellOpt();
    return { $$type: 'Transfer' as const, seqno: _seqno, mode: _mode, to: _to, amount: _amount, body: _body };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.mode);
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferMessage = {
    $$type: 'TransferMessage';
    signature: Cell;
    transfer: Transfer;
}

export function storeTransferMessage(src: TransferMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(123, 32);
        b_0.storeRef(src.signature);
        b_0.store(storeTransfer(src.transfer));
    };
}

export function loadTransferMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 123) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadRef();
    let _transfer = loadTransfer(sc_0);
    return { $$type: 'TransferMessage' as const, signature: _signature, transfer: _transfer };
}

function loadTupleTransferMessage(source: TupleReader) {
    let _signature = source.readCell();
    const _transfer = loadTupleTransfer(source.readTuple());
    return { $$type: 'TransferMessage' as const, signature: _signature, transfer: _transfer };
}

function storeTupleTransferMessage(source: TransferMessage) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.signature);
    builder.writeTuple(storeTupleTransfer(source.transfer));
    return builder.build();
}

function dictValueParserTransferMessage(): DictionaryValue<TransferMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTransferMessage(src.loadRef().beginParse());
        }
    }
}

 type Wallet_init_args = {
    $$type: 'Wallet_init_args';
    key: bigint;
    walletId: bigint;
}

function initWallet_init_args(src: Wallet_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.walletId, 257);
    };
}

async function Wallet_init(key: bigint, walletId: bigint) {
    const __code = Cell.fromBase64('te6ccgECGgEAA9EAART/APSkE/S88sgLAQIBYgIDAqLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts8MMj4QwHMfwHKAFUgUCPLH8v/yz/J7VQXBAIBIAsMA/Dtou37cCHXScIflTAg1wsf3gKXMYAg1yEwf+AhwHuOwjHTHwHAe/LggdQB0AHTH9MH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANIAAZHUkm0B4lVAEFZsFuAhwAAh10nBIbCVWwKkAn/gAcAA4wAFBgcByFR0MlNDyFVAUEXLHxLLBwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIhbrOVfwHKAMyUcDLKAOLJ+QCCAL0RUXn5EBby9IFE9lFIuhTy9AakQxYCf0REbW3bPH8IAfwg+QEggvCF0og4TABDRYsCgDyyIFn2iAPFU8NlY0Q0ZGjayWHyRrqUW3/bMeAggvAOI1cmEItXANA2ndcWf2r/uAan4EBZN13Q4Psklx5ysrqXWwKkAn/bMeAggvAmlGj9TaD14HFXRnNiQuug+tnSja/HczvqnnxkSIiUOboKAAowAqQCfwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAJAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAGSXWwKkAn/bMeCC8Jyg8YVRdOMuj9N431am5PbEDk38tgkOSYEvex4mIUv5upQwf9sx4AIBag0OAgEgERICEbMl9s82zxsMYBcPAhGwfjbPNs8bDGAXEAACIgACIQCVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgFIExQCAWIVFgB1sm7jQ1aXBmczovL1FtUWhOUzFuQ05FRzRRSHRYMkxZN1RxdlU3WjExRXVQOEJXZ2dlZ0dqcGtGYkOCACD6SVtnm2eNhjFxgAD6V92omhpAADAWLtRNDUAfhj0gABmtMf0//TP1UgbBPg+CjXCwqDCbry4ImBAQHXAIEBAdcAWQLRAds8GQACIAAEcFk=');
    const __system = Cell.fromBase64('te6cckECHAEAA9sAAQHAAQEFoHL9AgEU/wD0pBP0vPLICwMCAWISBAIBIA0FAgEgDAYCAUgIBwB1sm7jQ1aXBmczovL1FtUWhOUzFuQ05FRzRRSHRYMkxZN1RxdlU3WjExRXVQOEJXZ2dlZ0dqcGtGYkOCACAWIKCQAPpX3aiaGkAAMCD6SVtnm2eNhjGgsAAiAAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIBahAOAhGwfjbPNs8bDGAaDwACIQIRsyX2zzbPGwxgGhEAAiICotAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUS2zwwyPhDAcx/AcoAVSBQI8sfy//LP8ntVBoTA/Dtou37cCHXScIflTAg1wsf3gKXMYAg1yEwf+AhwHuOwjHTHwHAe/LggdQB0AHTH9MH+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANIAAZHUkm0B4lVAEFZsFuAhwAAh10nBIbCVWwKkAn/gAcAA4wAXFRQACjACpAJ/Afwg+QEggvCF0og4TABDRYsCgDyyIFn2iAPFU8NlY0Q0ZGjayWHyRrqUW3/bMeAggvAOI1cmEItXANA2ndcWf2r/uAan4EBZN13Q4Psklx5ysrqXWwKkAn/bMeAggvAmlGj9TaD14HFXRnNiQuug+tnSja/HczvqnnxkSIiUOboWAGSXWwKkAn/bMeCC8Jyg8YVRdOMuj9N431am5PbEDk38tgkOSYEvex4mIUv5upQwf9sx4AHIVHQyU0PIVUBQRcsfEssHASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AiFus5V/AcoAzJRwMsoA4sn5AIIAvRFRefkQFvL0gUT2UUi6FPL0BqRDFgJ/RERtbds8fxgByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAGQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAFi7UTQ1AH4Y9IAAZrTH9P/0z9VIGwT4Pgo1wsKgwm68uCJgQEB1wCBAQHXAFkC0QHbPBsABHBZ0lU3uw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initWallet_init_args({ $$type: 'Wallet_init_args', key, walletId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Wallet_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    17654: { message: `Invalid seqno` },
    48401: { message: `Invalid signature` },
}

export class Wallet implements Contract {
    
    static async init(key: bigint, walletId: bigint) {
        return await Wallet_init(key, walletId);
    }
    
    static async fromInit(key: bigint, walletId: bigint) {
        const init = await Wallet_init(key, walletId);
        const address = contractAddress(0, init);
        return new Wallet(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Wallet(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Wallet_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy' | TransferMessage | Slice | null | 'notify' | 'Слава Україні' | 'duplicate') {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferMessage') {
            body = beginCell().store(storeTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === 'notify') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Слава Україні') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'duplicate') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPublicKey(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('publicKey', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getWalletId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('walletId', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('seqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}