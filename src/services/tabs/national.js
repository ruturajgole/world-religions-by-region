async function main() {
    request = { type: "national" };
    data = await requestData(request);
    initializeSelectors(data);
}