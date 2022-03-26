import { sdkForProject } from '$lib/stores/sdk';
import type { Models } from 'src/sdk';
import { writable } from 'svelte/store';

function createDocumentStore() {
    const { subscribe, set, update } = writable<Models.Document>();

    return {
        subscribe,
        set,
        load: async (collectionId: string, documentId: string) =>
            set(await sdkForProject.database.getDocument(collectionId, documentId)),
        addAttribute: (attribute: string) =>
            update((n) => {
                n[attribute].push(null);

                return n;
            }),
        removeAttribute: (attribute: string, index: number) =>
            update((n) => {
                n[attribute].splice(index, 1);

                return n;
            })
    };
}

export const doc = createDocumentStore();
