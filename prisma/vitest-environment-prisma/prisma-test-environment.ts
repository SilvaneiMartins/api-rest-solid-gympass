import { Environment } from "vitest";

export default <Environment>{
    name: 'prisma',
    setup: async () => {
        console.log('Executing setup!');

        return {
            async teardown() {
                console.log('Executing teardown!');
            },
        }
    }
}
