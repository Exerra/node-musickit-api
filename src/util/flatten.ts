export function flattenItem<T extends { id: string; attributes: Record<string, any>; relationships?: Record<string, any> }>(
    item: T
): { id: string } & T['attributes'] & { relationships?: Record<string, any> } {
    let result: any = { id: item.id, ...item.attributes }

    if (item.relationships) {
        for (const key of Object.keys(item.relationships)) {
            const rel = item.relationships[key]
            if (rel?.data) {
                result = {
                    ...result,
                    relationships: {
                        ...(result.relationships ?? {}),
                        [key]: rel.data
                    }
                }
            }
        }
    }

    return result
}
