const clothing = {
    "short-sleeved-shirt": {
        keywords: ["warm", "hot"],
        imageURL: "shirt-short-sleeves",
        caption: "short-sleeved shirts"
    },
    "umbrella": {
        keywords: ["rain"],
        imageURL: "umbrella",
        caption: "rain gear"
    },
    "mittens": {
        keywords: ["very cold", "snow"],
        imageURL: "mittens",
        caption: "gloves"
    },
    "winter-hat": {
        keywords: ["very cold", "snow"],
        imageURL: "winter-hat",
        caption: "warm hats"
    },
    "boots": {
        keywords: ["rain", "snow"],
        imageURL: "boot",
        caption: "boots"
    },
    "shorts": {
        keywords: ["warm", "hot"],
        imageURL: "shorts",
        caption: "shorts"
    },
    "tank-top": {
        keywords: ["hot"],
        imageURL: "tank-top",
        caption: "sleeveless shirts"
    },
    "jeans": {
        antiKeyWords: ["hot", "warm"],
        keywords: ["fair", "cold", "rain", "snow", "very cold", "dry"],
        imageURL: "jeans",
        caption: "long pants"
    },
    "long-sleeved-shirt": {
        keywords: ["fair", "cold", "very cold"],
        imageURL: "shirt-long-sleeve",
        caption: "long-sleeved shirts"
    },
    "jacket": {
        keywords: ["cold", "very cold"],
        imageURL: "jacket-men",
        caption: "jackets and sweaters"
    },
    "sunglasses": {
        antiKeyWords: ["rain", "snow"],
        keywords: ["warm", "hot"],
        imageURL: "sunglasses",
        caption: "sunglasses"
    },
    "shoe1": {
        antiKeyWords: ["rain", "snow"],
        keywords: ["fair", "cold", "very cold"],
        imageURL: "shoe1",
        caption: "shoes"
    },
    "flip-flops": {
        antiKeyWords: ["rain", "snow"],
        keywords: ["warm", "hot"],
        imageURL: "flip-flops",
        caption: "open-toed shoes"
    },
    "dress": {
        keywords: ["warm", "hot", "fair"],
        imageURL: "dress",
        caption: "dresses"
    }
}

export default clothing;
