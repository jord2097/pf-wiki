const { Document } = require('./models/documents')
const { Revision } = require('./models/revisions')

exports.index = async function (req,res,next) {
    Document.find()
    .then((documents) => res.send(documents))
}

exports.revisions = async function (req,res,next){
    Revision.findOne({title: req.params.title})
    .then((revisionList) => res.send(revisionList))
}

exports.create = async function (req,res,next) {
    
    Document.findOne({title: req.params.title})
    .then( async ( result ) => {
        
            const document = new Document({
                title: req.params.title,
                content: req.body.content
            })

            if (!result) {
                const revision = new Revision({
                    title: req.params.title
                })
                revision.save() 
            }
                 
            try {
                let newDocument = await document.save()                
                const revObj = { 'docID': newDocument._id, 'timestamp': newDocument.timestamp }                
                Revision.findOneAndUpdate(
                    {title: newDocument.title},
                    { $push: { 'revisions': revObj }},
                    {safe: true, upsert: true},
                    function (err, model) {
                        console.log(err)
                    }                   
                )       
            }
            catch (err) {
                console.log(err)
            }
            finally {
                if (!result) {
                    res.send({message: "New Document Saved Successfully!"})
                } else {
                    res.send({message: "Document Updated Successfully!"})
                }
                
            }      
                  
        }

    )

    


    
    
}

exports.deleteAll =  async function (req,res,next){
    if (req.params.confirm !== "yes") {
        return res.send({message: `Are you sure you want to delete? Replace ${req.params.confirm} with yes`})
    }
    await Document.deleteMany()
    res.send({message: 'All Events Deleted.'})
}

exports.byTimeStamp = async function (req,res,next){
    Document.findOne({title: req.params.title, timestamp: req.params.timestamp})
    .then( (document) => res.send(document))
    

}