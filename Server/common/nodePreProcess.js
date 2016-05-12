function preProcess(){

	var self = this;
	self.doProcessFormData = doProcessFormData;
	self.doPorcessWebData = doPorcessWebData;

	self.processedData = {
		node_1:false,
		node_2:false,
		node_3:false,
		node_4:false,
		node_5:false,
		node_6:false,
		node_7:false,
		node_8:false
	};

	function doProcessFormData(nodes){
		for( node in self.processedData) self.processedData[node] = false;
		for( node in nodes ) self.processedData[node] = true;
		console.log(self.processedData);

		return self.processedData;
	}

	function doPorcessWebData(data){

	}

};


module.exports = preProcess;