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

export type TestMessage = {
    $$type: 'TestMessage';
    address: Address;
    address2: Address | null;
}

export function storeTestMessage(src: TestMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3679600542, 32);
        b_0.storeAddress(src.address);
        b_0.storeAddress(src.address2);
    };
}

export function loadTestMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3679600542) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _address2 = sc_0.loadMaybeAddress();
    return { $$type: 'TestMessage' as const, address: _address, address2: _address2 };
}

function loadTupleTestMessage(source: TupleReader) {
    let _address = source.readAddress();
    let _address2 = source.readAddressOpt();
    return { $$type: 'TestMessage' as const, address: _address, address2: _address2 };
}

function storeTupleTestMessage(source: TestMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeAddress(source.address2);
    return builder.build();
}

function dictValueParserTestMessage(): DictionaryValue<TestMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTestMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTestMessage(src.loadRef().beginParse());
        }
    }
}

 type MasterchainTester_init_args = {
    $$type: 'MasterchainTester_init_args';
}

function initMasterchainTester_init_args(src: MasterchainTester_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function MasterchainTester_init() {
    const __code = Cell.fromBase64('te6ccgECGAEAAu0AART/APSkE/S88sgLAQIBYgIDAo7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zwwMMj4QwHMfwHKAMntVBUEAgEgBgcBuO2i7fsBnIAg1yEg10kxwh8wf+BwIddJwh+VMCDXCx/eIIIQ21I/nrrjAsAAjir5AYLwhdKIOEwAQ0WLAoA8siBZ9ogDxVPDZWNENGRo2slh8ka6k3/bMeCRMOJwBQC8MNMfAYIQ21I/nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeISbBJbfwIBYggJAgEgDA0CmbITm8iASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IghbpIxbY4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zxZ2zwxgFQoCSbO1SDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPAHbPDGAVCwAEW38ABDB/AgEgDg8CASAREgIRtgpbZ4A7Z4YwFRAAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkABA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDECASATFAIRtWIbZ4s7Z4YwFRYAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtWlZkU3pEWlJKVTd5RnFqQzFBNUp1ZFo3VExIMXNRUGFCZ2VDaGNIcVlRaVeCABNO1E0NQB+GPSADCRbeD4KNcLCoMJuvLgids8FwBYyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgAAm0=');
    const __system = Cell.fromBase64('te6cckECGgEAAvcAAQHAAQEFoAxHAgEU/wD0pBP0vPLICwMCAWIVBAIBIBAFAgEgDAYCASAJBwIRtWIbZ4s7Z4YwGAgAWMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAgEgCwoAdbJu40NWlwZnM6Ly9RbVpWZFN6RFpSSlU3eUZxakMxQTVKdWRaN1RMSDFzUVBhQmdlQ2hjSHFZUWlXggABGwr7tRNDSAAGACASAODQC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAhG2CltngDtnhjAYDwBA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDECAWITEQJJs7VINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8Ads8MYBgSAAQwfwKZshObyIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiCFukjFtjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPFnbPDGAYFAAEW38CjtAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFnbPDAwyPhDAcx/AcoAye1UGBYBuO2i7fsBnIAg1yEg10kxwh8wf+BwIddJwh+VMCDXCx/eIIIQ21I/nrrjAsAAjir5AYLwhdKIOEwAQ0WLAoA8siBZ9ogDxVPDZWNENGRo2slh8ka6k3/bMeCRMOJwFwC8MNMfAYIQ21I/nrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeISbBJbfwE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zwZAAJtE0H2gQ==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMasterchainTester_init_args({ $$type: 'MasterchainTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MasterchainTester_errors: { [key: number]: { message: string } } = {
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
}

export class MasterchainTester implements Contract {
    
    static async init() {
        return await MasterchainTester_init();
    }
    
    static async fromInit() {
        const init = await MasterchainTester_init();
        const address = contractAddress(0, init);
        return new MasterchainTester(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MasterchainTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MasterchainTester_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy' | TestMessage) {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TestMessage') {
            body = beginCell().store(storeTestMessage(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCreateAddress(provider: ContractProvider, chain: bigint, hash: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(chain);
        builder.writeNumber(hash);
        let source = (await provider.get('createAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getParseAddress(provider: ContractProvider, src: Cell) {
        let builder = new TupleBuilder();
        builder.writeSlice(src);
        let source = (await provider.get('parseAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getSerializeAddress(provider: ContractProvider, src: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(src);
        let source = (await provider.get('serializeAddress', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getHandleStruct(provider: ContractProvider, src: TestMessage) {
        let builder = new TupleBuilder();
        builder.writeTuple(storeTupleTestMessage(src));
        let source = (await provider.get('handleStruct', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}