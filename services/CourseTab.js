const CourseTabModel = require('../db/models/coursetab');

class CourseTabService{
  async addCourseTab(data){
    const cid = data.cid;

    const result = await CourseTabModel.findOne({
      where: { cid }
    });

    if(result){
      return await CourseTabModel.update(data, {
        where: { cid }
      });
    }else{
      return await CourseTabModel.create(data);
    }
  }

  async getCoureFieldsData(ctx, next){
    return await CourseTabModel.findAll({
      attributes: {
        exclude: ['cid']
      }
    })
  }
}

module.exports = new CourseTabService();