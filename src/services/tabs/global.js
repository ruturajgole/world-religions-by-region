async function main() {
    request = { type: "global" };
    data = await requestData(request);
    console.log(data);
    initializeSelectors(data);
}