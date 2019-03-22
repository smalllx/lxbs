//添加或追加
prodTools.addOrUpdate = function(p) {
	// body...
	//添加或追加购物车
router.post('/addgoods', function(req, res) {
	UserModel.findOne({name:req.body.user},function(err,doc){
		if(!err){
			res.send({msg:'ok'})
		}
	})
})
	if(prods[p.id]){
		prods[p.id] += p.num;
	}else{
		prods[p.id] = p.num;
	}
	//console.log(prods)
	this.saveProds(prods);
}

//删除
prodTools.delete = function(id){
	delete prods[id];
	this.saveProds(prods);
}
//获取
prodTools.getProds = function(){

	return prods;
	// return prods;
}
//获取总数
prodTools.getTotalCount = function(){
	let sum = 0;
	for (let id in prods) {
		sum +=  prods[id]
	}
	return sum;
}

export default prodTools