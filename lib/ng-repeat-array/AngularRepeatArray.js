function NgArrRepeat() {}

//Private
NgArrRepeat.getRowCount = function(items,numberPerRow){
	if (!items){
		return null;
	}
	if (!numberPerRow){
		return null;
	}
	return Math.ceil(items.length/numberPerRow);
};

NgArrRepeat.getViewModelItems = function(items,numberPerRow){
	if (!items){
		return null;
	}

	var itemsCopy = NgArrRepeat.deepCopyArray(items);
	var rowCount = NgArrRepeat.getRowCount(items,numberPerRow);
	if (items.length > rowCount){
		var numItemToAdd = Math.abs(items.length - numberPerRow);
		for (var i = 0; i < numItemToAdd; i++) {
			itemsCopy.push(null);
		}
	}
	return itemsCopy;
};

NgArrRepeat.deepCopyArray = function(array){
	var newArray=[];

	for(var i=0;i<array.length;i++){
		newArray.push(array[i]);
	}
	return newArray;
};

NgArrRepeat.createEmptyArray = function(num) {
	if (!num){
		return null;
	}

	if(typeof num === 'string'){
		num = parseInt(num);
	}
	var data = [];
	for(var i = 0; i < num; i++) {
		data.push(0);
	}
	return data;
};

//Public
NgArrRepeat.ngArrLoop = function(items,numberPerRow){
	if (!items){
		return null;
	}

	if (!numberPerRow){
		return null;
	}

    var rowCount = NgArrRepeat.getRowCount(items,numberPerRow);
    return NgArrRepeat.createEmptyArray(rowCount);
};


NgArrRepeat.ngArrProp = function(items,index,columnTotal,currentColumn,property){
	if (!items){
		return "";
	}

	if (!columnTotal){
		return "";
	}

	if (!currentColumn){
		return "";
	}

	// Subtracting one to makes things easier of UI, row/columns start at 1 not 0
    var viewModelIndex = index * columnTotal + (currentColumn - 1);
    var viewModelArray = NgArrRepeat.getViewModelItems(items,columnTotal);
    
    if (viewModelArray[viewModelIndex] == null){
      return "";
    }

    if (!viewModelArray[viewModelIndex][property]){
    	if (property != null){
    		return "";
    	}
    }

    if (property == null) {
    	return viewModelArray[viewModelIndex];
    }

    return viewModelArray[viewModelIndex][property];
};