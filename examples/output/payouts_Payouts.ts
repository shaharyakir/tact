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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type CanPayout = {
    $$type: 'CanPayout';
    amount: bigint;
}

export function storeCanPayout(src: CanPayout) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3289991647, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadCanPayout(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3289991647) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'CanPayout' as const, amount: _amount };
}

function loadTupleCanPayout(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'CanPayout' as const, amount: _amount };
}

function storeTupleCanPayout(source: CanPayout) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCanPayout(): DictionaryValue<CanPayout> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCanPayout(src)).endCell());
        },
        parse: (src) => {
            return loadCanPayout(src.loadRef().beginParse());
        }
    }
}

export type CanPayoutResponse = {
    $$type: 'CanPayoutResponse';
    amount: bigint;
    address: Address;
    ok: boolean;
}

export function storeCanPayoutResponse(src: CanPayoutResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4293607646, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.address);
        b_0.storeBit(src.ok);
    };
}

export function loadCanPayoutResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4293607646) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    let _ok = sc_0.loadBit();
    return { $$type: 'CanPayoutResponse' as const, amount: _amount, address: _address, ok: _ok };
}

function loadTupleCanPayoutResponse(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _address = source.readAddress();
    let _ok = source.readBoolean();
    return { $$type: 'CanPayoutResponse' as const, amount: _amount, address: _address, ok: _ok };
}

function storeTupleCanPayoutResponse(source: CanPayoutResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.address);
    builder.writeBoolean(source.ok);
    return builder.build();
}

function dictValueParserCanPayoutResponse(): DictionaryValue<CanPayoutResponse> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCanPayoutResponse(src)).endCell());
        },
        parse: (src) => {
            return loadCanPayoutResponse(src.loadRef().beginParse());
        }
    }
}

 type Payouts_init_args = {
    $$type: 'Payouts_init_args';
    owner: Address;
    publicKey: bigint;
}

function initPayouts_init_args(src: Payouts_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.publicKey, 257);
    };
}

async function Payouts_init(owner: Address, publicKey: bigint) {
    const __code = Cell.fromBase64('te6ccgECHAEABVIAART/APSkE/S88sgLAQIBYgIDAtbQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zwwyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMntVBoEAgEgGBkD9O2i7fshlIAg1yHecCHXScIfmTAg1wsfIP4gMN4Cklt/4CGCEP/rQN66jrwx0x8BghD/60DeuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPbPH/gIYIQD0dNA7rjAgHAAJEw4w1wBQYHAzD4QW8kMDL4Q/goJds82zyBEU0CxwXy9AEQFQgBZjHTHwGCEA9HTQO68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDFZ2zwxfwwBJCDXScIfjomAINch2zx/2zHgMA0DJI8OMDFwgEJwiBRDMG1t2zzjDQkWCgAgAAAAAEFscmVhZHkgcGFpZAJIggD1/PgnbxBYoYIQO5rKAKEjocIA8vSAQnCIEDQUQzBtbds8CxYAFgAAAABTdWNjZXNzABL4QlIgxwXy4IQErPhBbyQwgT67M4IQO5rKAL4S8vQB2zz6AIMI1xgwyCMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYi+gLbPPkAggC9EVEl+RDy9PhD+ChVAts8Dg8QEQEE2zwSAALJANoC0PQEMG0BggCg+gGAEPQPb6Hy4IcBggCg+iICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAkbbPHCAQn8EyAGCEMQZSd9Yyx+BAQHPAMkQNEEwFEMwbW3bPBUWAfYg10mrAsgBjm8B0wchwkCTIcFbkXDilgGmv1jLBY5YIcJgkyHBe5Fw4pYBprlYywWORCHCL5MhwTqRcOKWAaYEWMsFjjAhwC2Rf5MhwCviloA+MgLLBY4cIcBfkX+TIcAv4paAPzICywWZAcA9k/LAht8B4uLi4uLkMSATAi7PMSCpOAIgwwCOiALbPAKh1xgw4FvbPBQUAATJ0ACCcFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRviju2ebZ42EMGhsA3b3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOFALHuhMolza1VSFYUsAFgNBOCBnOrTzivzpKFgOsLcTI9lADS7UTQ1AH4Y9IAAY4o+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEBAAIh');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPayouts_init_args({ $$type: 'Payouts_init_args', owner, publicKey })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Payouts_errors: { [key: number]: { message: string } } = {
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
    4429: { message: `Invalid sender` },
    16059: { message: `Invalid value` },
    48401: { message: `Invalid signature` },
    62972: { message: `Invalid balance` },
}

export class Payouts implements Contract {
    
    static async init(owner: Address, publicKey: bigint) {
        return await Payouts_init(owner, publicKey);
    }
    
    static async fromInit(owner: Address, publicKey: bigint) {
        const init = await Payouts_init(owner, publicKey);
        const address = contractAddress(0, init);
        return new Payouts(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Payouts(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Payouts_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: string | CanPayoutResponse | ChangeOwner) {
        
        let body: Cell | null = null;
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CanPayoutResponse') {
            body = beginCell().store(storeCanPayoutResponse(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}