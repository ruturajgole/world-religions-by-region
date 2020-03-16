async function main() {
    request = { type: "global" };
    data = await requestData(request);
    initializeSelectors(data);
}