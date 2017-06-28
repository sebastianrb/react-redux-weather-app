export  const TEST_TYPE = "test_type";

export function testAction(value) {
    return {
        type: TEST_TYPE,
        payload: value
    }
}
