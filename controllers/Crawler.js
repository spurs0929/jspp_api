const { qiniu } = require('../config/config'),
      { CRAWLER } = require('../config/error_config'),
      { returnInfo } = require('../libs/utils'),
      { startProcess, qiniuUpload } = require('../libs/utils'),
      { addSliderData } = require('../services/Slider'),
      { addAgencyInfo } = require('../services/AgencyInfo'),
      { addRecomCourse } = require('../services/RecomCourse'),
      { addCollection } = require('../services/Collection'),
      { addTeacherData } = require('../services/Teacher'),
      { addStudentData } = require('../services/Student'),
      { addCourseTab } = require('../services/CourseTab'),
      { addCourseData } = require('../services/Course'),
      { addAboutus } = require('../services/Aboutus');

class Crawler{
  async crawlSliderData(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'slider',
        async message(data){
          data.map(async (item) => {
            if(item.imgUrl && !item.imgKey){
              try {
                const imgData = await qiniuUpload({
                  url: item.imgUrl,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                if(imgData.key){
                  item.imgKey = imgData.key;
                }
  
                const result = await addSliderData(item);
                
                if(result){
                  console.log('Data result ok');
                }else{
                  console.log('Data result error');
                }
  
              } catch (error) {
                console.log(error);
              }
            }
          });
  
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });    
    });

    ctx.body = await retData;
  }
  async crawlAgencyInfo(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'agencyInfo',
        async message(data){
          if(data.logoUrl && !data.logoKey){
            try{
              const logoData = await qiniuUpload({
                url: data.logoUrl,
                bucket: qiniu.bucket.img.bucket_name,
                ext: '.jpg'
              });
  
              if(logoData.key){
                data.logoKey = logoData.key;
              }
  
              const result = await addAgencyInfo(data);
  
              if(result){
                console.log('AgencyInfo data create ok');
              }else{
                console.log('AgencyInfo data create failed')
              }
            }catch(error){
              console.log(error);
            }
          }
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });
    });
    ctx.body = await retData;
  }
  async crawlRecomCourse(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'recomCourse',
        async message(data){
          data.map(async (item) => {
            try {
              // 上傳第一張圖片
              if(item.posterUrl && !item.posterKey){
                const posterData = await qiniuUpload({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                if(posterData.key){
                  item.posterKey = posterData.key;
                }
              }
              // 上傳第二章圖片
              if(item.teacherImg && !item.teacherImgKey){
                const teacherImgData = await qiniuUpload({
                  url: item.teacherImg,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
  
                if(teacherImgData.key){
                  item.teacherImgKey = teacherImgData.key;
                }
              }
  
              const result = await addRecomCourse(item);
  
              if(result){
                console.log('RecomCourse Data create ok');
              }else{
                console.log('RecomCourse Data create failed');
              }
  
            } catch (error) {
              console.log(error);
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlCollection(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'collection',
        async message(data){
          data.map(async (item) => {
            if(item.posterUrl && !item.posterKey){
              try {
                const posterData = await qiniuUpload({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                if(posterData.key){
                  item.posterKey = posterData.key;
                }
  
                const result = addCollection(item);
  
                if(result){
                  console.log('Collection Data create OK');
                }else{
                  console.log('Collection Data create failed');
                }
  
              } catch (error) {
                console.log(error);
              }
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlTeacher(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'teacher',
        async message(data){
          data.map(async (item) => {
            
            if(item.teacherImg && !item.teacherImgKey){
              try {
                const imgData = await qiniuUpload({
                  url: item.teacherImg,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                
                if(imgData.key){
                  item.teacherImgKey = imgData.key;
                }
  
                const result = await addTeacherData(item);
  
                if(result){
                  console.log('Teacher Data create OK');
                }else{
                  console.log('Teacher Data create failed');
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlStudent(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'student',
        async message(data){
          data.map(async (item) => {
            console.log(item);
            if(item.studentImg && !item.studentImgKey){
              try {
                const imgData = await qiniuUpload({
                  url: item.studentImg,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                
                if(imgData.key){
                  item.studentImgKey = imgData.key;
                }              
                const result = await addStudentData(item);
  
                if(result){
                  console.log('Student Data create OK');
                }else{
                  console.log('Student Data create failed');
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlCourseTab(){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'courseTab',
        async message(data){
          data.map(async (item) => {
            const result = await addCourseTab(item);
  
            if(result){
              console.log('CourseTab Data create OK');
            }else{
              console.log('CourseTab Data create failed');
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlCourseData(ctx, next){
    const retData = await new Promise((resolve, reject) => {
      startProcess({
        file: 'course',
        async message(data){
          data.map(async (item) => {
            console.log(item);
            if(item.posterUrl && !item.posterKey){
              try {
                const posterData = await qiniuUpload({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.img.bucket_name,
                  ext: '.jpg'
                });
                
                if(posterData.key){
                  item.posterKey = posterData.key;
                }     
                console.log(item);         
                const result = await addCourseData(item);
  
                if(result){
                  console.log('Course Data create OK');
                }else{
                  console.log('Course Data create failed');
                }
              } catch (error) {
                console.log(error);
              }
            }
          });
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });  
    });
    ctx.body = await retData;
  }
  async crawlAboutus(ctx, next){
    const retData = await new Promise((resolve) => {
      startProcess({
        file: 'aboutus',
        async message(data){
          if(data.posterUrl && !data.posterKey){
            try{
              const posterData = await qiniuUpload({
                url: data.posterUrl,
                bucket: qiniu.bucket.img.bucket_name,
                ext: '.jpg'
              });
  
              if(posterData.key){
                data.posterKey = posterData.key;
              }
  
              const result = await addAboutus(data);
  
              if(result){
                console.log('Aboutus data create ok');
              }else{
                console.log('Aboutus data create failed')
              }
            }catch(error){
              console.log(error);
            }
          }
          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS));
        },
        async exit(code){
          console.log(code);
        },
        async error(error){
          resolve(returnInfo(CRAWLER.CRAWL_FAILED));
        }
      });
    });
    ctx.body = await retData;
  }
}

module.exports = new Crawler();