import { getType } from "../../types/resolveDescriptors";
import { TypeDescription, TypeRef } from "../../types/types";
import { WriterContext } from "../Writer";

export function resolveFuncType(descriptor: TypeRef | TypeDescription | string, ctx: WriterContext, optional: boolean = false, usePartialFields: boolean = false): string {

    // String
    if (typeof descriptor === 'string') {
        return resolveFuncType(getType(ctx.ctx, descriptor), ctx, false);
    }

    // TypeRef
    if (descriptor.kind === 'ref') {
        return resolveFuncType(getType(ctx.ctx, descriptor.name), ctx, descriptor.optional);
    }
    if (descriptor.kind === 'map') {
        return 'cell';
    }
    if (descriptor.kind === 'bounced') {
        return resolveFuncType(getType(ctx.ctx, descriptor.name), ctx, false, true);
    }
    if (descriptor.kind === 'void') {
        return '()';
    }

    // TypeDescription
    if (descriptor.kind === 'primitive') {
        if (descriptor.name === 'Int') {
            return 'int';
        } else if (descriptor.name === 'Bool') {
            return 'int';
        } else if (descriptor.name === 'Slice') {
            return 'slice';
        } else if (descriptor.name === 'Cell') {
            return 'cell';
        } else if (descriptor.name === 'Builder') {
            return 'builder';
        } else if (descriptor.name === 'Address') {
            return 'slice';
        } else if (descriptor.name === 'String') {
            return 'slice';
        } else if (descriptor.name === 'StringBuilder') {
            return 'tuple';
        } else {
            throw Error('Unknown primitive type: ' + descriptor.name);
        }
    } else if (descriptor.kind === 'struct') {
        if (optional || descriptor.fields.length === 0) {
            return 'tuple';
        } else {
            const fieldsToUse = usePartialFields ? descriptor.partialFields : descriptor.fields;
            // TODO nested structs?
            return '(' + fieldsToUse.map((v) => resolveFuncType(v.type, ctx)).join(', ') + ')';
        }
    } else if (descriptor.kind === 'contract') {
        if (optional || descriptor.fields.length === 0) {
            return 'tuple';
        } else {
            return '(' + descriptor.fields.map((v) => resolveFuncType(v.type, ctx)).join(', ') + ')';
        }
    }

    // Unreachable
    throw Error('Unknown type: ' + descriptor.kind);
}