//given dimensions and fabric count

// count = fabric count (16, 14, etc)
//over = over 1 or 2 sts 

//return sizes in inches and cm for standard fabric counts
//units must be "inch" or "cm"
//givenCount must be 14, 16, 18, 28, 32, 36
//over 2 assumed for 14, 16, 18
//over 1 assumed for 28, 32, 36
function convertCommonSizes(givenWidth, givenHeight, units, givenCount) {
    //check width, height
    if (Number.isNaN(givenWidth) || Number.isNaN(givenHeight)) throw new Error("Width and height must be numbers");
    if (givenHeight > 999 || givenWidth > 999) throw new Error("Too large: width and height must be less than 1000");
    
    //validate fabric count
    givenCount = Number(givenCount);
    const acceptedCounts = [14, 16, 18, 28, 32, 36];
    if (!acceptedCounts.includes(givenCount)) throw new Error(`Fabric count was ${givenCount}, but must be one of ${acceptedCounts}`);

    //validate units and calculate stitchCount
    let stitchCount;
    switch (units) {
        case "inch":
            stitchCount = [givenCount * givenWidth, givenCount * givenHeight];  
            break;
            case "cm":
            stitchCount = [givenCount * cmToInch(givenWidth), givenCount * cmToInch(givenHeight)];  
            break;
            default:
                throw new Error("Unit error - units must be 'inch' or 'cm'")
    }

    //calculate sizes
    let fabrics = {
        14: {}, 
        16: {},  
        18: {} 
    };
    for (let size in fabrics) {
        let calc = [Number((stitchCount[0] / size).toFixed(2)), Number((stitchCount[1] / size).toFixed(2))];
         fabrics[size] = {
            inch: calc,
            cm: [Number(inToCm(calc[0]).toFixed(2)), Number(inToCm(calc[1]).toFixed(2))]
         }
         fabrics[size * 2] = fabrics[size];
    }
    return fabrics;
}

//TODO do i need a similar method that works with a stitch count instead of starter size?

//tests
console.log(`-----tests for convertCommonSizes----`);
console.log(convertCommonSizes(4, 6, "inch", 14));


// get a specific design size, for any weird fabric count
function convertSpecificSize(givenWidth, givenHeight, units, givenCount, givenOver, convertToCount) {

    // return [newHeight, newWidth]
}


//margin = how much fabric at the sides - 2" min recommended
function calculateRequiredFabric(designWidth, designHeight, count, over, margin) {

}

//cm to inch
function cmToInch(cm) {
    return Number((cm / 2.54).toFixed(2));
}

//inch to cm
function inToCm(inch) {
    return inch * 2.54;
}

module.exports = {
    convertCommonSizes,
    convertSpecificSize,
    calculateRequiredFabric,
    cmToInch,
    inToCm
}