import React from "react";

const ClothingIcon = (props) => {
    let clothingObject = props.clothingObject[props.name];
    let keywordCheck = true;
    let i, j;
    let counter = 0;

    let iconURL = props.clothingObject[props.name].imageURL;

    //loop through weather keywords in component
    //for each one, check to see if it's in current clothing object and that it isn't in anti keywords array
    //if that checks out, render component

    //keyword check
    for(i = 0; i < props.weatherKeywords.length; i++) {
        if(clothingObject.keywords.indexOf(props.weatherKeywords[i]) !== -1) {
            counter++;
        }
    }

    //anti keyword check
    if(counter > 0) {
        //if the a keywords matches, check anti keywords
        for(j = 0; j < props.weatherKeywords.length; j++) {
            if(clothingObject.hasOwnProperty("antiKeyWords")) {
                if(clothingObject.antiKeyWords.indexOf(props.weatherKeywords[j]) !== -1) {
                    console.log("Caught clothing: ", clothingObject);
                    keywordCheck = false;
                    break;
                }
            }
        }
    } else {
        keywordCheck = false;
    }

    if(keywordCheck) {
        return (
            <li>
              <div className="clothing-panel__clothing-icon-container">
                <img src={(iconURL ? require(`../images/${iconURL}.svg`) : require(`../images/not-available.svg`))} alt="placeholder+image" className="clothing-panel__clothing-icon-image" />
                <p className="clothing-panel__clothing-icon-caption">{clothingObject.caption}</p>
              </div>
            </li>
        );
    } else {
        return null;
    }
}

export default ClothingIcon;
