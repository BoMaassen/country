function countryColor(region){

    switch (region){
        case "Africa":
            return "africa-region";
        case "Americas":
            return "americas-region";
        case "Asia":
            return "asia-region";
        case "Europe":
            return "europe-region";
        case "Oceania":
            return "oceania-region";
        default:
            return "default-region";
    }


}

export default countryColor;

/*
Africa: blauw
Americas: groen
Asia: rood
Europe: geel
Oceania: paars*/
