const db = require('../configs/database.js');

async function statusCheck (id){
 const project = db('tasks').select('*').where('project_id',id);

 const statusTask = db('tasks').select('*').where('status', 'completed');

 const proj = {
  status: 'completed',
 };

 if (project.length === statusTask.length){
const projectstatus = db('projects').where({id}).update(proj)
 }
}