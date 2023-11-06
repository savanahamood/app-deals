'use strict';
class Collection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id: id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne({ where: { id: id } })
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id: id } });
  }

  async readHasMany(id, model){
    let data = await this.model.findOne({
        where:{id : id},
        include:model,
    });
    return data;
  }


}

module.exports = Collection;