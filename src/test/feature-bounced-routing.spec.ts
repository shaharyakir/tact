import { beginCell, toNano } from 'ton-core';
import { ContractSystem } from '@tact-lang/emulator';
import { __DANGER_resetNodeId } from '../grammar/ast';
import { SampleContract2 } from './features/output/bounced-routing_SampleContract2';
import { SampleContract } from './features/output/bounced-routing_SampleContract';

describe('feature-strings', () => {
    beforeEach(() => {
        __DANGER_resetNodeId();
    });
    it('should implement strings correctly', async () => {

        // Init
        let system = await ContractSystem.create();
        let treasure = system.treasure('treasure');
        let contract = system.open(await SampleContract.fromInit());
        let contract2 = system.open(await SampleContract2.fromInit());

        // Deploy
        await contract.send(treasure, { value: toNano('10') }, null);
        await contract2.send(treasure, { value: toNano('10') }, null);
        await system.run();

        expect(await contract.getAmount()).toBe(100n)

        let logger = system.log(contract.address);
        let logger2 = system.log(contract2.address);

        logger.reset();
        logger2.reset();

        await contract.send(treasure, { value: toNano('10') }, {
            $$type: 'Entry',
            amountToAdd: 3n,
            toAddress: contract2.address
        });
        console.log(await system.run());
        const logs = logger.collect();


        function getAllIndexes(arr: string, val: string) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
                indexes.push(i);
            }
            return indexes;
        }

        getAllIndexes(logs, "TX: ").forEach(idx => {
            console.log(logs.slice(idx, idx + 1000))
        })
        
        
        // console.log(logger2.collect())


        expect(await contract.getAmount()).toBe(96n);

        
        

        // Check methods
        // expect(await contract.getConstantString()).toBe('test string');
        // expect(await contract.getConstantStringUnicode()).toBe('привет мир 👀');
        // const l = 'привет мир 👀 привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀';
        // expect(await contract.getConstantStringUnicodeLong()).toBe(l);
        // expect((await contract.getDynamicStringCell()).equals(beginCell().storeStringTail('Hello!').endCell())).toBe(true);
        // expect((await contract.getDynamicCommentCell()).equals(beginCell().storeUint(0, 32).storeStringTail('Something something world!').endCell())).toBe(true);
        // const l2 = 'Hello!привет мир 👀 привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀привет мир 👀';
        // expect((await contract.getDynamicCommentCellLarge()).equals(beginCell().storeStringTail(l2).endCell())).toBe(true);
        // expect((await contract.getDynamicCommentStringLarge())).toEqual(l2);
        // expect((await contract.getStringWithNumber())).toEqual('Hello, your balance: 123');
        // expect((await contract.getStringWithLargeNumber())).toEqual('Hello, your balance: 1000000000000000000000000000000000000000000000000000000000000');
        // expect((await contract.getStringWithNegativeNumber())).toEqual('Hello, your balance: -123');
        // expect((await contract.getStringWithFloat())).toEqual('9.5');

        // let base = await contract.getBase64();
        // expect(base.beginParse().loadBuffer(base.bits.length / 8).toString()).toEqual('Many hands make light work.');

        // let b64cases = [
        //     'SGVsbG8gV29ybGQ=',
        //     'li7dzDacuo67Jg7mtqEm2TRuOMU=',
        //     'FKIhdgaG5LGKiEtF1vHy4f3y700zaD6QwDS3IrNVGzNp2rY+1LFWTK6D44AyiC1n8uWz1itkYMZF0/aKDK0Yjg==',
        //     'AA=='
        // ];
        // for (let b of b64cases) {
        //     let s = Buffer.from(b, 'base64');
        //     let r = await contract.getProcessBase64(b);
        //     let d = r.beginParse().loadBuffer(r.bits.length / 8);
        //     expect(d.toString('hex')).toEqual(s.toString('hex'));
        // }
    });
});