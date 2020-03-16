async function main() {
    request = { type: "regional" };
    data = await requestData(request);
    initializeSelectors(data);
}