
const Mongoose =require('mongoose');

const PagedFind=require('./plugins/pagedFind');

let Schema=Mongoose.Schema;


let Message = new Schema({
    title: {
        type: String,
        require: true
    }, 
    content: {
        type: String,
        require: true
    }, 
    updatedAt: {
        type: Date,
        default:Date.now()
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
}
);
Message.index({title:"text"});


Message.virtual('id')
.get(function(){return this.get('_id');})
.set(function(value){return this.set('_id',value);});

Message.set('toJSON',
function(doc,ret,options){
    ret.id=ret._id;
    delete ret._v;
});

Message.pre('save',function(next){
    let currentDate=new Date();
    this.update=currentDate;

    if(!this.updatedAt){
        this.createdAt=currentDate;
    }
    next();
})

Message.plugin(PagedFind);

module.exports=Mongoose.model('message',Message)