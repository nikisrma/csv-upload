const csvSchema = require("../models/csv.model");
const csvParser = require('csv-parser');
const fs = require('fs');

/** Render home page */
module.exports.home = async function (req, res) {
  const currentPage = parseInt(req.query.page) || 1;
  const limit = 5
  const skip = (currentPage - 1) * limit;
  
  let files = await csvSchema.find({}).skip(skip).limit(limit);
  let totalfiles = await csvSchema.find({});
  let totalPages = Math.ceil(totalfiles.length / 5)
  return res.render("home", {
    title: "CSV Files",
    files: files,
    currentPage: currentPage, 
    totalPages
  });
};

const readAndParseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let headers;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('headers', (headerList) => {
        headers = headerList;
      })
      .on('error', (err) => reject(err))
      .on('end', () => resolve({ results, headers }));
  });
};

/** upload csv file */
module.exports.uploadFile = async function (req, res) {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Check the file type
  else if (req.file.mimetype !== 'text/csv') {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Only CSV files are allowed' });
  }
  else{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let name =   uniqueSuffix + '-' +req.file.originalname
    const { results, headers } = await readAndParseCSV(req.file.path);
    let file = await csvSchema.create({name:name,path:req.file.path,result:results,headers:headers});
    if(file){
      res.status(200).send({status:1,message:'file uploaded'});
    }
    else{
      res.status(400).send({status:0,message:'Something went wrong'});
    }

  } 
};

/** Render Detail page */
module.exports.detail = async function (req, res) {
  const id = req.query.id;
  try {
    const file = await csvSchema.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    let title = file.name.split('-')
    return res.render("detail", {
      title:title[2],
      name: file.name,
      path: file.path,
      result: file.result,
      headers: file.headers
    });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
