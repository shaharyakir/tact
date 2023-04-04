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


        // function getAllIndexes(arr: string, val: string) {
        //     var indexes = [], i = -1;
        //     while ((i = arr.indexOf(val, i+1)) != -1){
        //         indexes.push(i);
        //     }
        //     return indexes;
        // }

        // getAllIndexes(logs, "TX: ").forEach(idx => {
        //     console.log(logs.slice(idx, idx + 1000))
        // })
        
        
        // console.log(logger2.collect())


        expect(await contract.getAmount()).toBe(100n);
    });
});