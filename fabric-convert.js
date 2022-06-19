//return sizes in inches and cm for standard fabric counts
//units must be "inch", "cm", or "stitches"
//givenCount must be 14, 16, 18, 28, 32, 36
//over 1 assumed for 14, 16, 18
//over 2 assumed for 28, 32, 36
function convertCommonSizes(givenWidth, givenHeight, units, givenCount) {
    //check width, height
    if (Number.isNaN(givenWidth) || Number.isNaN(givenHeight)) throw new Error("Width and height must be numbers");
    if (givenHeight > 999 || givenWidth > 999) throw new Error("Too large: width and height must be less than 1000");
    if (givenHeight <= 0 || givenWidth <= 0) throw new Error("Negative number: width and height must be greater than 0")
    
    //validate fabric count
    givenCount = Number(givenCount);
    const acceptedCounts = [14, 16, 18, 28, 32, 36];
    if (!acceptedCounts.includes(givenCount)) throw new Error(`Fabric count was ${givenCount}, but must be one of ${acceptedCounts}`);

    let stitchCount = getStitchCount(givenWidth, givenHeight, units, givenCount);

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

//tests
// console.log(`-----tests for convertCommonSizes----`);
// console.log(convertCommonSizes(4, 6, "inch", 14)); //ok
// console.log(convertCommonSizes(4999, 6, "inch", 14)); //wrong width
// console.log(convertCommonSizes(-4, 6, "inch", 14)); //negative width
// console.log(convertCommonSizes(4, 6999, "inch", 14)); //wrong height
// console.log(convertCommonSizes(4, 6, "hi", 14)); //wrong units
// console.log(convertCommonSizes(4, 6, "inch", 15)); //wrong fabric count

//add margins onto design
function getFabricSize(givenWidth, givenHeight, units, givenCount, margin, finalCount) {
    let sizes = convertCommonSizes(givenWidth, givenHeight, units, givenCount);
    let count;
    if (finalCount) count = finalCount;
    else count = givenCount;

    console.log(sizes)
    return {
        inch: [Number((sizes[count].inch[0] + margin * 2).toFixed(2)), Number((sizes[count].inch[1] + margin * 2).toFixed(2))],
        cm: [Number((sizes[count].cm[1] + margin * 2).toFixed(2)), Number((sizes[count].cm[1] + margin * 2).toFixed(2))]
    }
}
// console.log(getFabricSize(4, 6, "inch", 14, 6, 18));

//measurement to stitch count
function getStitchCount(givenWidth, givenHeight, units, givenCount) {
    switch (units) {
        case "inch":
            return [givenCount * givenWidth, givenCount * givenHeight];  
        case "cm":
            return [givenCount * cmToInch(givenWidth), givenCount * cmToInch(givenHeight)];  
        case "stitches":
            return [givenWidth, givenHeight];
        default:
                throw new Error("Unit error - units must be 'inch' or 'cm'")
    }
}
// console.log(getStitchCount(4, 6, "stitches", 14));


//stitch count to measurement 


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
    getStitchCount,
    getFabricSize,
    cmToInch,
    inToCm
}

// ========== things to maybe add later ========

// get a specific design size, for any weird fabric count
function convertSpecificSize(givenWidth, givenHeight, units, givenCount, givenOver, convertToCount) {

    // return [newHeight, newWidth]
}


